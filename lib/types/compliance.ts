// TBCP Compliance Assessment Types

export type ComplianceStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Under Review' | 'Approved' | 'Non-Compliant';
export type QuestionStatus = 'Unanswered' | 'Answered' | 'Pending Review' | 'Approved' | 'Rejected';
export type ComplianceResult = 'Compliant' | 'Partially Compliant' | 'Non-Compliant' | 'Evidence Pending' | 'Needs Review';

export interface ComplianceFramework {
  id: string;
  code: string;
  name: string;
  description: string;
  category: 'Federal Requirements' | 'Administrative' | 'Financial Management' | 'Environmental' | 'Civil Rights' | 'Disability Rights';
  sortOrder: number;
}

export interface ComplianceQuestion {
  id: string;
  frameworkId: string;
  questionNumber: string;
  questionText: string;
  helpText?: string;
  evidenceTypes: ('document' | 'checkbox' | 'date' | 'numeric' | 'text')[];
  requiredEvidence: boolean;
  validationRules?: {
    maxSize?: number;
    allowedTypes?: string[];
    required?: boolean;
  };
  sortOrder: number;
}

export interface ComplianceResponse {
  id: string;
  assessmentId: string;
  questionId: string;
  responseValue: Record<string, any>;
  evidenceMetadata?: {
    fileName?: string;
    fileSize?: number;
    uploadDate?: string;
  };
  status: QuestionStatus;
  reviewerNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface FrameworkComplianceStatus {
  frameworkId: string;
  frameworkCode: string;
  frameworkName: string;
  status: ComplianceResult;
  progressPercentage: number;
  questionsTotal: number;
  questionsAnswered: number;
  completedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

export interface ProjectComplianceAssessment {
  id: string;
  projectId: string;
  clientId: string;
  assessmentPeriodYear: number;
  status: ComplianceStatus;
  frameworks: FrameworkComplianceStatus[];
  createdAt: string;
  updatedAt: string;
  startedBy?: string;
  lastModifiedBy?: string;
}

export interface ComplianceEvidence {
  id: string;
  responseId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadDate: string;
  uploadedBy: string;
  status: 'Pending Review' | 'Approved' | 'Rejected';
}

export interface ComplianceAuditLog {
  id: string;
  assessmentId: string;
  action: string;
  userId: string;
  userEmail: string;
  changes?: Record<string, any>;
  timestamp: string;
}

export const COMPLIANCE_FRAMEWORKS: ComplianceFramework[] = [
  {
    id: '1',
    code: '2CFR200',
    name: '2 CFR Part 200',
    description: 'Uniform Administrative Requirements, Cost Principles, and Audit Requirements for Federal Awards',
    category: 'Federal Requirements',
    sortOrder: 1,
  },
  {
    id: '2',
    code: 'COMMERCE',
    name: 'Department of Commerce ST&C',
    description: '15 CFR Part 14/24 - Commerce Department Standards and Conditions',
    category: 'Federal Requirements',
    sortOrder: 2,
  },
  {
    id: '3',
    code: 'OMB0660',
    name: 'OMB 0660-0047 Reports',
    description: 'Broadband Initiatives Program - Annual Report Requirements',
    category: 'Federal Requirements',
    sortOrder: 3,
  },
  {
    id: '4',
    code: '5CFR1320',
    name: '5 CFR Part 1320',
    description: 'Information Collections and Paperwork Reduction Act Compliance',
    category: 'Administrative',
    sortOrder: 4,
  },
  {
    id: '5',
    code: 'PROPERTY',
    name: 'Property & Financial Regulations',
    description: '2 CFR 200.316–326 - Real Property and Equipment Management',
    category: 'Financial Management',
    sortOrder: 5,
  },
  {
    id: '6',
    code: 'NEPA',
    name: 'National Environmental Policy Act',
    description: 'NEPA Compliance and Environmental Review Requirements',
    category: 'Environmental',
    sortOrder: 6,
  },
  {
    id: '7',
    code: 'NHPA',
    name: 'National Historic Preservation Act',
    description: '36 CFR Part 800 - Historic Property Assessment',
    category: 'Environmental',
    sortOrder: 7,
  },
  {
    id: '8',
    code: 'TITLEVI',
    name: 'Title VI Civil Rights Act',
    description: 'Title VI of the Civil Rights Act of 1964 - Non-Discrimination',
    category: 'Civil Rights',
    sortOrder: 8,
  },
  {
    id: '9',
    code: 'SECTION504',
    name: 'Section 504 Rehabilitation Act',
    description: 'Section 504 - Accessibility and Program Access Requirements',
    category: 'Disability Rights',
    sortOrder: 9,
  },
  {
    id: '10',
    code: 'ADA',
    name: 'Americans with Disabilities Act',
    description: 'ADA Title II & III - Accessibility Standards and Compliance',
    category: 'Disability Rights',
    sortOrder: 10,
  },
];
