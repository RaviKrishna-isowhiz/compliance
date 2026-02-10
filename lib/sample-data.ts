import type { ProjectComplianceSummary } from './compliance-model'

export const CLIENTS = [
  { id: 'client-1', name: 'Northern Tribal Authority' },
  { id: 'client-2', name: 'Coastal Broadband Coalition' },
  { id: 'client-3', name: 'Rural Tech Collective' }
]

export const SAMPLE_PROJECTS: ProjectComplianceSummary[] = [
  {
    projectId: 'proj-1',
    projectName: 'Northern Network Initiative',
    clientId: 'client-1',
    clientName: 'Northern Tribal Authority',
    totalObligations: 25,
    compliant: 20,
    needsEvidence: 3,
    nonCompliant: 2,
    notAssessed: 0,
    percentage: 82,
    status: 'good',
    regulations: [
      { regulation: '2 CFR 200', totalObligations: 3, compliant: 3, needsEvidence: 0, nonCompliant: 0, notAssessed: 0, percentage: 100 },
      { regulation: 'Title VI', totalObligations: 2, compliant: 2, needsEvidence: 0, nonCompliant: 0, notAssessed: 0, percentage: 100 },
      { regulation: 'NEPA', totalObligations: 1, compliant: 0, needsEvidence: 1, nonCompliant: 0, notAssessed: 0, percentage: 0 }
    ],
    lastChecked: 'Jan 15, 2026',
    issues: [
      'NEPA environmental assessment pending',
      'Historic preservation review incomplete'
    ],
    strengths: [
      'Strong financial controls',
      'Complete documentation',
      'Timely reporting'
    ]
  },
  {
    projectId: 'proj-2',
    projectName: 'Coastal Broadband Expansion',
    clientId: 'client-2',
    clientName: 'Coastal Broadband Coalition',
    totalObligations: 25,
    compliant: 10,
    needsEvidence: 8,
    nonCompliant: 5,
    notAssessed: 2,
    percentage: 45,
    status: 'partial',
    regulations: [
      { regulation: '2 CFR 200', totalObligations: 3, compliant: 2, needsEvidence: 1, nonCompliant: 0, notAssessed: 0, percentage: 67 },
      { regulation: 'Department of Commerce', totalObligations: 2, compliant: 0, needsEvidence: 2, nonCompliant: 0, notAssessed: 0, percentage: 0 },
      { regulation: 'NHPA', totalObligations: 1, compliant: 0, needsEvidence: 0, nonCompliant: 1, notAssessed: 0, percentage: 0 }
    ],
    lastChecked: 'Dec 20, 2025',
    issues: [
      'Tribal consultation incomplete',
      'Missing environmental documentation',
      'Financial records gap Q3 2025'
    ],
    strengths: [
      'Progress on broadband deployment',
      'Good community engagement'
    ]
  },
  {
    projectId: 'proj-3',
    projectName: 'Rural Connectivity Program',
    clientId: 'client-3',
    clientName: 'Rural Tech Collective',
    totalObligations: 25,
    compliant: 0,
    needsEvidence: 0,
    nonCompliant: 0,
    notAssessed: 25,
    percentage: 0,
    status: 'not-started',
    regulations: [
      { regulation: '2 CFR 200', totalObligations: 3, compliant: 0, needsEvidence: 0, nonCompliant: 0, notAssessed: 3, percentage: 0 }
    ],
    lastChecked: null,
    issues: [],
    strengths: []
  },
  {
    projectId: 'proj-4',
    projectName: 'Digital Equity Initiative',
    clientId: 'client-1',
    clientName: 'Northern Tribal Authority',
    totalObligations: 20,
    compliant: 15,
    needsEvidence: 4,
    nonCompliant: 1,
    notAssessed: 0,
    percentage: 78,
    status: 'good',
    regulations: [
      { regulation: '2 CFR 200', totalObligations: 3, compliant: 3, needsEvidence: 0, nonCompliant: 0, notAssessed: 0, percentage: 100 },
      { regulation: 'ADA', totalObligations: 1, compliant: 0, needsEvidence: 1, nonCompliant: 0, notAssessed: 0, percentage: 0 }
    ],
    lastChecked: 'Feb 01, 2026',
    issues: [
      'ADA accessibility audit needed'
    ],
    strengths: [
      'Excellent community outreach',
      'Strong partnerships',
      'On-budget performance'
    ]
  },
  {
    projectId: 'proj-5',
    projectName: 'Infrastructure & Support',
    clientId: 'client-2',
    clientName: 'Coastal Broadband Coalition',
    totalObligations: 15,
    compliant: 13,
    needsEvidence: 2,
    nonCompliant: 0,
    notAssessed: 0,
    percentage: 92,
    status: 'great',
    regulations: [
      { regulation: '2 CFR 200', totalObligations: 3, compliant: 3, needsEvidence: 0, nonCompliant: 0, notAssessed: 0, percentage: 100 },
      { regulation: 'OMB 0660-0047', totalObligations: 1, compliant: 1, needsEvidence: 0, nonCompliant: 0, notAssessed: 0, percentage: 100 }
    ],
    lastChecked: 'Feb 05, 2026',
    issues: [],
    strengths: [
      'Excellent financial management',
      'Complete documentation',
      'Proactive compliance approach',
      'Strong audit trail'
    ]
  }
]
