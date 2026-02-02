import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectService } from '../services/api';
import { Project } from '../types';
import { CATEGORY_LABELS, SYSTEM_LABELS, toPersianDigits } from '../utils/helpers';
import { ArrowRight, Download, Check, Building2, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (id) {
      projectService.getById(id).then(data => {
        setProject(data);
        setActiveImage(data.cover_image_url || '');
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-vazir">در حال بارگذاری...</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center font-vazir">پروژه یافت نشد</div>;

  const allImages = [project.cover_image_url, ...project.gallery_image_urls].filter(Boolean) as string[];
  const uniqueImages = [...new Set(allImages)]; // Remove duplicates if cover is also in gallery

  return (
    <div className="min-h-screen bg-white pb-20 font-vazir" dir="rtl">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-4 text-sm text-gray-500 flex items-center gap-2">
            <Link to="/projects" className="hover:text-primary-600">پروژه‌ها</Link>
            <span>/</span>
            <span className="text-gray-900">{project.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Link to="/projects" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-6">
            <ArrowRight size={16} className="ml-1"/> بازگشت به لیست
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery Section */}
            <div className="space-y-4">
                <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                    {activeImage ? (
                        <img src={activeImage} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">بدون تصویر</div>
                    )}
                </div>
                
                {/* Thumbnails - Only show if more than 1 image */}
                {uniqueImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {uniqueImages.map((url, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setActiveImage(url)}
                                className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${activeImage === url ? 'border-primary-500' : 'border-transparent'}`}
                            >
                                <img src={url} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Info Section */}
            <div>
                <div className="mb-6">
                    <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-bold mb-3">
                        {CATEGORY_LABELS[project.category]}
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
                    <p className="text-gray-600 leading-relaxed">{project.description || 'توضیحات تکمیلی برای این پروژه ثبت نشده است.'}</p>
                </div>

                {/* Specs Table */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Building2 size={20} className="text-gold-500"/>
                        مشخصات پروژه
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-500">کارفرما</span>
                            <span className="font-medium">{project.employer_name || '-'}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-500">محل اجرا</span>
                            <span className="font-medium">{project.city}، {project.province}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-500">سال اجرا</span>
                            <span className="font-medium">{toPersianDigits(project.year_completed)}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-500">نوع سیستم</span>
                            <span className="font-medium">{SYSTEM_LABELS[project.system_type]}</span>
                        </div>
                         <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-500">برند</span>
                            <span className="font-medium">{project.brand}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-500">ظرفیت</span>
                            <span className="font-medium">{project.capacity_summary || '-'}</span>
                        </div>
                    </div>
                </div>

                {/* Advantages */}
                {project.advantages && project.advantages.length > 0 && (
                    <div className="mb-8">
                         <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Zap size={20} className="text-gold-500"/>
                            مزایای سیستم اجرا شده
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {project.advantages.map((adv, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                    <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                    {adv}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Catalog Download */}
                {project.catalog_download_url && (
                    <a href={project.catalog_download_url} target="_blank" rel="noopener noreferrer" className="block">
                        <Button className="w-full" size="lg">
                            <Download className="ml-2 w-5 h-5" />
                            دانلود کاتالوگ فنی
                        </Button>
                    </a>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
