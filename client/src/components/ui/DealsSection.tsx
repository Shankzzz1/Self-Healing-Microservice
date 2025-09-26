import React, { useEffect, useRef, useState } from 'react';
import { Clock, Flame, Zap, Tag, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DealsSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const dealRefs = useRef<HTMLDivElement[]>([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [flashSaleTime, setFlashSaleTime] = useState({ hours: 2, minutes: 15, seconds: 42 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--; else if (minutes > 0) { minutes--; seconds = 59; } else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
      setFlashSaleTime(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--; else if (minutes > 0) { minutes--; seconds = 59; } else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const deals = [
    { id: 1, title: 'Premium Wireless Earbuds', originalPrice: 199, discountPrice: 129, discount: 35, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop', stock: 12, sold: 48, type: 'flash' as const },
    { id: 2, title: 'Smart Fitness Watch', originalPrice: 299, discountPrice: 199, discount: 33, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop', stock: 8, sold: 32, type: 'daily' as const },
    { id: 3, title: 'Designer Sunglasses', originalPrice: 159, discountPrice: 89, discount: 44, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop', stock: 15, sold: 25, type: 'flash' as const },
    { id: 4, title: 'Leather Crossbody Bag', originalPrice: 179, discountPrice: 119, discount: 34, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', stock: 6, sold: 44, type: 'daily' as const },
  ];

  useEffect(() => {
    const animateElements = () => {
      const titleEl = titleRef.current;
      if (titleEl) {
        titleEl.style.opacity = '0';
        titleEl.style.transform = 'translateY(50px)';
        titleEl.style.transition = 'all 1s ease';
        setTimeout(() => {
          titleEl.style.opacity = '1';
          titleEl.style.transform = 'translateY(0)';
        }, 200);
      }
      dealRefs.current.forEach((deal, index) => {
        if (deal) {
          deal.style.opacity = '0';
          deal.style.transform = 'translateX(-100px) rotateY(45deg)';
          deal.style.transition = `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.2 + 0.5}s`;
          setTimeout(() => {
            deal.style.opacity = '1';
            deal.style.transform = 'translateX(0) rotateY(0deg)';
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
      .deal-card { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); background: var(--card); color: var(--card-foreground); }
      .deal-card:hover { transform: translateY(-20px) scale(1.03); box-shadow: 0 30px 60px rgba(0,0,0,0.3); }
      .deal-image { transition: all 0.5s ease; position: relative; overflow: hidden; }
      .deal-card:hover .deal-image img { transform: scale(1.15) rotate(2deg); }
      .flash-badge { animation: flashPulse 1.5s ease-in-out infinite alternate; }
      @keyframes flashPulse { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239,68,68,0.7);} 100% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(239,68,68,0);} }
      .timer-digit { animation: digitFlip 1s ease-in-out infinite; background: linear-gradient(145deg, var(--foreground), color-mix(in oklab, var(--foreground) 40%, black)); }
      @keyframes digitFlip { 0%,50% { transform: rotateX(0deg);} 100% { transform: rotateX(360deg);} }
      .progress-bar { animation: progressGlow 2s ease-in-out infinite alternate; }
      @keyframes progressGlow { 0% { box-shadow: 0 0 5px rgba(239,68,68,0.5);} 100% { box-shadow: 0 0 20px rgba(239,68,68,0.8);} }
      .sliding-text { animation: slideText 20s linear infinite; }
      @keyframes slideText { 0% { transform: translateX(100%);} 100% { transform: translateX(-100%);} }
      .deal-actions { opacity: 0; transform: translateY(20px); transition: all 0.3s ease; }
      .deal-card:hover .deal-actions { opacity: 1; transform: translateY(0); }
    `;
    document.head.appendChild(style);
    return () => {
      observer.disconnect();
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  const addToDealRefs = (el: HTMLDivElement | null) => {
    if (el && !dealRefs.current.includes(el)) dealRefs.current.push(el);
  };

  const formatTime = (time: number) => time.toString().padStart(2, '0');
  const calculateProgress = (sold: number, stock: number) => { const total = sold + stock; return (sold / total) * 100; };

  return (
    <section ref={sectionRef} className="py-20 bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="sliding-text absolute top-20 text-9xl font-bold text-foreground/70 whitespace-nowrap">
          FLASH SALE • MEGA DEALS • LIMITED TIME • HOT OFFERS •
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Flame className="w-8 h-8 text-red-500 mr-3 flash-badge" />
            <span className="text-lg font-bold text-red-500 tracking-wider uppercase">Limited Time Offers</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold mb-6">
            <span className="">Flash</span>
            <span className="block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Deals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">Unbelievable discounts on premium products. These deals won't last long!</p>
          <div className="glow-effect bg-card text-card-foreground rounded-2xl p-8 inline-block mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Clock className="w-6 h-6" />
              <span className="text-lg font-semibold">Deal Ends In</span>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="timer-digit text-center p-4 rounded-lg">
                <div className="text-3xl font-bold">{formatTime(timeLeft.hours)}</div>
                <div className="text-sm text-muted-foreground">Hours</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="timer-digit text-center p-4 rounded-lg">
                <div className="text-3xl font-bold">{formatTime(timeLeft.minutes)}</div>
                <div className="text-sm text-muted-foreground">Minutes</div>
              </div>
              <div className="text-2xl">:</div>
              <div className="timer-digit text-center p-4 rounded-lg">
                <div className="text-3xl font-bold">{formatTime(timeLeft.seconds)}</div>
                <div className="text-sm text-muted-foreground">Seconds</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {deals.map((deal) => (
            <div key={deal.id} ref={addToDealRefs} className="deal-card rounded-3xl overflow-hidden shadow-lg group relative border">
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-red-500 text-white text-center rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-lg">
                  -{deal.discount}%
                </div>
              </div>
              {deal.type === 'flash' && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="flash-badge bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Zap className="w-4 h-4 mr-1" />
                    FLASH
                  </div>
                </div>
              )}
              <div className="deal-image aspect-[4/3] relative overflow-hidden bg-muted/20">
                <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
                <div className="deal-actions absolute inset-4 flex justify-between items-end">
                  <div className="flex space-x-2">
                    <button className="p-2 bg-background/90 hover:bg-background rounded-full shadow-lg transition-all border">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  <Button>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-3">{deal.title}</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl font-bold">${deal.discountPrice}</span>
                  <span className="text-lg text-muted-foreground line-through">${deal.originalPrice}</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Sold: {deal.sold}</span>
                    <span className="text-muted-foreground">Left: {deal.stock}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="progress-bar bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${calculateProgress(deal.sold, deal.stock)}%` }} />
                  </div>
                </div>
                {deal.type === 'flash' && (
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Flash Sale Ends</div>
                    <div className="flex justify-center space-x-2 text-sm font-bold">
                      <span>{formatTime(flashSaleTime.hours)}h</span>
                      <span>:</span>
                      <span>{formatTime(flashSaleTime.minutes)}m</span>
                      <span>:</span>
                      <span className="text-red-500">{formatTime(flashSaleTime.seconds)}s</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="font-bold px-12 py-6 text-lg rounded-full">
            <Tag className="w-5 h-5 mr-2" />
            View All Deals
          </Button>
        </div>
      </div>

      <div className="absolute top-40 right-10 w-32 h-32 border-2 border-border rounded-full opacity-20"></div>
      <div className="absolute bottom-40 left-10 w-24 h-24 border-2 border-border rounded-full opacity-30"></div>
    </section>
  );
};

export default DealsSection;


