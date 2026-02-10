export interface ObligationResponse {
  obligationId: string
  isApplicable: boolean
  isCompliant: boolean | null
  evidenceFiles: string[]
  notes: string
}
