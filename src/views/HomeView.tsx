import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  FileCheck, 
  SearchCheck, 
  Download, 
  Award, 
  MessageSquare, 
  HelpCircle, 
  ArrowRight, 
  Wifi, 
  WifiOff, 
  Zap, 
  Globe, 
  Clock, 
  Users, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { GOVERNMENT_SERVICES } from '../services/mockData';

export const HomeView: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    dataSaver, 
    setDataSaver, 
    isEffectiveOnline, 
    setSimulatedOffline,
    simulatedOffline,
    setActiveTab, 
    navigateToServiceApply, 
    navigateToTrackStatus,
    applications,
    setViewingCertificate,
    t 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  // Filtered services based on search query
  const filteredServices = GOVERNMENT_SERVICES.filter(service => {
    const q = searchQuery.toLowerCase();
    return (
      service.titleEn.toLowerCase().includes(q) ||
      service.titleTa.toLowerCase().includes(q) ||
      service.descEn.toLowerCase().includes(q) ||
      service.descTa.toLowerCase().includes(q) ||
      service.departmentEn.toLowerCase().includes(q)
    );
  });

  const popularServices = GOVERNMENT_SERVICES.filter(s => s.popular);

  return (
    <div className="space-y-5 pb-6">
      {/* Hero Welcome Card */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white rounded-3xl p-5 sm:p-6 shadow-md shadow-blue-950/20 relative overflow-hidden">
        {/* Subtle background pattern (hidden in data saver mode) */}
        {!dataSaver && (
          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />
        )}

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-700/80 text-blue-100 border border-blue-500/40">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              {language === 'ta' ? 'அதிகாரப்பூர்வ அரசு தளம்' : 'Official Public Portal'}
            </span>

            {/* Quick Status Pill */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
                className="px-2 py-1 rounded-md text-[11px] font-bold bg-white/15 hover:bg-white/25 text-white flex items-center gap-1 transition-all"
              >
                <Globe className="w-3 h-3 text-blue-200" />
                {language === 'en' ? 'தமிழ்' : 'English'}
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              GovMobile
            </h1>
            <p className="text-blue-100 text-sm sm:text-base font-medium mt-0.5">
              “{t.tagline}”
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative pt-1">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-white text-slate-900 placeholder:text-slate-500 pl-11 pr-4 py-3.5 rounded-2xl text-sm font-medium focus:outline-hidden focus:ring-3 focus:ring-blue-400 shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full px-2 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Network & Data Status Strip */}
      <section className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs grid grid-cols-2 gap-2 text-xs">
        {/* Internet Status */}
        <div 
          onClick={() => setSimulatedOffline(!simulatedOffline)}
          className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-colors ${
            isEffectiveOnline ? 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
          }`}
          title="Tap to toggle simulated network status"
        >
          <div className={`p-1.5 rounded-lg ${isEffectiveOnline ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'}`}>
            {isEffectiveOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          </div>
          <div>
            <span className="font-bold block leading-tight">
              {isEffectiveOnline ? t.online : t.offline}
            </span>
            <span className="text-[10px] text-slate-500 block leading-tight">
              {isEffectiveOnline ? (language === 'ta' ? 'அனைத்து சேவைகளும் தயார்' : 'Real-time sync on') : (language === 'ta' ? 'சேமிக்கப்பட்ட தரவு' : 'Cached records')}
            </span>
          </div>
        </div>

        {/* Data Saver Toggle */}
        <div 
          onClick={() => setDataSaver(!dataSaver)}
          className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-colors ${
            dataSaver ? 'bg-blue-50 text-blue-900 hover:bg-blue-100' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
          title="Tap to toggle data saver"
        >
          <div className={`p-1.5 rounded-lg ${dataSaver ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold block leading-tight">
              {dataSaver ? t.dataSaverActive : t.dataSaver}
            </span>
            <span className="text-[10px] text-slate-500 block leading-tight">
              {dataSaver ? '84% bandwidth saved' : (language === 'ta' ? 'குறைந்த இணையம்' : 'Low network ready')}
            </span>
          </div>
        </div>
      </section>

      {/* If search is active, show filtered results immediately */}
      {searchQuery ? (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              {language === 'ta' ? 'தேடல் முடிவுகள்' : 'Search Results'} ({filteredServices.length})
            </h2>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              {language === 'ta' ? 'அனைத்தையும் காட்டு' : 'Reset Search'}
            </button>
          </div>

          {filteredServices.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-200">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-700 font-semibold text-sm">
                {language === 'ta' ? 'சேவைகள் எதுவும் கிடைக்கவில்லை' : 'No government services matched your query.'}
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
              >
                {language === 'ta' ? 'அனைத்து சேவைகளையும் பார்க்க' : 'View All Services'}
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredServices.map(service => (
                <div 
                  key={service.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-slate-900 leading-tight">
                        {language === 'ta' ? service.titleTa : service.titleEn}
                      </h3>
                      <p className="text-xs text-slate-700 line-clamp-2 mt-1">
                        {language === 'ta' ? service.descTa : service.descEn}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-700 font-medium">
                      ⏱ {service.processingDays} {t.days} • {service.fee === 0 ? t.free : `₹${service.fee}`}
                    </span>
                    <button
                      onClick={() => navigateToServiceApply(service)}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs active:scale-95 transition-all"
                    >
                      {t.applyNow}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Quick Services: The 6 required direct action tiles */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <span className="w-2 h-4 bg-blue-700 rounded-sm inline-block" />
                {t.quickServices}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {/* 1. Apply for Certificate */}
              <button
                onClick={() => {
                  const defaultCert = GOVERNMENT_SERVICES.find(s => s.id === 'cert-income') || GOVERNMENT_SERVICES[0];
                  navigateToServiceApply(defaultCert);
                }}
                className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-400 text-left transition-all active:scale-96 flex flex-col justify-between min-h-[105px]"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div className="mt-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 leading-tight block">
                    {t.actionApplyCert}
                  </span>
                  <span className="text-[11px] text-slate-700 font-medium leading-tight block mt-0.5">
                    {language === 'ta' ? 'வருமானம், சாதி, இருப்பிடம்' : 'Income, Caste, Residence'}
                  </span>
                </div>
              </button>

              {/* 2. Check Application Status */}
              <button
                onClick={() => navigateToTrackStatus()}
                className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-400 text-left transition-all active:scale-96 flex flex-col justify-between min-h-[105px]"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <SearchCheck className="w-5 h-5" />
                </div>
                <div className="mt-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 leading-tight block">
                    {t.actionCheckStatus}
                  </span>
                  <span className="text-[11px] text-slate-700 font-medium leading-tight block mt-0.5">
                    {language === 'ta' ? 'குறிப்பு எண் கொண்டு கண்காணிக்க' : 'Live Timeline & Updates'}
                  </span>
                </div>
              </button>

              {/* 3. Download Documents */}
              <button
                onClick={() => {
                  const approved = applications.find(a => a.status === 'Approved');
                  if (approved) {
                    setViewingCertificate(approved);
                  } else {
                    navigateToTrackStatus('GM-2025-8842');
                  }
                }}
                className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-400 text-left transition-all active:scale-96 flex flex-col justify-between min-h-[105px]"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <div className="mt-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 leading-tight block">
                    {t.actionDownloadDocs}
                  </span>
                  <span className="text-[11px] text-slate-700 font-medium leading-tight block mt-0.5">
                    {language === 'ta' ? 'டிஜிட்டல் சான்றிதழ்கள்' : 'QR Verified Certificates'}
                  </span>
                </div>
              </button>

              {/* 4. Government Schemes */}
              <button
                onClick={() => {
                  setActiveTab('services');
                }}
                className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-400 text-left transition-all active:scale-96 flex flex-col justify-between min-h-[105px]"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div className="mt-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 leading-tight block">
                    {t.actionSchemes}
                  </span>
                  <span className="text-[11px] text-slate-700 font-medium leading-tight block mt-0.5">
                    {language === 'ta' ? 'மகளிர் உரிமை, கல்வி உதவி' : 'Monthly Aid, Health Cover'}
                  </span>
                </div>
              </button>

              {/* 5. Complaints / Grievances */}
              <button
                onClick={() => {
                  const compService = GOVERNMENT_SERVICES.find(s => s.id === 'comp-grievance') || GOVERNMENT_SERVICES[0];
                  navigateToServiceApply(compService);
                }}
                className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-400 text-left transition-all active:scale-96 flex flex-col justify-between min-h-[105px]"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="mt-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 leading-tight block">
                    {t.actionComplaints}
                  </span>
                  <span className="text-[11px] text-slate-700 font-medium leading-tight block mt-0.5">
                    {language === 'ta' ? 'முதல்வர் தனிப்பிரிவு மனு' : 'Direct to CM Cell'}
                  </span>
                </div>
              </button>

              {/* 6. Help & Emergency */}
              <button
                onClick={() => setActiveTab('help')}
                className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-400 text-left transition-all active:scale-96 flex flex-col justify-between min-h-[105px]"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="mt-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 leading-tight block">
                    {t.actionHelp}
                  </span>
                  <span className="text-[11px] text-slate-700 font-medium leading-tight block mt-0.5">
                    {language === 'ta' ? '24x7 இலவச உதவி எண்கள்' : 'Toll-Free Numbers 1100, 112'}
                  </span>
                </div>
              </button>
            </div>
          </section>

          {/* Citizen's Recent Activity Preview */}
          {applications.length > 0 && (
            <section className="bg-white rounded-2xl p-4 border border-blue-100 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-700" />
                  {language === 'ta' ? 'உங்கள் அண்மைக்கால விண்ணப்பம்' : 'Recent Application'}
                </h3>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center gap-0.5"
                >
                  <span>{language === 'ta' ? 'அனைத்தும் பார்க்க' : 'View All'} ({applications.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Top application card */}
              {(() => {
                const latest = applications[0];
                const isApproved = latest.status === 'Approved';
                const isReview = latest.status === 'Under Review';

                return (
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-900">{latest.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isApproved ? 'bg-emerald-100 text-emerald-800' :
                          isReview ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {latest.status}
                        </span>
                      </div>
                      <p className="font-semibold text-xs text-slate-800 truncate mt-0.5">
                        {language === 'ta' ? latest.serviceTitleTa : latest.serviceTitleEn}
                      </p>
                      <p className="text-[11px] text-slate-700">
                        {t.submittedOn}: {latest.appliedDate}
                      </p>
                    </div>

                    <button
                      onClick={() => navigateToTrackStatus(latest.id)}
                      className="px-3 py-1.5 bg-blue-700 text-white rounded-lg text-xs font-bold shrink-0 active:scale-95 shadow-2xs"
                    >
                      {t.trackNow}
                    </button>
                  </div>
                );
              })()}
            </section>
          )}

          {/* Popular Services Section */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <span className="w-2 h-4 bg-emerald-600 rounded-sm inline-block" />
                {t.popularServices}
              </h2>
              <button
                onClick={() => setActiveTab('services')}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
              >
                <span>{language === 'ta' ? 'அனைத்து சேவைகள்' : 'View All'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {popularServices.map(service => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 leading-snug">
                          {language === 'ta' ? service.titleTa : service.titleEn}
                        </h3>
                        <p className="text-[11px] text-slate-700 font-medium">
                          {language === 'ta' ? service.departmentTa : service.departmentEn}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 shrink-0">
                      {service.fee === 0 ? t.free : `₹${service.fee}`}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {language === 'ta' ? service.descTa : service.descEn}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-700 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.estimatedTime}: <strong>{service.processingDays} {t.days}</strong></span>
                    </span>

                    <button
                      onClick={() => navigateToServiceApply(service)}
                      className="px-4 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs active:scale-95 shadow-2xs transition-all"
                    >
                      {t.applyNow}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Public Awareness / Trust Banner */}
          <section className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 space-y-1.5 text-xs text-amber-900">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{language === 'ta' ? 'பொதுமக்கள் விழிப்புணர்வு' : 'Citizen Advisory'}</span>
            </div>
            <p className="leading-relaxed text-amber-950 font-medium">
              {language === 'ta'
                ? 'அரசு இ-சேவை சான்றிதழ்களுக்கு அரசு நிர்ணயித்த கட்டணத்தை மட்டுமே செலுத்துங்கள். தரகர்களை அணுக வேண்டாம்.'
                : 'Pay only government stipulated fees for e-Seva certificates. Avoid unauthorized intermediaries.'}
            </p>
          </section>
        </>
      )}
    </div>
  );
};
