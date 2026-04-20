import React from 'react';

const CollectionGallery = () => {
  const collections = [
    {
      title: "DAINTY DREAMS",
      subtitle: "SOFT MOMENTS, BEAUTIFULLY CRAFTED",
      image: "/assets/collection-dainty.png",
      link: "#dainty"
    },
    {
      title: "RAW REVERIE",
      subtitle: "BOLD STATEMENT PIECES",
      image: "/assets/collection-raw.png",
      link: "#raw"
    },
    {
      title: "CLAY WHISPERS",
      subtitle: "ARTISTIC GEOMETRIC FORMS",
      image: "/assets/collection-clay.png",
      link: "#clay"
    }
  ];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-14">
        {/* Section Header */}
        <div className="text-center mb-24 reveal">
          <span className="text-[11px] tracking-[0.6em] text-gold uppercase font-bold block mb-6">Discovery</span>
          <h2 className="text-5xl md:text-6xl font-display font-medium tracking-tight text-[#1a1a1a]">
            Browse Latest Jewellery Collections
          </h2>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {collections.map((col, i) => (
            <div 
              key={i} 
              className="group relative aspect-[4/5] overflow-hidden cursor-pointer reveal transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl" 
              style={{ transitionDelay: `${i * 0.2}s` }}
            >
              {/* Background Image */}
              <img 
                src={col.image} 
                alt={col.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              
              {/* Overlay with Text */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700 flex flex-col items-center justify-end pb-16 text-center px-10">
                <h3 className="text-white text-3xl md:text-4xl font-display font-bold tracking-[0.15em] mb-4 drop-shadow-lg">
                  {col.title}
                </h3>
                <p className="text-white/80 text-[10px] tracking-[0.3em] font-black uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                  {col.subtitle}
                </p>
                <div className="h-[1px] w-0 group-hover:w-16 bg-gold mt-6 transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bottom */}
        <div className="flex justify-center mt-24 reveal">
          <a 
            href="#collections" 
            className="text-[11px] tracking-[0.4em] font-bold uppercase py-6 px-16 bg-[#f9f9f9] text-black border border-black/5 hover:bg-gold hover:text-white transition-all duration-700 shadow-sm hover:shadow-xl"
          >
            Browse all Collections
          </a>
        </div>
      </div>
    </section>
  );
};

export default CollectionGallery;
