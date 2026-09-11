import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CitizenApplication } from '../types';
import { StorageService } from '../services/storage';
import { 
  Search, 
  SearchCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Download, 
  User, 
  Calendar, 
  Building2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SkeletonTimeline } from '../components/SkeletonLoader';

export const StatusView: React.FC = () => {
  const { 
    language, 
    activeTrackRef, 
    setActiveTrackRef, 
    setViewingCertificate, 
    t, 
    dataSaver 
  } = useApp();

  const [inputRef, setInputRef] = useState(activeTrackRef || 'GM-2025-8842');
  const [searchedApp, setSearchedApp] = useState<CitizenApplication | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-search if activeTrackRef was provided by navigation
  useEffect(() => {
    if (activeTrackRef) {
      setInputRef(activeTrackRef);
      handleTrack(activeTrackRef);
    } else {
      // Default to sample
      handleTrack('GM-2025-8842');
    }
  }, [activeTrackRef]);

  const handleTrack = (refToSearch?: string) => {
    const target = (refToSearch || inputRef).trim();
    if (!target) return;

    setIsLoading(true);
    setHasSearched(true);

    // Realistic API delay (short for fast feel)
    const delay = dataSaver ? 100 : 350;
    setTimeout(() => {
      const found = StorageService.getApplicationById(target);
      setSearchedApp(found || null);
      setIsLoading(false);
    }, delay);
  };

  const sampleRefs = [
    { id: 'GM-2025-8842', label: 'Approved (ஒப்புதல்)', color: 'bg-emerald-50 text-emerald-800 border-emerald-300' },
    { id: 'GM-2025-9120', label: 'Under Review (சரிபார்ப்பு)', color: 'bg-amber-50 text-amber-800 border-amber-300' },
    { id: 'GM-2025-3310', label: 'Submitted (சமர்ப்பிக்கப்பட்டது)', color: 'bg-blue-50 text-blue-800 border-blue-300' },
    { id: 'GM-2025-4402', label: 'Rejected (நிராகரிக்கப்பட்டது)', color: 'bg-rose-50 text-rose-800 border-rose-300' }
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* Search Tracker Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {t.trackTitle}
          </h1>
          <p className="text-xs text-slate-700 mt-0.5">
            {t.trackSubtitle}
          </p>
        </div>

        {/* Search Input Box */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 block">
            {t.refNumberLabel}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={inputRef}
                onChange={(e) => setInputRef(e.target.value.toUpperCase())}
                placeholder={t.refPlaceholder}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-mono font-bold placeholder:text-slate-400 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white uppercase tracking-wider"
              />
            </div>
            <button
              onClick={() => handleTrack()}
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl active:scale-95 shadow-2xs transition-all flex items-center justify-center gap-2"
            >
              <SearchCheck className="w-4 h-4" />
              <span>{t.trackBtn}</span>
            </button>
          </div>
        </div>

        {/* Quick Sample Reference Numbers */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-700 block flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            {t.quickSamples}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleRefs.map(sample => (
              <button
                key={sample.id}
                onClick={() => {
                  setInputRef(sample.id);
                  handleTrack(sample.id);
                }}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all active:scale-95 flex items-center gap-1 ${sample.color}`}
              >
                <span>{sample.id}</span>
                <span className="text-[10px] opacity-80">({sample.label.split(' ')[0]})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && <SkeletonTimeline />}

      {/* Search Result */}
      {!isLoading && hasSearched && (
        <>
          {searchedApp ? (
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-2xs space-y-5">
              {/* Application Header & Status Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm sm:text-base font-extrabold text-blue-900">
                      {searchedApp.id}
                    </span>
                    {/* Status badge */}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                      searchedApp.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      searchedApp.status === 'Under Review' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      searchedApp.status === 'Rejected' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                      'bg-blue-100 text-blue-800 border border-blue-300'
                    }`}>
                      {searchedApp.status === 'Approved' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {searchedApp.status === 'Under Review' && <Clock className="w-3.5 h-3.5" />}
                      {searchedApp.status === 'Rejected' && <XCircle className="w-3.5 h-3.5" />}
                      {searchedApp.status === 'Submitted' && <SearchCheck className="w-3.5 h-3.5" />}
                      <span>{searchedApp.status}</span>
                    </span>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                    {language === 'ta' ? searchedApp.serviceTitleTa : searchedApp.serviceTitleEn}
                  </h2>
                </div>

                {/* Download Certificate if Approved */}
                {searchedApp.status === 'Approved' && (
                  <button
                    onClick={() => setViewingCertificate(searchedApp)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all self-start sm:self-auto"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t.downloadCertificate}</span>
                  </button>
                )}
              </div>

              {/* Applicant Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl text-xs border border-slate-100">
                <div>
                  <span className="text-slate-700 block font-semibold">{t.applicant}:</span>
                  <span className="font-bold text-slate-900 block truncate">{searchedApp.applicantName}</span>
                </div>
                <div>
                  <span className="text-slate-700 block font-semibold">{t.submittedOn}:</span>
                  <span className="font-medium text-slate-800 block">{searchedApp.appliedDate}</span>
                </div>
                <div>
                  <span className="text-slate-700 block font-semibold">{t.district}:</span>
                  <span className="font-bold text-slate-900 block">{searchedApp.district}</span>
                </div>
                <div>
                  <span className="text-slate-700 block font-semibold">{t.officer}:</span>
                  <span className="font-medium text-slate-800 block truncate">{searchedApp.officerAssigned}</span>
                </div>
              </div>

              {/* Timeline Progress */}
              <div className="space-y-3 pt-1">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  {t.trackingResult}
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {searchedApp.timeline.map((step, idx) => {
                    const isRejected = step.status === 'Rejected';
                    const isCompleted = step.completed;
                    const isCurrent = step.isCurrent;

                    return (
                      <div key={idx} className="relative group">
                        {/* Dot icon on line */}
                        <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white border-2 border-white shadow-2xs ${
                          isRejected ? 'bg-rose-600' :
                          isCompleted ? 'bg-emerald-600' :
                          'bg-slate-300'
                        }`}>
                          {isRejected ? (
                            <XCircle className="w-3.5 h-3.5" />
                          ) : isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                          )}
                        </div>

                        {/* Content */}
                        <div className={`p-3.5 rounded-xl border transition-all ${
                          isCurrent 
                            ? 'bg-blue-50/60 border-blue-200 ring-2 ring-blue-100' 
                            : isRejected
                            ? 'bg-rose-50/50 border-rose-200'
                            : isCompleted
                            ? 'bg-white border-slate-200'
                            : 'bg-slate-50/50 border-slate-100 opacity-60'
                        }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h4 className={`text-xs sm:text-sm font-bold ${
                              isRejected ? 'text-rose-900' : isCompleted ? 'text-slate-900' : 'text-slate-500'
                            }`}>
                              {language === 'ta' ? step.labelTa : step.labelEn}
                            </h4>
                            <span className="text-[11px] font-mono text-slate-700">
                              {step.date}
                            </span>
                          </div>

                          <p className={`text-xs mt-1 leading-relaxed ${
                            isRejected ? 'text-rose-800 font-medium' : 'text-slate-700'
                          }`}>
                            {language === 'ta' ? step.remarkTa : step.remarkEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 space-y-2">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <h2 className="text-base font-bold text-slate-900">
                {language === 'ta' ? 'விண்ணப்ப எண் கிடைக்கவில்லை' : 'Application Not Found'}
              </h2>
              <p className="text-xs text-slate-700 max-w-sm mx-auto">
                {language === 'ta'
                  ? 'உள்ளிட்ட குறிப்பு எண்ணை மீண்டும் சரிபார்க்கவும் அல்லது மேலே உள்ள மாதிரி எண்களில் ஒன்றை முயற்சிக்கவும்.'
                  : 'Please check the reference number entered or try one of the sample reference numbers above.'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
