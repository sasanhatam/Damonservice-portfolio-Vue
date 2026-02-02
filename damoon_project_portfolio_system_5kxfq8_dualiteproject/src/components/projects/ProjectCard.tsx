import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Activity } from 'lucide-react';
import { Project } from '../../types';
import { CATEGORY_LABELS, toPersianDigits } from '../../utils/helpers';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link to={`/projects/${project.id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
        {project.cover_image_url ? (
          <img 
            src={project.cover_image_url} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            بدون تصویر
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-primary-900 shadow-sm">
          {CATEGORY_LABELS[project.category].split('(')[0]}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {project.title}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gold-500" />
            <span>{project.city}، {project.province}</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-gold-500" />
            <span>{project.system_type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gold-500" />
            <span>اجرا: {toPersianDigits(project.year_completed)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
