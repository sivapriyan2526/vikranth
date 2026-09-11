import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GOVERNMENT_SERVICES, DISTRICTS } from '../services/mockData';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  FileCheck, 
  ShieldCheck, 
  Download, 
  SearchCheck, 
  Sparkles,
  Building2
} from 'lucide-react';

export const ApplyView: React.FC = () => {
  const { 
    language, 
    selectedService, 
    setSelectedService, 
    submitApplication, 
    navigateToTrackStatus, 
    setViewingCertificate, 
    t 
  } = useApp();

  // Current active step: 1, 2, 3, or 4 (Success)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form states
  const [activeServiceId, setActiveServiceId] = useState<string>(
    selectedService ? selectedService.id : (GOVERNMENT_SERVICES[0]?.id || '')
  );
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [aadhaarLast4, setAadhaarLast4] = useState('');
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  // Service specific fields
  const [annualIncome, setAnnualIncome] = useState('120000');
  const [community, setCommunity] = useState('BC');
  const [grievanceDetails, setGrievanceDetails] = useState('');
  const [declaredConsent, setDeclaredConsent] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedApp, setSubmittedApp] = useState<any>(null);

  const currentService = GOVERNMENT_SERVICES.find(s => s.id === activeServiceId) || GOVERNMENT_SERVICES[0];

  // Auto fill sample demo data for hassle-free evaluation
  const handleAutoFillDemo = () => {
    setFullName(language === 'ta' ? 'அனிதா சுந்தரம்' : 'Anitha Sundaram');
    setMobileNumber('9840123456');
    setAadhaarLast4('5821');
    setDistrict('Chennai');
    setAddress('No. 42, Anna Nagar West, Chennai');
    setPincode('600040');
    setAnnualIncome('180000');
    setGrievanceDetails('Request for prompt issuing of resident certificate for college application.');
    setDeclaredConsent(true);
    setErrors({});
  };

  // Immediate validation for Step 1
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = t.errNameReq;
    }
    const cleanMobile = mobileNumber.replace(/[^0-9]/g, '');
    if (cleanMobile.length !== 10) {
      errs.mobileNumber = t.errMobileReq;
    }
    if (aadhaarLast4 && aadhaarLast4.replace(/[^0-9]/g, '').length !== 4) {
      errs.aadhaarLast4 = t.errAadhaarReq;
    }
    if (!address.trim() || address.trim().length < 6) {
      errs.address = t.errAddressReq;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validation for Step 2
  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (currentService.category === 'complaints' && !grievanceDetails.trim()) {
      errs.grievanceDetails = language === 'ta' ? 'மனு விவரங்களை உள்ளிடவும்' : 'Please provide complaint / grievance description';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validation for Step 3
  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!declaredConsent) {
      errs.declaredConsent = t.errAgreeReq;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateStep3()) {
        // Submit
        const newApp = submitApplication({
          serviceId: currentService.id,
          serviceTitleEn: currentService.titleEn,
          serviceTitleTa: currentService.titleTa,
          applicantName: fullName,
          aadhaarLast4: aadhaarLast4 || '4920',
          mobileNumber: mobileNumber,
          district: district,
          address: `${address}${pincode ? `, PIN: ${pincode}` : ''}`,
          departmentEn: currentService.departmentEn,
          departmentTa: currentService.departmentTa,
          additionalData: {
            income: annualIncome,
            community: community,
            grievance: grievanceDetails
          }
        });
        setSubmittedApp(newApp);
        setCurrentStep(4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header card with progress */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {t.formTitle}
            </h1>
            <p className="text-xs text-slate-700 mt-0.5">
              {language === 'ta' ? currentService.titleTa : currentService.titleEn}
            </p>
          </div>

          {currentStep < 4 && (
            <button
              onClick={handleAutoFillDemo}
              className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.fillDemoData}</span>
            </button>
          )}
        </div>

        {/* Multi-Step Progress Indicator: Step 1 -> Step 2 -> Step 3 -> Submit */}
        {currentStep < 4 && (
          <div className="pt-2">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {[
                { step: 1, label: t.step1Title },
                { step: 2, label: t.step2Title },
                { step: 3, label: t.step3Title }
              ].map((item) => {
                const isPassed = currentStep > item.step;
                const isCurrent = currentStep === item.step;

                return (
                  <div key={item.step} className="space-y-1.5">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isPassed 
                          ? 'bg-emerald-600' 
                          : isCurrent 
                          ? 'bg-blue-700' 
                          : 'bg-slate-200'
                      }`}
                    />
                    <div className="flex items-center justify-center gap-1">
                      {isPassed ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      ) : (
                        <span className={`w-3.5 h-3.5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                          isCurrent ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {item.step}
                        </span>
                      )}
                      <span className={`text-[11px] font-semibold truncate ${
                        isCurrent ? 'text-blue-900 font-bold' : 'text-slate-600'
                      }`}>
                        {item.step === 1 ? 'Details' : item.step === 2 ? 'Service' : 'Submit'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* STEP 1: Citizen Details */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">1</span>
            <span>{t.step1Title}</span>
          </h2>

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 block">
              {t.fullName} <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors({ ...errors, fullName: '' });
              }}
              placeholder="e.g. Anitha Sundaram"
              className={`w-full px-3.5 py-3 rounded-xl border text-sm focus:outline-hidden focus:ring-2 transition-all ${
                errors.fullName ? 'border-rose-500 bg-rose-50/30 focus:ring-rose-400' : 'border-slate-300 focus:ring-blue-600'
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* Mobile & Aadhaar in 2-col on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 block">
                {t.mobileNumber} <span className="text-rose-600">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value.replace(/[^0-9]/g, ''));
                    if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: '' });
                  }}
                  placeholder="9840123456"
                  className={`w-full px-3.5 py-3 rounded-r-xl border text-sm focus:outline-hidden focus:ring-2 transition-all ${
                    errors.mobileNumber ? 'border-rose-500 bg-rose-50/30 focus:ring-rose-400' : 'border-slate-300 focus:ring-blue-600'
                  }`}
                />
              </div>
              {errors.mobileNumber && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.mobileNumber}</span>
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 block">
                {t.aadhaarNumber}
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-500 text-xs font-mono">
                  XXXX-XXXX-
                </span>
                <input
                  type="tel"
                  maxLength={4}
                  value={aadhaarLast4}
                  onChange={(e) => {
                    setAadhaarLast4(e.target.value.replace(/[^0-9]/g, ''));
                    if (errors.aadhaarLast4) setErrors({ ...errors, aadhaarLast4: '' });
                  }}
                  placeholder="5821"
                  className={`w-full px-3.5 py-3 rounded-r-xl border text-sm focus:outline-hidden focus:ring-2 transition-all ${
                    errors.aadhaarLast4 ? 'border-rose-500 bg-rose-50/30 focus:ring-rose-400' : 'border-slate-300 focus:ring-blue-600'
                  }`}
                />
              </div>
              {errors.aadhaarLast4 && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.aadhaarLast4}</span>
                </p>
              )}
            </div>
          </div>

          {/* District Selector */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 block">
              {t.district} <span className="text-rose-600">*</span>
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600"
            >
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Address & PIN */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 block">
              {t.address} <span className="text-rose-600">*</span>
            </label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (errors.address) setErrors({ ...errors, address: '' });
              }}
              placeholder="Door No, Street Name, Village / Town"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-hidden focus:ring-2 transition-all ${
                errors.address ? 'border-rose-500 bg-rose-50/30 focus:ring-rose-400' : 'border-slate-300 focus:ring-blue-600'
              }`}
            />
            {errors.address && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.address}</span>
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 block">
              {t.pincode}
            </label>
            <input
              type="tel"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="600040"
              className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      )}

      {/* STEP 2: Service & Document Information */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">2</span>
            <span>{t.step2Title}</span>
          </h2>

          {/* Service Selector */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 block">
              {t.selectService}
            </label>
            <select
              value={activeServiceId}
              onChange={(e) => setActiveServiceId(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
            >
              {GOVERNMENT_SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {language === 'ta' ? s.titleTa : s.titleEn} (₹{s.fee === 0 ? t.free : s.fee})
                </option>
              ))}
            </select>
          </div>

          {/* Category specific dynamic inputs */}
          {currentService.category === 'certificates' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 block">
                  {t.annualIncome}
                </label>
                <select
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                >
                  <option value="60000">Below ₹60,000</option>
                  <option value="120000">₹60,001 to ₹1,20,000</option>
                  <option value="250000">₹1,20,001 to ₹2,50,000</option>
                  <option value="500000">Above ₹2,50,000</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 block">
                  {t.communityCategory}
                </label>
                <select
                  value={community}
                  onChange={(e) => setCommunity(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                >
                  <option value="BC">Backward Class (BC)</option>
                  <option value="MBC">Most Backward Class (MBC)</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                  <option value="OC">General / Others (OC)</option>
                </select>
              </div>
            </>
          )}

          {currentService.category === 'complaints' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 block">
                {language === 'ta' ? 'மனு / குறைதீர்ப்பு விவரம்' : 'Grievance Description'} <span className="text-rose-600">*</span>
              </label>
              <textarea
                rows={3}
                value={grievanceDetails}
                onChange={(e) => {
                  setGrievanceDetails(e.target.value);
                  if (errors.grievanceDetails) setErrors({ ...errors, grievanceDetails: '' });
                }}
                placeholder={language === 'ta' ? 'உங்கள் கோரிக்கையை விரிவாக குறிப்பிடவும்...' : 'Describe your grievance or public issue clearly...'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
            </div>
          )}

          {/* Required Documents Checklist */}
          <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-100 space-y-2">
            <h3 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-blue-700" />
              <span>{t.requiredDocs} ({language === 'ta' ? 'இணைக்கப்பட வேண்டிய ஆவணங்கள்' : 'Documents Checklist'})</span>
            </h3>
            <div className="space-y-1.5 text-xs text-slate-700">
              {(language === 'ta' ? currentService.requiredDocsTa : currentService.requiredDocsEn).map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-800">{doc}</span>
                  <span className="ml-auto text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                    {language === 'ta' ? 'ஆதார் மூலம் இணைக்கப்பட்டது' : 'Verified'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Review & Citizen Declaration */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">3</span>
            <span>{t.step3Title}</span>
          </h2>

          {/* Summary Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs">
            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500 font-semibold">{t.selectService}:</span>
              <span className="font-bold text-slate-900 text-right">
                {language === 'ta' ? currentService.titleTa : currentService.titleEn}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">{t.applicant}:</span>
              <span className="font-bold text-slate-900">{fullName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">{t.mobileNumber}:</span>
              <span className="font-mono font-bold text-slate-900">+91 {mobileNumber}</span>
            </div>

            {aadhaarLast4 && (
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">{t.aadhaarNumber}:</span>
                <span className="font-mono font-bold text-slate-900">XXXX-XXXX-{aadhaarLast4}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">{t.district}:</span>
              <span className="font-bold text-slate-900">{district}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500 font-semibold">{t.department}:</span>
              <span className="font-bold text-blue-900 text-right">
                {language === 'ta' ? currentService.departmentTa : currentService.departmentEn}
              </span>
            </div>

            <div className="flex justify-between pt-2 border-t border-slate-200">
              <span className="text-slate-700 font-bold">Government Service Fee:</span>
              <span className="font-bold text-emerald-800 text-sm">
                {currentService.fee === 0 ? t.free : `₹${currentService.fee}`}
              </span>
            </div>
          </div>

          {/* Declaration Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 p-3 rounded-xl border border-blue-200 bg-blue-50/40 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={declaredConsent}
                onChange={(e) => {
                  setDeclaredConsent(e.target.checked);
                  if (errors.declaredConsent) setErrors({ ...errors, declaredConsent: '' });
                }}
                className="w-5 h-5 rounded text-blue-700 mt-0.5 shrink-0 focus:ring-blue-600"
              />
              <span className="text-xs text-slate-800 leading-relaxed font-medium">
                {t.declarationAgree}
              </span>
            </label>
            {errors.declaredConsent && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1.5 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.declaredConsent}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* STEP 4: Success & Acknowledgment Receipt */}
      {currentStep === 4 && submittedApp && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-md text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-9 h-9 text-emerald-600" />
          </div>

          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {t.successTitle}
            </h2>
            <p className="text-xs text-slate-700">
              {t.successSubtitle}
            </p>
          </div>

          {/* Ref Number Card */}
          <div className="bg-emerald-50 border-2 border-dashed border-emerald-300 p-4 rounded-2xl space-y-1.5">
            <span className="text-[11px] uppercase font-bold text-emerald-800 block">
              {t.yourRefNumber}
            </span>
            <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900 tracking-wider block selection:bg-emerald-200">
              {submittedApp.id}
            </span>
            <p className="text-[11px] text-slate-700">
              {t.saveRefNotice}
            </p>
          </div>

          {/* Application actions: Track & Download */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => navigateToTrackStatus(submittedApp.id)}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 active:scale-96 transition-all"
            >
              <SearchCheck className="w-5 h-5" />
              <span>{t.trackThisNow}</span>
            </button>

            <button
              onClick={() => setViewingCertificate(submittedApp)}
              className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 flex items-center justify-center gap-2 active:scale-96 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadReceipt}</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons for Steps 1-3 */}
      {currentStep < 4 && (
        <div className="flex items-center justify-between gap-3 pt-1">
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.prevStep}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 active:scale-95 transition-all ml-auto"
          >
            <span>{currentStep === 3 ? t.submitApplication : t.nextStep}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
