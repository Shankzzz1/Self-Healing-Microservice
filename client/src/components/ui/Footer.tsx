import React, { useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  ArrowRight,
  Heart,
  Shield,
  Truck,
  CreditCard,
  Star
} from 'lucide-react';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  const quickLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Our Story', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Blog', href: '#' }
  ];

  const customerService = [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'Size Guide', href: '#' },
    { name: 'Shipping Info', href: '#' },
    { name: 'Returns', href: '#' }
  ];

  const legal = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Accessibility', href: '#' },
    { name: 'Legal Notice', href: '#' }
  ];

  const categories = [
    { name: "Men's Fashion", href: '#' },
    { name: "Women's Fashion", href: '#' },
    { name: 'Electronics', href: '#' },
    { name: 'Home & Living', href: '#' },
    { name: 'Sports & Fitness', href: '#' }
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: Facebook, 
      href: '#', 
      color: 'hover:text-blue-500',
      followers: '125K'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: '#', 
      color: 'hover:text-pink-500',
      followers: '89K'
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      href: '#', 
      color: 'hover:text-blue-400',
      followers: '67K'
    },
    { 
      name: 'YouTube', 
      icon: Youtube, 
      href: '#', 
      color: 'hover:text-red-500',
      followers: '45K'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: '#', 
      color: 'hover:text-blue-600',
      followers: '23K'
    }
  ];

  const features = [
    { icon: Truck, text: 'Free Shipping' },
    { icon: Shield, text: 'Secure Payment' },
    { icon: Star, text: 'Premium Quality' },
    { icon: CreditCard, text: 'Easy Returns' }
  ];

  useEffect(() => {
    const animateElements = () => {
      sectionRefs.current.forEach((section, index) => {
        if (section) {
          section.style.opacity = '0';
          section.style.transform = 'translateY(40px)';
          section.style.transition = `all 0.8s ease ${index * 0.1}s`;
          
          setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
          }, 200);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateElements();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      .footer-link {
        transition: all 0.3s ease;
        position: relative;
      }
      
      .footer-link:hover {
        transform: translateX(5px);
      }
      
      .footer-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: currentColor;
        transition: width 0.3s ease;
      }
      
      .footer-link:hover::after {
        width: 100%;
      }
      
      .social-icon {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        position: relative;
      }
      
      .social-icon:hover {
        transform: translateY(-8px) scale(1.2);
      }
      
      .social-icon::before {
        content: '';
        position: absolute;
        inset: -8px;
        border-radius: 50%;
        background: currentColor;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
        z-index: -1;
      }
      
      .social-icon:hover::before {
        opacity: 0.1;
        transform: scale(1);
      }
      
      .feature-card {
        transition: all 0.3s ease;
      }
      
      .feature-card:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.1);
      }
      
      .newsletter-input {
        transition: all 0.3s ease;
      }
      
      .newsletter-input:focus {
        transform: scale(1.02);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      .floating-element {
        animation: float 6s ease-in-out infinite;
      }
      
      .pulse-glow {
        animation: pulseGlow 3s ease-in-out infinite;
      }
      
      @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); }
        50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.2); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      observer.disconnect();
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const addToSectionRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <footer ref={footerRef} className="bg-card text-card-foreground border-t relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-border rounded-full floating-element"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-border rounded-full floating-element" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-20 h-20 border border-border rounded-full floating-element" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-8 pt-16 pb-8 relative z-10">
        
        {/* Top Section - Brand & Newsletter */}
        <div ref={addToSectionRefs} className="grid lg:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-4">Premium Store</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Discover exceptional quality and craftsmanship in every piece. We curate premium products that define your unique style.
              </p>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="feature-card flex items-center space-x-3 p-3 rounded-lg">
                    <IconComponent className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-300">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <div className="pulse-glow bg-gradient-to-r from-foreground/10 to-foreground/20 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-6">
                Get the latest deals, new arrivals, and exclusive offers delivered to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input flex-1 px-6 py-4 bg-background text-foreground rounded-lg border focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button className="bg-foreground text-background px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center">
                  Subscribe
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
              
              <p className="text-sm text-gray-400 mt-4">
                Join 50,000+ subscribers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div ref={addToSectionRefs} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">About</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link text-gray-300 hover:text-white block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Help</h4>
            <ul className="space-y-3">
              {customerService.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link text-gray-300 hover:text-white block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Shop</h4>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <a href={category.href} className="footer-link text-gray-300 hover:text-white block">
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              {legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link text-gray-300 hover:text-white block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  123 Premium Street<br />
                  New York, NY 10001
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                  +1 (234) 567-8900
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <a href="mailto:hello@premiumstore.com" className="text-gray-300 hover:text-white transition-colors">
                  hello@premiumstore.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom */}
        <div ref={addToSectionRefs} className="border-t border-border pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-center lg:text-left">Follow Us</h4>
              <div className="flex items-center justify-center lg:justify-start space-x-6">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <div key={index} className="text-center">
                      <a 
                        href={social.href} 
                        className={`social-icon inline-flex items-center justify-center w-12 h-12 rounded-full border border-gray-600 text-gray-400 ${social.color} transition-all`}
                        aria-label={social.name}
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                      <div className="text-xs text-gray-500 mt-2">{social.followers}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center lg:text-right">
              <div className="flex items-center justify-center lg:justify-end space-x-2 mb-2">
                <span className="text-muted-foreground">Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span className="text-muted-foreground">in New York</span>
              </div>
              <p className="text-muted-foreground text-sm">
                © 2025 Premium Store. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;