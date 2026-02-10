// Intelligent CFR-Specific Questionnaires for TBCP Compliance

export interface QuestionnaireQuestion {
  id: string
  cfrCode: string
  category: string
  question: string
  description: string
  questionType: 'yesno' | 'multiple' | 'text' | 'date' | 'file' | 'rating'
  options?: string[]
  riskLevel: 'critical' | 'high' | 'medium' | 'low'
  guidance: string
  investorNote: string
}

// 2 CFR Part 200 - Uniform Administrative Requirements
export const CFR_2_200_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: '2cfr200-001',
    cfrCode: '2 CFR 200',
    category: 'Financial Management',
    question: 'Does your organization maintain a cost accounting system that allocates indirect costs to federal awards?',
    description: 'Requirement for maintaining cost allocation records for federal grant management',
    questionType: 'yesno',
    riskLevel: 'critical',
    guidance: 'Organizations must have documented cost accounting systems. This includes accounting for both direct and indirect costs allocated to TBCP grants.',
    investorNote: 'Critical for grant compliance. Lack of proper cost accounting is the #1 finding in federal audits.',
  },
  {
    id: '2cfr200-002',
    cfrCode: '2 CFR 200',
    category: 'Financial Management',
    question: 'Are all procurement transactions for TBCP project items conducted competitively or with documented justification?',
    description: 'Federal procurement requirements for grants exceeding thresholds',
    questionType: 'yesno',
    riskLevel: 'high',
    guidance: 'All purchases over $25,000 (or lower per your policy) must have competitive bids or documented sole-source justification.',
    investorNote: 'Demonstrates fiscal responsibility and risk management in grant spending.',
  },
  {
    id: '2cfr200-003',
    cfrCode: '2 CFR 200',
    category: 'Financial Management',
    question: 'Does your organization conduct annual independent audits that are submitted within 30 days of completion?',
    description: 'Annual audit and reporting requirement for federal awards',
    questionType: 'yesno',
    riskLevel: 'critical',
    guidance: 'Required for organizations expending $750,000+ in federal funds. Must comply with Single Audit Act.',
    investorNote: 'Essential compliance measure. Demonstrates financial transparency and accountability.',
  },
  {
    id: '2cfr200-004',
    cfrCode: '2 CFR 200',
    category: 'Records Management',
    question: 'What is your records retention period for TBCP grant documentation?',
    description: 'Document retention requirements for federal grants',
    questionType: 'multiple',
    options: ['3 years', '5 years', '7 years', 'Not established'],
    riskLevel: 'high',
    guidance: 'Minimum 3 years from last expenditure. Records must include invoices, receipts, timesheets, and proof of performance.',
    investorNote: 'Good record retention = better audit outcomes and reduced compliance risk.',
  },
  {
    id: '2cfr200-005',
    cfrCode: '2 CFR 200',
    category: 'Conflict of Interest',
    question: 'Has your organization established written conflict of interest policies covering TBCP project management?',
    description: 'Written COI policy requirement for federal grants',
    questionType: 'yesno',
    riskLevel: 'high',
    guidance: 'Policy must cover employees, board members, and contractors involved in grant decisions and procurement.',
    investorNote: 'Protects both grant and organization from ethical violations and reputational risk.',
  },
]

// TITLE VI Civil Rights
export const TITLE_VI_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: 'titlevi-001',
    cfrCode: 'Title VI',
    category: 'Non-Discrimination',
    question: 'Does your organization have a written non-discrimination policy covering all TBCP beneficiaries?',
    description: 'Title VI requires prohibition of discrimination based on race, color, national origin',
    questionType: 'yesno',
    riskLevel: 'critical',
    guidance: 'Must include: (1) statement of non-discrimination, (2) grievance procedures, (3) communication in plain language, (4) accessibility accommodations.',
    investorNote: 'Civil rights compliance is a federal mandate. Non-compliance can result in grant suspension and reputational damage.',
  },
  {
    id: 'titlevi-002',
    cfrCode: 'Title VI',
    category: 'Language Access',
    question: 'What percentage of your service area populations have limited English proficiency?',
    description: 'Assessment for language access services under Title VI',
    questionType: 'text',
    riskLevel: 'high',
    guidance: 'If >5% of population is LEP, you must provide translation/interpretation at no cost to beneficiaries.',
    investorNote: 'Demonstrates inclusive service delivery and broader market reach.',
  },
  {
    id: 'titlevi-003',
    cfrCode: 'Title VI',
    category: 'Grievance Procedures',
    question: 'Have you received any civil rights complaints or grievances in the past 2 years?',
    description: 'Track record of civil rights compliance',
    questionType: 'yesno',
    riskLevel: 'medium',
    guidance: 'Document all complaints and resolutions. Timely response (typically 30 days) is required.',
    investorNote: 'Clean compliance history strengthens investor confidence in management quality.',
  },
  {
    id: 'titlevi-004',
    cfrCode: 'Title VI',
    category: 'Access to Services',
    question: 'Are your broadband facilities and services accessible to persons with disabilities?',
    description: 'ADA-related accessibility requirements',
    questionType: 'yesno',
    riskLevel: 'high',
    guidance: 'Physical locations, websites, and services must meet ADA standards. Training staff on accessibility is required.',
    investorNote: 'Accessibility shows commitment to serving underserved populations - key to grant scoring.',
  },
]

// Section 504 Disability Rights
export const SECTION_504_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: 'sec504-001',
    cfrCode: 'Section 504',
    category: 'Disability Access',
    question: 'Has your organization designated an ADA/Section 504 compliance coordinator?',
    description: 'Requirement to designate responsible party for disability compliance',
    questionType: 'yesno',
    riskLevel: 'high',
    guidance: 'Coordinator should have authority to address complaints and implement accommodations. Contact info must be published.',
    investorNote: 'Shows institutional commitment to accessibility and liability risk management.',
  },
  {
    id: 'sec504-002',
    cfrCode: 'Section 504',
    category: 'Accessibility Plans',
    question: 'Does your broadband deployment plan include specific accessibility features for disabled users?',
    description: 'ADA-compliant broadband design requirements',
    questionType: 'yesno',
    riskLevel: 'high',
    guidance: 'Include: captioning, audio descriptions, screen reader compatibility, keyboard navigation, plain language materials.',
    investorNote: 'Demonstrates inclusive design - expands addressable market and improves outcomes.',
  },
  {
    id: 'sec504-003',
    cfrCode: 'Section 504',
    category: 'Reasonable Accommodations',
    question: 'How quickly does your organization respond to requests for reasonable accommodations?',
    description: 'Timeline for processing disability accommodation requests',
    questionType: 'multiple',
    options: ['5 business days', '10 business days', '15 business days', '>15 business days'],
    riskLevel: 'medium',
    guidance: 'Faster response = better compliance and customer satisfaction. Document all requests and outcomes.',
    investorNote: 'Quick response times reduce legal risk and improve customer retention.',
  },
]

// ADA Title II - Public Services
export const ADA_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: 'ada-001',
    cfrCode: 'ADA Title II',
    category: 'Service Accessibility',
    question: 'Are all broadband services and infrastructure meeting ADA accessibility standards?',
    description: 'Comprehensive ADA compliance for public broadband services',
    questionType: 'yesno',
    riskLevel: 'critical',
    guidance: 'Web accessibility (WCAG 2.1 AA), physical location accessibility, telecommunications relay services, materials in alternative formats.',
    investorNote: 'ADA compliance is non-negotiable for federal programs and expands addressable population.',
  },
  {
    id: 'ada-002',
    cfrCode: 'ADA Title II',
    category: 'Training',
    question: 'How often does your organization provide ADA training to employees and volunteers?',
    description: 'Staff training requirements for disability services',
    questionType: 'multiple',
    options: ['Annually', 'Every 2 years', 'At hire only', 'Not provided'],
    riskLevel: 'high',
    guidance: 'Annual training recommended. Should cover disability awareness, accessibility features, and grievance procedures.',
    investorNote: 'Well-trained staff = better service quality and fewer compliance issues.',
  },
]

// NEPA - National Environmental Policy Act
export const NEPA_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: 'nepa-001',
    cfrCode: 'NEPA',
    category: 'Environmental Review',
    question: 'Has a NEPA Environmental Assessment (EA) been completed for your TBCP infrastructure deployment?',
    description: 'Environmental review requirement for federal projects',
    questionType: 'yesno',
    riskLevel: 'critical',
    guidance: 'Required for all federal infrastructure projects. Must address environmental impacts and alternatives.',
    investorNote: 'Required federal compliance. Delays due to missing NEPA review can impact project timeline and funding.',
  },
  {
    id: 'nepa-002',
    cfrCode: 'NEPA',
    category: 'Mitigation Measures',
    question: 'What mitigation measures are in place for environmental impacts (tower installation, right-of-way, etc.)?',
    description: 'Environmental impact mitigation for broadband infrastructure',
    questionType: 'text',
    riskLevel: 'medium',
    guidance: 'Must address impacts to wetlands, historic properties, wildlife, visual aesthetics, etc.',
    investorNote: 'Good environmental practices reduce project delays and legal challenges.',
  },
]

// NHPA - National Historic Preservation Act
export const NHPA_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: 'nhpa-001',
    cfrCode: 'NHPA',
    category: 'Historic Properties',
    question: 'Have all infrastructure locations been evaluated for impacts to historic properties or tribal cultural sites?',
    description: 'Historic preservation review for infrastructure placement',
    questionType: 'yesno',
    riskLevel: 'critical',
    guidance: 'Must consult with State Historic Preservation Office (SHPO) and Native American tribes. Document all consultations.',
    investorNote: 'Tribal consultation is essential for TBCP. Failure to consult can delay projects significantly.',
  },
  {
    id: 'nhpa-002',
    cfrCode: 'NHPA',
    category: 'Tribal Consultation',
    question: 'Describe your tribal consultation process for TBCP project sites:',
    description: 'Tribal engagement and consultation procedures',
    questionType: 'text',
    riskLevel: 'critical',
    guidance: 'Must involve affected tribes early and throughout project. Document all meetings, comments, and responses.',
    investorNote: 'Strong tribal relationships = smoother permitting and project execution.',
  },
]

// OMB 0660-0047 Budget Certification
export const OMB_0660_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: 'omb0660-001',
    cfrCode: 'OMB 0660-0047',
    category: 'Budget Certification',
    question: 'Has your organization completed the mandatory OMB 0660-0047 Budget Certification?',
    description: 'Required annual budget certification for broadband grants',
    questionType: 'yesno',
    riskLevel: 'critical',
    guidance: 'Must certify that budgeted funds match actual project costs. Due annually by specific deadline.',
    investorNote: 'Failure to submit = automatic compliance violation and potential funding suspension.',
  },
  {
    id: 'omb0660-002',
    cfrCode: 'OMB 0660-0047',
    category: 'Budget Accuracy',
    question: 'What is the variance between your budget and actual expenditures?',
    description: 'Budget vs. actuals tracking',
    questionType: 'multiple',
    options: ['<5% variance', '5-10% variance', '10-15% variance', '>15% variance'],
    riskLevel: 'high',
    guidance: 'Tight variance shows good planning and cost control. High variance suggests tracking gaps.',
    investorNote: 'Budget accuracy demonstrates project management capability and financial discipline.',
  },
]

// Property & Financial Management
export const PROPERTY_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: 'property-001',
    cfrCode: 'Property Management',
    category: 'Asset Inventory',
    question: 'Does your organization maintain a detailed inventory of all TBCP assets?',
    description: 'Asset tracking and inventory management requirements',
    questionType: 'yesno',
    riskLevel: 'high',
    guidance: 'Must include: asset ID, description, cost, purchase date, location, depreciation schedule. Annual physical inventory required.',
    investorNote: 'Proper asset management = accurate financial reporting and reduced loss/theft risk.',
  },
  {
    id: 'property-002',
    cfrCode: 'Property Management',
    category: 'Depreciation',
    question: 'How are capital assets (equipment >$5,000) depreciated in your financial statements?',
    description: 'Depreciation accounting for federal assets',
    questionType: 'multiple',
    options: ['Straight-line over useful life', 'Per federal schedule', 'Accelerated', 'Not tracked'],
    riskLevel: 'medium',
    guidance: 'Use useful life based on asset type. Federal guidance recommends 5-7 years for IT equipment.',
    investorNote: 'Proper depreciation = accurate financial statements and audit compliance.',
  },
]

// Combine all questionnaires
export const ALL_CFR_QUESTIONNAIRES = {
  '2 CFR 200': CFR_2_200_QUESTIONS,
  'Title VI': TITLE_VI_QUESTIONS,
  'Section 504': SECTION_504_QUESTIONS,
  'ADA Title II': ADA_QUESTIONS,
  'NEPA': NEPA_QUESTIONS,
  'NHPA': NHPA_QUESTIONS,
  'OMB 0660-0047': OMB_0660_QUESTIONS,
  'Property Management': PROPERTY_QUESTIONS,
}

export type CFRCodeType = keyof typeof ALL_CFR_QUESTIONNAIRES

export const getCFRQuestionnaires = (cfrCode: CFRCodeType) => {
  return ALL_CFR_QUESTIONNAIRES[cfrCode] || []
}
