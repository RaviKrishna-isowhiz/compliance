import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    const { response_id, action, comments } = body

    if (!response_id || !action) {
      return NextResponse.json({ error: 'response_id and action required' }, { status: 400 })
    }

    // Get the response to update
    const { data: response, error: fetchError } = await supabase
      .from('compliance_responses')
      .select('id, assessment_id, status')
      .eq('id', response_id)
      .single()

    if (fetchError || !response) {
      console.error('[v0] Response fetch error:', fetchError)
      return NextResponse.json({ error: 'Response not found' }, { status: 404 })
    }

    // Create review record
    const { error: reviewError } = await supabase.from('response_reviews').insert({
      response_id,
      action,
      comments,
      reviewed_at: new Date().toISOString(),
    })

    if (reviewError) {
      console.error('[v0] Review creation error:', reviewError)
      return NextResponse.json({ error: reviewError.message }, { status: 400 })
    }

    // Update response status based on action
    let newStatus = 'draft'
    if (action === 'approved') {
      newStatus = 'approved'
    } else if (action === 'rejected') {
      newStatus = 'rejected'
    } else if (action === 'revision_requested') {
      newStatus = 'needs_revision'
    }

    const { error: updateError } = await supabase
      .from('compliance_responses')
      .update({ status: newStatus })
      .eq('id', response_id)

    if (updateError) {
      console.error('[v0] Response update error:', updateError)
      return NextResponse.json({ error: updateError.message }, { status: 400 })
    }

    // Log audit event
    await supabase.from('audit_logs').insert({
      organization_id: null,
      assessment_id: response.assessment_id,
      action: `response_${action}`,
      entity_type: 'response',
      entity_id: response_id,
      changes: { status: newStatus, comments },
    })

    return NextResponse.json({
      success: true,
      message: `Response ${action}`,
    })
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const responseId = request.nextUrl.searchParams.get('responseId')

    if (!responseId) {
      return NextResponse.json({ error: 'responseId required' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: reviews, error } = await supabase
      .from('response_reviews')
      .select('*')
      .eq('response_id', responseId)
      .order('reviewed_at', { ascending: false })

    if (error) {
      console.error('[v0] Reviews fetch error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ reviews })
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
