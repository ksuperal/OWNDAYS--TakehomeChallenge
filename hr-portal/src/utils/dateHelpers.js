import { MON_EN, MON_TH } from '../data/translations';

export const TODAY = '2026-06-23';

export const formatDate = (iso, isThaiLang) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  if (isThaiLang) {
    return `${d} ${MON_TH[m - 1]} ${y + 543}`;
  }
  return `${d} ${MON_EN[m - 1]} ${y}`;
};

export const daysBetween = (startISO, endISO) => {
  const da = new Date(startISO);
  const db = new Date(endISO);
  return Math.round((db - da) / 86400000) + 1;
};

export const getDurationString = (days, t) => {
  return `${days} ${days === 1 ? t.day_word : t.days_word}`;
};

export const generateReference = (prefix = 'LV') => {
  const d = new Date(TODAY);
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = String(Math.floor(Math.random() * 900) + 100);
  return `${prefix}-${stamp}-${rand}`;
};
