import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const COMPLIANCE_FRAMEWORKS = [
  {
    code: '2CFR200',
    name: '2 CFR Part 200',
    category: 'Federal Requirements',
    description: 'Uniform Administrative Requirements, Cost Principles, and Audit Requirements for Federal Awards',
    authority: '2 CFR 200',
  },
  {
    code: 'COMMERCE',
    name: 'Department of Commerce S&T',
    category: 'Federal Requirements',
    description: '15 CFR Parts 14 & 24 - Commerce Department Standards and Conditions',
    authority: '15 CFR 14 & 24',
  },
  {
    code: 'OMB0660',
    name: 'OMB 0660-0047 Reports',
    category: 'Federal Requirements',
    description: 'Broadband Initiatives Program - Annual Report Requirements',
    authority: 'OMB 0660-0047',
  },
  {
    code: '5CFR1320',
    name: '5 CFR Part 1320',
    category: 'Administrative',
    description: 'Information Collections and Paperwork Reduction Act Compliance',
    authority: '5 CFR 1320',
  },
  {
    code: 'PROPERTY',
    name: 'Property & Equipment Management',
    category: 'Financial Management',
    description: '2 CFR 200.316–326 - Real Property and Equipment Management',
    authority: '2 CFR 200.316-326',
  },
  {
    code: 'NEPA',
    name: 'National Environmental Policy Act',
    category: 'Environmental',
    description: 'NEPA Compliance and Environmental Review Requirements',
    authority: 'NEPA',
  },
  {
    code: 'NHPA',
    name: 'National Historic Preservation Act',
    category: 'Environmental',
    description: '36 CFR Part 800 - Historic Property Assessment',
    authority: '36 CFR 800',
  },
  {
    code: 'TITLEVI',
    name: 'Title VI Civil Rights Act',
    category: 'Civil Rights',
    description: 'Title VI of the Civil Rights Act of 1964 - Non-Discrimination Compliance',
    authority: 'Title VI',
  },
  {
    code: 'SECTION504',
    name: 'Section 504 Rehabilitation Act',
    category: 'Disability Rights',
    description: 'Section 504 - Program Accessibility and Non-Discrimination',
    authority: 'Section 504',
  },
  {
    code: 'ADA',
    name: 'Americans with Disabilities Act',
    category: 'Disability Rights',
    description: 'ADA Title II & III - Accessibility Standards and Compliance',
    authority: 'ADA',
  },
]

const COMPLIANCE_QUESTIONS = [
  {
    framework_code: '2CFR200',
    question_number: '200.1',
    question_text: 'Does your organization have documented procurement policies that comply with 2 CFR Part 200 Subpart D?',
    question_type: 'yes_no',
    guidance: 'Procurement policies must address open competition, cost effectiveness, and conflict of interest management.',
    required: true,
  },
  {
    framework_code: '2CFR200',
    question_number: '200.2',
    question_text: 'Are all procurement transactions documented with evidence of fair competition?',
    question_type: 'yes_no',
    guidance: 'Maintain records showing competitive solicitation or documented justification for non-competitive procurements.',
    required: true,
  },
  {
    framework_code: '2CFR200',
    question_number: '200.3',
    question_text: 'Do you have documented conflict of interest policies applicable to procurement activities?',
    question_type: 'yes_no',
    guidance: 'Staff involved in procurement must disclose and manage conflicts of interest per federal requirements.',
    required: true,
  },
  {
    framework_code: 'TITLEVI',
    question_number: 'VI.1',
    question_text: 'Has your organization adopted and communicated a Title VI non-discrimination policy?',
    question_type: 'yes_no',
    guidance: 'All organizations receiving federal funds must have a documented non-discrimination policy accessible to the public.',
    required: true,
  },
  {
    framework_code: 'TITLEVI',
    question_number: 'VI.2',
    question_text: 'Have you established a process to receive and respond to civil rights complaints?',
    question_type: 'yes_no',
    guidance: 'Document your complaint resolution process and maintain records of all complaints received and resolved.',
    required: true,
  },
]

export async function POST() {
  try {
    console.log('[v0] Starting database seed...')

    // Seed Frameworks
    console.log('[v0] Inserting compliance frameworks...')
    const { data: frameworks, error: frameworkError } = await supabase
      .from('compliance_frameworks')
      .insert(COMPLIANCE_FRAMEWORKS)
      .select()

    if (frameworkError) {
      console.error('[v0] Framework error:', frameworkError)
      return NextResponse.json({ error: frameworkError.message }, { status: 400 })
    }

    console.log('[v0] Created frameworks:', frameworks?.length)

    // Seed Questions
    console.log('[v0] Inserting compliance questions...')
    const questionsToInsert = COMPLIANCE_QUESTIONS.map((q) => {
      const framework = frameworks?.find((f) => f.code === q.framework_code)
      return {
        framework_id: framework?.id,
        question_number: q.question_number,
        question_text: q.question_text,
        question_type: q.question_type,
        guidance: q.guidance,
        required: q.required,
        display_order: 1,
      }
    })

    const { data: questions, error: questionError } = await supabase
      .from('compliance_questions')
      .insert(questionsToInsert)
      .select()

    if (questionError) {
      console.error('[v0] Question error:', questionError)
      return NextResponse.json({ error: questionError.message }, { status: 400 })
    }

    console.log('[v0] Created questions:', questions?.length)

    return NextResponse.json({
      success: true,
      frameworks: frameworks?.length,
      questions: questions?.length,
    })
  } catch (error) {
    console.error('[v0] Seed error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
