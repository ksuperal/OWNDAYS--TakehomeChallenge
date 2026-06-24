// Mock leaderboard data for work streak (consecutive days without leave)
export const MOCK_LEADERBOARD = [
  {
    id: '1',
    nameEN: 'Somchai W.',
    nameTH: 'สมชาย ว.',
    department: { en: 'Sales', th: 'ฝ่ายขาย' },
    streakDays: 28,
    avatar: '👨‍💼',
    badge: 'gold'
  },
  {
    id: '2',
    nameEN: 'Ploy S.',
    nameTH: 'พลอย ส.',
    department: { en: 'Marketing', th: 'ฝ่ายการตลาด' },
    streakDays: 26,
    avatar: '👩',
    badge: 'silver'
  },
  {
    id: '3',
    nameEN: 'Nat K.',
    nameTH: 'ณัฐ ก.',
    department: { en: 'Engineering', th: 'ฝ่ายวิศวกรรม' },
    streakDays: 24,
    avatar: '👨‍💻',
    badge: 'bronze'
  },
  {
    id: '4',
    nameEN: 'Apinya T.',
    nameTH: 'อภิญญา ท.',
    department: { en: 'HR', th: 'ฝ่ายทรัพยากรบุคคล' },
    streakDays: 22,
    avatar: '👩‍💼'
  },
  {
    id: '5',
    nameEN: 'Krit P.',
    nameTH: 'กฤต พ.',
    department: { en: 'Finance', th: 'ฝ่ายการเงิน' },
    streakDays: 20,
    avatar: '👨'
  },
  {
    id: '6',
    nameEN: 'Siriporn M.',
    nameTH: 'ศิริพร ม.',
    department: { en: 'Operations', th: 'ฝ่ายปฏิบัติการ' },
    streakDays: 19,
    avatar: '👩‍🔧'
  },
  {
    id: '7',
    nameEN: 'Pongsakorn L.',
    nameTH: 'พงศกร ล.',
    department: { en: 'IT Support', th: 'ฝ่ายสนับสนุนไอที' },
    streakDays: 18,
    avatar: '👨‍🔧'
  },
  {
    id: '8',
    nameEN: 'Nattaya S.',
    nameTH: 'ณัฐยา ส.',
    department: { en: 'Customer Service', th: 'ฝ่ายบริการลูกค้า' },
    streakDays: 17,
    avatar: '👩‍💼'
  },
  {
    id: '9',
    nameEN: 'Wichai B.',
    nameTH: 'วิชัย บ.',
    department: { en: 'Logistics', th: 'ฝ่ายโลจิสติกส์' },
    streakDays: 16,
    avatar: '👨‍✈️'
  },
  {
    id: '10',
    nameEN: 'Panida R.',
    nameTH: 'ปนิดา ร.',
    department: { en: 'Design', th: 'ฝ่ายออกแบบ' },
    streakDays: 15,
    avatar: '👩‍🎨'
  }
];

// Get current month name
export const getCurrentMonthName = (lang) => {
  const months = {
    en: ['January', 'February', 'March', 'April', 'May', 'June',
         'July', 'August', 'September', 'October', 'November', 'December'],
    th: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
         'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
  };

  const currentMonth = new Date().getMonth();
  return months[lang][currentMonth];
};
