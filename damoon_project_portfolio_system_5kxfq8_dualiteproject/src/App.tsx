import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home'; // CRITICAL: Static Import for LCP
import { projectService } from './services/api';

// Lazy Load Other Pages (Non-Critical)
const Projects = lazy(() => import('./pages/Projects').then(module => ({ default: module.Projects })));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then(module => ({ default: module.ProjectDetail })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Login = lazy(() => import('./pages/admin/Login').then(module => ({ default: module.Login })));
const Dashboard = lazy(() => import('./pages/admin/Dashboard').then(module => ({ default: module.Dashboard })));
const ProjectForm = lazy(() => import('./pages/admin/ProjectForm').then(module => ({ default: module.ProjectForm })));
const CatalogManager = lazy(() => import('./pages/admin/CatalogManager').then(module => ({ default: module.CatalogManager })));

// Loading Component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

function App() {
  // --- PREFETCHING LOGIC ---
  useEffect(() => {
    // Wait 3 seconds after initial load (to not affect LCP), then fetch projects
    const timer = setTimeout(() => {
      console.log('Prefetching projects...');
      projectService.getAll().catch(err => console.log('Prefetch failed', err));
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  // -------------------------

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen font-vazir" dir="rtl">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Home is now rendered directly without Suspense delay */}
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/catalogs" element={
                  <ProtectedRoute>
                    <CatalogManager />
                  </ProtectedRoute>
                } />
                <Route path="/admin/projects/new" element={
                  <ProtectedRoute>
                    <ProjectForm />
                  </ProtectedRoute>
                } />
                <Route path="/admin/projects/:id/edit" element={
                  <ProtectedRoute>
                    <ProjectForm />
                  </ProtectedRoute>
                } />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <ToastContainer position="bottom-left" rtl />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
