import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'خانه' },
    { path: '/projects', label: 'پروژه‌ها' },
    { path: '/about', label: 'درباره ما' },
    { path: '/contact', label: 'تماس با ما' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100 font-vazir">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-primary-900 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:bg-primary-800 transition-colors">
            D
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-primary-900 tracking-tight group-hover:text-primary-700 transition-colors">Damon Service</h1>
            <span className="text-[10px] text-gray-500 font-medium">نمایندگی انحصاری Mitsubishi Electric و Climaveneta</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive(link.path) 
                  ? "text-primary-900 bg-primary-50" 
                  : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
            <Link to="/admin/login" className="text-xs text-gray-400 hover:text-primary-600 flex items-center gap-1 px-3 py-1.5 rounded-full border border-transparent hover:border-gray-200 transition-all">
                <ShieldCheck size={14} />
                <span>پورتال پرسنل</span>
            </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 flex flex-col gap-2 shadow-lg absolute w-full">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={clsx(
                "p-3 rounded-lg text-sm font-medium transition-colors",
                isActive(link.path)
                  ? "bg-primary-50 text-primary-900"
                  : "text-gray-600 hover:bg-gray-50"
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 my-2"></div>
          <Link to="/admin/login" className="text-gray-400 p-3 text-sm flex items-center gap-2 hover:text-primary-600" onClick={() => setIsOpen(false)}>
            <ShieldCheck size={16} />
            ورود ادمین
          </Link>
        </div>
      )}
    </header>
  );
};
