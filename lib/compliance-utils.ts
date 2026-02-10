import type { FrameworkComplianceStatus, ComplianceResponse } from '@/lib/types/compliance';

/**
 * Calculate the status of a framework based on question responses
 */
export function calculateFrameworkStatus(
  responses: ComplianceResponse[],
  totalQuestions: number
): FrameworkComplianceStatus['status'] {
  if (responses.length === 0) {
    return 'Not Started';
  }

  const answeredQuestions = responses.filter(r => r.status !== 'Unanswered').length;
  const approvedQuestions = responses.filter(r => r.status === 'Approved').length;
  const rejectedQuestions = responses.filter(r => r.status === 'Rejected').length;
  const pendingQuestions = responses.filter(r => r.status === 'Pending Review').length;

  // If any question is rejected
  if (rejectedQuestions > 0) {
    return 'Non-Compliant';
  }

  // All questions answered and all approved
  if (answeredQuestions === totalQuestions && approvedQuestions === totalQuestions) {
    return 'Compliant';
  }

  // Not all questions answered
  if (answeredQuestions < totalQuestions) {
    if (pendingQuestions > 0) {
      return 'Evidence Pending';
    }
    return 'Needs Review';
  }

  // Some approved, some pending
  if (approvedQuestions >= Math.ceil(totalQuestions * 0.7) && pendingQuestions === 0) {
    return 'Partially Compliant';
  }

  // Pending review or needs review
  if (pendingQuestions > 0) {
    return 'Needs Review';
  }

  return 'Partially Compliant';
}

/**
 * Calculate progress percentage for a framework
 */
export function calculateFrameworkProgress(
  responses: ComplianceResponse[],
  totalQuestions: number
): number {
  if (totalQuestions === 0) return 0;
  const answeredCount = responses.filter(r => r.status !== 'Unanswered').length;
  return Math.round((answeredCount / totalQuestions) * 100);
}

/**
 * Validate file size against maximum allowed
 */
export function validateFileSize(fileSize: number, maxSizeBytes: number): boolean {
  return fileSize <= maxSizeBytes;
}

/**
 * Validate file type against allowed types
 */
export function validateFileType(fileName: string, allowedTypes: string[]): boolean {
  const fileExtension = fileName.split('.').pop()?.toLowerCase();
  return allowedTypes.includes(fileExtension || '');
}

/**
 * Format file size for display (bytes to human readable)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Calculate overall assessment compliance score
 */
export function calculateOverallComplianceScore(frameworks: FrameworkComplianceStatus[]): number {
  if (frameworks.length === 0) return 0;
  
  const totalProgress = frameworks.reduce((sum, f) => sum + f.progressPercentage, 0);
  return Math.round(totalProgress / frameworks.length);
}

/**
 * Determine overall assessment status based on frameworks
 */
export function calculateOverallAssessmentStatus(
  frameworks: FrameworkComplianceStatus[]
): 'Compliant' | 'Partially Compliant' | 'Non-Compliant' | 'In Progress' {
  if (frameworks.length === 0) return 'In Progress';

  const nonCompliantCount = frameworks.filter(f => f.status === 'Non-Compliant').length;
  const compliantCount = frameworks.filter(f => f.status === 'Compliant').length;
  const needsReviewCount = frameworks.filter(f => 
    f.status === 'Needs Review' || f.status === 'Evidence Pending'
  ).length;

  // If any framework is non-compliant
  if (nonCompliantCount > 0) {
    return 'Non-Compliant';
  }

  // If all frameworks are compliant
  if (compliantCount === frameworks.length) {
    return 'Compliant';
  }

  // If any framework needs review or evidence
  if (needsReviewCount > 0) {
    return 'In Progress';
  }

  // Otherwise, partially compliant
  return 'Partially Compliant';
}

/**
 * Get status badge color/styling classes
 */
export function getStatusColorClasses(status: string): string {
  switch (status) {
    case 'Compliant':
      return 'bg-green-50 border-green-200 text-green-900';
    case 'Partially Compliant':
      return 'bg-yellow-50 border-yellow-200 text-yellow-900';
    case 'Non-Compliant':
      return 'bg-red-50 border-red-200 text-red-900';
    case 'Evidence Pending':
      return 'bg-blue-50 border-blue-200 text-blue-900';
    case 'Needs Review':
      return 'bg-orange-50 border-orange-200 text-orange-900';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-900';
  }
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date and time for display
 */
export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get status badge variant for UI components
 */
export function getStatusBadgeVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'Compliant':
      return 'secondary';
    case 'Non-Compliant':
      return 'destructive';
    case 'Evidence Pending':
    case 'Needs Review':
      return 'outline';
    default:
      return 'default';
  }
}

/**
 * Count frameworks by status
 */
export function countFrameworksByStatus(frameworks: FrameworkComplianceStatus[]): Record<string, number> {
  return {
    compliant: frameworks.filter(f => f.status === 'Compliant').length,
    partiallyCompliant: frameworks.filter(f => f.status === 'Partially Compliant').length,
    nonCompliant: frameworks.filter(f => f.status === 'Non-Compliant').length,
    evidencePending: frameworks.filter(f => f.status === 'Evidence Pending').length,
    needsReview: frameworks.filter(f => f.status === 'Needs Review').length,
  };
}

/**
 * Generate summary statistics for a compliance assessment
 */
export function generateAssessmentSummary(frameworks: FrameworkComplianceStatus[]): {
  totalFrameworks: number;
  compliantFrameworks: number;
  percentageCompliant: number;
  averageProgress: number;
  frameworksNeedingAttention: number;
} {
  const compliantCount = frameworks.filter(f => f.status === 'Compliant').length;
  const needsAttentionCount = frameworks.filter(f => 
    f.status === 'Needs Review' || f.status === 'Evidence Pending' || f.status === 'Non-Compliant'
  ).length;
  const averageProgress = frameworks.length > 0
    ? Math.round(frameworks.reduce((sum, f) => sum + f.progressPercentage, 0) / frameworks.length)
    : 0;

  return {
    totalFrameworks: frameworks.length,
    compliantFrameworks: compliantCount,
    percentageCompliant: frameworks.length > 0 ? Math.round((compliantCount / frameworks.length) * 100) : 0,
    averageProgress,
    frameworksNeedingAttention: needsAttentionCount,
  };
}

/**
 * Validate response completeness before submission
 */
export function validateResponseCompleteness(
  responseValue: Record<string, any>,
  requiredEvidence: boolean
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check if response value is not empty
  if (!responseValue || Object.keys(responseValue).length === 0) {
    errors.push('Response cannot be empty');
  }

  // Check if answer is provided
  if (!responseValue.answer && !responseValue.explanation && !responseValue.date) {
    errors.push('Please provide an answer');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
