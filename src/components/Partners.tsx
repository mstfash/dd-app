import { useState } from 'react';

const partners = [
  {
    name: 'Juhayna',
    logo: 'https://i.postimg.cc/PL5XN04y/Company-logo-of-juhayna.png',
    type: 'Platinum Partner',
    description: 'Official Nutrition Partner',
  },
  {
    name: 'Ghabbour',
    logo: 'https://i.postimg.cc/QBYX7SY3/Ghabbour-Group-logo-svg.png',
    type: 'Gold Partner',
    description: 'Official Automotive Partner',
  },
];

export default function Partners() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4 opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <img src="/Stars-1.svg" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-sage-600 mb-4">
            Our Partners
          </h2>
          <div className="w-24 h-1 bg-peach-400 mx-auto mb-6 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-sage-100"
            >
              <div className="flex flex-col items-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-24 object-contain mb-6 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="text-center">
                  <span className="text-xs font-display text-peach-400 tracking-wider uppercase mb-2 block">
                    {partner.type}
                  </span>
                  <h3 className="text-xl font-display font-semibold text-sage-600 mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-sage-500 text-sm">{partner.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
