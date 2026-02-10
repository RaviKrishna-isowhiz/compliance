/**
 * Compliance Status Logic
 * Handles calculation of compliance status, progress tracking, and reporting
 */

export type ComplianceStatus = 'compliant' | 'partial' | 'non_compliant' | 'not_started' | 'evidence_pending' | 'needs_review'

export interface FrameworkStatus {
  id: string
  framework_id: string
  status: ComplianceStatus
  progress_percentage: number
  reviewer_comments?: string
}

export interface AssessmentStatus {
  id: string
  status: 'draft' | 'in_progress' | 'submitted' | 'under_review' | 'approved' | 'rejected'
  frameworks: FrameworkStatus[]
  progress_percentage: number
  overall_compliance: ComplianceStatus
}

/**
 * Calculate overall compliance status from framework statuses
 */
export function calculateOverallCompliance(frameworks: FrameworkStatus[]): ComplianceStatus {
  if (frameworks.length === 0) return 'not_started'

  const statuses = frameworks.map((f) => f.status)

  // All compliant = compliant
  if (statuses.every((s) => s === 'compliant')) {
    return 'compliant'
  }

  // Any non-compliant = non-compliant
  if (statuses.some((s) => s === 'non_compliant')) {
    return 'non_compliant'
  }

  // Has evidence pending or needs review = needs_review
  if (statuses.some((s) => s === 'evidence_pending' || s === 'needs_review')) {
    return 'needs_review'
  }

  // Mix of compliant and partial = partial
  if (statuses.some((s) => s === 'partial')) {
    return 'partial'
  }

  // Otherwise = not started
  return 'not_started'
}

/**
 * Calculate overall progress percentage
 */
export function calculateProgressPercentage(frameworks: FrameworkStatus[]): number {
  if (frameworks.length === 0) return 0

  const totalProgress = frameworks.reduce((sum, f) => sum + f.progress_percentage, 0)
  return Math.round(totalProgress / frameworks.length)
}

/**
 * Get status badge styling
 */
export function getStatusStyling(status: ComplianceStatus) {
  const styles: Record<ComplianceStatus, { bg: string; border: string; text: string; badge: string }> = {
    compliant: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-900',
      badge: 'bg-green-100 text-green-800',
    },
    partial: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-900',
      badge: 'bg-yellow-100 text-yellow-800',
    },
    non_compliant: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-900',
      badge: 'bg-red-100 text-red-800',
    },
    not_started: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-900',
      badge: 'bg-gray-100 text-gray-800',
    },
    evidence_pending: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900',
      badge: 'bg-blue-100 text-blue-800',
    },
    needs_review: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-900',
      badge: 'bg-orange-100 text-orange-800',
    },
  }

  return styles[status]
}

/**
 * Get status label for display
 */
export function getStatusLabel(status: ComplianceStatus): string {
  const labels: Record<ComplianceStatus, string> = {
    compliant: 'Compliant',
    partial: 'Partially Compliant',
    non_compliant: 'Non-Compliant',
    not_started: 'Not Started',
    evidence_pending: 'Evidence Pending',
    needs_review: 'Needs Review',
  }

  return labels[status]
}

/**
 * Determine if assessment is complete
 */
export function isAssessmentComplete(assessment: AssessmentStatus): boolean {
  return (
    assessment.status === 'approved' ||
    assessment.status === 'rejected' ||
    (assessment.status === 'submitted' && assessment.overall_compliance !== 'needs_review')
  )
}

/**
 * Get assessment action status
 */
export function getAssessmentActionStatus(assessment: AssessmentStatus): string {
  switch (assessment.status) {
    case 'draft':
      return 'In Progress - Save your responses'
    case 'in_progress':
      return 'In Progress - Complete all required fields'
    case 'submitted':
      return 'Under Review - Awaiting reviewer approval'
    case 'under_review':
      return 'Under Review - Administrator is reviewing'
    case 'approved':
      return 'Approved - Assessment passed compliance review'
    case 'rejected':
      return 'Rejected - Please address feedback and resubmit'
    default:
      return 'Unknown Status'
  }
}

/**
 * Generate compliance report summary
 */
export function generateComplianceSummary(assessment: AssessmentStatus) {
  const compliantCount = assessment.frameworks.filter((f) => f.status === 'compliant').length
  const partialCount = assessment.frameworks.filter((f) => f.status === 'partial').length
  const nonCompliantCount = assessment.frameworks.filter((f) => f.status === 'non_compliant').length
  const pendingCount = assessment.frameworks.filter((f) =>
    ['not_started', 'evidence_pending', 'needs_review'].includes(f.status)
  ).length

  return {
    totalFrameworks: assessment.frameworks.length,
    compliantCount,
    partialCount,
    nonCompliantCount,
    pendingCount,
    compliancePercentage: Math.round((compliantCount / assessment.frameworks.length) * 100),
    overallStatus: assessment.overall_compliance,
    isComplete: isAssessmentComplete(assessment),
  }
}

/**
 * Identify frameworks requiring attention
 */
export function getFrameworksRequiringAttention(frameworks: FrameworkStatus[]): FrameworkStatus[] {
  return frameworks.filter((f) => ['non_compliant', 'evidence_pending', 'needs_review'].includes(f.status))
}

/**
 * Calculate days until deadline based on assessment date
 */
export function calculateDaysToDeadline(submittedAt: Date | null): number | null {
  if (!submittedAt) return null

  const deadline = new Date(submittedAt)
  deadline.setDate(deadline.getDate() + 30) // 30-day review period

  const today = new Date()
  const daysRemaining = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return daysRemaining > 0 ? daysRemaining : 0
}

/**
 * Format compliance status for audit log
 */
export function formatStatusChange(
  oldStatus: ComplianceStatus,
  newStatus: ComplianceStatus
): string {
  return `Status changed from ${getStatusLabel(oldStatus)} to ${getStatusLabel(newStatus)}`
}

/**
 * Validate response data for compliance
 */
export function validateResponseData(response: {
  response_type: string
  response_value?: string
  response_text?: string
}): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!response.response_type) {
    errors.push('Response type is required')
  }

  if (response.response_type === 'yes' || response.response_type === 'no') {
    if (!response.response_value) {
      errors.push('Response value is required')
    }
  }

  if (response.response_type === 'text' || response.response_type === 'multiple_choice') {
    if (!response.response_text || response.response_text.trim().length === 0) {
      errors.push('Response text is required')
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Calculate compliance score based on responses
 */
export function calculateComplianceScore(
  responses: Array<{
    status: 'approved' | 'rejected' | 'needs_revision' | 'draft' | 'submitted'
  }>
): number {
  if (responses.length === 0) return 0

  const approvedCount = responses.filter((r) => r.status === 'approved').length
  return Math.round((approvedCount / responses.length) * 100)
}
