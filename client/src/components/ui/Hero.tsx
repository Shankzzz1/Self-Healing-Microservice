import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// Type definitions
interface ImageItem {
  id: number;
  height: number;
  src: string;
}

interface MasonryImageProps {
  image: ImageItem;
  index: number;
}

const HeroPage = () => {
  const containerRef = useRef(null);
  const quoteSectionRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -50]);

  // Updated images with working URLs
  const images = [
    { 
      id: 1, 
      height: 300, 
      src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&auto=format&q=80'
    },
    { 
      id: 2, 
      height: 400, 
      src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format&q=80'
    },
    { 
      id: 3, 
      height: 250, 
      src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=250&fit=crop&auto=format&q=80'
    },
    { 
      id: 4, 
      height: 350, 
      src: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=350&fit=crop&auto=format&q=80'
    },
    { 
      id: 5, 
      height: 280, 
      src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=280&fit=crop&auto=format&q=80'
    },
    { 
      id: 6, 
      height: 320, 
      src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=320&fit=crop&auto=format&q=80'
    },
    { 
      id: 7, 
      height: 380, 
      src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=380&fit=crop&auto=format&q=80'
    },
    { 
      id: 8, 
      height: 290, 
      src: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=290&fit=crop&auto=format&q=80'
    },
  ];

  const quotes = [
    {
      text: "Design is not just what it looks like and feels like. Design is how it works.",
      author: "Steve Jobs"
    },
    {
      text: "Simplicity is the ultimate sophistication.",
      author: "Leonardo da Vinci"
    },
    {
      text: "The details are not the details. They make the design.",
      author: "Charles Eames"
    }
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fixed Masonry Image component with proper typing
  const MasonryImage: React.FC<MasonryImageProps> = ({ image, index }) => {
    const delay = (index % 4) * 0.1;
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
        transition={{ 
          duration: 0.6, 
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{ 
          scale: 1.05,
          y: -10,
          transition: { duration: 0.3 }
        }}
        style={{
          y: index % 3 === 0 ? y1 : index % 3 === 1 ? y2 : y3
        }}
        className="mb-6 break-inside-avoid"
      >
        <div className="relative group cursor-pointer overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
          {/* Show loading state while image loads */}
          {!imageLoaded && !imageError && (
            <div 
              style={{ height: `${image.height}px` }}
              className="w-full bg-gray-800 flex items-center justify-center animate-pulse"
            >
              <div className="text-gray-500 text-center">
                <div className="w-8 h-8 border-2 border-gray-600 border-t-gray-400 rounded-full animate-spin mx-auto mb-2"></div>
                <span className="text-sm">Loading...</span>
              </div>
            </div>
          )}
          
          {/* Show error state if image fails */}
          {imageError && (
            <div 
              style={{ height: `${image.height}px` }}
              className="w-full bg-gray-800 flex items-center justify-center"
            >
              <div className="text-gray-500 text-center p-4">
                <div className="w-12 h-12 mx-auto mb-2 opacity-50">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">Image unavailable</span>
              </div>
            </div>
          )}
          
          {/* The actual image */}
          <img
            src={image.src}
            alt={`Gallery ${image.id}`}
            style={{ 
              height: `${image.height}px`,
              display: imageLoaded ? 'block' : 'none'
            }}
            className="w-full object-cover transition-all duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
            onLoad={() => {
              setImageLoaded(true);
              setImageError(false);
            }}
            onError={() => {
              console.log(`Failed to load image: ${image.src}`);
              setImageError(true);
              setImageLoaded(false);
            }}
            crossOrigin="anonymous"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
          
          {/* Plus icon on hover - only show if image loaded successfully */}
          {imageLoaded && !imageError && (
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="w-8 h-8 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <div ref={containerRef} className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Quotes */}
            <motion.div 
              ref={quoteSectionRef}
              className="space-y-8 lg:pr-8"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-2"
              >
                <h1 className="text-6xl lg:text-8xl font-bold tracking-tight">
                  <span className="text-white">Create</span>
                  <br />
                  <span className="text-gray-400">Inspire</span>
                  <br />
                  <span className="text-white">Design</span>
                </h1>
              </motion.div>

              {/* Animated Quote Section */}
              <div className="relative h-32 overflow-hidden">
                {quotes.map((quote, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 flex flex-col justify-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ 
                      opacity: currentQuote === index ? 1 : 0,
                      y: currentQuote === index ? 0 : currentQuote > index ? -50 : 50
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <blockquote className="text-xl lg:text-2xl text-gray-300 italic leading-relaxed">
                      "{quote.text}"
                    </blockquote>
                    <cite className="text-gray-500 mt-4 text-lg">
                      — {quote.author}
                    </cite>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex space-x-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300 shadow-lg"
                >
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - Pinterest-style Image Gallery */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="columns-2 gap-6 space-y-6">
                {images.map((image, index) => (
                  <MasonryImage key={image.id} image={image} index={index} />
                ))}
              </div>
              
              {/* Floating elements for added visual interest */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-10 -right-10 w-20 h-20 border border-gray-600 rounded-full opacity-20"
              />
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute -bottom-5 -left-5 w-16 h-16 bg-gray-800 rounded-full opacity-30"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Quote Progress Indicators */}
      <div className="fixed bottom-8 left-8 flex space-x-2 z-50">
        {quotes.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              currentQuote === index ? 'bg-white' : 'bg-gray-600'
            }`}
            whileHover={{ scale: 1.5 }}
            onClick={() => setCurrentQuote(index)}
            animate={{ scale: currentQuote === index ? 1.2 : 1 }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroPage;