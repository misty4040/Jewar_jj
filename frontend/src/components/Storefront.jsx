import React from 'react';

const Storefront = () => {
    return (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax-like effect */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/assets/storefront-jewar.png" 
                    alt="Jewar Boutique Storefront" 
                    className="w-full h-full object-cover brightness-75 transition-transform duration-[10s] hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 text-center px-10 reveal">
                <span className="text-gold text-[13px] tracking-[0.8em] font-bold uppercase block mb-8 opacity-80">
                    Retail Excellence
                </span>
                <h2 className="text-white text-5xl md:text-[80px] font-display font-medium tracking-[0.2em] mb-12 drop-shadow-2xl">
                    VISIT US IN STORE
                </h2>
                
                <div className="flex justify-center">
                    <a 
                        href="#locations" 
                        className="bg-white text-black px-16 py-6 text-[12px] tracking-[0.5em] font-black uppercase transition-all duration-500 hover:bg-gold hover:text-white shadow-2xl active:scale-95"
                    >
                        FIND A SHOWROOM
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Storefront;
