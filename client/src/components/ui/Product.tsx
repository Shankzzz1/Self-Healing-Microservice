import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  ZoomIn, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus,
  Share2,
  Truck,
  Shield,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample product data
const product = {
  id: 1,
  name: 'Premium Wireless Headphones',
  description: 'Experience exceptional sound quality with our flagship wireless headphones. Featuring advanced noise cancellation technology, premium materials, and all-day comfort. Perfect for music lovers, professionals, and commuters alike.',
  fullDescription: `
    These premium wireless headphones deliver studio-quality sound with deep bass and crystal-clear highs. The advanced active noise cancellation technology blocks out ambient noise, allowing you to focus on what matters most - your music.
    
    Built with premium materials including soft leather ear cushions and a durable aluminum frame, these headphones are designed for all-day comfort. The 30-hour battery life ensures you never miss a beat, while fast charging gives you 3 hours of playback in just 15 minutes.
    
    Features include intuitive touch controls, voice assistant integration, and seamless Bluetooth 5.0 connectivity. Whether you're working from home, commuting, or just relaxing, these headphones adapt to your lifestyle.
  `,
  price: 299,
  originalPrice: 399,
  discount: 25,
  rating: 4.5,
  reviewCount: 1247,
  inStock: true,
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop'
  ],
  colors: [
    { name: 'Midnight Black', value: '#000000', available: true },
    { name: 'Pearl White', value: '#FFFFFF', available: true },
    { name: 'Space Gray', value: '#8E8E93', available: true },
    { name: 'Rose Gold', value: '#E8B4B8', available: false }
  ],
  sizes: [
    { name: 'Regular', available: true },
    { name: 'Large', available: true },
    { name: 'Small', available: false }
  ]
};

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    date: '2024-01-15',
    review: 'Absolutely amazing sound quality! The noise cancellation is incredible and the battery life exceeds expectations. Worth every penny.',
    verified: true
  },
  {
    id: 2,
    name: 'Mike Chen',
    rating: 4,
    date: '2024-01-10',
    review: 'Great headphones overall. Very comfortable for long listening sessions. Only minor complaint is the touch controls can be a bit sensitive.',
    verified: true
  },
  {
    id: 3,
    name: 'Emma Davis',
    rating: 5,
    date: '2024-01-08',
    review: 'Perfect for my daily commute. The noise cancellation blocks out all the subway noise. Highly recommended!',
    verified: true
  }
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Refs for animations
  const headerRef = useRef(null);
  const imageGalleryRef = useRef(null);
  const productInfoRef = useRef(null);
  const reviewsRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    // Header animation
    gsap.fromTo(headerRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Image gallery animation
    gsap.fromTo(imageGalleryRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
    );

    // Product info animation
    gsap.fromTo(productInfoRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: "power3.out" }
    );

    // Reviews animation
    gsap.fromTo(reviewsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: "power3.out" }
    );
  }, []);

  const handleAddToCart = () => {
    const gsap = window.gsap;
    if (gsap) {
      const button = document.getElementById('add-to-cart-btn');
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          // Here you would typically add to cart logic
          console.log('Added to cart:', { product, selectedColor, selectedSize, quantity });
        }
      });
    }
  };

  const handleBuyNow = () => {
    const gsap = window.gsap;
    if (gsap) {
      const button = document.getElementById('buy-now-btn');
      gsap.to(button, {
        scale: 1.05,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
      
      {/* Header */}
      <header ref={headerRef} className="bg-black text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <Button variant="ghost" className="text-white hover:bg-gray-800 p-2">
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to Products
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div ref={imageGalleryRef} className="space-y-4">
            <div className="relative group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
              />
              
              {/* Image Navigation */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-4 w-4" />
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer transition-all ${
                    selectedImage === index ? 'ring-2 ring-black' : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div ref={productInfoRef} className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({product.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  <Badge className="bg-red-100 text-red-800 border-red-200">
                    {product.discount}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed">
                {showFullDescription ? product.fullDescription : product.description}
              </p>
              <Button
                variant="ghost"
                className="mt-2 p-0 h-auto text-black hover:bg-transparent underline"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
              </Button>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color: {selectedColor.name}</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name ? 'border-black scale-110' : 'border-gray-300'
                    } ${!color.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => color.available && setSelectedColor(color)}
                    disabled={!color.available}
                    title={color.available ? color.name : `${color.name} (Out of Stock)`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size.name}
                    variant={selectedSize.name === size.name ? "default" : "outline"}
                    className={`${
                      selectedSize.name === size.name
                        ? 'bg-black text-white'
                        : 'border-gray-300 text-black hover:bg-gray-100'
                    } ${!size.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => size.available && setSelectedSize(size)}
                    disabled={!size.available}
                  >
                    {size.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-gray-300"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold min-w-[2rem] text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-gray-300"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  id="add-to-cart-btn"
                  className="flex-1 bg-black text-white hover:bg-gray-800 h-12"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-gray-300 ${isWishlisted ? 'text-red-500' : 'text-gray-600'}`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className="h-5 w-5" fill={isWishlisted ? 'currentColor' : 'none'} />
                </Button>
                <Button variant="outline" size="sm" className="border-gray-300 text-gray-600">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              <Button
                id="buy-now-btn"
                className="w-full bg-gray-900 text-white hover:bg-black h-12 text-lg font-semibold"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck className="h-6 w-6 text-gray-600" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-gray-600" />
                <div>
                  <p className="font-medium">2 Year Warranty</p>
                  <p className="text-sm text-gray-600">Full coverage</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-6 w-6 text-gray-600" />
                <div>
                  <p className="font-medium">30-Day Returns</p>
                  <p className="text-sm text-gray-600">Hassle-free returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div ref={reviewsRef} className="mt-16">
          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
            
            {/* Reviews Summary */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">{product.rating}</div>
                  <div className="flex justify-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">{product.reviewCount} reviews</div>
                </div>
                
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const percentage = Math.random() * 80 + 10; // Mock data
                    return (
                      <div key={rating} className="flex items-center gap-2 mb-1">
                        <span className="text-sm w-3">{rating}</span>
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-yellow-400 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">{Math.round(percentage)}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{review.name}</h4>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.review}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" className="border-gray-300">
                Load More Reviews
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}