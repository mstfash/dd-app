import { useState, useEffect, useRef, useContext } from 'react';
import {
  Calendar,
  ScrollText,
  Trophy,
  Castle as Whistle,
  Book,
  Users,
  MapPin,
  ChevronRight,
  Download,
  X,
} from 'lucide-react';
import { RegistrationContext } from '../contexts/RegistrationContext';
import { Sport } from '../types';

interface RuleSection {
  title: string;
  content: string[];
}

const termsAndConditions: RuleSection[] = [
  {
    title: '1. Introduction',
    content: [
      'Welcome to Zed Tournaments! By registering for and participating in any tournament on our platform, you agree to abide by the following Terms and Conditions. Please read these terms carefully before registering.',
    ],
  },
  {
    title: '2. Eligibility',
    content: [
      'Participants must meet the age requirements specified for each sport.',
      'By registering, participants confirm they are medically fit to compete in their chosen sport.',
      'Zed Tournaments reserves the right to verify eligibility and refuse entry if conditions are not met.',
    ],
  },
  {
    title: '3. Registration and Payments',
    content: [
      'All participants must register through the official Zed Tournaments website.',
      'Registration fees must be paid in full before participation is confirmed.',
      'Fees are non-refundable except in cases where Zed Tournaments cancels an event.',
    ],
  },
  {
    title: '4. Tournament Rules',
    content: [
      'Each sport (Football, Padel, Basketball, and Padbol) has its own set of rules and regulations.',
      'The official rulebook for each sport is considered an amendment to these Terms and Conditions.',
      'Players must adhere to the official rules outlined on the Zed Tournaments website.',
      'Failure to comply with the rules may result in disqualification.',
    ],
  },
  {
    title: '5. Code of Conduct',
    content: [
      'Participants must demonstrate sportsmanship and respect towards opponents, referees, and organizers.',
      'Any form of cheating, violence, or misconduct will lead to immediate disqualification.',
      'Decisions made by tournament officials are final and binding.',
    ],
  },
  {
    title: '6. Health and Safety',
    content: [
      'Participants are responsible for ensuring they are physically fit to compete.',
      'Zed Tournaments is not responsible for any injuries sustained during the event.',
      'Medical assistance will be available on-site, but participants are advised to have their own insurance.',
    ],
  },
  {
    title: '7. Liability Waiver',
    content: [
      'By registering, participants acknowledge the risks involved in competitive sports and waive any claims against Zed Tournaments, its organizers, sponsors, and partners for injuries, damages, or losses.',
      'Zed Tournaments is not responsible for lost or stolen items.',
    ],
  },
  {
    title: '8. Photography and Media Consent',
    content: [
      'By participating, players consent to being photographed or recorded for promotional and marketing purposes.',
      'By registering, you agree that you will provide your national ID for Zed Tournaments to use as identification for the tournament.',
      'Zed Tournaments reserves the right to use images, videos, and results for advertising.',
    ],
  },
  {
    title: '9. Cancellations and Rescheduling',
    content: [
      'Zed Tournaments reserves the right to reschedule or cancel events due to unforeseen circumstances.',
      'In case of cancellation, registered participants will receive a refund or be transferred to a future event.',
    ],
  },
  {
    title: '10. Amendments',
    content: [
      'Zed Tournaments reserves the right to amend these Terms and Conditions at any time.',
      'The official rulebook for each sport serves as an amendment to these Terms and Conditions.',
      'Participants will be notified of any significant changes.',
      'For any inquiries, please contact us at support@zedtournaments.com',
      'By registering, you agree to these Terms and Conditions and acknowledge that you have read and understood them fully.',
    ],
  },
];

const sportRules = {
  football: {
    title: 'Football Tournament Rules',
    description: '5-a-side football on premium turf with a massive prize pool!',
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    name: 'Football',
    fees: {
      men: '10,000 EGP',
      women: '6,000 EGP',
    },
    prizePool: '1.95M EGP',
    schedule: {
      days: 'March 7-21, 2025',
      time: '9:00 PM - 12:00 AM',
      format: 'Group stages followed by knockouts',
      details: [
        'Group matches: 7:00 PM - 10:00 PM',
        'Knockout matches: 10:30 PM - 1:00 AM',
        'Finals on March 9: 11:00 PM',
      ],
    },
    sections: [
      '6-a-side format with rolling substitutes',
      '20-minute matches (10 minutes per half)',
      'Group stage followed by knockout rounds',
      'Points system: Win (3), Draw (1), Loss (0)',
      'Yellow card: 2-minute suspension',
      'Red card: Match suspension',
    ],
  },
  padel: {
    title: 'Padel Tournament Rules',
    description: 'Padel tournament with 4 competitive divisions',
    icon: Trophy,
    name: 'Padel',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
    fees: {
      levelA: '1,500 EGP',
      levelB: '1,200 EGP',
      levelC: '1,100 EGP',
      levelD: '1,000 EGP',
    },
    prizePool: '705K EGP',
    schedule: {
      days: 'March 7-21, 2025',
      time: '9:00 PM - 12 AM',
      format: 'Group stages followed by knockouts',
      details: [
        'Level A & B: 8:00 PM - 11:00 PM',
        'Level C & D: 11:00 PM - 1:30 AM',
        'Finals on March 12: 10:00 PM',
      ],
    },
    sections: [
      'Doubles matches only',
      'Best of 3 sets format',
      'Tiebreak at 6-6 in all sets',
      'Round-robin group stage',
      'Level-based divisions (A, B, C, D)',
      'Official WPT rules apply',
    ],
  },
  basketball: {
    title: 'Basketball Tournament Rules',
    name: 'Basketball',
    description: 'Fast-paced 3x3 basketball',
    icon: Whistle,
    color: 'text-orange-500',
    bgColor: 'bg-orange-100',
    fees: {
      men: '1,500 EGP',
      women: '1,500 EGP',
    },
    prizePool: '545K EGP',
    schedule: {
      days: 'March 7-21, 2025',
      time: '9:00 PM - 12 AM',
      format: 'Group stages followed by knockouts',
      details: [
        'Pool games: 7:30 PM - 10:30 PM',
        'Elimination rounds: 10:30 PM - 12:30 AM',
        'Finals on March 15: 11:00 PM',
      ],
    },
    sections: [
      '3x3 format with one substitute',
      '10-minute games or first to 21 points',
      '1 point inside arc, 2 points outside',
      '12-second shot clock',
      'Continuous play on made baskets',
      'Win by 2 points rule',
    ],
  },
  padbol: {
    title: 'Padbol Tournament Rules',
    description: 'The exciting fusion sport with great prizes',
    icon: Book,
    name: 'Padbol',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-100',
    fees: {
      levelA: '750 EGP',
      levelB: '650 EGP',
      'levebA&B': '1,200 EGP',
    },
    prizePool: '150K EGP',
    schedule: {
      days: 'March 7-21, 2025',
      time: '9:00 PM - 12 AM',
      format: 'Group stages followed by knockouts',
      details: [
        'Winners bracket: 8:30 PM - 11:00 PM',
        'Losers bracket: 11:00 PM - 1:00 AM',
        'Finals on March 18: 10:30 PM',
      ],
    },
    sections: [
      '2 players per team',
      'Best of 3 sets format',
      'Sets played to 15 points',
      '2 serves per point',
      'Points can be scored by both teams',
      'Level-based divisions (A, B)',
    ],
  },
};

export default function Rules() {
  const [showTerms, setShowTerms] = useState(false);
  const [selectedSport, setSelectedSport] = useState<
    keyof typeof sportRules | null
  >(null);
  const { setSport } = useContext(RegistrationContext);

  const modalRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (showTerms) {
      document.body.style.overflow = 'hidden';
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      if (modalRef.current) {
        const viewportTop = window.scrollY + 100;
        modalRef.current.style.marginTop = `${viewportTop}px`;
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [showTerms]);

  const RuleBookLink = ({ sport }: { sport: string }) => (
    <a
      href={`/rule-book/${sport.toLowerCase()}.pdf`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm text-peach-400 hover:text-peach-300 transition-colors"
    >
      <Download className="w-4 h-4" />
      Download Rulebook
    </a>
  );

  const scrollToRegister = (sport: Sport) => {
    const registerSection = document.getElementById(`register`);

    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
      setSport(sport);
      setTimeout(() => {
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        registerSection.dispatchEvent(event);
      }, 800);
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="py-12 md:py-20 bg-sage-400 relative overflow-hidden scroll-mt-16"
        id="tournament-details"
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-squaretransform">
                <img src="/Stars-1.svg" />
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4 md:mb-6 text-peach-200 tracking-tight">
              Tournament Details
            </h2>
            <p className="text-peach-100 text-center max-w-2xl mx-auto mb-8 md:mb-16 text-sm md:text-base">
              Ensure fair play and maximum enjoyment for all participants by
              following our comprehensive tournament guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-16 relative z-10 max-w-6xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-peach-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-display font-semibold text-sage-600 mb-3">
                    Location
                  </h3>
                  <p className="text-sage-500 mb-4">
                    ZED Sports Complex, Sheikh Zayed City, Gate 3
                  </p>
                  <a
                    href="https://maps.app.goo.gl/bzTttDp4C2XP24Nk6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-peach-400 text-white rounded-lg hover:bg-peach-300 transition-colors text-sm"
                  >
                    <MapPin className="w-4 h-4" />
                    Map Location
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <Calendar className="w-6 h-6 text-peach-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-display font-semibold text-sage-600 mb-3">
                    Schedule
                  </h3>
                  <div className="space-y-2 text-sage-500">
                    <p>
                      Tournament runs{' '}
                      <span className="font-bold text-[17px]">
                        from March 7 to March 21 2025
                      </span>
                    </p>
                    <p>Daily Matches from 9PM to 12AM</p>
                    <p>Finals will be on March 21</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <ScrollText className="w-6 h-6 text-peach-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-display font-semibold text-sage-600 mb-3">
                    Terms & Conditions
                  </h3>
                  <p className="text-sage-500 mb-4">
                    Please review our comprehensive tournament terms and
                    conditions before registering.
                  </p>
                  <button
                    onClick={() => setShowTerms(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-peach-400 text-white rounded-lg hover:bg-peach-300 transition-colors text-sm"
                  >
                    <ScrollText className="w-4 h-4" />
                    View Terms
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-16 relative z-10">
            {Object.entries(sportRules).map(([sport, rules]) => {
              const Icon = rules.icon;
              return (
                <div
                  key={sport}
                  id={`sport-${sport.toLowerCase()}`}
                  className="flex flex-col bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() =>
                    setSelectedSport(sport as keyof typeof sportRules)
                  }
                >
                  <div className="flex-grow">
                    <div
                      className={`w-12 h-12 ${rules.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-6 h-6 ${rules.color}`} />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-3 text-sage-600">
                      {rules.title}
                    </h3>
                    <p className="text-sage-500 text-sm mb-4">
                      {rules.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-sage-500">
                          Registration Fees:
                        </span>
                      </div>
                      {Object.entries(rules.fees).map(([category, fee]) => (
                        <div
                          key={category}
                          className="flex items-center justify-between text-sm pl-2"
                        >
                          <span className="text-sage-400 capitalize">
                            {category.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="font-medium text-sage-600">
                            {fee}
                          </span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-sage-100">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-peach-400 font-medium">
                            Prize Pool:
                          </span>
                          <span className="font-bold text-peach-400">
                            {rules.prizePool}
                          </span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-sage-100">
                        <div className="flex items-center gap-2 text-sm text-sage-500 mb-1">
                          <Calendar className="w-4 h-4 text-peach-400" />
                          <span className="font-medium">Schedule:</span>
                        </div>
                        <div className="pl-6 space-y-1 text-sm text-sage-500">
                          <p>Days: {rules.schedule.days}</p>
                          <p>Time: {rules.schedule.time}</p>
                          <p>Format: {rules.schedule.format}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <RuleBookLink sport={sport} />
                    <button
                      onClick={() => scrollToRegister(rules.name)}
                      className="inline-flex items-center mt-4 gap-2 px-4 py-2 w-full justify-center font-bold bg-peach-400 text-white rounded-lg hover:bg-peach-300 transition-colors text-sm"
                    >
                      <ScrollText className="w-4 h-4" />
                      REGISTER NOW
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {showTerms && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex md:block p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowTerms(false);
          }}
          style={{ position: 'fixed' }}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-modal-appear !mx-auto md:my-0 md:m-0"
            style={{
              transform: 'translateZ(0)',
              maxHeight: window.innerWidth >= 768 ? '80vh' : '90vh',
            }}
          >
            <div className="sticky top-0 bg-white p-6 border-b border-sage-100 z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-display font-bold text-sage-600">
                  Terms & Conditions
                </h3>
                <button
                  onClick={() => setShowTerms(false)}
                  className="p-2 hover:bg-sage-50 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-sage-400" />
                </button>
              </div>
            </div>
            <div
              className="p-4 md:p-6 overflow-y-auto"
              style={{
                height:
                  window.innerWidth >= 768
                    ? 'calc(80vh - 100px)'
                    : 'calc(90vh - 100px)',
              }}
            >
              <div className="space-y-6">
                {termsAndConditions.map((section) => (
                  <div key={section.title}>
                    <h4 className="text-lg font-display font-semibold text-sage-600 mb-3">
                      {section.title}
                    </h4>
                    <ul className="space-y-2">
                      {section.content.map((item, index) => (
                        <li
                          key={index}
                          className="text-sage-500 flex items-start gap-2"
                        >
                          <ChevronRight className="w-4 h-4 text-peach-400 flex-shrink-0 mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
