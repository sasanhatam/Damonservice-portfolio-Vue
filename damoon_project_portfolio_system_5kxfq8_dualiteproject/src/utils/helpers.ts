import { Category, SystemType } from '../types';

export const CATEGORY_LABELS: Record<Category, string> = {
  Residential: 'مسکونی (Residential)',
  Commercial: 'اداری / تجاری (Commercial)',
  Industrial: 'صنعتی / پروسس (Industrial)',
  ITCooling: 'IT Cooling / Data Center',
  Government: 'ارگان‌های دولتی (Government)',
};

export const SYSTEM_LABELS: Record<SystemType, string> = {
  Chiller: 'چیلر (Chiller)',
  VRF: 'سیستم VRF',
  DuctSplit: 'داکت اسپلیت (Duct Split)',
  LightSystems: 'سیستم‌های سبک (Light Systems)',
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fa-IR').format(price);
};

export const toPersianDigits = (n: number | string) => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n
    .toString()
    .replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
};
