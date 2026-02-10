export type ComplianceStatus = 'not-started' | 'in-progress' | 'partial' | 'good' | 'great'

export interface ComplianceResult {
  status: ComplianceStatus
  percentage: number
  issues: string[]
  positives: string[]
  lastChecked?: string
}

export interface Project {
  id: string
  name: string
  description: string
  budget: number
  spent: number
  status: ComplianceStatus
  percentage: number
  lastChecked?: string
  compliance: ComplianceResult
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    name: 'Northern Tribal Network Infrastructure',
    description: 'Broadband deployment to 12 tribal communities across Montana and Wyoming',
    budget: 5000000,
    spent: 3900000,
    status: 'good',
    percentage: 78,
    lastChecked: '2024-01-15',
    compliance: {
      status: 'good',
      percentage: 78,
      issues: [
        'NEPA documentation incomplete - requires environmental assessment for 2 sites',
        'Title VI compliance training needed for 8 staff members',
        'Section 504 accessibility plan draft pending final approval'
      ],
      positives: [
        '2 CFR Part 200 - Excellent financial controls and audit trail',
        'Civil rights non-discrimination - All vendor contracts reviewed and compliant',
        'OMB 0660-0047 - Budget certification current and accurate',
        'Property management - All assets tracked and documented'
      ]
    }
  },
  {
    id: 'proj-002',
    name: 'Digital Equity Initiative - Apache Nation',
    description: 'Digital literacy and computer lab deployment to 5 community centers',
    budget: 1200000,
    spent: 450000,
    status: 'partial',
    percentage: 45,
    lastChecked: '2024-02-01',
    compliance: {
      status: 'partial',
      percentage: 45,
      issues: [
        'ADA Title II compliance gap - Facility accessibility assessment not completed',
        'NHPA tribal consultation documentation - Only 1 of 3 consultations completed',
        'Evidence of 2 CFR 200 training completion - Missing for 5 team members',
        'Section 504 grievance procedure - Not yet established'
      ],
      positives: [
        'Vendor selection process - Compliant with federal procurement standards',
        'Budget tracking system - In place and monitored weekly'
      ]
    }
  },
  {
    id: 'proj-003',
    name: 'Rural Connectivity Backbone - Southwest Region',
    description: 'Fiber optic network connecting 8 tribal schools and health centers',
    budget: 3500000,
    spent: 0,
    status: 'not-started',
    percentage: 0,
    compliance: {
      status: 'not-started',
      percentage: 0,
      issues: [],
      positives: []
    }
  },
  {
    id: 'proj-004',
    name: 'Broadband Access - Coastal Tribal Communities',
    description: 'Wireless mesh network deployment to coastal indigenous communities',
    budget: 2800000,
    spent: 2100000,
    status: 'in-progress',
    percentage: 62,
    lastChecked: '2023-12-20',
    compliance: {
      status: 'in-progress',
      percentage: 62,
      issues: [
        'NEPA environmental review - In progress, expected completion Feb 2024',
        'Civil rights plan - Under stakeholder review',
        '2 CFR 200 subrecipient monitoring - Quarterly reviews in progress'
      ],
      positives: [
        'Financial management controls established',
        'Initial Title VI compliance screening completed',
        'Property inventory system implemented'
      ]
    }
  },
  {
    id: 'proj-005',
    name: 'Technical Support Center - Multi-Tribal',
    description: 'Regional IT support and cybersecurity training facility for tribal broadband programs',
    budget: 800000,
    spent: 720000,
    status: 'great',
    percentage: 95,
    lastChecked: '2024-01-10',
    compliance: {
      status: 'great',
      percentage: 95,
      issues: [
        'Minor: NHPA consultation records - Organize and archive current documentation'
      ],
      positives: [
        'Comprehensive 2 CFR 200 compliance - All financial controls in place',
        'Title VI - All staff trained and documentation current',
        'Section 504 - Fully accessible facility with documented procedures',
        'ADA Title II - Compliant with all public service provisions',
        'NEPA - Environmental determination completed',
        'NHPA - Tribal consultation completed with all stakeholders',
        'OMB 0660-0047 - Budget certifications filed monthly',
        'Property management - Complete asset inventory with depreciation tracking'
      ]
    }
  }
]

export function getStatusColor(status: ComplianceStatus): string {
  switch (status) {
    case 'great':
      return 'bg-emerald-100 text-emerald-800'
    case 'good':
      return 'bg-blue-100 text-blue-800'
    case 'partial':
      return 'bg-amber-100 text-amber-800'
    case 'in-progress':
      return 'bg-purple-100 text-purple-800'
    case 'not-started':
      return 'bg-slate-100 text-slate-800'
    default:
      return 'bg-slate-100 text-slate-800'
  }
}

export function getStatusLabel(status: ComplianceStatus): string {
  switch (status) {
    case 'great':
      return 'Great'
    case 'good':
      return 'Good'
    case 'partial':
      return 'Partial'
    case 'in-progress':
      return 'In Progress'
    case 'not-started':
      return 'Not Started'
    default:
      return 'Unknown'
  }
}
