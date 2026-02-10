import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: frameworks, error } = await supabase
      .from('compliance_frameworks')
      .select(
        `
        id,
        code,
        name,
        category,
        description,
        authority,
        compliance_questions(id, question_number, question_text, guidance)
      `
      )
      .order('code', { ascending: true })

    if (error) {
      console.error('[v0] Framework fetch error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ frameworks })
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
