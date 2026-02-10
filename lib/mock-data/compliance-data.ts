import type { ComplianceQuestion, ProjectComplianceAssessment, FrameworkComplianceStatus, ComplianceResponse } from '@/lib/types/compliance';

// Mock Compliance Questions
export const COMPLIANCE_QUESTIONS: ComplianceQuestion[] = [
  // 2 CFR Part 200 Questions
  {
    id: 'q1',
    frameworkId: '1',
    questionNumber: '200.1',
    questionText: 'Does your organization have documented policies for procurement that comply with 2 CFR Part 200 Subpart D?',
    helpText: 'Procurement policies must ensure open and fair competition, conflict of interest management, and cost effectiveness.',
    evidenceTypes: ['document'],
    requiredEvidence: true,
    validationRules: { maxSize: 10485760, allowedTypes: ['pdf', 'docx'] },
    sortOrder: 1,
  },
  {
    id: 'q2',
    frameworkId: '1',
    questionNumber: '200.2',
    questionText: 'Are all procurement transactions documented with evidence of fair competition (bids, quotes, or justification)?',
    helpText: 'Maintain records showing competitive solicitation or documented justification for non-competitive procurements.',
    evidenceTypes: ['document', 'checkbox'],
    requiredEvidence: true,
    validationRules: {},
    sortOrder: 2,
  },
  {
    id: 'q3',
    frameworkId: '1',
    questionNumber: '200.3',
    questionText: 'Do you have documented conflict of interest policies applicable to procurement activities?',
    helpText: 'Staff involved in procurement must disclose and manage conflicts of interest per federal requirements.',
    evidenceTypes: ['document'],
    requiredEvidence: true,
    validationRules: { maxSize: 10485760 },
    sortOrder: 3,
  },
  {
    id: 'q4',
    frameworkId: '1',
    questionNumber: '200.4',
    questionText: 'Have you maintained records of all purchases and payments for federal awards for the past 3 years?',
    helpText: 'Financial records must be retained for the period required by your federal funding agency (typically 3-7 years).',
    evidenceTypes: ['document', 'checkbox'],
    requiredEvidence: true,
    validationRules: {},
    sortOrder: 4,
  },
  {
    id: 'q5',
    frameworkId: '1',
    questionNumber: '200.5',
    questionText: 'Does your organization maintain an inventory of equipment purchased with federal funds?',
    helpText: 'Equipment inventories must track cost, location, condition, and current status per 2 CFR 200.313.',
    evidenceTypes: ['document', 'numeric'],
    requiredEvidence: false,
    validationRules: {},
    sortOrder: 5,
  },
  // Commerce ST&C Questions
  {
    id: 'q6',
    frameworkId: '2',
    questionNumber: 'COM.1',
    questionText: 'Has your project met all reporting requirements specified in the Department of Commerce award?',
    helpText: 'Review your award documents for specific reporting deadlines and content requirements.',
    evidenceTypes: ['document', 'date'],
    requiredEvidence: true,
    validationRules: {},
    sortOrder: 1,
  },
  {
    id: 'q7',
    frameworkId: '2',
    questionNumber: 'COM.2',
    questionText: 'Are project milestones and deliverables being tracked and documented?',
    helpText: 'Maintain current records of all project activities, timelines, and accomplishments.',
    evidenceTypes: ['document'],
    requiredEvidence: true,
    validationRules: { maxSize: 10485760 },
    sortOrder: 2,
  },
  // OMB 0660-0047 Questions
  {
    id: 'q8',
    frameworkId: '3',
    questionNumber: 'OMB.1',
    questionText: 'Have you completed the OMB 0660-0047 Annual Report with all required data?',
    helpText: 'The OMB 0660-0047 form collects data on broadband deployment, adoption, and related activities.',
    evidenceTypes: ['document', 'date'],
    requiredEvidence: true,
    validationRules: {},
    sortOrder: 1,
  },
  // Title VI Civil Rights Act Questions
  {
    id: 'q9',
    frameworkId: '8',
    questionNumber: 'VI.1',
    questionText: 'Does your organization have a written Title VI non-discrimination policy in place?',
    helpText: 'Title VI requires that no person be excluded from programs or activities based on protected characteristics.',
    evidenceTypes: ['document'],
    requiredEvidence: true,
    validationRules: { maxSize: 10485760 },
    sortOrder: 1,
  },
  {
    id: 'q10',
    frameworkId: '8',
    questionNumber: 'VI.2',
    questionText: 'Has your organization designated a Title VI Coordinator?',
    helpText: 'A coordinator must be responsible for investigating and resolving discrimination complaints.',
    evidenceTypes: ['document', 'text'],
    requiredEvidence: true,
    validationRules: {},
    sortOrder: 2,
  },
];

// Mock Framework Compliance Status
export const MOCK_FRAMEWORK_STATUS: FrameworkComplianceStatus[] = [
  {
    frameworkId: '1',
    frameworkCode: '2CFR200',
    frameworkName: '2 CFR Part 200',
    status: 'Partially Compliant',
    progressPercentage: 60,
    questionsTotal: 5,
    questionsAnswered: 3,
    reviewedBy: 'Dr. Sarah Johnson',
    reviewedAt: '2024-02-01',
    notes: 'Procurement policies approved. Pending equipment inventory documentation.',
  },
  {
    frameworkId: '2',
    frameworkCode: 'COMMERCE',
    frameworkName: 'Department of Commerce ST&C',
    status: 'Compliant',
    progressPercentage: 100,
    questionsTotal: 2,
    questionsAnswered: 2,
    completedAt: '2024-01-28',
    reviewedAt: '2024-02-02',
    reviewedBy: 'James Wilson',
  },
  {
    frameworkId: '3',
    frameworkCode: 'OMB0660',
    frameworkName: 'OMB 0660-0047 Reports',
    status: 'Evidence Pending',
    progressPercentage: 50,
    questionsTotal: 1,
    questionsAnswered: 0,
    notes: 'Awaiting latest annual report submission.',
  },
  {
    frameworkId: '8',
    frameworkCode: 'TITLEVI',
    frameworkName: 'Title VI Civil Rights Act',
    status: 'Needs Review',
    progressPercentage: 75,
    questionsTotal: 2,
    questionsAnswered: 2,
    notes: 'Documentation submitted. Coordinator details under verification.',
  },
];

// Mock Project Assessment
export const MOCK_PROJECT_ASSESSMENT: ProjectComplianceAssessment = {
  id: 'assess-001',
  projectId: 'proj-001',
  clientId: 'client-001',
  assessmentPeriodYear: 2024,
  status: 'Under Review',
  frameworks: MOCK_FRAMEWORK_STATUS,
  createdAt: '2024-01-15',
  updatedAt: '2024-02-05',
  startedBy: 'Jane Doe',
  lastModifiedBy: 'compliance-team@example.com',
};

// Mock Responses
export const MOCK_RESPONSES: ComplianceResponse[] = [
  {
    id: 'resp-1',
    assessmentId: 'assess-001',
    questionId: 'q1',
    responseValue: {
      answer: 'Yes',
      documentName: 'Procurement_Policy_2024.pdf',
    },
    evidenceMetadata: {
      fileName: 'Procurement_Policy_2024.pdf',
      fileSize: 2048000,
      uploadDate: '2024-01-20',
    },
    status: 'Approved',
    reviewerNotes: 'Comprehensive procurement policy. Meets 2 CFR requirements.',
    reviewedBy: 'Dr. Sarah Johnson',
    reviewedAt: '2024-02-01',
  },
  {
    id: 'resp-2',
    assessmentId: 'assess-001',
    questionId: 'q2',
    responseValue: {
      answer: 'Yes',
      competitiveProcess: 'All purchases over $3,000 require competitive bidding',
    },
    status: 'Approved',
    reviewerNotes: 'Appropriate competitive process thresholds documented.',
    reviewedBy: 'Dr. Sarah Johnson',
    reviewedAt: '2024-02-01',
  },
  {
    id: 'resp-3',
    assessmentId: 'assess-001',
    questionId: 'q3',
    responseValue: {
      answer: 'Yes',
      documentName: 'COI_Policy_2024.pdf',
    },
    status: 'Approved',
    reviewerNotes: 'Conflict of interest policy meets federal standards.',
    reviewedBy: 'Dr. Sarah Johnson',
    reviewedAt: '2024-02-01',
  },
];

// Helper to calculate overall compliance status
export function calculateOverallComplianceStatus(frameworks: FrameworkComplianceStatus[]): string {
  const compliantCount = frameworks.filter(f => f.status === 'Compliant').length;
  const partiallyCount = frameworks.filter(f => f.status === 'Partially Compliant').length;
  const nonCompliantCount = frameworks.filter(f => f.status === 'Non-Compliant').length;

  if (nonCompliantCount > 0) return 'Non-Compliant';
  if (compliantCount === frameworks.length) return 'Compliant';
  if (partiallyCount > 0 || frameworks.some(f => f.status === 'Needs Review')) return 'Partially Compliant';
  return 'In Progress';
}
