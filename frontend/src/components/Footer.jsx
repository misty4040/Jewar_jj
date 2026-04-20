import React from 'react';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Star,
  ShieldCheck,
  RotateCcw,
  Gem,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react';

const Instagram = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Facebook = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);
import JewarLogo from './JewarLogo';

const Footer = () => {
  return (
    <footer className="bg-white text-[#1a1a1a] pt-24 pb-12 font-sans border-t border-gray-100">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-14">
        
        {/* Section 1: Reviews / Trust Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-24 border-b border-gray-100">
          {[
            { name: "Aarav S.", text: "Exceptional craftsmanship. The heritage collection at Jewar is truly one of a kind.", rating: 5 },
            { name: "Priya M.", text: "Bought our wedding bands here. The service was impeccable and the quality is stunning.", rating: 5 },
            { name: "Vikram R.", text: "The custom design process was so smooth. They brought my vision to life perfectly.", rating: 5 },
            { name: "Ananya K.", text: "Jewar has been our family's trusted jeweller for decades. Never fails to impress.", rating: 5 }
          ].map((review, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#A67C00" color="#A67C00" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-gray-600 italic">"{review.text}"</p>
              <p className="text-xs font-bold tracking-widest text-[#1a1a1a] uppercase">— {review.name}</p>
            </div>
          ))}
        </div>

        {/* Section 2: Main Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20 py-24">
          
          {/* Column 1: Customer Care */}
          <div>
            <h4 className="text-[13px] font-black tracking-[0.3em] uppercase mb-10 text-[#1a1a1a]">Customer Care</h4>
            <div className="flex flex-col gap-6">
              <a href="#" className="flex items-center gap-4 text-sm text-gray-600 hover:text-gold transition-colors group">
                <MessageCircle size={18} className="text-gray-400 group-hover:text-gold" />
                Live Chat
              </a>
              <a href="#" className="flex items-center gap-4 text-sm text-gray-600 hover:text-gold transition-colors group">
                <Phone size={18} className="text-gray-400 group-hover:text-gold" />
                +91 98765 43210
              </a>
              <a href="#" className="flex items-center gap-4 text-sm text-gray-600 hover:text-gold transition-colors group">
                <Mail size={18} className="text-gray-400 group-hover:text-gold" />
                concierge@jewar.com
              </a>
              <div className="flex flex-col gap-4 mt-4">
                {['Contact Us', 'FAQ', 'Returns', 'Track Order'].map(item => (
                  <a key={item} href="#" className="text-sm text-gray-600 hover:text-gold transition-colors">{item}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Why Jewar */}
          <div>
            <h4 className="text-[13px] font-black tracking-[0.3em] uppercase mb-10 text-[#1a1a1a]">Why Jewar</h4>
            <div className="flex flex-col gap-5">
              {[
                { label: '30-Day Return Policy', icon: RotateCcw },
                { label: 'Certified Diamonds', icon: ShieldCheck },
                { label: 'Lifetime Warranty', icon: Clock },
                { label: 'Bespoke Design Service', icon: Gem },
                { label: 'Complimentary Shipping', icon: MapPin },
                { label: 'Jewellery Insurance', icon: ShieldCheck }
              ].map((item, i) => (
                <a key={i} href="#" className="flex items-center justify-between text-sm text-gray-600 hover:text-gold transition-colors group">
                  {item.label}
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: About Jewar */}
          <div>
            <h4 className="text-[13px] font-black tracking-[0.3em] uppercase mb-10 text-[#1a1a1a]">About Jewar</h4>
            <div className="flex flex-col gap-5 text-sm text-gray-600">
              {['Our Heritage', 'Quality & Craftsmanship', 'Sustainability', 'Jewar Blog', 'Boutique Locations', 'Careers', 'Affiliate Program'].map(item => (
                <a key={item} href="#" className="hover:text-gold transition-colors">{item}</a>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter & Community */}
          <div className="flex flex-col">
            <h4 className="text-[13px] font-black tracking-[0.3em] uppercase mb-10 text-[#1a1a1a]">Join the Collection</h4>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Experience the latest curated arrivals and exclusive boutique events.
            </p>
            <form className="flex mb-10">
              <input 
                type="email" 
                placeholder="Email Address"
                className="flex-grow bg-transparent border-b border-gray-200 py-3 text-sm focus:border-gold outline-none transition-colors"
              />
              <button className="border-b border-gray-200 py-3 px-6 text-[11px] font-black tracking-[0.3em] uppercase hover:text-gold hover:border-gold transition-all">
                JOIN
              </button>
            </form>
            <p className="text-[10px] text-gray-400 mb-12 uppercase tracking-widest leading-loose">
              By subscribing, you agree to our <a href="#" className="underline">Privacy Policy</a>.
            </p>
            
            <div className="flex gap-8 mt-auto">
              <a href="#" className="flex items-center gap-2 text-[11px] font-black tracking-[0.3em] uppercase text-gray-400 hover:text-gold transition-colors">
                <Facebook size={18} /> Facebook
              </a>
              <a href="#" className="flex items-center gap-2 text-[11px] font-black tracking-[0.3em] uppercase text-gray-400 hover:text-gold transition-colors">
                <Instagram size={18} /> Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Section 3: Legal Bar */}
        <div className="pt-20 border-t border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <JewarLogo className="scale-75 origin-left" showSubtext={false} color="#000000" />
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">
              © 2026 Jewar Jewellery. All Rights Reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {['Terms & Conditions', 'Privacy Policy', 'Site Map', 'Accessibility', 'Cookie Settings'].map(item => (
              <a key={item} href="#" className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-black hover:text-gold transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
