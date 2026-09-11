import { GovernmentService, CitizenApplication, SchemeItem, EmergencyContact, FaqItem } from '../types';

export const GOVERNMENT_SERVICES: GovernmentService[] = [
  {
    id: "cert-income",
    titleEn: "Income Certificate",
    titleTa: "வருமானச் சான்றிதழ்",
    category: "certificates",
    descEn: "Official proof of family income issued by Revenue Department for educational scholarships and welfare schemes.",
    descTa: "கல்வி உதவித்தொகை மற்றும் அரசு நலத்திட்டங்களுக்காக வருவாய்த் துறையால் வழங்கப்படும் அதிகாரப்பூர்வ சான்றிதழ்.",
    processingDays: 7,
    fee: 60,
    departmentEn: "Revenue & Disaster Management",
    departmentTa: "வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை",
    requiredDocsEn: ["Aadhaar Card", "Salary Slip or Income Proof", "Ration Card", "Passport Photo"],
    requiredDocsTa: ["ஆதார் அட்டை", "சம்பளச் சீட்டு அல்லது வருமான ஆவணம்", "குடும்ப அட்டை", "புகைப்படம்"],
    iconName: "FileCheck",
    popular: true
  },
  {
    id: "cert-community",
    titleEn: "Community / Caste Certificate",
    titleTa: "சாதிச் சான்றிதழ்",
    category: "certificates",
    descEn: "Essential document verifying community status (SC/ST/BC/MBC/OBC) for higher education and government exams.",
    descTa: "உயர்கல்வி மற்றும் அரசு வேலைவாய்ப்புகளுக்காக சாதிப் பிரிவை உறுதிப்படுத்தும் முக்கியமான ஆவணம்.",
    processingDays: 15,
    fee: 60,
    departmentEn: "Revenue Department",
    departmentTa: "வருவாய்த் துறை",
    requiredDocsEn: ["Parent's Community Certificate", "Applicant Transfer Certificate (TC)", "Ration Card", "Aadhaar Card"],
    requiredDocsTa: ["பெற்றோரின் சாதிச் சான்றிதழ்", "பள்ளி மாற்றுச் சான்றிதழ் (TC)", "குடும்ப அட்டை", "ஆதார் அட்டை"],
    iconName: "Users",
    popular: true
  },
  {
    id: "cert-nativity",
    titleEn: "Nativity & Residence Certificate",
    titleTa: "இருப்பிடச் சான்றிதழ்",
    category: "certificates",
    descEn: "Certifies continuous residence in the state for school admissions, college counseling, and government jobs.",
    descTa: "பள்ளி மற்றும் கல்லூரி சேர்க்கை, அரசுப் பணிகளுக்கு மாநிலத்தில் நிரந்தர வசிப்பிடத்தை உறுதி செய்கிறது.",
    processingDays: 7,
    fee: 60,
    departmentEn: "Revenue Administration",
    departmentTa: "வருவாய் நிர்வாகத் துறை",
    requiredDocsEn: ["Birth Certificate or TC", "Electricity Bill or Property Tax Receipt", "Aadhaar Card"],
    requiredDocsTa: ["பிறப்புச் சான்றிதழ் அல்லது TC", "மின் கட்டண ரசீது அல்லது சொத்து வரி ரசீது", "ஆதார் அட்டை"],
    iconName: "Home",
    popular: true
  },
  {
    id: "cert-firstgrad",
    titleEn: "First Graduate Certificate",
    titleTa: "முதல் பட்டதாரி சான்றிதழ்",
    category: "certificates",
    descEn: "Provides tuition fee exemption in higher education engineering and medical colleges for first-in-family graduates.",
    descTa: "குடும்பத்தில் முதல் பட்டதாரி மாணவர்களுக்கு உயர்கல்வி கட்டண சலுகை வழங்கும் சான்றிதழ்.",
    processingDays: 15,
    fee: 60,
    departmentEn: "Directorate of e-Governance",
    departmentTa: "மின் ஆளுமை இயக்ககம்",
    requiredDocsEn: ["Family Tree Certificate", "Father & Mother Education Proof", "Siblings TC", "Aadhaar Card"],
    requiredDocsTa: ["குடும்ப வாரிசு சான்றிதழ்", "பெற்றோரின் கல்வி ஆவணங்கள்", "உடன்பிறந்தோர் TC", "ஆதார் அட்டை"],
    iconName: "GraduationCap",
    popular: true
  },
  {
    id: "welfare-ration",
    titleEn: "Smart Family Ration Card",
    titleTa: "புதிய மின்னணு குடும்ப அட்டை",
    category: "welfare",
    descEn: "Application for new digital smart card, member addition, address change, and subsidized food grain quota.",
    descTa: "புதிய குடும்ப அட்டை, உறுப்பினர் சேர்த்தல், முகவரி மாற்றம் மற்றும் பொது விநியோக சேவைகள்.",
    processingDays: 20,
    fee: 0,
    departmentEn: "Civil Supplies & Consumer Protection",
    departmentTa: "உணவு மற்றும் நுகர்வோர் பாதுகாப்புத் துறை",
    requiredDocsEn: ["Gas Connection Bill", "Aadhaar of All Family Members", "Marriage Certificate or Surrender Slip"],
    requiredDocsTa: ["எரிவாயு இணைப்பு ரசீது", "அனைத்து குடும்ப உறுப்பினர்களின் ஆதார்", "திருமணச் சான்றிதழ்"],
    iconName: "CreditCard",
    popular: true
  },
  {
    id: "welfare-magalir",
    titleEn: "Women's Financial Rights Scheme",
    titleTa: "கலைஞர் மகளிர் உரிமைத் தொகை திட்டம்",
    category: "welfare",
    descEn: "Direct financial benefit of ₹1,000 per month deposited directly into women head of households' bank accounts.",
    descTa: "குடும்பத் தலைவிகளுக்கு மாதம் ₹1,000 வங்கி கணக்கில் நேரடியாக வழங்கும் வரலாற்றுச் சிறப்புமிக்க திட்டம்.",
    processingDays: 14,
    fee: 0,
    departmentEn: "Special Programme Implementation Dept",
    departmentTa: "சிறப்புத் திட்ட செயலாக்கத் துறை",
    requiredDocsEn: ["Smart Ration Card", "Aadhaar Card", "Bank Passbook with linked Aadhaar"],
    requiredDocsTa: ["ஸ்மார்ட் குடும்ப அட்டை", "ஆதார் அட்டை", "ஆதார் இணைக்கப்பட்ட வங்கி கணக்குப் புத்தகம்"],
    iconName: "HeartHandshake",
    popular: true
  },
  {
    id: "util-patta",
    titleEn: "View & Download Patta / Chitta",
    titleTa: "பட்டா / சிட்டா பார்வையிடல்",
    category: "revenue",
    descEn: "Instant verification of land ownership, survey number details, and rural/urban land register extracts.",
    descTa: "நிலத்தின் உரிமையாளர் பெயர், புல எண் மற்றும் நில உரிமை ஆவணங்களை உடனடியாக சரிபார்த்து பதிவிறக்கம் செய்தல்.",
    processingDays: 1,
    fee: 0,
    departmentEn: "Survey and Settlement",
    departmentTa: "நில அளவை மற்றும் பதிவேடுகள் துறை",
    requiredDocsEn: ["District & Taluk Name", "Village Name", "Survey Number / Sub-division"],
    requiredDocsTa: ["மாவட்டம் மற்றும் வட்டம்", "கிராமம் பெயர்", "புல எண் / உட்பிரிவு எண்"],
    iconName: "MapPin",
    popular: false
  },
  {
    id: "util-eb",
    titleEn: "Electricity New Connection & Bill",
    titleTa: "புதிய மின் இணைப்பு & கட்டணம்",
    category: "utilities",
    descEn: "Apply for low-tension residential electricity service connection, meter transfer, or quick bill payment.",
    descTa: "வீட்டு உபயோகத்திற்கான புதிய மின் இணைப்பு பெறுதல், மீட்டர் பெயர் மாற்றம் மற்றும் கட்டணம் செலுத்துதல்.",
    processingDays: 10,
    fee: 0,
    departmentEn: "Electricity Board (TANGEDCO)",
    departmentTa: "தமிழ்நாடு மின் உற்பத்தி மற்றும் பகிர்மான கழகம்",
    requiredDocsEn: ["Proof of Ownership / Sale Deed", "Aadhaar Card", "Property Tax Receipt"],
    requiredDocsTa: ["சொத்து உரிமைப் பத்திரம்", "ஆதார் அட்டை", "சொத்து வரி ரசீது"],
    iconName: "Zap",
    popular: false
  },
  {
    id: "comp-grievance",
    titleEn: "CM Public Grievance Helpline",
    titleTa: "முதல்வரின் தனிப்பிரிவு மக்கள் குறைதீர்ப்பு",
    category: "complaints",
    descEn: "Lodge public grievances regarding drinking water, roads, streetlights, or administrative delays directly.",
    descTa: "குடிநீர், சாலை, தெருவிளக்கு மற்றும் அரசு நிர்வாகம் தொடர்பான குறைகளை நேரடியாக மனுவாகப் பதிவு செய்ய.",
    processingDays: 15,
    fee: 0,
    departmentEn: "Chief Minister's Special Cell",
    departmentTa: "முதல்வரின் சிறப்புப் பிரிவு",
    requiredDocsEn: ["Petition Description", "Supporting Photographs / Documents", "Contact Mobile"],
    requiredDocsTa: ["மனு விவரக் குறிப்பு", "புகைப்படங்கள் / ஆதார ஆவணங்கள்", "தொடர்பு தொலைபேசி எண்"],
    iconName: "MessageSquare",
    popular: true
  }
];

export const SAMPLE_APPLICATIONS: CitizenApplication[] = [
  {
    id: "GM-2025-8842",
    serviceId: "cert-income",
    serviceTitleEn: "Income Certificate",
    serviceTitleTa: "வருமானச் சான்றிதழ்",
    applicantName: "Anitha Sundaram",
    aadhaarLast4: "5821",
    mobileNumber: "9840123456",
    district: "Chennai",
    address: "No. 42, Anna Nagar West, Chennai 600040",
    status: "Approved",
    appliedDate: "02 Sep 2026",
    lastUpdatedDate: "08 Sep 2026",
    officerAssigned: "K. Rangarajan (Tahsildar, Aminjikarai Taluk)",
    departmentEn: "Revenue & Disaster Management",
    departmentTa: "வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை",
    certificateNumber: "TN-INC-2026-99042",
    timeline: [
      {
        status: "Submitted",
        labelEn: "Application Submitted Online",
        labelTa: "விண்ணப்பம் இணையவழியில் சமர்ப்பிக்கப்பட்டது",
        date: "02 Sep 2026, 10:15 AM",
        remarkEn: "Application fee paid. Documents uploaded successfully.",
        remarkTa: "விண்ணப்பக் கட்டணம் செலுத்தப்பட்டது. ஆவணங்கள் பதிவேற்றப்பட்டன.",
        completed: true
      },
      {
        status: "Under Review",
        labelEn: "Field Verification by VAO & RI",
        labelTa: "கிராம நிர்வாக அலுவலர் கள ஆய்வு",
        date: "05 Sep 2026, 03:30 PM",
        remarkEn: "Village Administrative Officer verified residential status & family income.",
        remarkTa: "வருவாய் ஆய்வாளர் மற்றும் கிராம நிர்வாக அலுவலர் வசிப்பிடத்தை சரிபார்த்தனர்.",
        completed: true
      },
      {
        status: "Approved",
        labelEn: "Certificate Digitally Signed & Issued",
        labelTa: "சான்றிதழ் மின்னணு கையொப்பமிடப்பட்டு வழங்கப்பட்டது",
        date: "08 Sep 2026, 11:20 AM",
        remarkEn: "Tahsildar approved the certificate with QR-coded digital signature.",
        remarkTa: "வட்டாட்சியர் டிஜிட்டல் கையொப்பத்துடன் ஒப்புதல் வழங்கி உள்ளார்.",
        completed: true,
        isCurrent: true
      }
    ]
  },
  {
    id: "GM-2025-9120",
    serviceId: "cert-community",
    serviceTitleEn: "Community / Caste Certificate",
    serviceTitleTa: "சாதிச் சான்றிதழ்",
    applicantName: "Karthik Raja M.",
    aadhaarLast4: "1944",
    mobileNumber: "9789123890",
    district: "Madurai",
    address: "Plot 12, Melur Main Road, Madurai 625002",
    status: "Under Review",
    appliedDate: "07 Sep 2026",
    lastUpdatedDate: "09 Sep 2026",
    officerAssigned: "S. Muthukrishnan (Revenue Inspector, Melur)",
    departmentEn: "Revenue Department",
    departmentTa: "வருவாய்த் துறை",
    timeline: [
      {
        status: "Submitted",
        labelEn: "Application Submitted Online",
        labelTa: "விண்ணப்பம் சமர்ப்பிக்கப்பட்டது",
        date: "07 Sep 2026, 09:40 AM",
        remarkEn: "Aadhaar and TC details submitted. Assigned to Melur Taluk.",
        remarkTa: "ஆதார் மற்றும் மாற்றுச் சான்றிதழ் சமர்ப்பிக்கப்பட்டது.",
        completed: true
      },
      {
        status: "Under Review",
        labelEn: "School Records & Genealogical Verification",
        labelTa: "பள்ளி ஆவணங்கள் மற்றும் குடும்ப வரலாற்று சரிபார்ப்பு",
        date: "09 Sep 2026, 02:15 PM",
        remarkEn: "Revenue Inspector scheduled physical record cross-check.",
        remarkTa: "வருவாய் ஆய்வாளர் ஆவணங்களை சரிபார்த்துக் கொண்டிருக்கிறார்.",
        completed: true,
        isCurrent: true
      },
      {
        status: "Approved",
        labelEn: "Final Approval by Zonal Deputy Tahsildar",
        labelTa: "மண்டல துணை வட்டாட்சியர் இறுதி ஒப்புதல்",
        date: "Expected by 15 Sep 2026",
        remarkEn: "Pending final review.",
        remarkTa: "இறுதி ஒப்புதலுக்கு காத்திருக்கிறது.",
        completed: false
      }
    ]
  },
  {
    id: "GM-2025-3310",
    serviceId: "cert-firstgrad",
    serviceTitleEn: "First Graduate Certificate",
    serviceTitleTa: "முதல் பட்டதாரி சான்றிதழ்",
    applicantName: "Meenakshi Ramesh",
    aadhaarLast4: "8832",
    mobileNumber: "9444109876",
    district: "Coimbatore",
    address: "18, Gandhipuram 4th Cross, Coimbatore 641012",
    status: "Submitted",
    appliedDate: "10 Sep 2026",
    lastUpdatedDate: "10 Sep 2026",
    officerAssigned: "Helpdesk e-Seva Cell, Coimbatore North",
    departmentEn: "Directorate of e-Governance",
    departmentTa: "மின் ஆளுமை இயக்ககம்",
    timeline: [
      {
        status: "Submitted",
        labelEn: "Initial Registration & Fee Receipt",
        labelTa: "விண்ணப்பப் பதிவு மற்றும் ஒப்புகைச் சீட்டு",
        date: "10 Sep 2026, 08:30 AM",
        remarkEn: "Application queued in system. Awaiting verification queue assignment.",
        remarkTa: "விண்ணப்பம் பதிவு செய்யப்பட்டு அதிகாரியின் வரிசைக்கு அனுப்பப்பட்டது.",
        completed: true,
        isCurrent: true
      },
      {
        status: "Under Review",
        labelEn: "Family Tree Examination",
        labelTa: "குடும்ப உறுப்பினர்களின் கல்வி விவர சரிபார்ப்பு",
        date: "Pending",
        remarkEn: "Awaiting VAO desk review.",
        remarkTa: "ஆய்வுக்கு காத்திருக்கிறது.",
        completed: false
      },
      {
        status: "Approved",
        labelEn: "Sanction of Scholarship Exemption Certificate",
        labelTa: "சான்றிதழ் அனுமதி",
        date: "Pending",
        remarkEn: "Awaiting approval.",
        remarkTa: "ஒப்புதலுக்கு காத்திருக்கிறது.",
        completed: false
      }
    ]
  },
  {
    id: "GM-2025-4402",
    serviceId: "welfare-ration",
    serviceTitleEn: "Smart Ration Card Name Correction",
    serviceTitleTa: "குடும்ப அட்டை பெயர் திருத்தம்",
    applicantName: "Selvam Kumar",
    aadhaarLast4: "6612",
    mobileNumber: "9894056789",
    district: "Salem",
    address: "54, Meyyanur Main Road, Salem 636004",
    status: "Rejected",
    appliedDate: "28 Aug 2026",
    lastUpdatedDate: "03 Sep 2026",
    officerAssigned: "T. Vijayalakshmi (Taluk Supply Officer, Salem)",
    departmentEn: "Civil Supplies & Consumer Protection",
    departmentTa: "உணவு மற்றும் நுகர்வோர் பாதுகாப்புத் துறை",
    timeline: [
      {
        status: "Submitted",
        labelEn: "Application Submitted",
        labelTa: "விண்ணப்பம் சமர்ப்பிக்கப்பட்டது",
        date: "28 Aug 2026, 11:00 AM",
        remarkEn: "Online form submitted.",
        remarkTa: "விண்ணப்பம் பெறப்பட்டது.",
        completed: true
      },
      {
        status: "Rejected",
        labelEn: "Application Rejected due to Document Mismatch",
        labelTa: "ஆவணப் பொருத்தமின்மையால் விண்ணப்பம் நிராகரிக்கப்பட்டது",
        date: "03 Sep 2026, 04:45 PM",
        remarkEn: "Aadhaar name spelling differs from birth record without supporting gazette. Please resubmit with affidavit.",
        remarkTa: "ஆதார் பெயரும் பிறப்பு ஆவணப் பெயரும் பொருந்தவில்லை. புதிய உறுதிமொழியுடன் மீண்டும் விண்ணப்பிக்கவும்.",
        completed: true,
        isCurrent: true
      }
    ]
  }
];

export const SCHEMES: SchemeItem[] = [
  {
    id: "sch-1",
    titleEn: "Kalaignar Magalir Urimai Thogai",
    titleTa: "கலைஞர் மகளிர் உரிமைத் தொகை திட்டம்",
    deptEn: "Social Welfare & Women Empowerment",
    deptTa: "சமூக நலம் மற்றும் மகளிர் உரிமைத் துறை",
    benefitEn: "₹1,000 per month directly deposited to bank accounts of eligible women heads of families.",
    benefitTa: "தகுதியுள்ள குடும்பத் தலைவிகளுக்கு மாதம் ₹1,000 வங்கி கணக்கில் வரவு வைக்கப்படுகிறது.",
    eligibilityEn: "Annual family income below ₹2.5 Lakhs, annual electricity consumption below 3,600 units.",
    eligibilityTa: "ஆண்டு குடும்ப வருமானம் ₹2.5 லட்சத்திற்குள் மற்றும் குடும்ப அட்டை உள்ளவர்கள்.",
    lastDate: "Continuous Open Enrollment"
  },
  {
    id: "sch-2",
    titleEn: "Pudhumai Penn Higher Education Scheme",
    titleTa: "புதுமைப் பெண் திட்டம் (மூவலூர் ராமாமிர்தம் அம்மையார் நினைவு)",
    deptEn: "Higher Education Department",
    deptTa: "உயர்கல்வித் துறை",
    benefitEn: "₹1,000 monthly financial aid for girl students pursuing degree/diploma after govt school education.",
    benefitTa: "அரசுப் பள்ளியில் படித்து கல்லூரி செல்லும் மாணவிகளுக்கு மாதம் ₹1,000 கல்வி உதவித்தொகை.",
    eligibilityEn: "Studied 6th to 12th standard in Tamil Nadu government schools.",
    eligibilityTa: "6 முதல் 12 ஆம் வகுப்பு வரை அரசுப் பள்ளிகளில் பயின்ற மாணவிகள்.",
    lastDate: "Academic Year 2026-27"
  },
  {
    id: "sch-3",
    titleEn: "Chief Minister Comprehensive Health Insurance Scheme",
    titleTa: "முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம்",
    deptEn: "Health and Family Welfare",
    deptTa: "மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை",
    benefitEn: "Cashless cashless hospitalization cover up to ₹5,00,000 per family per year across 1,000+ empanelled hospitals.",
    benefitTa: "ஆண்டுக்கு ₹5 லட்சம் வரை கட்டணமில்லா பணமில்லா மருத்துவ சிகிச்சைக்கான காப்பீடு.",
    eligibilityEn: "Family annual income up to ₹1,20,000 in rural / urban areas with valid Smart Ration Card.",
    eligibilityTa: "ஆண்டு வருமானம் ₹1.2 லட்சத்திற்கு உட்பட்ட அனைத்து குடும்பங்கள்.",
    lastDate: "Permanent Scheme"
  },
  {
    id: "sch-4",
    titleEn: "Indira Gandhi National Old Age Pension (IGNOAP)",
    titleTa: "இந்திரா காந்தி முதியோர் ஓய்வூதியத் திட்டம்",
    deptEn: "Revenue & Social Security",
    deptTa: "வருவாய் மற்றும் சமூகப் பாதுகாப்புத் துறை",
    benefitEn: "Monthly pension of ₹1,200 with free rice and Pongal gift packages.",
    benefitTa: "மாதம் ₹1,200 உதவித்தொகை மற்றும் இலவச அரிசி.",
    eligibilityEn: "Age 60 years or above with no regular source of subsistence or earning family members.",
    eligibilityTa: "60 வயது நிரம்பிய ஆதரவற்ற முதியோர்கள்.",
    lastDate: "Always Open"
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: "call-1100",
    nameEn: "Chief Minister Helpline (CM Helpline)",
    nameTa: "முதல்வர் உதவி மையம் (CM Helpline)",
    number: "1100",
    descEn: "Toll-free public grievance, service inquiry, and citizen complaints.",
    descTa: "பொதுமக்கள் குறைகள் மற்றும் அரசு சேவைகள் குறித்த தகவல் மையம்.",
    available: "24x7 Toll-Free"
  },
  {
    id: "call-112",
    nameEn: "Emergency Unified Response (Police, Fire, Medical)",
    nameTa: "அனைத்து அவசர உதவி எண் (காவல்துறை, தீயணைப்பு, ஆம்புலன்ஸ்)",
    number: "112",
    descEn: "National emergency number for immediate life-saving support.",
    descTa: "தேசிய அளவிலான ஒருங்கிணைந்த அவசர உதவி எண்.",
    available: "24x7 Immediate"
  },
  {
    id: "call-181",
    nameEn: "Women Helpline",
    nameTa: "பெண்கள் உதவி மையம்",
    number: "181",
    descEn: "Support for women facing domestic violence, harassment, or in distress.",
    descTa: "பெண்களுக்கு எதிரான வன்முறைகள் மற்றும் அவசர உதவிக்கான பிரத்யேக எண்.",
    available: "24x7 Toll-Free"
  },
  {
    id: "call-108",
    nameEn: "Free Ambulance Service",
    nameTa: "இலவச ஆம்புலன்ஸ் சேவை",
    number: "108",
    descEn: "Free emergency hospital transport and accident trauma response.",
    descTa: "மருத்துவ அவசர ஊர்தி சேவை மற்றும் விபத்து சிகிச்சை உதவி.",
    available: "24x7 Toll-Free"
  },
  {
    id: "call-14567",
    nameEn: "Elder Line (Senior Citizens)",
    nameTa: "முதியோர் உதவி மையம்",
    number: "14567",
    descEn: "Legal aid, rescue, abuse reporting, and emotional support for elders.",
    descTa: "முதியோர்களுக்கான சட்ட ஆலோசனை, பாதுகாப்பு மற்றும் உதவி மையம்.",
    available: "8 AM - 8 PM"
  },
  {
    id: "call-1098",
    nameEn: "Childline Helpline",
    nameTa: "குழந்தைகள் உதவி மையம்",
    number: "1098",
    descEn: "Protection for children in distress, child labor, and rights violations.",
    descTa: "குழந்தைகள் பாதுகாப்பு மற்றும் பராமரிப்புக்கான அவசர எண்.",
    available: "24x7 Toll-Free"
  }
];

export const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    questionEn: "How do I check my application status?",
    questionTa: "எனது விண்ணப்பத்தின் நிலையை எப்படி அறிவது?",
    answerEn: "Go to the 'Track Status' tab, enter your Application Reference Number (e.g., GM-2025-8842), and tap 'Track Application' to see the real-time stage.",
    answerTa: "'விண்ணப்ப நிலை' பகுதிக்குச் சென்று, உங்கள் குறிப்பு எண்ணை (எ.கா: GM-2025-8842) உள்ளிட்டு 'நிலையைச் சரிபார்க்க' பொத்தானை அழுத்தவும்."
  },
  {
    id: "faq-2",
    questionEn: "What happens if I lose internet connection while using GovMobile?",
    questionTa: "இணைய இணைப்பு துண்டிக்கப்பட்டால் என்ன நடக்கும்?",
    answerEn: "GovMobile operates in Offline Mode automatically! Basic service guides, downloaded receipts, and emergency numbers are stored locally on your device.",
    answerTa: "GovMobile தானாகவே ஆஃப்லைன் பயன்முறையில் இயங்கும்! சேவை வழிகாட்டிகள், முன்பே பதிவிறக்கிய ரசீதுகள் மற்றும் அவசர எண்கள் எப்போதும் கிடைக்கும்."
  },
  {
    id: "faq-3",
    questionEn: "What does 'Data Saver Mode' do?",
    questionTa: "'தரவு சேமிப்பு' பயன்முறை என்ன செய்கிறது?",
    answerEn: "It turns off high-bandwidth elements and animations, minimizing mobile data usage by over 80%, so the portal loads instantaneously even on 2G/3G networks.",
    answerTa: "இது அனிமேஷன்கள் மற்றும் கூடுதல் தரவு பயன்பாட்டை நிறுத்தி, 2G அல்லது 3G போன்ற குறைந்த வேக இணையத்திலும் தளம் வேகமாக செயல்பட வழிசெய்கிறது."
  },
  {
    id: "faq-4",
    questionEn: "Can I download my approved certificate directly on mobile?",
    questionTa: "ஒப்புதல் பெற்ற சான்றிதழை மொபைலிலேயே பதிவிறக்க முடியுமா?",
    answerEn: "Yes! Once an application status is 'Approved', a 'Download Official Certificate' button appears with a QR-verifiable digital document.",
    answerTa: "ஆம்! உங்கள் விண்ணப்பம் 'ஒப்புதல் அளிக்கப்பட்டது' என வந்தவுடன், QR குறியீட்டுடன் கூடிய சான்றிதழை உடனே பதிவிறக்கம் செய்யலாம்."
  }
];

export const DISTRICTS = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Tiruchirappalli",
  "Salem",
  "Tirunelveli",
  "Thanjavur",
  "Vellore",
  "Erode",
  "Kanchipuram",
  "Cuddalore",
  "Dindigul",
  "Tiruvannamalai",
  "Dharmapuri",
  "Nilgiris",
  "Kanyakumari",
  "Theni",
  "Karur",
  "Nagapattinam",
  "Villupuram"
];
