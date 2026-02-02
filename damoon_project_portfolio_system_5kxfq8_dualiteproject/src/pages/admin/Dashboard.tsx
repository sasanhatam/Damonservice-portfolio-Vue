import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { projectService, authService } from '../../services/api';
import { Project } from '../../types';
import { Button } from '../../components/ui/Button';
import { Plus, LogOut, Edit, Trash2, FileText, Star } from 'lucide-react';
import { toast } from 'react-toastify';

export const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectService.getAll();
      setProjects(data.projects);
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message.includes('Auth')) {
          navigate('/admin/login');
      }
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const handleDelete = async (id: string) => {
      if(!window.confirm('آیا از حذف این پروژه اطمینان دارید؟')) return;
      try {
          await projectService.delete(id);
          toast.success('پروژه حذف شد');
          loadProjects();
      } catch(e) {
          toast.error('خطا در حذف پروژه');
      }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-vazir" dir="rtl">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="font-bold text-lg text-primary-900">داشبورد مدیریت</h1>
            <div className="flex gap-4">
                <Link to="/">
                    <Button variant="ghost" size="sm">مشاهده سایت</Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="text-red-600 border-red-200 hover:bg-red-50">
                    <LogOut size={16} className="ml-2"/> خروج
                </Button>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">لیست پروژه‌ها ({projects.length})</h2>
            <div className="flex gap-2">
                <Link to="/admin/catalogs">
                    <Button variant="secondary">
                        <FileText size={18} className="ml-2"/>
                        مدیریت کاتالوگ‌ها
                    </Button>
                </Link>
                <Link to="/admin/projects/new">
                    <Button>
                        <Plus size={18} className="ml-2"/>
                        پروژه جدید
                    </Button>
                </Link>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
                <table className="w-full text-right">
                    <thead className="bg-gray-50 text-gray-500 text-sm">
                        <tr>
                            <th className="p-4">عنوان پروژه</th>
                            <th className="p-4">اولویت</th>
                            <th className="p-4">دسته‌بندی</th>
                            <th className="p-4">شهر</th>
                            <th className="p-4">بازدید</th>
                            <th className="p-4 text-center">عملیات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {projects.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50">
                                <td className="p-4 font-medium">{p.title}</td>
                                <td className="p-4 text-sm font-bold text-blue-600 flex items-center gap-1">
                                    <Star size={14} className={p.priority && p.priority > 0 ? "fill-blue-600" : "text-gray-300"}/>
                                    {p.priority || 0}
                                </td>
                                <td className="p-4 text-sm text-gray-600">{p.category}</td>
                                <td className="p-4 text-sm text-gray-600">{p.city}</td>
                                <td className="p-4 text-sm text-gray-600">{p.view_count || 0}</td>
                                <td className="p-4">
                                    <div className="flex justify-center gap-2">
                                        <Link to={`/admin/projects/${p.id}/edit`}>
                                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                                <Edit size={14}/>
                                            </Button>
                                        </Link>
                                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleDelete(p.id)}>
                                            <Trash2 size={14}/>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};
