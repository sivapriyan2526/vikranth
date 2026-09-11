import React from 'react';
import { useApp } from '../context/AppContext';
import { CitizenApplication } from '../types';
import { 
  X, 
  Download, 
  Printer, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';

interface DocumentModalProps {
  application: CitizenApplication;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ application, onClose }) => {
  const { language } = useApp();

  const isApproved = application.status === 'Approved';
  const certNumber = application.certificateNumber || `TN-EGOV-${application.id.replace(/[^0-9]/g, '')}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-auto border border-slate-200">
        {/* Top Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-sm sm:text-base">
              {isApproved 
                ? (language === 'ta' ? 'அதிகாரப்பூர்வ டிஜிட்டல் சான்றிதழ்' : 'Official Digital Certificate') 
                : (language === 'ta' ? 'விண்ணப்ப ஒப்புகைச் சீட்டு' : 'Application Acknowledgement Receipt')}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Paper Container */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto space-y-4 bg-amber-50/30">
          {/* Certificate Border Frame */}
          <div className="border-4 border-double border-slate-800 p-5 sm:p-6 rounded-lg bg-white relative shadow-sm">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none select-none">
              <Building2 className="w-64 h-64 text-slate-900" />
            </div>

            {/* Official Header */}
            <div className="text-center pb-3 border-b-2 border-slate-300 space-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 border border-slate-300 text-slate-800 font-bold mb-1">
                <Building2 className="w-7 h-7 text-blue-900" />
              </div>
              <h2 className="text-xs sm:text-sm font-bold tracking-wider text-slate-800 uppercase">
                GOVERNMENT OF TAMIL NADU / தமிழ்நாடு அரசு
              </h2>
              <h1 className="text-sm sm:text-base font-extrabold text-blue-950 uppercase tracking-tight">
                {application.departmentEn}
              </h1>
              <p className="text-[11px] text-slate-700">
                DIRECTORATE OF e-GOVERNANCE • TNeGA
              </p>
            </div>

            {/* Certificate Title */}
            <div className="text-center my-3 bg-blue-50/80 py-1.5 px-3 rounded-md border border-blue-100">
              <h3 className="text-sm sm:text-base font-bold text-blue-900">
                {isApproved ? application.serviceTitleEn : `ACKNOWLEDGEMENT: ${application.serviceTitleEn}`}
              </h3>
              <p className="text-xs font-semibold text-slate-800">
                {application.serviceTitleTa}
              </p>
            </div>

            {/* Metadata Bar */}
            <div className="grid grid-cols-2 gap-2 text-xs py-2 px-3 bg-slate-50 rounded border border-slate-200">
              <div>
                <span className="text-slate-600 block text-[10px] uppercase font-bold">Certificate / Ref No:</span>
                <span className="font-mono font-bold text-blue-900">{certNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-600 block text-[10px] uppercase font-bold">Issue / Applied Date:</span>
                <span className="font-medium text-slate-800">{application.appliedDate}</span>
              </div>
            </div>

            {/* Certificate Content / Body */}
            <div className="mt-4 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
              <p>
                This is to certify that <strong>Thiru/Tmt. {application.applicantName}</strong>, residing at{' '}
                <span className="underline font-medium">{application.address}</span> in{' '}
                <strong>{application.district} District</strong>, has been officially verified by the designated revenue authorities.
              </p>

              <div className="py-2 border-y border-slate-100 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Applicant ID / Mobile:</span>
                  <span className="font-mono font-semibold text-slate-800">+91 {application.mobileNumber}</span>
                </div>
                {application.aadhaarLast4 && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Aadhaar (Masked):</span>
                    <span className="font-mono font-semibold text-slate-800">XXXX-XXXX-{application.aadhaarLast4}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600">Assigned Verification Officer:</span>
                  <span className="font-semibold text-slate-800">{application.officerAssigned}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Current Status:</span>
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {application.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Official QR Code & Digital Signature */}
            <div className="mt-5 pt-3 border-t-2 border-slate-300 flex items-end justify-between gap-3">
              <div className="text-center p-1.5 bg-white border border-slate-300 rounded">
                <QrCode className="w-14 h-14 text-slate-900 mx-auto" />
                <span className="text-[9px] text-slate-600 font-mono block mt-0.5">Scan to Verify</span>
              </div>

              <div className="text-right space-y-1">
                <div className="inline-block border border-emerald-600 bg-emerald-50 px-2 py-1 rounded text-left">
                  <span className="text-[10px] font-bold text-emerald-800 block flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Digitally Signed
                  </span>
                  <span className="text-[9px] text-slate-700 block font-mono">
                    Time: {application.lastUpdatedDate} 11:20 IST
                  </span>
                </div>
                <p className="text-[10px] text-slate-600">
                  Seal of Competent Authority
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>{language === 'ta' ? 'அச்சிடு' : 'Print'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/70 transition-all"
            >
              {language === 'ta' ? 'மூடு' : 'Close'}
            </button>
            <button
              onClick={() => {
                alert(language === 'ta' ? 'சான்றிதழ் பதிவிறக்கம் தொடங்குகிறது...' : 'Downloading PDF copy to your device...');
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 shadow-sm transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'ta' ? 'பதிவிறக்கம் செய்' : 'Download PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
