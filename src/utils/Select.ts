export const mascot = [
  'Lions',
  'Tigers',
  'Wolves',
  'Cobras',
  'Hawks',
  'Eagles',
  'Jaguars',
  'Bulls',
  'Panthers',
  'Sharks',
  'Gorillas',
];

export const kitSize = [
  'Small',
  'Medium',
  'Large',
  'XLarge',
  'XXLarge',
  'XXXLarge',
];

export const KnowsUsFrom = ['Social Media', 'WhatsApp', 'Other'];

export const preferredFoot = ['Left', 'Right', 'Both'];

export const skills = [
  'Pace',
  'Finishing',
  'Crossing',
  'Dribbling',
  'Stamina',
  'Tackling',
  'Reflexes (GK)',
  'Diving (GK)',
];

export const ability = ['Beginner', 'Intermediate', 'Advanced'];

export const position = [
  'GK',
  'SW',
  'CB',
  'RB',
  'RWB',
  'LB',
  'CDM',
  'CM',
  'RM',
  'LM',
  'LW',
  'RW',
  'CF',
  'ST',
  'LWB',
];

export const hometown = [
  'Alexandria',
  'Maadi',
  'Zamalek',
  'Downtown',
  'Dokki',
  'Mohandessin',
  '6th Of October',
  'Heliopolis',
  'Nasr City',
  'New Cairo',
  'Rehab',
  'Mokattam',
  'Sherouk',
  'Obour',
];

export const sportTypes = ['Handball']; //'Handball', 'Football', 'Padel', 'Basketball', 'Volleyball', 'Tennis'

export const paymentPlan = {
  half: 'Half Season',
  full: 'Full Season',
  'free-agent': 'Free Agent',
};

export const returnStatistics = (locale: 'en' | 'ar' = 'en') => {
  const statisticsArr = [
    {
      en: 'Ball Possession',
      ar: 'امتلاك الكرة',
    },
    {
      en: 'Goal Attempts',
      ar: 'محاولات التهديف',
    },
    {
      en: 'Shots on Goal',
      ar: 'تسديدات على المرمى',
    },
    {
      en: 'Shots off Goal',
      ar: 'تسديدات خارج المرمى',
    },
    {
      en: 'Blocked Shots',
      ar: 'تسديدات غير ناجحة',
    },
    {
      en: 'Free Kicks',
      ar: 'الركلات الحرة',
    },
    {
      en: 'Corner Kicks',
      ar: 'الركلات الجانبية',
    },
    {
      en: 'Offsides',
      ar: 'تسلل',
    },
    {
      en: 'Goalkeeper Saves',
      ar: 'إنقاذ من حارس المرمي',
    },
    {
      en: 'Fouls',
      ar: 'الأخطاء',
    },
    {
      en: 'Yellow Cards',
      ar: 'بطاقات صفراء',
    },
    {
      en: 'Red Cards',
      ar: 'بطاقات حمراء',
    },
    {
      en: 'Total Passes',
      ar: 'إجمالي التمريرات',
    },
    {
      en: 'Tackles',
      ar: 'إعتراض الكرة',
    },
    {
      en: 'Attacks',
      ar: 'الهجمات',
    },
    {
      en: 'Dangerous Attacks',
      ar: 'هجمات خطيرة',
    },
    {
      en: 'Completed Passes',
      ar: 'التمريرات المكتملة',
    },
    {
      en: 'Throw-in',
      ar: 'رمية جانبية',
    },
  ];
  return statisticsArr.filter((x) => x[locale]);
};

export const formations = [
  '4-3-3',
  '4-3-2-1',
  '4-4-2',
  '4-5-1',
  '3-5-2',
  '3-4-3',
  '5-3-2',
  '4-2-2-2',
  '4-2-3-1',
];

export const DellComps = [
  'Football',
  'Volley',
  'Padel',
  'Fitness',
  'Dodgeball Men',
  'Dodgeball Women',
  'Pingpong',
  'Backgammon',
  'Chess',
  'Basketball Men',
  'Basketball Women',
  'Baby Foot',
];

export const sports = {
  football: [
    'Dribbling',
    'Passing',
    'Shooting',
    'Defending',
    'Ball Control',
    'Tactical Awareness',
    'Stamina',
    'Agility',
  ],
  basketball: [
    'Dribbling',
    'Passing',
    'Shooting',
    'Defending',
    'Rebounding',
    'Tactical Awareness',
    'Stamina',
    'Agility',
  ],
  handball: [
    'Throwing',
    'Catching',
    'Dribbling',
    'Defending',
    'Shooting',
    'Tactical Awareness',
    'Stamina',
    'Agility',
  ],
  volleyball: [
    'Serving',
    'Passing',
    'Setting',
    'Spiking',
    'Blocking',
    'Digging',
    'Agility',
    'Team Coordination',
  ],
  tennis: [
    'Serving',
    'Forehand',
    'Backhand',
    'Volleying',
    'Footwork',
    'Stamina',
    'Agility',
    'Tactical Awareness',
  ],
};
