export type Language = 'en' | 'ta';

export type NavTab = 'home' | 'services' | 'apply' | 'applications' | 'status' | 'help';

export type ServiceCategory = 'all' | 'certificates' | 'welfare' | 'revenue' | 'utilities' | 'complaints';

export type ApplicationStatusType = 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';

export interface GovernmentService {
  id: string;
  titleEn: string;
  titleTa: string;
  category: ServiceCategory;
  descEn: string;
  descTa: string;
  processingDays: number;
  fee: number; // 0 = Free
  departmentEn: string;
  departmentTa: string;
  requiredDocsEn: string[];
  requiredDocsTa: string[];
  iconName: string;
  popular?: boolean;
}

export interface StatusTimelineStep {
  status: ApplicationStatusType | 'Initial Registration';
  labelEn: string;
  labelTa: string;
  date: string;
  remarkEn: string;
  remarkTa: string;
  completed: boolean;
  isCurrent?: boolean;
}

export interface CitizenApplication {
  id: string; // e.g. GM-2025-8842
  serviceId: string;
  serviceTitleEn: string;
  serviceTitleTa: string;
  applicantName: string;
  aadhaarLast4?: string;
  mobileNumber: string;
  district: string;
  address: string;
  status: ApplicationStatusType;
  appliedDate: string;
  lastUpdatedDate: string;
  officerAssigned: string;
  departmentEn: string;
  departmentTa: string;
  certificateNumber?: string;
  timeline: StatusTimelineStep[];
  additionalData?: Record<string, string>;
}

export interface SchemeItem {
  id: string;
  titleEn: string;
  titleTa: string;
  deptEn: string;
  deptTa: string;
  benefitEn: string;
  benefitTa: string;
  eligibilityEn: string;
  eligibilityTa: string;
  lastDate: string;
}

export interface EmergencyContact {
  id: string;
  nameEn: string;
  nameTa: string;
  number: string;
  descEn: string;
  descTa: string;
  available: string;
}

export interface FaqItem {
  id: string;
  questionEn: string;
  questionTa: string;
  answerEn: string;
  answerTa: string;
}
