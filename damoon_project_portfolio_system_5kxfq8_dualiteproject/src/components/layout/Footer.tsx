import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Instagram, Linkedin, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 mt-auto font-vazir">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white font-bold text-xl">D</div>
                <h3 className="text-xl font-bold">Damon Service</h3>
            </div>
            <p className="text-gray-400 text-sm leading-7 mb-6 text-justify">
              شرکت دامون سرویس (تأسیس ۱۳۸۰)، پیشرو در ارائه راهکارهای نوین تهویه مطبوع و نماینده انحصاری برندهای برتر جهانی Mitsubishi Electric ژاپن و Climaveneta ایتالیا در ایران.
            </p>
            <div className="flex gap-4">
                <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"><Instagram size={16}/></a>
                <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"><Linkedin size={16}/></a>
                <a href="https://damonservice.com" target="_blank" rel="noreferrer" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"><Globe size={16}/></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-sky-400 text-lg">دسترسی سریع</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white hover:pr-2 transition-all">صفحه اصلی</Link></li>
              <li><Link to="/projects" className="hover:text-white hover:pr-2 transition-all">پروژه‌های اجرایی</Link></li>
              <li><Link to="/about" className="hover:text-white hover:pr-2 transition-all">درباره دامون سرویس</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:pr-2 transition-all">تماس با ما</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold mb-6 text-sky-400 text-lg">محصولات و خدمات</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>سیستم‌های VRF (Mitsubishi)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>چیلرهای تراکمی (Climaveneta)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>داکت اسپلیت و اسپلیت دیواری</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>تهویه دیتاسنتر (Precision Cooling)</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6 text-sky-400 text-lg">اطلاعات تماس</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                <span className="leading-6">تهران، سعادت‌آباد، میدان فرهنگ، نبش پیوند یک، ساختمان اداری سهند، واحد ۱۰</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-500 flex-shrink-0" />
                <span dir="ltr" className="font-mono text-base">+98 21 27668</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-500 flex-shrink-0" />
                <span className="font-mono">info@damonservice.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} شرکت دامون سرویس. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
};
