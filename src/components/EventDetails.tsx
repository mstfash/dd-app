import { useState } from 'react';
import { Sparkles, Crown } from 'lucide-react';

export default function EventDetails() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const sportDetails = {
    football: {
      image:
        'https://i.postimg.cc/kXBD38tF/jason-charters-Iorqs-Mss-QH0-unsplash.jpg',
      pricing: {
        men: '10,000 EGP',
        women: '6,000 EGP',
        prizePool: '1.5M EGP',
      },
    },
    padel: {
      image:
        'https://i.postimg.cc/vBhDMtzX/tim-chow-rb-Gg2-Vl-Ilpg-unsplash.jpg',
      pricing: {
        levelA: '1,500 EGP',
        levelB: '1,200 EGP',
        levelC: '1,100 EGP',
        levelD: '1,000 EGP',
        prizePool: '525K EGP',
      },
    },
    basketball: {
      image: 'https://i.postimg.cc/05trBZry/pexels-cachi290-29889785.jpg',
      pricing: {
        men: '1,500 EGP',
        women: '1,500 EGP',
        prizePool: '400K EGP',
      },
    },
    padbol: {
      image:
        'https://i.postimg.cc/yxrd362Z/outdoors-mini-football-and-basketball-court-with-b-2023-11-27-05-12-07-utc.jpg',
      pricing: {
        levelA: '750 EGP',
        levelB: '650 EGP',
        combo: '1,200 EGP',
        prizePool: '175K EGP',
      },
    },
  };

  const scrollToSport = (sport: string) => {
    // First find the sport's card element in the tournament details section
    const sportCard = document.getElementById(`sport-${sport}`);

    if (sportCard) {
      // First scroll to the tournament details section
      sportCard.scrollIntoView({ behavior: 'smooth' });

      // After scrolling, trigger the click on the sport card to open it
      setTimeout(() => {
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        sportCard.dispatchEvent(event);
      }, 800); // Wait for scroll to complete
    }
  };

  return (
    <section className="py-20 bg-sage-50" id="details">
      <div className="container mx-auto px-4">
        <p className="text-2xl md:text-3xl text-sage-600 text-center max-w-3xl mx-auto mb-12 font-display">
          Enjoy the games, feel the thrill, and win big at ZED El Sheikh Zayed
          this Ramadan 🎉🏆
        </p>

        {/* Prize Pool Highlight */}
        <div className="max-w-4xl mx-auto mb-16 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-peach-400/20 to-sage-400/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500"></div>
          <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-peach-200 p-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-peach-400 via-sage-400 to-peach-400"></div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="w-8 h-8 text-peach-400" />
                <h3 className="text-2xl font-display font-semibold text-sage-600">
                  Grand Prize Pool
                </h3>
              </div>
              <div className="relative inline-block">
                <span className="text-4xl md:text-7xl font-display font-bold text-peach-400">
                  3.5 Million EGP
                </span>
                <Sparkles className="w-10 h-10 absolute -top-6 -right-8 text-peach-300 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto">
          {['Football', 'Padel', 'Basketball', 'Padbol'].map((sport) => (
            <div
              key={sport}
              className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group touch-manipulation ${
                selectedSport === sport.toLowerCase()
                  ? 'ring-2 ring-peach-400 scale-[1.02]'
                  : 'hover:scale-[1.02]'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-sage-600/90 to-sage-400/20 z-10 group-hover:from-sage-600/70 transition-opacity" />
              <img
                src={`${
                  sportDetails[sport.toLowerCase() as keyof typeof sportDetails]
                    .image
                }?auto=format&fit=crop&q=80&w=400&h=300`}
                alt={sport}
                className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 z-20 p-6 text-white">
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-peach-200 transition-colors">
                  {sport}
                </h3>
                <button
                  className="inline-flex items-center gap-2 bg-peach-400 hover:bg-peach-300 text-white px-6 py-2 rounded-full text-sm font-display transition-all transform hover:scale-105"
                  onClick={() => scrollToSport(sport.toLowerCase())}
                >
                  View More Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
