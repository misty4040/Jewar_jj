import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import { ArrowRight } from 'lucide-react';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5001/api/products?category=${category}`);
      setProducts(response.data.length ? response.data : [
          { name: "Clash de Jewar Ring", material: "Rose gold, agate", image: "https://picsum.photos/seed/jewar1/800/1000" },
          { name: "Clash de Jewar Pendant", material: "Rose gold, diamonds", image: "https://picsum.photos/seed/jewar2/800/1000" },
          { name: "Clash de Jewar Earrings", material: "White gold, onyx", image: "https://picsum.photos/seed/jewar3/800/1000" },
          { name: "Clash de Jewar Band", material: "Yellow gold", image: "https://picsum.photos/seed/jewar4/800/1000" }
      ]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active', 'opacity-100', 'translate-y-0');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [products]);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen selection:bg-gold selection:text-white">
      {/* Cinematic Navigation */}
      <Navbar activeCategory={category} onCategoryChange={setCategory} />

      {/* Full-Page Cinematic Hero */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105 transition-transform duration-[20s] hover:scale-100">
            <img src="/assets/hero-jewar.jpg" alt="Jewar Luxury Campaign" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/30"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-10 flex flex-col items-start">
            <div className="max-w-4xl animate-slide-up">
                <span className="block uppercase tracking-[0.6em] text-[13px] mb-8 text-gold/80 font-bold">Flagship Store Exclusive</span>
                <h1 className="text-7xl md:text-[130px] font-display font-medium mb-12 leading-[0.85] tracking-tight">
                    Crafted in Gold, <br/>Designed for <br/><span className="italic font-display">Generations</span>
                </h1>
                <div className="flex gap-8 group">
                    <a href="#catalogue" className="relative overflow-hidden bg-white text-black px-14 py-6 text-[13px] tracking-[0.3em] font-bold uppercase transition-all duration-500 hover:bg-gold hover:text-white flex items-center gap-4 shadow-2xl">
                        Explore Collection
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </a>
                </div>
            </div>

            <div className="absolute bottom-20 right-20 hidden lg:flex bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-sm gap-10 max-w-lg reveal items-center group cursor-pointer transition-all hover:bg-white/10">
                <div className="w-28 h-36 bg-black/40 overflow-hidden shadow-2xl">
                    <img src="/assets/hero-jewar.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Featured Item" />
                </div>
                <div>
                   <span className="text-[11px] tracking-[0.4em] text-white/40 block mb-3 uppercase font-bold">Trending Piece</span>
                   <h3 className="text-3xl font-display mb-3 tracking-tight">Heritage Jhumkas</h3>
                   <span className="text-gold text-xl tracking-[0.2em] font-bold">INR 485,000.00</span>
                   <div className="mt-6 flex items-center gap-2 text-[11px] tracking-[0.4em] text-white/60 uppercase font-bold border-b border-white/10 pb-1 w-fit group-hover:border-gold transition-colors">
                       View Details <ArrowRight size={14} />
                   </div>
                </div>
            </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="bg-white text-black">
          {/* Catalogue Section Redesigned for Cartier Style */}
          <section id="catalogue" className="py-40 bg-white">
            <div className="max-w-[1800px] mx-auto px-8 lg:px-14">
                <div className="flex flex-col md:flex-row justify-between items-end mb-32 border-b border-black/5 pb-12">
                    <div className="max-w-2xl">
                        <span className="text-[12px] tracking-[0.6em] text-gold uppercase block mb-8 font-extrabold">The Jewar Selection</span>
                        <h2 className="text-6xl md:text-[90px] font-display leading-[0.95] font-medium tracking-tighter">Boutique <br/> Highlights</h2>
                    </div>
                    <div className="hidden md:block">
                        <a href="#all" className="text-[11px] tracking-[0.4em] font-bold uppercase border-b-2 border-black/20 pb-2 hover:border-gold transition-all duration-500">View All Pieces</a>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-24 gap-x-12">
                    {products.map((p, index) => (
                        <ProductCard key={p._id || index} product={p} index={index} />
                    ))}
                </div>
                
                {loading && (
                    <div className="flex flex-col items-center mt-32">
                        <div className="w-16 h-[1px] bg-gold/30 animate-pulse mb-6"></div>
                        <p className="text-[12px] tracking-[0.6em] text-gray-300 uppercase font-bold">Refining Collection</p>
                    </div>
                )}
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-48 bg-[#FAF9F6] border-t border-black/5 overflow-hidden">
            <div className="max-w-[1700px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">
                <div className="relative group overflow-hidden reveal shadow-2xl">
                    <img src="/assets/hero-jewar.jpg" alt="Jewar Story" className="w-full h-auto grayscale transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000"></div>
                </div>
                <div className="reveal" style={{transitionDelay: '0.3s'}}>
                    <span className="text-[12px] tracking-[0.6em] text-gold uppercase block mb-8 font-extrabold">Our Legacy</span>
                    <h2 className="text-7xl md:text-8xl font-display mb-14 leading-[1] tracking-tighter">The Spirit <br/> of Jewar</h2>
                    <div className="space-y-10 text-xl font-light text-gray-600 leading-relaxed text-left border-l-4 border-gold/20 pl-16">
                        <p>Established with a vision to redefine Indian luxury, Jewar stands as a testament to the timeless art of jewellery making.</p>
                        <p>Every piece is a dialogue between heritage and modernity, crafted to tell a story that transcends time.</p>
                    </div>
                    <div className="mt-20">
                        <a href="#contact" className="text-[13px] tracking-[0.4em] font-bold uppercase py-6 px-16 bg-black text-white hover:bg-gold transition-all duration-500 shadow-xl">Our Journey</a>
                    </div>
                </div>
            </div>
          </section>

          {/* Footer */}
          <footer id="contact" className="py-32 bg-black text-white overflow-hidden">
            <div className="max-w-[1700px] mx-auto px-10 flex flex-col items-center text-center">
                <h2 className="text-8xl md:text-[120px] font-display font-medium mb-20 tracking-tighter">Experience <br/> Jewar</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-24 w-full max-w-6xl mb-40 items-start text-white/50 uppercase text-[12px] tracking-[0.5em] font-black">
                    <div className="flex flex-col items-center group cursor-pointer">
                        <span className="text-white block mb-8 px-6 py-3 border border-white/20 group-hover:border-gold transition-all rounded-sm">Boutique</span>
                        <p className="mb-2">Hazaribag Main Road</p>
                        <p>Luxury Wing, Plaza III</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="font-display text-8xl text-white tracking-[0.4em] mb-4">jewar</h1>
                        <p className="text-[11px] text-gold font-black opacity-80">EST. 1984 — OFFICIAL</p>
                    </div>
                    <div className="flex flex-col items-center group cursor-pointer">
                        <span className="text-white block mb-8 px-6 py-3 border border-white/20 group-hover:border-gold transition-all rounded-sm">Connect</span>
                        <p className="mb-2">WhatsApp: +91 98765 43210</p>
                        <p>Instagram: @jewar.official</p>
                    </div>
                </div>
                <p className="text-[11px] text-white/20 tracking-[0.8em] uppercase font-bold">&copy; 2026 Jewar Jewellery — Excellence Defined.</p>
            </div>
          </footer>
      </div>
    </div>
  );
};

export default App;
