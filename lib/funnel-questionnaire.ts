export interface FunnelQuestion {
  id: string
  regulation: string
  obligation: string
  stage: 'applicability' | 'control' | 'effectiveness' | 'evidence'
  question: string
  hint: string
  riskLevel: 'critical' | 'high' | 'medium' | 'low'
  answers?: string[]
  nextQuestionId?: Record<string, string>
  requiresEvidence: boolean
  acceptedEvidenceTypes?: string[]
}

export interface ComplianceResponse {
  questionId: string
  answer: string
  evidence?: {
    fileName: string
    uploadedAt: string
    aiConfidence: number
    aiValidation: string
  }
  notes?: string
}

export interface RegulationFunnel {
  id: string
  code: string
  name: string
  obligations: string[]
  questions: FunnelQuestion[]
}

export const COMPLIANCE_REGULATIONS: RegulationFunnel[] = [
  {
    id: '2cfr200',
    code: '2 CFR 200',
    name: 'Uniform Administrative Requirements for Federal Awards',
    obligations: [
      'Financial Management',
      'Procurement Standards',
      'Subrecipient Monitoring',
      'Program Income',
      'Audit Requirements',
    ],
    questions: [
      {
        id: 'q1',
        regulation: '2 CFR 200',
        obligation: 'Financial Management',
        stage: 'applicability',
        question: 'Does your organization receive federal awards (grants, contracts, loans)?',
        hint: 'This is the foundation of 2 CFR 200 applicability',
        riskLevel: 'critical',
        answers: ['Yes', 'No', 'Unsure'],
        nextQuestionId: { Yes: 'q2', No: 'skip_2cfr', Unsure: 'q2' },
        requiresEvidence: false,
      },
      {
        id: 'q2',
        regulation: '2 CFR 200',
        obligation: 'Financial Management',
        stage: 'control',
        question: 'Does your organization have documented financial management policies and procedures?',
        hint: 'Must include: budgeting, accounting, asset management, audit procedures',
        riskLevel: 'critical',
        answers: ['Fully implemented', 'Partially implemented', 'Not implemented', 'Not applicable'],
        nextQuestionId: {
          'Fully implemented': 'q3',
          'Partially implemented': 'q3',
          'Not implemented': 'q4',
          'Not applicable': 'skip_2cfr',
        },
        requiresEvidence: true,
        acceptedEvidenceTypes: ['pdf', 'docx', 'xlsx'],
      },
      {
        id: 'q3',
        regulation: '2 CFR 200',
        obligation: 'Financial Management',
        stage: 'effectiveness',
        question: 'How effectively are these policies enforced? Provide evidence of implementation.',
        hint: 'Look for audit reports, compliance reviews, policy documentation with dates',
        riskLevel: 'high',
        answers: ['Evidence provided', 'Partial evidence', 'No evidence'],
        requiresEvidence: true,
        acceptedEvidenceTypes: ['pdf', 'docx', 'xlsx', 'jpg', 'png'],
      },
      {
        id: 'q4',
        regulation: '2 CFR 200',
        obligation: 'Procurement Standards',
        stage: 'applicability',
        question: 'Does your organization conduct procurements using federal funds?',
        hint: 'Procurements include: equipment, services, contractors, consultants',
        riskLevel: 'high',
        answers: ['Yes', 'No', 'Occasionally'],
        requiresEvidence: false,
      },
    ],
  },
  {
    id: 'titlevi',
    code: 'Title VI',
    name: 'Civil Rights Act of 1964',
    obligations: [
      'Non-Discrimination',
      'Accessibility Services',
      'Complaint Procedures',
      'Language Access',
    ],
    questions: [
      {
        id: 'tv1',
        regulation: 'Title VI',
        obligation: 'Non-Discrimination',
        stage: 'applicability',
        question: 'Does your organization provide services or programs open to the public?',
        hint: 'This includes any program, service, or activity',
        riskLevel: 'critical',
        answers: ['Yes', 'No'],
        requiresEvidence: false,
      },
      {
        id: 'tv2',
        regulation: 'Title VI',
        obligation: 'Non-Discrimination',
        stage: 'control',
        question: 'Do you have non-discrimination policies explicitly addressing protected classes?',
        hint: 'Protected classes: race, color, national origin',
        riskLevel: 'critical',
        answers: ['Documented policy', 'Informal practice', 'Not addressed'],
        requiresEvidence: true,
        acceptedEvidenceTypes: ['pdf', 'docx'],
      },
    ],
  },
]

export const getNextQuestion = (
  currentQuestionId: string,
  answer: string,
): string | null => {
  for (const regulation of COMPLIANCE_REGULATIONS) {
    const question = regulation.questions.find((q) => q.id === currentQuestionId)
    if (question?.nextQuestionId) {
      return question.nextQuestionId[answer] || null
    }
  }
  return null
}

export const getQuestionsForRegulation = (regulationCode: string): FunnelQuestion[] => {
  const reg = COMPLIANCE_REGULATIONS.find((r) => r.code === regulationCode)
  return reg?.questions || []
}
