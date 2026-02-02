export type Category = 'Residential' | 'Commercial' | 'Industrial' | 'ITCooling' | 'Government';
export type SystemType = 'Chiller' | 'VRF' | 'DuctSplit' | 'LightSystems';

export interface Project {
  id: string;
  title: string;
  category: Category;
  system_type: SystemType;
  brand: string;
  employer_name?: string;
  address_full?: string;
  city: string;
  province: string;
  year_completed: number;
  capacity_summary?: string;
  system_model?: string;
  advantages: string[];
  description?: string;
  cover_image_url?: string;
  cover_image_file_id?: string;
  gallery_image_urls: string[];
  gallery_image_file_ids?: string[];
  catalog_download_url?: string;
  catalog_file_id?: string;
  created_at?: string;
  view_count?: number;
  priority?: number; // Added priority field
}

export interface Catalog {
  id: string;
  name: string;
  file_id: string;
  download_url: string;
  created_at: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
}

export interface UploadResponse {
  uploaded: { fileId: string; url: string }[];
  gallery_image_file_ids: string;
  gallery_image_urls: string;
}
