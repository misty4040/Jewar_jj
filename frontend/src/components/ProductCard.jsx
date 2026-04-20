import React from 'react';
import { Heart } from 'lucide-react';

const ProductCard = ({ product, index }) => {
  return (
    <div className="product-card group reveal flex flex-col items-center text-center opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: `${(index % 4) * 0.1}s` }}>
      {/* Editorial Image Container */}
      <div className="relative overflow-hidden aspect-[4/5] w-full mb-10 bg-[#F4F4F4] group-hover:bg-[#EFEFEF] transition-colors duration-700">
        <img
          src={product.image.startsWith('.') ? product.image.substring(1) : product.image}
          alt={product.name}
          className="w-full h-full object-contain p-8 mix-blend-multiply transition-transform duration-[1.5s] group-hover:scale-105"
        />
        
        {/* 'NEW' Label - Top Left */}
        <div className="absolute top-6 left-6">
          <span className="bg-white text-[10px] tracking-[0.2em] px-3 py-1.5 uppercase font-bold border border-black/5 shadow-sm">
            NEW
          </span>
        </div>

        {/* Heart Icon - Top Right */}
        <button className="absolute top-6 right-6 p-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:text-gold shadow-md z-10">
          <Heart size={18} strokeWidth={1.5} />
        </button>
        
        {/* Dark 'DISCOVER' Button Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
          <a
            href={`https://wa.me/1234567890?text=I'd like to discover more about the ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#1A1A1A] text-white py-4 text-[11px] tracking-[0.3em] font-bold uppercase transition-all duration-500 hover:bg-gold flex justify-center items-center shadow-2xl"
          >
            DISCOVER
          </a>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col items-center max-w-[90%]">
        <h3 className="text-[15px] md:text-[17px] tracking-[0.2em] font-medium uppercase text-black mb-3 group-hover:text-gold transition-colors duration-300 leading-tight">
          {product.name}
        </h3>
        <p className="text-[12px] font-light text-gray-500 leading-relaxed mb-4 italic font-serif opacity-80 decoration-gold/30">
          {product.material || "Exquisite Fine Jewellery"}
        </p>
        <div className="h-[1px] w-8 bg-gold/40 mb-5 opacity-40"></div>
        <span className="text-[15px] md:text-[17px] tracking-[0.15em] font-bold uppercase text-black">
          INR 575,000
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
