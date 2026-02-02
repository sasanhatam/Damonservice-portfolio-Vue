import React from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-vazir" dir="rtl">
      <div className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">تماس با دامون سرویس</h1>
          <p className="text-gray-300">برای دریافت مشاوره فنی و فروش با ما در ارتباط باشید</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Info Cards */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">دفتر مرکزی</h3>
              <p className="text-sm text-gray-600 leading-6">
                تهران، سعادت‌آباد، میدان فرهنگ، نبش پیوند یک، ساختمان اداری سهند، واحد ۱۰
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <Phone size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">تلفن تماس</h3>
              <p className="text-lg font-mono text-gray-700" dir="ltr">+98 21 27668</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <Mail size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">پست الکترونیک</h3>
              <p className="text-sm font-mono text-gray-600">info@damonservice.com</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <Globe size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">وب‌سایت</h3>
              <a href="https://damonservice.com" target="_blank" rel="noreferrer" className="text-sm font-mono text-primary-600 hover:underline">
                www.damonservice.com
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div className="md:col-span-2 bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-full min-h-[400px]">
            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden group">
                {/* Placeholder for Map */}
                <div className="absolute inset-0 opacity-60 group-hover:opacity-40 transition-opacity">
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale" alt="Map Placeholder"/>
                </div>
                <div className="relative z-10 bg-white p-8 rounded-xl shadow-xl text-center max-w-xs">
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin size={24} />
                    </div>
                    <p className="font-bold text-gray-900 text-lg mb-1">موقعیت ما</p>
                    <p className="text-sm text-gray-500 mb-4">تهران، سعادت‌آباد، میدان فرهنگ</p>
                    <a 
                        href="https://www.google.com/maps/search/?api=1&query=Tehran+Saadat+Abad+Farhang+Square" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors w-full"
                    >
                        مسیریابی در گوگل مپ
                    </a>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
