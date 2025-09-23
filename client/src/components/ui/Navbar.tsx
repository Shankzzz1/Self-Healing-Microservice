import React, { useState } from 'react';
import { House, Search, ShoppingCart, LogIn, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';

interface NavbarProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean; // Optional prop to control theme from parent
}

const Navbar: React.FC<NavbarProps> = ({ onThemeToggle, isDarkMode }) => {
  // Internal state for theme if not controlled by parent
  const [internalDarkMode, setInternalDarkMode] = useState(false);
  
  // Use external prop if provided, otherwise use internal state
  const currentIsDarkMode = isDarkMode !== undefined ? isDarkMode : internalDarkMode;
  
  const handleThemeToggle = () => {
    if (isDarkMode === undefined) {
      // If not controlled by parent, manage internal state
      setInternalDarkMode(!internalDarkMode);
    }
    // Always call the external handler if provided
    onThemeToggle?.();
  };

  const navItems = [
    {
      icon: House,
      label: 'Home',
      href: '/',
    },
    {
      icon: Search,
      label: 'Search',
      href: '/search',
    },
    {
      icon: ShoppingCart,
      label: 'Shopping Cart',
      href: '/ShoppingCart',
    },
    {
      icon: LogIn,
      label: 'Login',
      href: '/Login',
    },
  ];

  // Animation variants for the theme toggle
  const iconVariants = {
    initial: { 
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    animate: { 
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.6
      }
    },
    exit: { 
      scale: 0,
      rotate: 180,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.4
      }
    }
  };

  // Button pulse animation on click
  const buttonVariants = {
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-center p-6">
      <div className="flex items-center space-x-3 bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-1 shadow-lg">
        {navItems.map((item, index) => (
          <React.Fragment key={item.label}>
            <Button
              variant="ghost"
              size="sm"
              className="h-12 w-12 p-0 text-white hover:text-white hover:bg-white/10 transition-all duration-300 rounded-xl"
              asChild
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                <item.icon className="h-6 w-6" />
              </a>
            </Button>
            {index < navItems.length - 1 && (
              <div className="w-px h-6 bg-white/40" />
            )}
          </React.Fragment>
        ))}
        
        <div className="w-px h-6 bg-white/40" />
        
        <motion.div
          variants={buttonVariants}
          whileTap="tap"
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-12 w-12 p-0 text-white hover:text-white hover:bg-white/10 transition-all duration-300 rounded-xl relative overflow-hidden"
            onClick={handleThemeToggle}
            aria-label={currentIsDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait">
              {currentIsDarkMode ? (
                <motion.div
                  key="sun"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Sun className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Moon className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;