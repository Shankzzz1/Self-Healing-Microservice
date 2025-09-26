import React, { useEffect, useRef, useState } from 'react';
import { Star, Heart, ShoppingCart, Eye, TrendingUp, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TrendingProducts = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const productRefs = useRef<HTMLDivElement[]>([]);
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'rated'>('trending');

  const products = {
    trending: [
      { id: 1, name: 'Premium Wireless Headphones', price: 299, originalPrice: 399, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', rating: 4.9, reviews: 1247, badge: 'Bestseller', tag: 'trending' },
      { id: 2, name: 'Minimalist Steel Watch', price: 199, originalPrice: null, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', rating: 4.8, reviews: 892, badge: 'Hot', tag: 'trending' },
      { id: 3, name: 'Designer Sunglasses', price: 149, originalPrice: 199, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', rating: 4.7, reviews: 634, badge: '25% Off', tag: 'trending' },
      { id: 4, name: 'Premium Leather Sneakers', price: 179, originalPrice: null, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', rating: 4.9, reviews: 1156, badge: 'Top Rated', tag: 'trending' },
    ],
    new: [
      { id: 5, name: 'Smart Fitness Tracker', price: 129, originalPrice: null, image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop', rating: 4.6, reviews: 234, badge: 'New', tag: 'new' },
      { id: 6, name: 'Wireless Charging Pad', price: 79, originalPrice: 99, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop', rating: 4.5, reviews: 167, badge: 'New', tag: 'new' },
      { id: 7, name: 'Minimalist Backpack', price: 89, originalPrice: null, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', rating: 4.7, reviews: 298, badge: 'New', tag: 'new' },
      { id: 8, name: 'Ceramic Coffee Mug Set', price: 45, originalPrice: null, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop', rating: 4.8, reviews: 456, badge: 'New', tag: 'new' },
    ],
    rated: [
      { id: 9, name: 'Professional Camera Lens', price: 599, originalPrice: null, image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop', rating: 5.0, reviews: 89, badge: '5★ Rated', tag: 'rated' },
      { id: 10, name: 'Luxury Silk Scarf', price: 120, originalPrice: null, image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop', rating: 4.9, reviews: 312, badge: 'Premium', tag: 'rated' },
      { id: 11, name: 'Artisan Tea Collection', price: 85, originalPrice: null, image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=400&h=400&fit=crop', rating: 4.9, reviews: 445, badge: 'Artisan', tag: 'rated' },
      { id: 12, name: 'Handcrafted Wooden Desk', price: 449, originalPrice: null, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', rating: 4.8, reviews: 178, badge: 'Handmade', tag: 'rated' },
    ],
  } as const;

  const tabs = [
    { id: 'trending', label: 'Trending Now', icon: TrendingUp },
    { id: 'new', label: 'New Arrivals', icon: Zap },
    { id: 'rated', label: 'Top Rated', icon: Award },
  ] as const;

  useEffect(() => {
    const animateElements = () => {
      const titleEl = titleRef.current;
      if (titleEl) {
        titleEl.style.opacity = '0';
        titleEl.style.transform = 'translateY(30px)';
        titleEl.style.transition = 'all 0.8s ease';
        setTimeout(() => {
          titleEl.style.opacity = '1';
          titleEl.style.transform = 'translateY(0)';
        }, 200);
      }
      productRefs.current.forEach((product, index) => {
        if (product) {
          product.style.opacity = '0';
          product.style.transform = 'translateY(50px)';
          product.style.transition = `all 0.6s ease ${index * 0.1 + 0.4}s`;
          setTimeout(() => {
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
          }, 300);
        }
      });
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) animateElements(); });
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);

    const style = document.createElement('style');
    style.textContent = `
      .product-card { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
      .product-card:hover { transform: translateY(-12px); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
      .product-image { transition: all 0.4s ease; }
      .product-card:hover .product-image { transform: scale(1.05); }
      .product-actions { opacity: 0; transform: translateY(10px); transition: all 0.3s ease; }
      .product-card:hover .product-actions { opacity: 1; transform: translateY(0); }
    `;
    document.head.appendChild(style);
    return () => {
      observer.disconnect();
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  const addToProductRefs = (el: HTMLDivElement | null) => {
    if (el && !productRefs.current.includes(el)) productRefs.current.push(el);
  };

  const handleTabChange = (tabId: 'trending' | 'new' | 'rated') => {
    setActiveTab(tabId);
    productRefs.current = [];
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
    ));
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background text-foreground relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 mr-2" />
            <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Discover Excellence</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Featured
            <span className="block bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">Handpicked selection of our most popular items, crafted for those who appreciate quality and innovation.</p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const active = activeTab === (tab.id as typeof activeTab);
              return (
                <button key={tab.id} onClick={() => handleTabChange(tab.id as typeof activeTab)} className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all border ${active ? 'bg-foreground text-background shadow-lg' : 'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground'}`}>
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products[activeTab].map((product) => (
            <div key={`${product.id}-${activeTab}`} ref={addToProductRefs} className="product-card bg-card text-card-foreground rounded-2xl overflow-hidden shadow-lg group border">
              <div className="relative aspect-square overflow-hidden">
                <img src={product.image} alt={product.name} className="product-image w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${product.badge === 'Bestseller' ? 'bg-red-500 text-white' : product.badge === 'New' ? 'bg-green-500 text-white' : product.badge === 'Hot' ? 'bg-orange-500 text-white' : product.badge.includes('Off') ? 'bg-blue-500 text-white' : 'bg-foreground text-background'}`}>
                    {product.badge}
                  </span>
                </div>
                <div className="product-actions absolute top-4 right-4 flex flex-col space-y-2">
                  <button className="p-2 bg-background/90 hover:bg-background rounded-full shadow-lg transition-all border"><Heart className="w-4 h-4" /></button>
                  <button className="p-2 bg-background/90 hover:bg-background rounded-full shadow-lg transition-all border"><Eye className="w-4 h-4" /></button>
                </div>
                <div className="product-actions absolute inset-x-4 bottom-4">
                  <Button className="w-full font-semibold"><ShoppingCart className="w-4 h-4 mr-2" />Add to Cart</Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="font-semibold px-8 py-4 text-lg">View All Products</Button>
        </div>
      </div>

      <div className="absolute top-40 left-10 w-24 h-24 border border-border rounded-full opacity-20"></div>
      <div className="absolute bottom-40 right-10 w-32 h-32 border border-border rounded-full opacity-10"></div>
    </section>
  );
};

export default TrendingProducts;


