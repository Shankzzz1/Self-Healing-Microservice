import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Trash2, 
  Heart, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag,
  ArrowLeft,
  ShoppingCart
} from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

const ShoppingCartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "Black, Over-ear",
      price: 299.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center",
      color: "Black",
      size: "One Size"
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      description: "White, Size M",
      price: 29.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center",
      color: "White",
      size: "M"
    },
    {
      id: 3,
      name: "Minimalist Watch",
      description: "Silver, Leather Strap",
      price: 199.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop&crop=center",
      color: "Silver",
      size: "42mm"
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const summaryRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple fade-in animation - ensure everything is visible
    const animateElements = () => {
      if (headerRef.current) {
        headerRef.current.style.opacity = '1';
        headerRef.current.style.transform = 'translateY(0)';
      }
      
      itemsRef.current.forEach((item) => {
        if (item) {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }
      });

      if (summaryRef.current) {
        summaryRef.current.style.opacity = '1';
        summaryRef.current.style.transform = 'translateX(0)';
      }
    };

    // Run immediately to ensure visibility
    animateElements();
  }, [cartItems]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const saveForLater = (id: number) => {
    // Simple visual feedback
    const itemElement = itemsRef.current.find(el => 
      el?.getAttribute('data-item-id') === id.toString()
    );
    
    if (itemElement) {
      itemElement.style.transform = 'scale(0.98)';
      setTimeout(() => {
        itemElement.style.transform = 'scale(1)';
      }, 150);
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discount;

  const proceedToCheckout = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white text-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div ref={headerRef} className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Your Shopping Cart</h1>
            <p className="text-gray-600">Review your items and proceed to checkout.</p>
          </div>
          
          <div className="text-center py-20">
            <div className="mb-8">
              <ShoppingBag className="w-24 h-24 mx-auto text-gray-400 mb-6" />
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Discover our amazing products and start shopping!</p>
            </div>
            
            <Button 
              size="lg" 
              className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Your Shopping Cart</h1>
          <p className="text-gray-600">Review your items and proceed to checkout.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <Card 
                  key={item.id}
                  ref={el => {
                    if (el) itemsRef.current[index] = el;
                  }}
                  data-item-id={item.id}
                  className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg border border-gray-200"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.color && (
                            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-300">
                              {item.color}
                            </Badge>
                          )}
                          {item.size && (
                            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-300">
                              Size {item.size}
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          {/* Quantity Selector */}
                          <div className="quantity-selector flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 p-0 border-gray-300 hover:bg-gray-50"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium text-gray-900">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0 border-gray-300 hover:bg-gray-50"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              ${item.price.toFixed(2)} each
                            </div>
                            <div className="text-lg font-semibold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mt-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => saveForLater(item.id)}
                            className="text-gray-600 hover:text-gray-900 p-0 h-auto font-normal hover:bg-gray-50"
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            Save for Later
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card ref={summaryRef} className="border border-gray-200 bg-white shadow-lg sticky top-6">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-xl text-gray-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6 bg-white">
                <div className="flex justify-between text-gray-900">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-900">
                  <span>Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-gray-900">
                  <span>Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount (SAVE10)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <Separator className="bg-gray-200" />

                {/* Promo Code */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                    />
                    <Button
                      variant="outline"
                      onClick={applyPromoCode}
                      disabled={promoApplied || !promoCode}
                      size="sm"
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      <Tag className="w-4 h-4" />
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-sm text-green-600 font-medium">
                      ✓ Promo code applied!
                    </p>
                  )}
                </div>

                <Separator className="bg-gray-200" />

                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    onClick={proceedToCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Proceed to Checkout
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-100">
                  Free shipping on orders over $100
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;