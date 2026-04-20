import React from 'react';
import { Heart } from 'lucide-react';

const ProductCard = ({ product, index }) => {
  return (
    <div className="product-card group flex flex-col items-center text-center transition-all duration-700 bg-white p-4">
      {/* Editorial Image Container */}
      <div className="relative overflow-hidden aspect-[4/5] w-full mb-10 bg-[#f9f9f9] flex items-center justify-center cursor-pointer">
        {/* Primary Image */}
        <img
          src={product.image.startsWith('.') ? product.image.substring(1) : product.image}
          alt={product.name}
          className="w-[90%] h-[90%] object-contain mix-blend-multiply transition-opacity duration-1000 group-hover:opacity-0"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800/FFFFFF/000000?text=Jewar+Selection'; }}
        />

        {/* Zoomed Hover Image */}
        <img
          src={product.hoverImage || product.image}
          alt={`${product.name} zoom`}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-125 transition-all duration-1000 ease-in-out"
        />

        {/* Subtle Wishlist Icon */}
        <button className="absolute top-6 right-6 text-black/20 hover:text-gold transition-all duration-300 opacity-0 group-hover:opacity-100 z-10">
          <Heart size={18} strokeWidth={1} />
        </button>
      </div>

      {/* Elegant Details */}
      <div className="w-full flex flex-col items-center px-4">
        <span className="text-[10px] tracking-[0.5em] text-gold uppercase mb-3 font-bold">New Arrival</span>
        <h3 className="text-2xl font-display font-medium text-black mb-3 leading-tight tracking-tight">
          {product.name || "Heritage Piece"}
        </h3>

        <p className="text-[12px] font-sans text-gray-400 mb-6 tracking-[0.2em] uppercase">
          {product.material || "22K Gold & Diamonds"}
        </p>

        <div className="h-[1px] w-8 bg-black/10 mb-8"></div>

        <div className="flex flex-col gap-4 w-full items-center">
          <span className="text-[15px] font-sans text-black tracking-widest mb-2">
            PRICE UPON REQUEST
          </span>
          <a
            href={`https://wa.me/1234567890?text=I'd like to discover the ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.4em] font-bold uppercase border-b border-black/20 pb-1 hover:border-gold hover:text-gold transition-all duration-500"
          >
            Discover More
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
