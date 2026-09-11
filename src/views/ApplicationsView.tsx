import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationStatusType } from '../types';
import { 
  FolderCheck, 
  FileCheck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  SearchCheck, 
  Download, 
  ArrowRight,
  PlusCircle
} from 'lucide-react';

export const ApplicationsView: React.FC = () => {
  const { 
    language, 
    applications, 
    navigateToTrackStatus, 
    setViewingCertificate, 
    setActiveTab, 
    t 
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = applications.filter(app => {
    if (filterStatus === 'all') return true;
    return app.status === filterStatus;
  });

  const statuses: { id: string; labelEn: string; labelTa: string }[] = [
    { id: 'all', labelEn: 'All', labelTa: 'அனைத்தும்' },
    { id: 'Approved', labelEn: 'Approved', labelTa: 'ஒப்புதல்' },
    { id: 'Under Review', labelEn: 'Under Review', labelTa: 'சரிபார்ப்பு' },
    { id: 'Submitted', labelEn: 'Submitted', labelTa: 'சமர்ப்பித்தவை' },
    { id: 'Rejected', labelEn: 'Rejected', labelTa: 'நிராகரிப்பு' }
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FolderCheck className="w-6 h-6 text-blue-700" />
            <span>{t.navApplications}</span>
          </h1>
          <p className="text-xs text-slate-700 mt-0.5">
            {language === 'ta'
              ? 'நீங்கள் சமர்ப்பித்த அனைத்து அரசு சேவை விண்ணப்பங்கள்'
              : 'Record of your submitted certificates and public grievance applications.'}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('apply')}
          className="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 active:scale-95 shadow-2xs transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="hidden sm:inline">{t.applyNow}</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {statuses.map(st => {
          const isSelected = filterStatus === st.id;
          const count = st.id === 'all' 
            ? applications.length 
            : applications.filter(a => a.status === st.id).length;

          return (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 active:scale-95 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-blue-700 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{language === 'ta' ? st.labelTa : st.labelEn}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isSelected ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-3">
            <FolderCheck className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">
              {language === 'ta' ? 'விண்ணப்பங்கள் எதுவும் இல்லை' : 'No applications in this category.'}
            </p>
            <button
              onClick={() => setActiveTab('apply')}
              className="px-4 py-2 bg-blue-700 text-white rounded-xl text-xs font-bold"
            >
              {t.applyNow}
            </button>
          </div>
        ) : (
          filtered.map(app => {
            const isApproved = app.status === 'Approved';
            const isReview = app.status === 'Under Review';
            const isRejected = app.status === 'Rejected';

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-extrabold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {app.id}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                        isApproved ? 'bg-emerald-100 text-emerald-800' :
                        isReview ? 'bg-amber-100 text-amber-800' :
                        isRejected ? 'bg-rose-100 text-rose-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {isApproved && <CheckCircle2 className="w-3 h-3" />}
                        {isReview && <Clock className="w-3 h-3" />}
                        {isRejected && <XCircle className="w-3 h-3" />}
                        {app.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 mt-1.5 leading-snug">
                      {language === 'ta' ? app.serviceTitleTa : app.serviceTitleEn}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 py-2 border-y border-slate-100">
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">{t.applicant}:</span>
                    <span className="font-medium text-slate-900 truncate block">{app.applicantName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">{t.submittedOn}:</span>
                    <span className="font-medium text-slate-900 block">{app.appliedDate}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-1 gap-2">
                  <button
                    onClick={() => navigateToTrackStatus(app.id)}
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 py-1"
                  >
                    <span>{t.trackNow}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {isApproved && (
                    <button
                      onClick={() => setViewingCertificate(app)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1 active:scale-95 shadow-2xs transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'ta' ? 'சான்றிதழ்' : 'Certificate'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
