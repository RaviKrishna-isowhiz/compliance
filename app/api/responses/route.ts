import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const assessmentId = request.nextUrl.searchParams.get('assessmentId')

    if (!assessmentId) {
      return NextResponse.json({ error: 'assessmentId required' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: responses, error } = await supabase
      .from('compliance_responses')
      .select(
        `
        id,
        assessment_id,
        question_id,
        response_type,
        response_value,
        response_text,
        status,
        submitted_at,
        compliance_questions(question_number, question_text, guidance)
      `
      )
      .eq('assessment_id', assessmentId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('[v0] Response fetch error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ responses })
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    const { data: response, error } = await supabase
      .from('compliance_responses')
      .insert({
        assessment_id: body.assessment_id,
        question_id: body.question_id,
        response_type: body.response_type,
        response_value: body.response_value,
        response_text: body.response_text,
        status: 'draft',
      })
      .select()

    if (error) {
      console.error('[v0] Response creation error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ response: response?.[0] }, { status: 201 })
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    const { data: response, error } = await supabase
      .from('compliance_responses')
      .update({
        response_value: body.response_value,
        response_text: body.response_text,
        status: body.status,
      })
      .eq('id', body.id)
      .select()

    if (error) {
      console.error('[v0] Response update error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ response: response?.[0] })
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
