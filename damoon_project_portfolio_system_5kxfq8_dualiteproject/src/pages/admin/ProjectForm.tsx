import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { projectService, catalogService } from '../../services/api';
import { Project, Catalog } from '../../types';
import { CATEGORY_LABELS, SYSTEM_LABELS } from '../../utils/helpers';
import { Button } from '../../components/ui/Button';
import { X, Upload, FileText, Star } from 'lucide-react';
import { toast } from 'react-toastify';

const initialForm: Partial<Project> = {
  title: '',
  category: 'Residential',
  system_type: 'VRF',
  brand: 'Mitsubishi Electric',
  employer_name: '',
  address_full: '',
  city: '',
  province: '',
  year_completed: 1403,
  capacity_summary: '',
  system_model: '',
  advantages: [],
  description: '',
  gallery_image_urls: [],
  priority: 0 // Default priority
};

export const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Project>>(initialForm);
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(false);
  const [advInput, setAdvInput] = useState('');
  
  // File states
  const [coverImage, setCoverImage] = useState<{file: File, preview: string} | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<{file: File, preview: string}[]>([]);

  useEffect(() => {
    loadCatalogs();
    if (id) {
      setLoading(true);
      projectService.getById(id).then(data => {
        setFormData(data);
        setLoading(false);
      }).catch(() => {
        toast.error('خطا در دریافت اطلاعات');
        navigate('/admin/dashboard');
      });
    }
  }, [id]);

  const loadCatalogs = async () => {
    try {
      const data = await catalogService.getAll();
      setCatalogs(data);
    } catch(e) {
      console.error("Failed to load catalogs", e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCatalogChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      setFormData(prev => ({ ...prev, catalog_file_id: '', catalog_download_url: '' }));
      return;
    }
    const cat = catalogs.find(c => c.id === selectedId);
    if (cat) {
      setFormData(prev => ({ 
        ...prev, 
        catalog_file_id: cat.file_id, 
        catalog_download_url: cat.download_url 
      }));
    }
  };

  const addAdvantage = () => {
    if (advInput.trim()) {
      setFormData(prev => ({
        ...prev,
        advantages: [...(prev.advantages || []), advInput.trim()]
      }));
      setAdvInput('');
    }
  };

  const removeAdvantage = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      advantages: prev.advantages?.filter((_, i) => i !== idx)
    }));
  };

  const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let projectId = id;
      
      if (id) {
        await projectService.update(id, formData);
        toast.success('اطلاعات پروژه بروز شد');
      } else {
        const res = await projectService.create(formData);
        projectId = res.id;
        toast.success('پروژه ایجاد شد');
      }

      if (coverImage || galleryFiles.length > 0) {
        const filesToUpload = [];
        if (coverImage) {
            const b64 = await toBase64(coverImage.file);
            filesToUpload.push({ 
                name: `cover_${coverImage.file.name}`, 
                type: coverImage.file.type, 
                base64: b64.split(',')[1]
            });
        }
        for (const gf of galleryFiles) {
            const b64 = await toBase64(gf.file);
            filesToUpload.push({
                name: gf.file.name,
                type: gf.file.type,
                base64: b64.split(',')[1]
            });
        }
        
        if (filesToUpload.length > 0 && projectId) {
            toast.info('در حال آپلود تصاویر...');
            await projectService.uploadImages(projectId, filesToUpload);
            toast.success('تصاویر آپلود شدند');
        }
      }

      navigate('/admin/dashboard');

    } catch (error) {
      console.error(error);
      toast.error('خطا در ذخیره سازی');
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps: getCoverProps, getInputProps: getCoverInput } = useDropzone({
    accept: {'image/*': []},
    maxFiles: 1,
    onDrop: acceptedFiles => {
        setCoverImage({
            file: acceptedFiles[0],
            preview: URL.createObjectURL(acceptedFiles[0])
        });
    }
  });

  const { getRootProps: getGalleryProps, getInputProps: getGalleryInput } = useDropzone({
    accept: {'image/*': []},
    onDrop: acceptedFiles => {
        const newFiles = acceptedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setGalleryFiles(prev => [...prev, ...newFiles]);
    }
  });

  // Find current catalog ID based on file_id to set select value
  const currentCatalogId = catalogs.find(c => c.file_id === formData.catalog_file_id)?.id || '';

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-vazir" dir="rtl">
      <div className="bg-white border-b mb-8">
        <div className="container mx-auto px-4 h-16 flex items-center">
            <h1 className="font-bold text-lg">{id ? 'ویرایش پروژه' : 'پروژه جدید'}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
                <h2 className="font-bold border-b pb-2">اطلاعات پایه و اولویت</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">عنوان پروژه *</label>
                        <input name="title" value={formData.title} onChange={handleChange} required className="w-full border rounded-lg p-2" />
                    </div>
                    
                    {/* Priority Field */}
                    <div className="col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <label className="block text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
                        <Star size={16} className="fill-blue-600 text-blue-600"/>
                        اولویت نمایش (عدد بالاتر = نمایش بالاتر)
                      </label>
                      <div className="flex items-center gap-4">
                        <input 
                          type="number" 
                          name="priority" 
                          value={formData.priority} 
                          onChange={handleChange} 
                          className="w-32 border rounded-lg p-2 text-center font-bold text-lg" 
                        />
                        <span className="text-xs text-gray-500">
                          مثال: ۱۰۰ (خیلی مهم)، ۵۰ (معمولی)، ۰ (پایین). پروژه‌های با عدد بالاتر در ابتدای لیست‌ها نمایش داده می‌شوند.
                        </span>
                      </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">دسته‌بندی *</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full border rounded-lg p-2">
                            {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">نوع سیستم *</label>
                        <select name="system_type" value={formData.system_type} onChange={handleChange} className="w-full border rounded-lg p-2">
                            {Object.entries(SYSTEM_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1">استان</label>
                        <input name="province" value={formData.province} onChange={handleChange} className="w-full border rounded-lg p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">شهر *</label>
                        <input name="city" value={formData.city} onChange={handleChange} required className="w-full border rounded-lg p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">سال اجرا</label>
                        <input type="number" name="year_completed" value={formData.year_completed} onChange={handleChange} className="w-full border rounded-lg p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">کارفرما</label>
                        <input name="employer_name" value={formData.employer_name} onChange={handleChange} className="w-full border rounded-lg p-2" />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
                <h2 className="font-bold border-b pb-2">اطلاعات فنی</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">برند</label>
                        <input name="brand" value={formData.brand} onChange={handleChange} className="w-full border rounded-lg p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">ظرفیت (خلاصه)</label>
                        <input name="capacity_summary" value={formData.capacity_summary} onChange={handleChange} placeholder="مثال: 120HP" className="w-full border rounded-lg p-2" />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">توضیحات تکمیلی</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full border rounded-lg p-2" />
                    </div>
                    
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">مزایا (Enter بزنید)</label>
                        <div className="flex gap-2 mb-2">
                            <input 
                                value={advInput} 
                                onChange={e => setAdvInput(e.target.value)} 
                                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addAdvantage())}
                                className="flex-1 border rounded-lg p-2" 
                                placeholder="مثال: مصرف انرژی پایین"
                            />
                            <Button type="button" onClick={addAdvantage} variant="secondary">افزودن</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.advantages?.map((adv, idx) => (
                                <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                    {adv}
                                    <button type="button" onClick={() => removeAdvantage(idx)} className="text-red-500 hover:text-red-700"><X size={14}/></button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
                <h2 className="font-bold border-b pb-2">تصاویر و فایل‌ها</h2>
                
                {/* Cover Image */}
                <div>
                    <label className="block text-sm font-medium mb-2">تصویر کاور (اصلی)</label>
                    <div {...getCoverProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <input {...getCoverInput()} />
                        {coverImage ? (
                            <div className="relative w-full h-48">
                                <img src={coverImage.preview} className="w-full h-full object-contain" />
                                <button 
                                    type="button"
                                    onClick={(e) => {e.stopPropagation(); setCoverImage(null);}} 
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                >
                                    <X size={16}/>
                                </button>
                            </div>
                        ) : formData.cover_image_url ? (
                             <div className="relative w-full h-48">
                                <img src={formData.cover_image_url} className="w-full h-full object-contain opacity-50" />
                                <p className="text-sm text-gray-500 mt-2">برای تغییر تصویر کلیک کنید</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-400">
                                <Upload size={32} className="mb-2"/>
                                <p>برای آپلود کلیک کنید یا فایل را بکشید</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Gallery Images */}
                <div>
                    <label className="block text-sm font-medium mb-2">گالری تصاویر (چندگانه)</label>
                    <div {...getGalleryProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors mb-4">
                        <input {...getGalleryInput()} />
                        <p className="text-sm text-gray-500">افزودن تصاویر بیشتر...</p>
                    </div>
                    
                    {/* Preview New Files */}
                    {galleryFiles.length > 0 && (
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {galleryFiles.map((file, idx) => (
                                <div key={idx} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                    <img src={file.preview} className="w-full h-full object-cover"/>
                                    <button type="button" onClick={() => setGalleryFiles(prev => prev.filter((_, i) => i !== idx))} className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full"><X size={12}/></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Catalog Selection */}
                <div>
                    <label className="block text-sm font-medium mb-2">انتخاب کاتالوگ</label>
                    <select 
                        value={currentCatalogId} 
                        onChange={handleCatalogChange}
                        className="w-full border rounded-lg p-2"
                    >
                        <option value="">-- بدون کاتالوگ --</option>
                        {catalogs.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                        برای افزودن کاتالوگ جدید، به بخش <a href="/admin/catalogs" target="_blank" className="text-blue-600 hover:underline">مدیریت کاتالوگ‌ها</a> بروید.
                    </p>
                    {formData.catalog_download_url && (
                        <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                            <FileText size={14}/> کاتالوگ انتخاب شده
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/dashboard')}>انصراف</Button>
                <Button type="submit" isLoading={loading}>ذخیره تغییرات</Button>
            </div>
        </form>
      </div>
    </div>
  );
};
