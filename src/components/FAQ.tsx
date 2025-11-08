import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Where is the tournament located?',
    answer: 'ZED ElSheikh Zayed Sports Complex Gate 3.',
    category: 'Schedule',
    icon: HelpCircle,
  },

  {
    question: 'What are the tournament dates?',
    answer:
      'The tournament runs throughout Ramadan, from March 7 to Match 21, 2025. Matches are scheduled daily from 9 PM to 12 AM to accommodate fasting players.',
    category: 'Schedule',
    icon: HelpCircle,
  },
  {
    question: 'How many players can I register in my team?',
    answer:
      'The number of players varies by sport: Football (6-8 players), Padel (2 players), Basketball (4-5 players), and Padbol (2 players).',
    category: 'Registration',
    icon: HelpCircle,
  },
  {
    question: 'What happens if a player gets injured?',
    answer: `Medical staff will be present at all playing fields, Teams can register substitute players before the tournament begins. During the tournament, injury replacements must be approved by the organizing committee.`,
    category: 'Rules',
    icon: HelpCircle,
  },
  {
    question: 'Is there an age restriction?',
    answer: 'Yes, each sport has its own restrictions.',
    category: 'Eligibility',
    icon: HelpCircle,
  },
  {
    question: "What's included in the registration fee?",
    answer:
      'Registration includes tournament participation, team kits, access to facilities, medical support, and eligibility for prize money.',
    category: 'Registration',
    icon: HelpCircle,
  },
  {
    question: 'How are winners determined?',
    answer: `Each sport follows a group stage followed by knockout rounds. for the pointing system refer to the sport's rule book.`,
    category: 'Rules',
    icon: HelpCircle,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="py-24 bg-gradient-to-b from-sage-50 to-white relative overflow-hidden"
      id="faq"
    >
      {/* Floating Circles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-multiply animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              background: `radial-gradient(circle at center, ${
                Math.random() > 0.5
                  ? 'rgba(232, 164, 79, 0.1)'
                  : 'rgba(107, 145, 123, 0.1)'
              }, transparent)`,
              animation: `float ${Math.random() * 10 + 20}s infinite`,
              animationDelay: `${Math.random() * -20}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-6 text-sage-800 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sage-600 text-center max-w-2xl mx-auto mb-16 text-lg">
          Find answers to common questions about the tournament, registration
          process, and rules.
        </p>

        <div className="space-y-4 relative">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 ease-in-out transform hover:shadow-lg ${
                openIndex === index
                  ? 'shadow-xl ring-1 ring-peach-400/50'
                  : 'shadow-md hover:translate-y-[-2px]'
              }`}
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center gap-4 transition-all duration-300"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div
                  className={`relative transition-all duration-500 ${
                    openIndex === index
                      ? 'text-peach-400 rotate-180'
                      : 'text-sage-400 group-hover:text-peach-400'
                  }`}
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </div>
                <span className="font-semibold text-sage-700 flex-grow">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <div className="w-8 h-8 rounded-full bg-peach-50 flex items-center justify-center">
                    <faq.icon className="w-4 h-4 text-peach-400" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-sage-50 flex items-center justify-center">
                    <faq.icon className="w-4 h-4 text-sage-400" />
                  </div>
                )}
              </button>

              <div
                className={`px-6 py-5 text-sage-700 border-t border-sage-100 transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? 'max-h-96 opacity-100 transform translate-y-0 bg-gradient-to-b from-transparent to-sage-50/20'
                    : 'max-h-0 opacity-0 transform -translate-y-4'
                }`}
              >
                <p className="leading-relaxed text-base">
                  {faq.answer}{' '}
                  {faq.question === 'Where is the tournament located?' ? (
                    <a
                      href="https://maps.app.goo.gl/bzTttDp4C2XP24Nk6"
                      target="_blank"
                      rel="noreferrer"
                      className="text-orange-400"
                    >
                      Map Location
                    </a>
                  ) : (
                    ''
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
