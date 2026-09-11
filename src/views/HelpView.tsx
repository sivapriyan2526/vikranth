import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EMERGENCY_CONTACTS, FAQS } from '../services/mockData';
import { 
  PhoneCall, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  WifiOff, 
  Info, 
  Code, 
  CheckCircle2, 
  Type, 
  Zap, 
  Globe 
} from 'lucide-react';

export const HelpView: React.FC = () => {
  const { 
    language, 
    fontSize, 
    setFontSize, 
    dataSaver, 
    setDataSaver, 
    simulatedOffline, 
    setSimulatedOffline, 
    t 
  } = useApp();

  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-blue-700" />
          <span>{t.navHelp}</span>
        </h1>
        <p className="text-xs text-slate-700 mt-0.5">
          {language === 'ta'
            ? 'அரசு அவசர உதவி எண்கள், வழிகாட்டுதல்கள் மற்றும் அடிக்கடி கேட்கப்படும் கேள்விகள்'
            : '24x7 Government emergency helplines, citizen FAQ, and accessibility settings.'}
        </p>
      </div>

      {/* Emergency Helplines with 1-Tap Dial */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-rose-600" />
            <span>{t.emergencyHelplines}</span>
          </h2>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            {t.tollFree}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {EMERGENCY_CONTACTS.map((c) => (
            <div 
              key={c.id}
              className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-3 hover:border-blue-300 transition-all"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-extrabold text-blue-900">
                    {c.number}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded">
                    {c.available}
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 mt-1 truncate">
                  {language === 'ta' ? c.nameTa : c.nameEn}
                </h3>
                <p className="text-[11px] text-slate-700 line-clamp-1 mt-0.5">
                  {language === 'ta' ? c.descTa : c.descEn}
                </p>
              </div>

              <a
                href={`tel:${c.number}`}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shrink-0 flex items-center gap-1 active:scale-95 shadow-2xs transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Accessibility & Mobile Experience Controls */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <Type className="w-4 h-4 text-blue-700" />
          <span>{language === 'ta' ? 'மொபைல் பயன்பாட்டு அமைப்புகள்' : 'Mobile Accessibility & Controls'}</span>
        </h2>

        {/* Font size toggle */}
        <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-900 block">{t.fontSize}</span>
            <span className="text-[11px] text-slate-700 block">
              {language === 'ta' ? 'முதியோர்களுக்கு எளிதாக படிக்க பெரிய எழுத்துக்கள்' : 'Larger text sizes for elderly and low-vision citizens'}
            </span>
          </div>
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 rounded text-xs font-bold ${fontSize === 'normal' ? 'bg-blue-700 text-white' : 'text-slate-600'}`}
            >
              Default
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 rounded text-xs font-bold ${fontSize === 'large' ? 'bg-blue-700 text-white' : 'text-slate-600'}`}
            >
              Large
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-1 rounded text-xs font-bold ${fontSize === 'xlarge' ? 'bg-blue-700 text-white' : 'text-slate-600'}`}
            >
              XL
            </button>
          </div>
        </div>

        {/* Data Saver Mode toggle */}
        <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-900 block">{t.dataSaver}</span>
            <span className="text-[11px] text-slate-700 block">{t.dataSaverDesc}</span>
          </div>
          <button
            onClick={() => setDataSaver(!dataSaver)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              dataSaver ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}
          >
            {dataSaver ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Simulate offline toggle */}
        <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-900 block">{t.simulateOffline}</span>
            <span className="text-[11px] text-slate-700 block">
              {language === 'ta' ? 'இணையம் இல்லாத சூழலை சோதிக்க' : 'Test offline cache and offline warning banner'}
            </span>
          </div>
          <button
            onClick={() => setSimulatedOffline(!simulatedOffline)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              simulatedOffline ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}
          >
            {simulatedOffline ? 'Offline' : 'Online'}
          </button>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-2.5">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-blue-700" />
          <span>{t.frequentlyAsked}</span>
        </h2>

        <div className="space-y-2">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-3.5 text-left flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {language === 'ta' ? faq.questionTa : faq.questionEn}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-3.5 pb-3.5 text-xs text-slate-700 leading-relaxed border-t border-slate-100 pt-2 bg-slate-50/50">
                    {language === 'ta' ? faq.answerTa : faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Project Structure & Evaluation Instructions */}
      <section className="bg-slate-900 text-white rounded-2xl p-5 shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-blue-400" />
          <h2 className="font-bold text-sm sm:text-base text-white">
            {t.projectInfoTitle}
          </h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {t.projectInfoDesc}
        </p>

        <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
          <span className="font-bold text-amber-300 block">{t.runInstructions}</span>
          <p>{t.runStep1}</p>
          <p>{t.runStep2}</p>
          <p>{t.runStep3}</p>
          <p>{t.runStep4}</p>
        </div>
      </section>
    </div>
  );
};
