import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get all assessments for the current user's organization
    const { data: assessments, error } = await supabase
      .from('compliance_assessments')
      .select(
        `
        id,
        organization_id,
        fiscal_year,
        status,
        created_at,
        submitted_at,
        reviewed_at,
        notes,
        assessment_frameworks(
          id,
          framework_id,
          status,
          progress_percentage,
          compliance_frameworks(code, name)
        )
      `
      )
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[v0] Assessment fetch error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ assessments })
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    // Create new assessment
    const { data: assessment, error } = await supabase
      .from('compliance_assessments')
      .insert({
        organization_id: body.organization_id,
        fiscal_year: body.fiscal_year,
        status: 'draft',
        notes: body.notes || '',
      })
      .select()

    if (error) {
      console.error('[v0] Assessment creation error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ assessment: assessment?.[0] }, { status: 201 })
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
