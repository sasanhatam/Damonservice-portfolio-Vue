import React, { useEffect, useState } from 'react';
import { ProjectCard } from '../components/projects/ProjectCard';
import { projectService } from '../services/api';
import { Project, Category, SystemType } from '../types';
import { CATEGORY_LABELS, SYSTEM_LABELS } from '../utils/helpers';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    system_type: '',
    q: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [filters.category, filters.system_type]); // Re-fetch on filter change

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await projectService.getAll(filters);
      setProjects(data.projects);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary-900 mb-2">پروژه‌های اجرایی</h1>
            <p className="text-gray-500">نمایش لیست پروژه‌های انجام شده توسط دامون سرویس</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
             <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
                <input 
                    type="text" 
                    placeholder="جستجو..." 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={filters.q}
                    onChange={(e) => setFilters({...filters, q: e.target.value})}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
             </form>
             <Button variant="outline" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
                <Filter size={18} />
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:block ${showFilters ? 'block' : 'hidden'} bg-white p-6 rounded-xl shadow-sm h-fit sticky top-24`}>
            <div className="flex justify-between items-center mb-4 lg:hidden">
                <h3 className="font-bold">فیلترها</h3>
                <button onClick={() => setShowFilters(false)}><X size={18}/></button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-sm text-gray-900 mb-3">دسته‌بندی</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="radio" 
                        name="category" 
                        className="text-primary-600 focus:ring-primary-500"
                        checked={filters.category === ''}
                        onChange={() => setFilters({...filters, category: ''})}
                    />
                    <span className="text-sm text-gray-600">همه موارد</span>
                  </label>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="category" 
                        className="text-primary-600 focus:ring-primary-500"
                        checked={filters.category === key}
                        onChange={() => setFilters({...filters, category: key})}
                      />
                      <span className="text-sm text-gray-600">{label.split('(')[0]}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-bold text-sm text-gray-900 mb-3">نوع سیستم</h3>
                <div className="space-y-2">
                   <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="radio" 
                        name="system" 
                        className="text-primary-600 focus:ring-primary-500"
                        checked={filters.system_type === ''}
                        onChange={() => setFilters({...filters, system_type: ''})}
                    />
                    <span className="text-sm text-gray-600">همه موارد</span>
                  </label>
                  {Object.entries(SYSTEM_LABELS).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="system" 
                        className="text-primary-600 focus:ring-primary-500"
                        checked={filters.system_type === key}
                        onChange={() => setFilters({...filters, system_type: key})}
                      />
                      <span className="text-sm text-gray-600">{label.split('(')[0]}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[1,2,3].map(i => (
                     <div key={i} className="h-80 bg-gray-200 rounded-xl animate-pulse"></div>
                 ))}
              </div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">پروژه‌ای با این مشخصات یافت نشد.</p>
                <Button variant="ghost" className="mt-2" onClick={() => setFilters({category:'', system_type:'', q:''})}>
                    پاک کردن فیلترها
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
