import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedCategories = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const categoryRefs = useRef<HTMLDivElement[]>([]);

  const categories = [
    { id: 1, title: "Men's Collection", subtitle: 'Sophisticated & Bold', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop', itemCount: '240+ Items', featured: true },
    { id: 2, title: "Women's Fashion", subtitle: 'Elegant & Trendy', image: 'https://images.unsplash.com/photo-1494790108755-2616c27a74a6?w=500&h=600&fit=crop', itemCount: '320+ Items', featured: true },
    { id: 3, title: 'Electronics', subtitle: 'Tech Innovation', image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=500&h=400&fit=crop', itemCount: '150+ Items' },
    { id: 4, title: 'Accessories', subtitle: 'Perfect Details', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=400&fit=crop', itemCount: '180+ Items' },
    { id: 5, title: 'Home & Living', subtitle: 'Modern Comfort', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop', itemCount: '95+ Items' },
    { id: 6, title: 'Sports & Fitness', subtitle: 'Active Lifestyle', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop', itemCount: '120+ Items' },
  ];

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
      categoryRefs.current.forEach((card, index) => {
        if (card) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(50px) scale(0.9)';
          card.style.transition = `all 0.7s ease ${index * 0.1 + 0.4}s`;
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
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
      .category-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
      .category-card:hover { transform: translateY(-8px) scale(1.02); }
      .category-image { transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
      .category-card:hover .category-image { transform: scale(1.1); }
      .category-overlay { transition: all 0.4s ease; }
      .category-content { transition: all 0.3s ease; }
      .category-card:hover .category-content { transform: translateY(-5px); }
    `;
    document.head.appendChild(style);
    return () => {
      observer.disconnect();
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  const addToCategoryRefs = (el: HTMLDivElement | null) => {
    if (el && !categoryRefs.current.includes(el)) categoryRefs.current.push(el);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background text-foreground relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 mr-2" />
            <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Shop by Category</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Featured
            <span className="block bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Collections</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Discover our carefully curated categories, each designed to elevate your lifestyle with premium quality and exceptional style.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.filter(cat => cat.featured).map((category, index) => (
            <div key={category.id} ref={addToCategoryRefs} className={`category-card relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl ${index === 0 ? 'md:col-span-1 lg:col-span-1' : 'md:col-span-1 lg:col-span-1'} h-96`}>
              <div className="absolute inset-0">
                <img src={category.image} alt={category.title} loading="lazy" className="category-image w-full h-full object-cover" />
              </div>
              <div className="category-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="category-content absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-white">
                  <p className="text-sm font-medium text-white/80 mb-2">{category.subtitle}</p>
                  <h3 className="text-3xl font-bold mb-2">{category.title}</h3>
                  <p className="text-sm text-white/80 mb-4">{category.itemCount}</p>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Shop Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none" />
            </div>
          ))}

          {categories.filter(cat => !cat.featured).map(category => (
            <div key={category.id} ref={addToCategoryRefs} className="category-card relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl h-64">
              <div className="absolute inset-0">
                <img src={category.image} alt={category.title} loading="lazy" className="category-image w-full h-full object-cover" />
              </div>
              <div className="category-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="category-content absolute inset-0 p-6 flex flex-col justify-end">
                <div className="text-white">
                  <p className="text-xs font-medium text-white/80 mb-1">{category.subtitle}</p>
                  <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                  <p className="text-xs text-white/80 mb-3">{category.itemCount}</p>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-1">Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="rounded-full px-8 py-4 font-semibold">View All Categories</Button>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-20 h-20 border border-border rounded-full opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 border border-border rounded-full opacity-20"></div>
    </section>
  );
};

export default FeaturedCategories;


