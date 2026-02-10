// Per-obligation compliance assessment model
export type ComplianceStatus = 'not-assessed' | 'applicable' | 'compliant' | 'compliant-with-evidence' | 'needs-evidence' | 'non-compliant'

export interface Obligation {
  id: string
  regulation: string // e.g., "2 CFR 200", "Title VI"
  code: string // e.g., "2CFR200.1"
  title: string
  description: string
  applicability: string // Description of when this applies
}

export interface ObligationAssessment {
  id: string
  obligationId: string
  projectId: string
  status: ComplianceStatus
  isApplicable: boolean
  isCompliant: boolean | null
  evidenceRequired: boolean
  evidence: {
    uploadedFiles: string[]
    notes: string
    aiConfidence?: number // 0-100
    aiReason?: string
    reviewStatus: 'not-reviewed' | 'needs-review' | 'approved' | 'rejected'
  }
  createdAt: string
  updatedAt: string
}

export interface RegulationComplianceSummary {
  regulation: string
  totalObligations: number
  compliant: number
  needsEvidence: number
  nonCompliant: number
  notAssessed: number
  percentage: number
}

export interface ProjectComplianceSummary {
  projectId: string
  projectName: string
  clientId: string
  clientName: string
  totalObligations: number
  compliant: number
  needsEvidence: number
  nonCompliant: number
  notAssessed: number
  percentage: number
  status: 'not-started' | 'in-progress' | 'partial' | 'good' | 'great'
  regulations: RegulationComplianceSummary[]
  lastChecked: string | null
  issues: string[]
  strengths: string[]
}

// Mock data for 10 CFR codes with obligations
export const REGULATIONS = [
  {
    code: '2CFR200',
    title: '2 CFR 200: Uniform Administrative Requirements',
    obligations: [
      {
        id: 'ob-2cfr200-1',
        title: 'Financial Management System',
        description: 'Establish and maintain financial management system',
        applicability: 'All federal grant recipients'
      },
      {
        id: 'ob-2cfr200-2',
        title: 'Internal Controls',
        description: 'Implement and maintain internal controls',
        applicability: 'All federal grant recipients'
      },
      {
        id: 'ob-2cfr200-3',
        title: 'Accounting Records',
        description: 'Maintain complete accounting records',
        applicability: 'Grant recipients with $250K+ in awards'
      }
    ]
  },
  {
    code: 'DOCST&C',
    title: 'Department of Commerce ST&C',
    obligations: [
      {
        id: 'ob-doc-1',
        title: 'Broadband Deployment',
        description: 'Report broadband deployment metrics',
        applicability: 'TBCP grant recipients'
      },
      {
        id: 'ob-doc-2',
        title: 'Progress Reporting',
        description: 'Monthly progress updates to Commerce',
        applicability: 'All TBCP projects'
      }
    ]
  },
  {
    code: 'OMB0660',
    title: 'OMB 0660-0047 Reports',
    obligations: [
      {
        id: 'ob-omb-1',
        title: 'Budget Certification',
        description: 'Certify budget expenditure quarterly',
        applicability: 'All grant recipients'
      }
    ]
  },
  {
    code: 'TITLEVI',
    title: 'Title VI Civil Rights',
    obligations: [
      {
        id: 'ob-title6-1',
        title: 'Non-Discrimination Policy',
        description: 'Maintain non-discrimination policy',
        applicability: 'All federal fund recipients'
      },
      {
        id: 'ob-title6-2',
        title: 'Civil Rights Compliance',
        description: 'Ensure no discrimination in services',
        applicability: 'All federal fund recipients'
      }
    ]
  },
  {
    code: 'SECTION504',
    title: 'Section 504 Rehabilitation Act',
    obligations: [
      {
        id: 'ob-sec504-1',
        title: 'Accessibility Requirements',
        description: 'Ensure program accessibility',
        applicability: 'All programs receiving federal funds'
      }
    ]
  },
  {
    code: 'ADA',
    title: 'Americans with Disabilities Act',
    obligations: [
      {
        id: 'ob-ada-1',
        title: 'ADA Compliance',
        description: 'Provide reasonable accommodations',
        applicability: 'All employers and public entities'
      }
    ]
  },
  {
    code: 'NEPA',
    title: 'National Environmental Policy Act',
    obligations: [
      {
        id: 'ob-nepa-1',
        title: 'Environmental Assessment',
        description: 'Complete NEPA environmental assessment',
        applicability: 'Infrastructure projects >$5M'
      }
    ]
  },
  {
    code: 'NHPA',
    title: 'National Historic Preservation Act',
    obligations: [
      {
        id: 'ob-nhpa-1',
        title: 'Historic Consultation',
        description: 'Consult with tribal historic preservation officers',
        applicability: 'TBCP projects in historic areas'
      }
    ]
  },
  {
    code: 'CFR36800',
    title: '36 CFR Part 800 Archaeological',
    obligations: [
      {
        id: 'ob-cfrarch-1',
        title: 'Archaeological Review',
        description: 'Conduct archaeological surveys if required',
        applicability: 'Projects disturbing ground'
      }
    ]
  },
  {
    code: 'PROPFINANCE',
    title: 'Property & Financial Regulations',
    obligations: [
      {
        id: 'ob-propfin-1',
        title: 'Property Management',
        description: 'Maintain property inventory and controls',
        applicability: 'Recipients acquiring property >$5K'
      }
    ]
  }
]
