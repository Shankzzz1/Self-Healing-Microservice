import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const sampleProducts = [
  { id: 1, name: 'Wireless Headphones', description: 'Premium noise-cancelling headphones', price: 299, rating: 4.5, category: 'Electronics', brand: 'TechPro', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop' },
  { id: 2, name: 'Smart Watch', description: 'Advanced fitness tracking smartwatch', price: 399, rating: 4.3, category: 'Electronics', brand: 'FitTech', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop' },
  { id: 3, name: 'Designer Sneakers', description: 'Limited edition premium sneakers', price: 189, rating: 4.7, category: 'Fashion', brand: 'StyleCo', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop' },
  { id: 4, name: 'Coffee Maker', description: 'Professional grade coffee machine', price: 249, rating: 4.2, category: 'Home', brand: 'BrewMaster', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop' },
  { id: 5, name: 'Gaming Keyboard', description: 'Mechanical RGB gaming keyboard', price: 159, rating: 4.6, category: 'Electronics', brand: 'GamePro', image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop' },
  { id: 6, name: 'Leather Jacket', description: 'Genuine leather motorcycle jacket', price: 329, rating: 4.4, category: 'Fashion', brand: 'LeatherCraft', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop' },
  { id: 7, name: 'Yoga Mat', description: 'Premium non-slip yoga mat', price: 89, rating: 4.8, category: 'Sports', brand: 'ZenFit', image: 'https://images.unsplash.com/photo-1506629905496-37c8b5249c8d?w=300&h=300&fit=crop' },
  { id: 8, name: 'Bluetooth Speaker', description: 'Portable waterproof speaker', price: 129, rating: 4.1, category: 'Electronics', brand: 'SoundWave', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop' },
];

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports'];
const brands = ['All', 'TechPro', 'FitTech', 'StyleCo', 'BrewMaster', 'GamePro', 'LeatherCraft', 'ZenFit', 'SoundWave'];
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export default function ProductList() {
  const [products, setProducts] = useState(sampleProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  
  const headerRef = useRef(null);
  const sidebarRef = useRef(null);
  const productGridRef = useRef(null);
  const productRefs = useRef([]);

  const productsPerPage = 6;

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    gsap.fromTo(headerRef.current, 
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(sidebarRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
    );

    gsap.fromTo(productGridRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    productRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref,
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6, 
            delay: index * 0.1,
            ease: "power2.out"
          }
        );
      }
    });
  }, [products, currentPage]);

  const filteredProducts = React.useMemo(() => {
    let filtered = sampleProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleWishlistToggle = (productId) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const handleAddToCart = (product) => {
    const gsap = window.gsap;
    if (gsap) {
      const button = event.target;
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
      
      {/* Header */}
      <header ref={headerRef} className="bg-gray-900 dark:bg-gray-800 text-white p-6 shadow-lg transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Explore Our Collection</h1>
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500 transition-colors duration-200" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              />
            </div>
            
            <div className="flex gap-4 items-center">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 transition-colors duration-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div 
            ref={sidebarRef}
            className={`${showFilters ? 'block' : 'hidden'} md:block w-64 space-y-6 flex-shrink-0`}
          >
            <Card className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-200">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-200">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className={`w-full justify-start transition-colors duration-200 ${
                        selectedCategory === category 
                          ? 'bg-gray-900 dark:bg-gray-700 text-white' 
                          : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-200">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-200">Brands</h3>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map(brand => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-200">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-200">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
                Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredProducts.length)} of {filteredProducts.length} products
              </p>
            </div>

            <div 
              ref={productGridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {currentProducts.map((product, index) => (
                <Card
                  key={product.id}
                  ref={el => productRefs.current[index] = el}
                  className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 group"
                >
                  <CardContent className="p-4">
                    <div className="relative mb-4 overflow-hidden rounded-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`absolute top-2 right-2 p-2 ${
                          wishlist.has(product.id) ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
                        } hover:text-red-500 dark:hover:text-red-400 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-colors duration-200`}
                        onClick={() => handleWishlistToggle(product.id)}
                      >
                        <Heart className="h-4 w-4" fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 transition-colors duration-200">{product.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">{product.description}</p>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 transition-colors duration-200 ${
                                i < Math.floor(product.rating) ? 'text-yellow-400 dark:text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">({product.rating})</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-200">${product.price}</span>
                        <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                          {product.category}
                        </Badge>
                      </div>

                      <Button
                        className="w-full bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      className={`w-10 h-10 p-0 transition-colors duration-200 ${
                        currentPage === index + 1
                          ? 'bg-gray-900 dark:bg-gray-700 text-white'
                          : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



