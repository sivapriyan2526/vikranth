import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCategory } from '../types';
import { GOVERNMENT_SERVICES } from '../services/mockData';
import { 
  Search, 
  FileCheck, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  CheckCircle2, 
  SlidersHorizontal 
} from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { language, navigateToServiceApply, t, dataSaver } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDocsId, setExpandedDocsId] = useState<string | null>(null);

  const categories: { id: ServiceCategory; labelEn: string; labelTa: string }[] = [
    { id: 'all', labelEn: 'All Services', labelTa: 'அனைத்து சேவைகள்' },
    { id: 'certificates', labelEn: 'Certificates', labelTa: 'சான்றிதழ்கள்' },
    { id: 'welfare', labelEn: 'Welfare Schemes', labelTa: 'நலத்திட்டங்கள்' },
    { id: 'revenue', labelEn: 'Revenue & Land', labelTa: 'வருவாய் & நிலம்' },
    { id: 'utilities', labelEn: 'Electricity & Utilities', labelTa: 'மின்சாரம் & பயன்பாடு' },
    { id: 'complaints', labelEn: 'Grievance', labelTa: 'குறைதீர்ப்பு' }
  ];

  const filteredServices = GOVERNMENT_SERVICES.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = (
      service.titleEn.toLowerCase().includes(q) ||
      service.titleTa.toLowerCase().includes(q) ||
      service.descEn.toLowerCase().includes(q) ||
      service.descTa.toLowerCase().includes(q) ||
      service.departmentEn.toLowerCase().includes(q)
    );
    return matchesCategory && matchesSearch;
  });

  const toggleDocs = (id: string) => {
    setExpandedDocsId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {t.allServices}
          </h1>
          <p className="text-xs text-slate-700 mt-0.5">
            {language === 'ta'
              ? 'அனைத்து அரசு மற்றும் இ-சேவை சான்றிதழ்களின் பட்டியல்'
              : 'Browse state e-Governance public citizen services and online applications.'}
          </p>
        </div>

        {/* Search bar inside services */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
          />
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 active:scale-95 ${
                  isSelected
                    ? 'bg-blue-700 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {language === 'ta' ? cat.labelTa : cat.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services List Count */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-700">
        <span className="font-semibold">
          {language === 'ta' ? 'கிடைக்கும் சேவைகள்' : 'Available Services'}: ({filteredServices.length})
        </span>
        {selectedCategory !== 'all' && (
          <button 
            onClick={() => setSelectedCategory('all')} 
            className="text-blue-700 font-bold hover:underline"
          >
            {language === 'ta' ? 'அனைத்தையும் காட்டு' : 'Clear Filter'}
          </button>
        )}
      </div>

      {/* Services Cards */}
      <div className="space-y-3">
        {filteredServices.map(service => {
          const isDocsOpen = expandedDocsId === service.id;
          const docs = language === 'ta' ? service.requiredDocsTa : service.requiredDocsEn;

          return (
            <div 
              key={service.id}
              className={`bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs transition-all ${
                !dataSaver ? 'hover:shadow-xs hover:border-blue-300' : ''
              }`}
            >
              {/* Top info */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                      {language === 'ta' ? service.titleTa : service.titleEn}
                    </h2>
                    {language === 'ta' && (
                      <p className="text-[11px] text-slate-700 font-medium">{service.titleEn}</p>
                    )}
                    <p className="text-xs text-blue-800 font-medium mt-0.5">
                      {language === 'ta' ? service.departmentTa : service.departmentEn}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {service.fee === 0 ? t.free : `₹${service.fee}`}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-700 mt-2.5 leading-relaxed">
                {language === 'ta' ? service.descTa : service.descEn}
              </p>

              {/* Required Documents Toggle */}
              <div className="mt-3 pt-2.5 border-t border-slate-100">
                <button
                  onClick={() => toggleDocs(service.id)}
                  className="flex items-center justify-between w-full text-xs font-semibold text-slate-700 hover:text-slate-900 py-1"
                >
                  <span className="flex items-center gap-1.5 text-blue-700">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t.requiredDocs} ({docs.length})</span>
                  </span>
                  {isDocsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isDocsOpen && (
                  <div className="mt-2 p-2.5 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100 text-xs text-slate-800 animate-fadeIn">
                    {docs.map((doc, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Card Actions: Processing time + Large Touch Button */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.estimatedTime}: <strong>{service.processingDays} {t.days}</strong></span>
                </span>

                <button
                  onClick={() => navigateToServiceApply(service)}
                  className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm active:scale-95 shadow-2xs transition-all flex items-center gap-1.5"
                >
                  <span>{t.applyNow}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
