import axios from 'axios';
import { API_URL } from '../config';

// Timeout increased to 60s for cold starts
const axiosInstance = axios.create({ 
  baseURL: API_URL,
  timeout: 60000 
});

const handleResponse = (response: any) => {
  if (response.data.status === 'success') return response.data.data;
  throw new Error(response.data.error || 'API Error');
};

const getToken = () => localStorage.getItem('auth_token');

// --- CACHING SYSTEM ---
const CACHE_PREFIX = 'damon_cache_';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 HOURS (Increased from 5 mins)

const getFromCache = (key: string) => {
  const cached = localStorage.getItem(CACHE_PREFIX + key);
  if (!cached) return null;

  try {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data; // Return cached data if fresh
    }
  } catch (e) {
    localStorage.removeItem(CACHE_PREFIX + key);
  }
  return null;
};

const setCache = (key: string, data: any) => {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.warn('Cache storage failed', e);
  }
};

const clearCache = () => {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(CACHE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
};
// ----------------------

const coreApi = {
  // Public
  getProjects: async (filters: any = {}, forceRefresh = false) => {
    // Generate a unique cache key based on filters
    const cacheKey = `projects_${JSON.stringify(filters)}`;
    
    if (!forceRefresh) {
      const cachedData = getFromCache(cacheKey);
      if (cachedData) return cachedData;
    }

    const response = await axiosInstance.post('', JSON.stringify({ action: 'listProjects', ...filters }), { headers: { 'Content-Type': 'text/plain' } });
    const data = handleResponse(response);
    
    // Save to cache
    setCache(cacheKey, data);
    return data;
  },

  getProject: async (id: string) => {
    // We don't cache individual details heavily to ensure freshness, or use short cache
    const cacheKey = `project_${id}`;
    const cachedData = getFromCache(cacheKey);
    if (cachedData) return cachedData;

    const response = await axiosInstance.post('', JSON.stringify({ action: 'getProject', id }), { headers: { 'Content-Type': 'text/plain' } });
    const data = handleResponse(response);
    setCache(cacheKey, data);
    return data;
  },

  login: async (username: string, password: string) => {
    const response = await axiosInstance.post('', JSON.stringify({ action: 'login', username, password }), { headers: { 'Content-Type': 'text/plain' } });
    return handleResponse(response);
  },

  // Admin - These actions should CLEAR cache to show updates immediately
  createProject: async (payload: any) => {
    const response = await axiosInstance.post('', JSON.stringify({ action: 'createProject', token: getToken(), payload }), { headers: { 'Content-Type': 'text/plain' } });
    clearCache(); // Invalidate cache
    return handleResponse(response);
  },
  updateProject: async (id: string, payload: any) => {
    const response = await axiosInstance.post('', JSON.stringify({ action: 'updateProject', token: getToken(), id, payload }), { headers: { 'Content-Type': 'text/plain' } });
    clearCache(); // Invalidate cache
    return handleResponse(response);
  },
  deleteProject: async (id: string) => {
    const response = await axiosInstance.post('', JSON.stringify({ action: 'deleteProject', token: getToken(), id }), { headers: { 'Content-Type': 'text/plain' } });
    clearCache(); // Invalidate cache
    return handleResponse(response);
  },
  uploadImages: async (id: string, files: any[]) => {
    const response = await axiosInstance.post('', JSON.stringify({ action: 'uploadProjectImages', token: getToken(), id, files }), { headers: { 'Content-Type': 'text/plain' } });
    clearCache();
    return handleResponse(response);
  },
  
  // Catalog Management
  getCatalogs: async () => {
    const cacheKey = 'catalogs_list';
    const cachedData = getFromCache(cacheKey);
    if (cachedData) return cachedData;

    const response = await axiosInstance.post('', JSON.stringify({ action: 'listCatalogs' }), { headers: { 'Content-Type': 'text/plain' } });
    const data = handleResponse(response);
    setCache(cacheKey, data);
    return data;
  },
  uploadCatalog: async (file: any) => {
    const response = await axiosInstance.post('', JSON.stringify({ action: 'uploadCatalog', token: getToken(), file }), { headers: { 'Content-Type': 'text/plain' } });
    clearCache();
    return handleResponse(response);
  },
  deleteCatalog: async (id: string) => {
    const response = await axiosInstance.post('', JSON.stringify({ action: 'deleteCatalog', token: getToken(), id }), { headers: { 'Content-Type': 'text/plain' } });
    clearCache();
    return handleResponse(response);
  }
};

export const api = coreApi;

export const projectService = {
  getAll: coreApi.getProjects,
  getById: coreApi.getProject,
  create: coreApi.createProject,
  update: coreApi.updateProject,
  delete: coreApi.deleteProject,
  uploadImages: coreApi.uploadImages,
};

export const catalogService = {
  getAll: coreApi.getCatalogs,
  upload: coreApi.uploadCatalog,
  delete: coreApi.deleteCatalog
};

export const authService = {
  login: coreApi.login,
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_expires_at');
    // Don't clear data cache on logout, it's public data anyway
  }
};
