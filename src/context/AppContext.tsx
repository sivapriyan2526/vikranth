import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, NavTab, GovernmentService, CitizenApplication } from '../types';
import { translations } from '../translations';
import { StorageService } from '../services/storage';
import { GOVERNMENT_SERVICES } from '../services/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  dataSaver: boolean;
  setDataSaver: (val: boolean) => void;
  simulatedOffline: boolean;
  setSimulatedOffline: (val: boolean) => void;
  isEffectiveOnline: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  selectedService: GovernmentService | null;
  setSelectedService: (svc: GovernmentService | null) => void;
  activeTrackRef: string;
  setActiveTrackRef: (ref: string) => void;
  viewingCertificate: CitizenApplication | null;
  setViewingCertificate: (app: CitizenApplication | null) => void;
  applications: CitizenApplication[];
  refreshApplications: () => void;
  submitApplication: (data: Omit<CitizenApplication, 'id' | 'appliedDate' | 'lastUpdatedDate' | 'status' | 'timeline'>) => CitizenApplication;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  t: typeof translations['en'];
  cachedServices: GovernmentService[];
  navigateToServiceApply: (service: GovernmentService) => void;
  navigateToTrackStatus: (refId?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialPrefs] = useState(() => StorageService.getPreferences());
  const [language, setLanguageState] = useState<Language>(initialPrefs.language);
  const [dataSaver, setDataSaverState] = useState<boolean>(initialPrefs.dataSaver);
  const [simulatedOffline, setSimulatedOfflineState] = useState<boolean>(initialPrefs.simulatedOffline);
  const [fontSize, setFontSizeState] = useState<'normal' | 'large' | 'xlarge'>(initialPrefs.fontSize);

  const [realOnline, setRealOnline] = useState<boolean>(navigator.onLine ?? true);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedService, setSelectedService] = useState<GovernmentService | null>(null);
  const [activeTrackRef, setActiveTrackRef] = useState<string>('');
  const [viewingCertificate, setViewingCertificate] = useState<CitizenApplication | null>(null);
  const [applications, setApplications] = useState<CitizenApplication[]>(() => StorageService.getApplications());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cachedServices] = useState<GovernmentService[]>(() => StorageService.getCachedServices());

  // Listen to browser network changes
  useEffect(() => {
    const handleOnline = () => setRealOnline(true);
    const handleOffline = () => setRealOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const isEffectiveOnline = realOnline && !simulatedOffline;

  // Language setter with storage sync & html lang attribute
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    StorageService.savePreferences({ language: lang });
    document.documentElement.lang = lang;
  }, []);

  // Data saver setter
  const setDataSaver = useCallback((val: boolean) => {
    setDataSaverState(val);
    StorageService.savePreferences({ dataSaver: val });
  }, []);

  // Simulated offline setter
  const setSimulatedOffline = useCallback((val: boolean) => {
    setSimulatedOfflineState(val);
    StorageService.savePreferences({ simulatedOffline: val });
  }, []);

  // Font size setter
  const setFontSize = useCallback((size: 'normal' | 'large' | 'xlarge') => {
    setFontSizeState(size);
    StorageService.savePreferences({ fontSize: size });
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }, []);

  const refreshApplications = useCallback(() => {
    const apps = StorageService.getApplications();
    setApplications(apps);
  }, []);

  const submitApplication = useCallback((data: Omit<CitizenApplication, 'id' | 'appliedDate' | 'lastUpdatedDate' | 'status' | 'timeline'>) => {
    const created = StorageService.addApplication(data);
    refreshApplications();
    return created;
  }, [refreshApplications]);

  const navigateToServiceApply = useCallback((service: GovernmentService) => {
    setSelectedService(service);
    setActiveTab('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToTrackStatus = useCallback((refId?: string) => {
    if (refId) {
      setActiveTrackRef(refId);
    }
    setActiveTab('status');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        dataSaver,
        setDataSaver,
        simulatedOffline,
        setSimulatedOffline,
        isEffectiveOnline,
        fontSize,
        setFontSize,
        selectedService,
        setSelectedService,
        activeTrackRef,
        setActiveTrackRef,
        viewingCertificate,
        setViewingCertificate,
        applications,
        refreshApplications,
        submitApplication,
        toastMessage,
        showToast,
        t,
        cachedServices: cachedServices.length > 0 ? cachedServices : GOVERNMENT_SERVICES,
        navigateToServiceApply,
        navigateToTrackStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
