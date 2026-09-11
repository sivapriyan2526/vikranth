/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OfflineBanner } from './components/OfflineBanner';
import { DocumentModal } from './components/DocumentModal';
import { HomeView } from './views/HomeView';
import { ServicesView } from './views/ServicesView';
import { ApplyView } from './views/ApplyView';
import { ApplicationsView } from './views/ApplicationsView';
import { StatusView } from './views/StatusView';
import { HelpView } from './views/HelpView';

const MainLayout: React.FC = () => {
  const { 
    activeTab, 
    fontSize, 
    language, 
    viewingCertificate, 
    setViewingCertificate,
    toastMessage 
  } = useApp();

  const fontScaleClass = 
    fontSize === 'xlarge' 
      ? 'font-scale-xlarge' 
      : fontSize === 'large' 
      ? 'font-scale-large' 
      : 'font-scale-normal';

  return (
    <div 
      lang={language}
      className={`min-h-screen bg-slate-100 text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white ${fontScaleClass}`}
    >
      {/* Mobile Shell Wrapper (max-w-lg on desktop for authentic mobile-first feel) */}
      <div className="w-full max-w-lg mx-auto bg-slate-50 min-h-screen flex flex-col shadow-2xl relative border-x border-slate-200/80">
        {/* Top Header */}
        <Header />

        {/* Offline Banner alert if disconnected */}
        <OfflineBanner />

        {/* Main Content View with generous bottom space for fixed BottomNav */}
        <main className="flex-1 px-3.5 sm:px-4 pt-3.5 pb-24 overflow-x-hidden">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'services' && <ServicesView />}
          {activeTab === 'apply' && <ApplyView />}
          {activeTab === 'applications' && <ApplicationsView />}
          {activeTab === 'status' && <StatusView />}
          {activeTab === 'help' && <HelpView />}
        </main>

        {/* Toast Notification if active */}
        {toastMessage && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-bounce">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Certificate / Receipt Preview Modal */}
        {viewingCertificate && (
          <DocumentModal
            application={viewingCertificate}
            onClose={() => setViewingCertificate(null)}
          />
        )}

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
