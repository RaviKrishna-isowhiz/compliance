import useSWR, { mutate } from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useFrameworks() {
  const { data, error, isLoading } = useSWR('/api/frameworks', fetcher)

  return {
    frameworks: data?.frameworks || [],
    isLoading,
    error,
  }
}

export function useAssessments() {
  const { data, error, isLoading } = useSWR('/api/assessments', fetcher)

  const createAssessment = async (assessmentData: {
    organization_id: string
    fiscal_year: number
    notes?: string
  }) => {
    try {
      const response = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assessmentData),
      })

      if (!response.ok) throw new Error('Failed to create assessment')

      const result = await response.json()
      mutate('/api/assessments')
      return result.assessment
    } catch (err) {
      console.error('[v0] Create assessment error:', err)
      throw err
    }
  }

  return {
    assessments: data?.assessments || [],
    isLoading,
    error,
    createAssessment,
  }
}

export function useResponses(assessmentId: string | null) {
  const { data, error, isLoading } = useSWR(
    assessmentId ? `/api/responses?assessmentId=${assessmentId}` : null,
    fetcher
  )

  const submitResponse = async (responseData: {
    assessment_id: string
    question_id: string
    response_type: string
    response_value: string
    response_text?: string
  }) => {
    try {
      const response = await fetch('/api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responseData),
      })

      if (!response.ok) throw new Error('Failed to submit response')

      const result = await response.json()
      mutate(assessmentId ? `/api/responses?assessmentId=${assessmentId}` : null)
      return result.response
    } catch (err) {
      console.error('[v0] Submit response error:', err)
      throw err
    }
  }

  const updateResponse = async (responseData: {
    id: string
    response_value: string
    response_text?: string
    status?: string
  }) => {
    try {
      const response = await fetch('/api/responses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responseData),
      })

      if (!response.ok) throw new Error('Failed to update response')

      const result = await response.json()
      mutate(assessmentId ? `/api/responses?assessmentId=${assessmentId}` : null)
      return result.response
    } catch (err) {
      console.error('[v0] Update response error:', err)
      throw err
    }
  }

  return {
    responses: data?.responses || [],
    isLoading,
    error,
    submitResponse,
    updateResponse,
  }
}

export async function seedDatabase() {
  try {
    const response = await fetch('/api/seed', {
      method: 'POST',
    })

    if (!response.ok) throw new Error('Failed to seed database')

    const result = await response.json()
    console.log('[v0] Database seeded:', result)
    mutate('/api/frameworks')
    return result
  } catch (err) {
    console.error('[v0] Seed database error:', err)
    throw err
  }
}
