import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';
import sneaker from '@/Images/sneaker.jpg';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Simple animation without external GSAP
    const animateElements = () => {
      // Animate text elements
      const textElements = textRef.current?.children;
      if (textElements) {
        Array.from(textElements).forEach((el, index) => {
          const elm = el as HTMLElement;
          elm.style.opacity = '0';
          elm.style.transform = 'translateX(-50px)';
          elm.style.transition = `all 0.8s ease ${index * 0.2}s`;
          
          setTimeout(() => {
            elm.style.opacity = '1';
            elm.style.transform = 'translateX(0)';
          }, 100);
        });
      }

      // Animate images with staggered effect
      imageRefs.current.forEach((img, index) => {
        if (img) {
          img.style.opacity = '0';
          img.style.transform = 'translateY(30px) scale(0.9)';
          img.style.transition = `all 0.6s ease ${index * 0.1 + 0.5}s`;
          
          setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'translateY(0) scale(1)';
          }, 200);
        }
      });
    };

    animateElements();

    // Floating animation for images
    const floatAnimation = () => {
      imageRefs.current.forEach((img, index) => {
        if (img) {
          const delay = index * 0.5;
          img.style.animation = `float ${3 + index * 0.2}s ease-in-out ${delay}s infinite`;
        }
      });
    };

    setTimeout(floatAnimation, 1500);

    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-8px) rotate(1deg); }
        50% { transform: translateY(-15px) rotate(0deg); }
        75% { transform: translateY(-8px) rotate(-1deg); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      .image-hover:hover {
        animation: pulse 0.3s ease-in-out;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const addToImageRefs = (el: HTMLDivElement | null) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  const productImages = [
    { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop", alt: "Watch" },
    { url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=250&h=350&fit=crop", alt: "Sunglasses" },
    { url: sneaker, alt: "Sneakers" },
    { url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=260&h=380&fit=crop", alt: "Bag" },
    { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=240&h=300&fit=crop", alt: "Headphones" },
    { url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=290&h=340&fit=crop", alt: "Jacket" },
  ];

  return (
    <div ref={heroRef} className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 w-full items-center">
          
          {/* Left Side - Text Content */}
          <div ref={textRef} className="space-y-8 max-w-xl">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">Trusted by 50K+ customers worldwide</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Discover
              <span className="block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Premium
              </span>
              <span className="block">Collections</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Curated selection of luxury products that define your style. Experience exceptional quality and craftsmanship in every piece.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="font-semibold px-8 py-6 text-lg group transition-all duration-300"
              >
                Shop Collection
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-lg transition-all duration-300"
              >
                View Lookbook
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Lifetime Warranty</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Truck className="w-5 h-5" />
                <span className="text-sm">Free Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Side - Pinterest Style Images */}
          <div ref={imagesRef} className="relative h-[600px] lg:h-[700px]">
            <div className="columns-3 gap-4 h-full">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  ref={addToImageRefs}
                  className={`
                    relative mb-4 break-inside-avoid image-hover cursor-pointer
                    ${index % 3 === 0 ? 'h-64' : index % 3 === 1 ? 'h-80' : 'h-72'}
                  `}
                  style={{
                    transform: `translateY(${index % 2 === 0 ? '20px' : '0px'})`
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-xl shadow-2xl transition-all duration-300 hover:shadow-white/10 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-foreground font-semibold text-sm">{image.alt}</p>
                      <p className="text-muted-foreground text-xs">Premium Collection</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-border rounded-full opacity-30"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-border rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-foreground/10 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Hero;