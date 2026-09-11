import { CitizenApplication, GovernmentService } from '../types';
import { SAMPLE_APPLICATIONS, GOVERNMENT_SERVICES } from './mockData';

const APPS_STORAGE_KEY = 'govmobile_applications_v1';
const PREFS_KEY = 'govmobile_user_prefs_v1';
const CACHED_SERVICES_KEY = 'govmobile_cached_services_v1';

export interface UserPreferences {
  language: 'en' | 'ta';
  dataSaver: boolean;
  simulatedOffline: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
}

const DEFAULT_PREFS: UserPreferences = {
  language: 'en',
  dataSaver: false,
  simulatedOffline: false,
  fontSize: 'normal'
};

export const StorageService = {
  getPreferences(): UserPreferences {
    try {
      const data = localStorage.getItem(PREFS_KEY);
      if (data) {
        return { ...DEFAULT_PREFS, ...JSON.parse(data) };
      }
    } catch (e) {
      console.warn('Storage read error', e);
    }
    return DEFAULT_PREFS;
  },

  savePreferences(prefs: Partial<UserPreferences>): UserPreferences {
    try {
      const current = this.getPreferences();
      const updated = { ...current, ...prefs };
      localStorage.setItem(PREFS_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.warn('Storage write error', e);
      return { ...DEFAULT_PREFS, ...prefs };
    }
  },

  getApplications(): CitizenApplication[] {
    try {
      const data = localStorage.getItem(APPS_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Storage read error for applications', e);
    }
    // Seed initial sample applications
    this.saveApplications(SAMPLE_APPLICATIONS);
    return SAMPLE_APPLICATIONS;
  },

  saveApplications(apps: CitizenApplication[]): void {
    try {
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(apps));
    } catch (e) {
      console.warn('Storage write error for applications', e);
    }
  },

  getApplicationById(refId: string): CitizenApplication | undefined {
    const cleanId = refId.trim().toUpperCase();
    const apps = this.getApplications();
    return apps.find(app => app.id.toUpperCase() === cleanId);
  },

  addApplication(newApp: Omit<CitizenApplication, 'id' | 'appliedDate' | 'lastUpdatedDate' | 'status' | 'timeline'>): CitizenApplication {
    const currentApps = this.getApplications();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `GM-2026-${randomSuffix}`;
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const nowTimeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const createdApplication: CitizenApplication = {
      ...newApp,
      id: newId,
      status: 'Submitted',
      appliedDate: todayStr,
      lastUpdatedDate: todayStr,
      officerAssigned: 'Assigned to e-Seva Verification Desk',
      timeline: [
        {
          status: 'Submitted',
          labelEn: 'Application Submitted Online',
          labelTa: 'விண்ணப்பம் இணையவழியில் சமர்ப்பிக்கப்பட்டது',
          date: `${todayStr}, ${nowTimeStr}`,
          remarkEn: 'Application recorded in state central repository. Acknowledgement generated.',
          remarkTa: 'விண்ணப்பம் மத்திய அமைப்பில் பதிவு செய்யப்பட்டது. ஒப்புகைச் சீட்டு உருவாக்கப்பட்டது.',
          completed: true,
          isCurrent: true
        },
        {
          status: 'Under Review',
          labelEn: 'Document Verification by Zonal Officer',
          labelTa: 'மண்டல அதிகாரி ஆவண சரிபார்ப்பு',
          date: 'Pending Inspection',
          remarkEn: 'Assigned for scrutiny within 3-5 working days.',
          remarkTa: '3-5 வேலை நாட்களில் சரிபார்க்கப்படும்.',
          completed: false
        },
        {
          status: 'Approved',
          labelEn: 'Digital Certificate Issuance',
          labelTa: 'டிஜிட்டல் சான்றிதழ் வழங்குதல்',
          date: 'Expected completion soon',
          remarkEn: 'Will be available for download with tamper-proof QR code.',
          remarkTa: 'QR குறியீட்டுடன் பதிவிறக்கம் செய்யக் கிடைக்கும்.',
          completed: false
        }
      ]
    };

    const updatedList = [createdApplication, ...currentApps];
    this.saveApplications(updatedList);
    return createdApplication;
  },

  // Cache services for offline mode
  getCachedServices(): GovernmentService[] {
    try {
      const data = localStorage.getItem(CACHED_SERVICES_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Cache read error', e);
    }
    // save default
    localStorage.setItem(CACHED_SERVICES_KEY, JSON.stringify(GOVERNMENT_SERVICES));
    return GOVERNMENT_SERVICES;
  }
};
