import React from 'react';
import { useFetch } from '../lib/useFetch';
import { resolveImage } from '../lib/api';

const StoresServices = () => {
    const { data: services } = useFetch('/api/services', []);
    const list = services || [];

    return (
        <section className="py-16 md:py-32 bg-white">
            <div className="max-w-[1700px] mx-auto px-6 md:px-8">
                <div className="mb-12 md:mb-20 reveal">
                    <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-black mb-6">
                        STORES & SERVICES
                    </h2>
                    <p className="text-lg text-gray-600 font-light max-w-2xl leading-relaxed">
                        Discover our thoughtfully designed boutiques and personalized artisanal services across India and abroad.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
                    {list.map((service, i) => (
                        <div key={service._id || i} className="group reveal" style={{ transitionDelay: `${i * 0.2}s` }}>
                            <div className="aspect-[16/10] overflow-hidden bg-gray-100 mb-10 shadow-sm transition-shadow duration-700 group-hover:shadow-xl">
                                <img
                                    src={resolveImage(service.image)}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                                />
                            </div>

                            <div>
                                <h3 className="text-xl font-sans font-black tracking-wide text-black mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed mb-8 pr-4">
                                    {service.description}
                                </p>
                                {service.cta && (
                                    <a
                                        href={service.link || '#'}
                                        className="inline-block text-[11px] tracking-[0.3em] font-black uppercase text-black border-b-2 border-black pb-1 hover:text-gold hover:border-gold transition-all duration-300"
                                    >
                                        {service.cta}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StoresServices;
