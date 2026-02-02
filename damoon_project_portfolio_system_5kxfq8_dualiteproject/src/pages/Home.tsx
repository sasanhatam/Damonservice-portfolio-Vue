import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Factory, Home as HomeIcon, Server, Landmark, CheckCircle2, Phone, Wind, ShieldCheck, Zap, Users, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

const categories = [
  { id: 'Residential', name: 'مسکونی', icon: HomeIcon, desc: 'خانه‌های لوکس و آپارتمان‌ها' },
  { id: 'Commercial', name: 'اداری / تجاری', icon: Building2, desc: 'برج‌های اداری و مراکز خرید' },
  { id: 'Industrial', name: 'صنعتی', icon: Factory, desc: 'کارخانجات و صنایع' },
  { id: 'ITCooling', name: 'مراکز داده', icon: Server, desc: 'اتاق‌های سرور و دیتاسنتر' },
  { id: 'Government', name: 'دولتی', icon: Landmark, desc: 'سازمان‌ها و ارگان‌ها' },
];

export const Home: React.FC = () => {
  return (
    <div className="font-vazir" dir="rtl">
      {/* Hero Section - CRITICAL LCP AREA */}
      {/* No content-visibility here, must render immediately */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Image - Optimized WebP */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=70&w=1920&fm=webp" 
            srcSet="
              https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=65&w=640&fm=webp 640w,
              https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=70&w=1200&fm=webp 1200w,
              https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=75&w=1920&fm=webp 1920w
            "
            sizes="100vw"
            alt="Comfortable Living Room with HVAC" 
            className="w-full h-full object-cover"
            // @ts-ignore
            fetchpriority="high"
            loading="eager"
            width="1920"
            height="1080"
            decoding="async"
          />
          {/* Soft Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/70 to-slate-900/30"></div>
        </div>
        
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-5xl ml-auto mr-0 md:mr-12">
            <div className="text-right">
              <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-sky-900/40 text-sky-200 text-sm font-bold mb-8 border border-sky-400/30 backdrop-blur-md">
                <Wind size={16} className="animate-pulse" />
                تأسیس ۱۳۸۰
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-2xl">
                آرامش، هوای مطبوع و <br className="hidden lg:block" />
                <span className="text-sky-300 relative inline-block">
                  کنترل هوشمند دما
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-sky-500/20 -z-10 rounded-full blur-sm"></span>
                </span>
              </h1>

              <div className="text-xl md:text-3xl font-bold text-sky-100 mb-10 leading-relaxed drop-shadow-lg max-w-4xl">
                با سیستم‌های تهویه مطبوع <span className="text-white border-b-2 border-sky-400/30 pb-1 mx-1">میتسوبیشی الکتریک</span> و <span className="text-white border-b-2 border-sky-400/30 pb-1 mx-1">کلیماونتا</span>
              </div>
              
              <p className="text-lg md:text-xl text-gray-200 mb-12 font-light leading-loose max-w-3xl drop-shadow-sm text-justify opacity-90">
                دامون سرویس، نماینده انحصاری سیستم‌های تهویه مطبوع <strong className="text-sky-200 font-bold">Mitsubishi Electric</strong> (میتسوبیشی الکتریک) ژاپن و <strong className="text-sky-200 font-bold">Climaveneta</strong> (کلیماونتا) ایتالیا در ایران، با ارائه راهکارهای پیشرفته VRF، چیلر و داکت اسپلیت، دمای ایده‌آل و کیفیت هوای سالم را در خانه، محل کار و پروژه‌های صنعتی شما تضمین می‌کند.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link to="/projects">
                      <Button size="lg" className="bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-2xl px-8 h-14 text-lg w-full sm:w-auto shadow-lg shadow-sky-900/30 transition-all hover:-translate-y-1 border-0">
                      مشاهده پروژه‌های اجراشده
                      <ArrowLeft size={20} className="mr-2" />
                      </Button>
                  </Link>
                  <Link to="/contact">
                      <Button variant="outline" size="lg" className="rounded-2xl px-8 h-14 text-lg border-2 border-white/30 text-white hover:bg-white/10 hover:border-white font-bold w-full sm:w-auto backdrop-blur-sm transition-all hover:-translate-y-1">
                          <Phone size={20} className="ml-2" />
                          مشاوره تخصصی تهویه مطبوع
                      </Button>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section - Defer Rendering */}
      <section className="py-12 bg-white border-b border-gray-100 content-auto">
        <div className="container mx-auto px-4">
            <p className="text-center text-gray-400 text-sm mb-8 font-medium">نماینده انحصاری و رسمی برترین برندهای جهانی</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-32 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="flex flex-col items-center group cursor-default">
                    <div className="text-3xl md:text-4xl font-black text-gray-700 flex items-center gap-3 tracking-tighter group-hover:text-red-600 transition-colors">
                        <span className="text-red-600 text-4xl md:text-5xl">♦</span> MITSUBISHI ELECTRIC
                    </div>
                </div>
                
                <div className="w-px h-16 bg-gray-200 hidden md:block"></div>

                <div className="flex flex-col items-center group cursor-default">
                    <div className="text-3xl md:text-4xl font-black text-gray-700 flex items-center gap-3 tracking-tighter group-hover:text-blue-600 transition-colors">
                        <span className="text-blue-600 text-4xl md:text-5xl">●</span> CLIMAVENETA
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Categories Section - Defer Rendering */}
      <section className="py-24 bg-slate-50 content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">حوزه‌های فعالیت</h2>
            <div className="w-20 h-1 bg-sky-400 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              راهکارهای تخصصی برای ایجاد آسایش در انواع فضاها
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={`/projects?category=${cat.id}`}
                  className="block group p-8 bg-white rounded-3xl hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-sky-100 h-full text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-sky-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  
                  <div className="w-16 h-16 bg-slate-50 text-slate-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-110">
                    <cat.icon size={32} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-sky-700 transition-colors">{cat.name}</h3>
                  <p className="text-sm text-slate-500 group-hover:text-slate-600 leading-relaxed">{cat.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section - Defer Rendering */}
      <section className="py-24 bg-white overflow-hidden content-auto">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                <div className="order-2 lg:order-1">
                    <div className="inline-block px-4 py-1 bg-sky-50 text-sky-700 rounded-full text-sm font-bold mb-4">چرا دامون سرویس؟</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 leading-tight">
                        چرا دامون سرویس را انتخاب کنیم؟
                    </h2>
                    <p className="text-xl text-sky-600 font-medium mb-8">
                        آسایش پایدار، تعهد ما به کیفیت هوا و آرامش شماست
                    </p>
                    <p className="text-slate-600 leading-loose mb-10 text-justify text-lg">
                        شرکت دامون سرویس با بیش از دو دهه تجربه تخصصی در حوزه سیستم‌های تهویه مطبوع، راهکارهایی مبتنی بر فناوری روز دنیا ارائه می‌دهد که هدف آن ایجاد هوایی سالم، دمایی پایدار و مصرف انرژی بهینه است. ما باور داریم کیفیت هوا مستقیماً بر کیفیت زندگی، بهره‌وری کاری و سلامت محیط اثرگذار است؛ به همین دلیل تمامی راهکارهای ما با استانداردهای جهانی و نیازهای واقعی پروژه‌های ایرانی طراحی و اجرا می‌شوند.
                    </p>
                    <ul className="space-y-6">
                        {[
                            {
                                title: 'نماینده انحصاری برندهای معتبر جهانی',
                                desc: 'ارائه سیستم‌های تهویه مطبوع میتسوبیشی الکتریک ژاپن و چیلرهای کلیماونتا ایتالیا با اصالت کالا و پشتیبانی رسمی.',
                                icon: ShieldCheck
                            },
                            {
                                title: 'سیستم‌های کم‌صدا و کم‌مصرف (Silent & Eco)',
                                desc: 'طراحی راهکارهایی با حداقل نویز صوتی و حداکثر راندمان انرژی برای فضاهای مسکونی، اداری و صنعتی.',
                                icon: Zap
                            },
                            {
                                title: 'خدمات پس از فروش و گارانتی معتبر',
                                desc: 'پشتیبانی فنی، تأمین قطعات و خدمات بلندمدت مطابق با الزامات پروژه‌های حرفه‌ای و سازمانی.',
                                icon: Users
                            },
                            {
                                title: 'مشاوره تخصصی پیش از خرید',
                                desc: 'تحلیل نیاز پروژه و پیشنهاد بهینه‌ترین سیستم تهویه مطبوع متناسب با متراژ، کاربری و شرایط اقلیمی.',
                                icon: PenTool
                            },
                            {
                                title: 'اجرای دقیق و مهندسی‌شده پروژه‌ها',
                                desc: 'اجرا توسط تیم‌های متخصص و آموزش‌دیده، مطابق با استانداردهای فنی بین‌المللی.',
                                icon: CheckCircle2
                            }
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4 text-slate-700 group">
                                <div className="mt-1 w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                    <item.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-sky-700 transition-colors">{item.title}</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-12">
                        <Link to="/about">
                            <Button variant="outline" size="lg" className="rounded-xl px-8 border-gray-300 text-gray-600 hover:text-sky-700 hover:border-sky-700">
                                درباره ما بیشتر بدانید
                            </Button>
                        </Link>
                    </div>
                </div>
                
                <div className="relative order-1 lg:order-2 h-full flex items-center">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-sky-200/40 to-slate-200/40 rounded-[2rem] transform rotate-3 blur-lg"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=75&w=800&fm=webp" 
                        alt="Modern Architecture and Engineering" 
                        className="relative rounded-[2rem] shadow-2xl w-full object-cover h-[800px] z-10"
                        loading="lazy"
                        width="800"
                        height="800"
                    />
                    {/* Floating Card */}
                    <div className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block animate-bounce-slow border border-gray-100">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
                                <Building2 size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">پروژه‌های موفق</p>
                                <p className="text-2xl font-bold text-slate-800">+۵۰۰</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400">رضایت مشتریان در سراسر کشور</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section - Defer Rendering */}
      <section className="py-24 bg-slate-800 relative overflow-hidden content-auto">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                مشاوره تخصصی رایگان تهویه مطبوع
            </h2>
            <p className="text-slate-300 mb-12 text-xl max-w-3xl mx-auto leading-relaxed">
                برای انتخاب مناسب‌ترین سیستم تهویه مطبوع متناسب با کاربری، متراژ و شرایط فضای خود، با کارشناسان دامون سرویس مشورت کنید. تیم فنی ما با بررسی دقیق نیاز پروژه، راهکاری بهینه برای دستیابی به دمای ایده‌آل و مصرف انرژی کنترل‌شده طراحی می‌کند.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/contact">
                    <Button size="lg" className="bg-sky-600 text-white hover:bg-sky-500 px-12 h-16 text-xl rounded-2xl shadow-xl shadow-sky-900/30 transform hover:-translate-y-1 transition-all font-bold border-0">
                        درخواست مشاوره تخصصی
                    </Button>
                </Link>
                <a href="tel:02127668">
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-12 h-16 text-xl rounded-2xl backdrop-blur-sm">
                        <Phone className="ml-3" />
                        تماس با کارشناسان دامون سرویس
                    </Button>
                </a>
            </div>
        </div>
      </section>
    </div>
  );
};
