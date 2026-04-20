import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';

/**
 * BRAND CONSTANTS
 * Optimized for the Shopify Sona Theme aesthetic
 */
const BRAND_NAME = "jewar";
const ANNOUNCEMENT_TEXT = [
  "FREE SHIPPING FOR ALL ORDERS ABOVE $199",
  "TIMELESS GOLD COLLECTION",
  "WEARABLE HERITAGE",
  "CRAFTED TO LAST",
  "TIMELESS JEWELLERY PIECES"
];
const CATEGORIES = ["GOLD", "SILVER", "PLATINUM", "DIAMOND", "GEMSTONES", "INVESTMENTS"];

const Navbar = ({ activeCategory, onCategoryChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 overflow-hidden ${isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-xl' : 'bg-transparent shadow-none'}`}>
      
      {/* Announcement Bar (Shopify Style Marquee) */}
      <div className="h-10 bg-black text-white flex items-center overflow-hidden border-b border-white/10">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          {[...ANNOUNCEMENT_TEXT, ...ANNOUNCEMENT_TEXT].map((text, i) => (
            <div key={i} className="flex items-center gap-12 group">
              <span className="text-[10px] tracking-[0.3em] font-medium opacity-80">{text}</span>
              <span className="w-1 h-1 bg-white/40 rounded-full"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Integrated Header */}
      <div className="max-w-[1800px] mx-auto px-10 h-24 flex justify-between items-center text-white">
        
        {/* Left Nav Group */}
        <div className="flex-1 hidden md:flex gap-10 items-center">
          <a href="#shop" className="boutique-link text-[13px] tracking-[0.2em] font-medium py-2">SHOP</a>
          <a href="#about" className="boutique-link text-[13px] tracking-[0.2em] font-medium py-2">STORY</a>
        </div>

        {/* Center Logo/Signature */}
        <div className="flex flex-col items-center justify-center">
            <h1 className="font-display text-5xl md:text-6xl tracking-[0.4em] font-bold py-1 lowercase transition-transform duration-500 hover:scale-105">
                {BRAND_NAME}<span className="text-gold opacity-50 text-2xl relative -top-4 ml-1">ā</span>
            </h1>
        </div>

        {/* Right Utility Group */}
        <div className="flex-1 flex justify-end gap-8 items-center">
          <Search size={20} className="hidden md:block cursor-pointer hover:text-gold transition-colors opacity-80 hover:opacity-100" />
          <User size={20} className="hidden md:block cursor-pointer hover:text-gold transition-colors opacity-80 hover:opacity-100" />
          <div className="relative group cursor-pointer">
            <ShoppingBag size={20} className="hover:text-gold transition-colors opacity-80 hover:opacity-100" />
            <span className="absolute -top-2 -right-2 bg-gold text-black text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">0</span>
          </div>
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Category Strip (Inline Boutique Style) */}
      <div className={`hidden md:flex justify-center gap-12 py-4 px-10 transition-all duration-500 border-t border-white/5 ${isScrolled ? 'opacity-100 h-14' : 'opacity-0 h-0 overflow-hidden'}`}>
        {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`text-[12px] tracking-[0.25em] font-bold transition-all hover:text-gold ${activeCategory === cat ? 'text-gold' : 'text-white/60'}`}
            >
              {cat}
            </button>
        ))}
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-black/95 ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="flex flex-col items-center py-16 gap-10 text-[14px] tracking-[0.3em] text-white">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => {onCategoryChange(cat); setIsMobileMenuOpen(false);}} className="hover:text-gold transition-colors">
              {cat}
            </button>
          ))}
          <div className="w-12 h-[1px] bg-gold/30 mt-6"></div>
          <a href="#contact" className="py-2 opacity-60">CONTACT</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
