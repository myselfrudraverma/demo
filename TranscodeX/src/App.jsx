import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import DeveloperZone from './pages/DeveloperZone';

function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/':
        return 'Video Processing';
      case '/jobs':
        return 'Processing Jobs';
      case '/developer':
        return 'Developer Zone';
      default:
        return 'TranscodeX';
    }
  };

  return (
    <div className="app-layout">
      {/* Navigation Sidebar */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="main-content-wrapper">
        <Topbar
          pageTitle={getPageTitle(location.pathname)}
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/developer" element={<DeveloperZone />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
