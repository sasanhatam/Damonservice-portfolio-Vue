import React from 'react';
import { Building, Award, Users, Globe, Factory } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-vazir" dir="rtl">
      {/* Header */}
      <div className="bg-primary-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">درباره دامون سرویس</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            بیش از دو دهه پیشرو در صنعت تهویه مطبوع ایران
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-12">
          <div className="prose prose-lg max-w-none text-gray-600 text-justify leading-loose">
            <p className="mb-6">
              <strong className="text-primary-900 text-xl block mb-2">معرفی شرکت</strong>
              شرکت <strong>دامون سرویس</strong> در سال ۱۳۸۰ تأسیس گردید و فعالیت تخصصی خود را در زمینه طراحی، تأمین، فروش، اجرا و خدمات پس از فروش پیشرفته‌ترین سیستم‌های تهویه مطبوع آغاز نمود. این شرکت با تمرکز بر فناوری‌های روز دنیا، راندمان بالا (High Efficiency)، کاهش مصرف انرژی و حفاظت از محیط زیست، همواره در تلاش بوده است تا راهکارهای نوین و پایداری را به صنعت ساختمان ایران ارائه دهد.
            </p>
            
            <div className="bg-primary-50 p-6 rounded-xl border border-primary-100 mb-8">
              <h3 className="text-lg font-bold text-primary-900 mb-4">نمایندگی‌های انحصاری و شرکای تجاری</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold text-xl mt-[-2px]">♦</span>
                  <div>
                    <strong>Mitsubishi Electric (ژاپن):</strong>
                    <p className="text-sm mt-1">نماینده انحصاری سیستم‌های VRF، داکت اسپلیت، اسپلیت دیواری و سیستم‌های کاستی.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl mt-[-2px]">●</span>
                  <div>
                    <strong>Climaveneta / MelcoHit (ایتالیا):</strong>
                    <p className="text-sm mt-1">نماینده انحصاری انواع چیلرهای تراکمی (هوا خنک و آب خنک)، چیلرهای سانتریفیوژ و سیستم‌های سرمایش دیتاسنتر (Precision).</p>
                  </div>
                </li>
              </ul>
            </div>

            <p className="mb-6">
              <strong className="text-primary-900 text-xl block mb-2">فعالیت‌های بین‌المللی و تولیدی</strong>
              دامون سرویس علاوه بر حضور قدرتمند در بازار ایران، به عنوان نماینده انحصاری برخی محصولات در کشورهای <strong>عمان و قطر</strong> نیز فعالیت دارد. همچنین این شرکت در راستای توسعه صنعت ملی، با مشارکت شرکت‌های معتبر خارجی، در زمینه تأسیس کارخانه تولید تجهیزات تهویه مطبوع اقدام نموده است.
            </p>

            <p>
              رویکرد ما ارائه سیستم‌های هوشمند و کم‌مصرف برای طیف وسیعی از پروژه‌ها شامل ساختمان‌های مسکونی لوکس، مجتمع‌های اداری و تجاری، صنایع سنگین، و مراکز داده (Data Centers) می‌باشد.
            </p>
          </div>
        </div>

        {/* Stats/Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Building, title: 'تأسیس ۱۳۸۰', desc: 'بیش از ۲۰ سال سابقه درخشان' },
            { icon: Award, title: 'نماینده انحصاری', desc: 'Mitsubishi Electric & Climaveneta' },
            { icon: Globe, title: 'فعالیت منطقه‌ای', desc: 'ایران، عمان و قطر' },
            { icon: Factory, title: 'تولید مشترک', desc: 'مشارکت در ساخت تجهیزات' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100 hover:border-primary-200 transition-colors group">
              <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <item.icon size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
