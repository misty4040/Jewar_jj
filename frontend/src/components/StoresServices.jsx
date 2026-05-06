import React from 'react';

const StoresServices = () => {
    const services = [
        {
            title: "OUR BOUTIQUE",
            description: "Step into our world of luxury. Experience our collections in person at our flagship locations.",
            cta: "VISIT OUR STORE",
            link: "#stores",
            image: "/assets/boutique.png"
        },
        {
            title: "PIERCING STUDIO",
            description: "Create your dream ear stack with expert styling and precision piercings in our serene, private studios.",
            cta: "BOOK AN APPOINTMENT",
            link: "#styling",
            image: "/assets/service-piercing.png"
        },
        {
            title: "COMPLIMENTARY CARE",
            description: "Lifetime professional cleaning and inspection to keep your Jewar pieces shimmering forever.",
            cta: "LEARN MORE",
            link: "#care",
            image: "/assets/service-care.png"
        }
    ];

    return (
        <section className="py-16 md:py-32 bg-white">
        <div className="max-w-[1700px] mx-auto px-6 md:px-8">
                {/* Header Section */}
            <div className="mb-12 md:mb-20 reveal">
                <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-black mb-6">
                    STORES & SERVICES
                </h2>
                <p className="text-lg text-gray-600 font-light max-w-2xl leading-relaxed">
                    Discover our thoughtfully designed boutiques and personalized artisanal services across India and abroad.
                </p>
            </div>

                {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
                    {services.map((service, i) => (
                        <div key={i} className="group reveal" style={{ transitionDelay: `${i * 0.2}s` }}>
                            {/* Image Container */}
                            <div className="aspect-[16/10] overflow-hidden bg-gray-100 mb-10 shadow-sm transition-shadow duration-700 group-hover:shadow-xl">
                                <img 
                                    src={service.image} 
                                    alt={service.title} 
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-xl font-sans font-black tracking-wide text-black mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed mb-8 pr-4">
                                    {service.description}
                                </p>
                                <a 
                                    href={service.link} 
                                    className="inline-block text-[11px] tracking-[0.3em] font-black uppercase text-black border-b-2 border-black pb-1 hover:text-gold hover:border-gold transition-all duration-300"
                                >
                                    {service.cta}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StoresServices;
