import React, { useEffect, useState } from 'react';
import { catalogService } from '../../services/api';
import { Catalog } from '../../types';
import { Button } from '../../components/ui/Button';
import { Trash2, FileText, Upload, X, Download } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const CatalogManager = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    loadCatalogs();
  }, []);

  const loadCatalogs = async () => {
    try {
      const data = await catalogService.getAll();
      setCatalogs(data);
    } catch (error) {
      console.error(error);
      toast.error('خطا در دریافت لیست کاتالوگ‌ها');
    } finally {
      setLoading(false);
    }
  };

  const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      const b64 = await toBase64(selectedFile);
      await catalogService.upload({
        name: selectedFile.name,
        type: selectedFile.type,
        base64: b64.split(',')[1]
      });
      toast.success('کاتالوگ با موفقیت آپلود شد');
      setSelectedFile(null);
      loadCatalogs();
    } catch (error) {
      console.error(error);
      toast.error('خطا در آپلود');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('آیا از حذف این کاتالوگ اطمینان دارید؟')) return;
    try {
      await catalogService.delete(id);
      toast.success('کاتالوگ حذف شد');
      loadCatalogs();
    } catch (error) {
      toast.error('خطا در حذف');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-vazir" dir="rtl">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-bold text-lg text-primary-900">مدیریت کاتالوگ‌ها</h1>
          <Link to="/admin/dashboard">
            <Button variant="ghost">بازگشت به داشبورد</Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <Upload size={20} className="text-primary-600"/>
            آپلود کاتالوگ جدید
          </h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <input 
                type="file" 
                accept="application/pdf"
                onChange={e => e.target.files && setSelectedFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:ml-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
            </div>
            <Button onClick={handleUpload} disabled={!selectedFile || uploading} isLoading={uploading}>
              آپلود فایل
            </Button>
          </div>
          {selectedFile && (
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <FileText size={12}/> {selectedFile.name}
            </p>
          )}
        </div>

        {/* List Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 text-gray-500 text-sm">
                <tr>
                  <th className="p-4">نام فایل</th>
                  <th className="p-4">تاریخ آپلود</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                   <tr><td colSpan={3} className="p-4 text-center">در حال بارگذاری...</td></tr>
                ) : catalogs.length === 0 ? (
                   <tr><td colSpan={3} className="p-4 text-center text-gray-500">هیچ کاتالوگی یافت نشد</td></tr>
                ) : (
                  catalogs.map(cat => (
                    <tr key={cat.id} className="hover:bg-gray-50">
                      <td className="p-4 font-medium flex items-center gap-2">
                        <FileText size={16} className="text-red-500"/>
                        {cat.name}
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(cat.created_at).toLocaleDateString('fa-IR')}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <a href={cat.download_url} target="_blank" rel="noreferrer">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                <Download size={14}/>
                            </Button>
                          </a>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleDelete(cat.id)}>
                            <Trash2 size={14}/>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
