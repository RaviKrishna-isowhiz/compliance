-- TBCP Compliance Assessment System - Database Schema
-- PostgreSQL with Supabase RLS

-- ============================================================================
-- 1. ORGANIZATIONS & USERS
-- ============================================================================

-- Organizations table (tribal entities)
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tribe_name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  contact_person TEXT,
  contact_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Organization members (link organizations to auth users)
CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'compliance_officer', 'reviewer', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(organization_id, user_id)
);

-- ============================================================================
-- 2. COMPLIANCE FRAMEWORKS
-- ============================================================================

-- Compliance frameworks (federal requirements)
CREATE TABLE IF NOT EXISTS public.compliance_frameworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  authority TEXT NOT NULL,
  reference_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Compliance questions
CREATE TABLE IF NOT EXISTS public.compliance_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  framework_id UUID NOT NULL REFERENCES public.compliance_frameworks(id) ON DELETE CASCADE,
  question_number TEXT NOT NULL,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('yes_no', 'text', 'file_upload', 'multiple_choice')),
  guidance TEXT,
  required BOOLEAN DEFAULT TRUE,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(framework_id, question_number)
);

-- Question response options (for multiple choice)
CREATE TABLE IF NOT EXISTS public.question_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.compliance_questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  option_value TEXT NOT NULL,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 3. ASSESSMENTS
-- ============================================================================

-- Compliance assessments (annual or as-needed)
CREATE TABLE IF NOT EXISTS public.compliance_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  fiscal_year INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'submitted', 'under_review', 'approved', 'rejected')),
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  submitted_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  UNIQUE(organization_id, fiscal_year)
);

-- Framework compliance status per assessment
CREATE TABLE IF NOT EXISTS public.assessment_frameworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.compliance_assessments(id) ON DELETE CASCADE,
  framework_id UUID NOT NULL REFERENCES public.compliance_frameworks(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'submitted', 'needs_review', 'evidence_pending', 'compliant', 'partial', 'non_compliant')),
  progress_percentage INTEGER DEFAULT 0,
  reviewer_comments TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(assessment_id, framework_id)
);

-- ============================================================================
-- 4. RESPONSES & EVIDENCE
-- ============================================================================

-- Compliance responses
CREATE TABLE IF NOT EXISTS public.compliance_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.compliance_assessments(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.compliance_questions(id) ON DELETE CASCADE,
  response_type TEXT NOT NULL CHECK (response_type IN ('yes', 'no', 'text', 'file', 'multiple_choice')),
  response_value TEXT,
  response_text TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'needs_revision', 'approved', 'rejected')),
  submitted_by UUID REFERENCES auth.users(id),
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(assessment_id, question_id)
);

-- Evidence files
CREATE TABLE IF NOT EXISTS public.evidence_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id UUID NOT NULL REFERENCES public.compliance_responses(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 5. REVIEW & AUDIT
-- ============================================================================

-- Response reviews
CREATE TABLE IF NOT EXISTS public.response_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id UUID NOT NULL REFERENCES public.compliance_responses(id) ON DELETE CASCADE,
  reviewed_by UUID NOT NULL REFERENCES auth.users(id),
  action TEXT NOT NULL CHECK (action IN ('approved', 'rejected', 'revision_requested')),
  comments TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Audit log
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  assessment_id UUID REFERENCES public.compliance_assessments(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  changes JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 6. INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_organization_members_user_id ON public.organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_organization_members_organization_id ON public.organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_compliance_questions_framework_id ON public.compliance_questions(framework_id);
CREATE INDEX IF NOT EXISTS idx_compliance_assessments_organization_id ON public.compliance_assessments(organization_id);
CREATE INDEX IF NOT EXISTS idx_compliance_assessments_status ON public.compliance_assessments(status);
CREATE INDEX IF NOT EXISTS idx_assessment_frameworks_assessment_id ON public.assessment_frameworks(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_frameworks_framework_id ON public.assessment_frameworks(framework_id);
CREATE INDEX IF NOT EXISTS idx_compliance_responses_assessment_id ON public.compliance_responses(assessment_id);
CREATE INDEX IF NOT EXISTS idx_compliance_responses_question_id ON public.compliance_responses(question_id);
CREATE INDEX IF NOT EXISTS idx_compliance_responses_status ON public.compliance_responses(status);
CREATE INDEX IF NOT EXISTS idx_evidence_files_response_id ON public.evidence_files(response_id);
CREATE INDEX IF NOT EXISTS idx_response_reviews_response_id ON public.response_reviews(response_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_organization_id ON public.audit_logs(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON public.audit_logs(timestamp);

-- ============================================================================
-- 7. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_frameworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_frameworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.response_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Organizations: Users can view orgs they're members of
CREATE POLICY "org_select_members" ON public.organizations FOR SELECT
  USING (id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()));

-- Organization Members: Users can view members of their orgs
CREATE POLICY "org_members_select" ON public.organization_members FOR SELECT
  USING (organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()));

-- Compliance Frameworks: Public read
CREATE POLICY "frameworks_select_all" ON public.compliance_frameworks FOR SELECT USING (TRUE);

-- Compliance Questions: Users can view for their org's assessments
CREATE POLICY "questions_select_for_assessments" ON public.compliance_questions FOR SELECT
  USING (framework_id IN (SELECT framework_id FROM public.assessment_frameworks 
    WHERE assessment_id IN (SELECT id FROM public.compliance_assessments 
      WHERE organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()))));

-- Question Options: Users can view for questions they can access
CREATE POLICY "options_select_for_questions" ON public.question_options FOR SELECT
  USING (question_id IN (SELECT id FROM public.compliance_questions WHERE framework_id IN 
    (SELECT framework_id FROM public.assessment_frameworks 
      WHERE assessment_id IN (SELECT id FROM public.compliance_assessments 
        WHERE organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())))));

-- Assessments: Users can view their org's assessments
CREATE POLICY "assessments_select" ON public.compliance_assessments FOR SELECT
  USING (organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()));

CREATE POLICY "assessments_insert" ON public.compliance_assessments FOR INSERT
  WITH CHECK (organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid() AND role IN ('admin', 'compliance_officer')));

CREATE POLICY "assessments_update" ON public.compliance_assessments FOR UPDATE
  USING (organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid() AND role IN ('admin', 'compliance_officer')));

-- Assessment Frameworks: Users can view for their org
CREATE POLICY "assessment_frameworks_select" ON public.assessment_frameworks FOR SELECT
  USING (assessment_id IN (SELECT id FROM public.compliance_assessments 
    WHERE organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())));

CREATE POLICY "assessment_frameworks_update" ON public.assessment_frameworks FOR UPDATE
  USING (assessment_id IN (SELECT id FROM public.compliance_assessments 
    WHERE organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid() AND role IN ('admin', 'compliance_officer', 'reviewer'))));

-- Responses: Users can view/update for their org
CREATE POLICY "responses_select" ON public.compliance_responses FOR SELECT
  USING (assessment_id IN (SELECT id FROM public.compliance_assessments 
    WHERE organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())));

CREATE POLICY "responses_insert" ON public.compliance_responses FOR INSERT
  WITH CHECK (assessment_id IN (SELECT id FROM public.compliance_assessments 
    WHERE organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid() AND role IN ('admin', 'compliance_officer'))));

CREATE POLICY "responses_update" ON public.compliance_responses FOR UPDATE
  USING (assessment_id IN (SELECT id FROM public.compliance_assessments 
    WHERE organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid() AND role IN ('admin', 'compliance_officer'))));

-- Evidence Files: Users can view/upload for their org
CREATE POLICY "evidence_files_select" ON public.evidence_files FOR SELECT
  USING (response_id IN (SELECT id FROM public.compliance_responses 
    WHERE assessment_id IN (SELECT id FROM public.compliance_assessments 
      WHERE organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()))));

CREATE POLICY "evidence_files_insert" ON public.evidence_files FOR INSERT
  WITH CHECK (response_id IN (SELECT id FROM public.compliance_responses 
    WHERE assessment_id IN (SELECT id FROM public.compliance_assessments 
      WHERE organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid() AND role IN ('admin', 'compliance_officer')))));

-- Response Reviews: Reviewers can view/create
CREATE POLICY "response_reviews_select" ON public.response_reviews FOR SELECT
  USING (response_id IN (SELECT id FROM public.compliance_responses 
    WHERE assessment_id IN (SELECT id FROM public.compliance_assessments 
      WHERE organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()))));

CREATE POLICY "response_reviews_insert" ON public.response_reviews FOR INSERT
  WITH CHECK (response_id IN (SELECT id FROM public.compliance_responses 
    WHERE assessment_id IN (SELECT id FROM public.compliance_assessments 
      WHERE organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid() AND role IN ('admin', 'reviewer')))));

-- Audit Logs: Users can view their org's logs
CREATE POLICY "audit_logs_select" ON public.audit_logs FOR SELECT
  USING (organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()));

CREATE POLICY "audit_logs_insert" ON public.audit_logs FOR INSERT
  WITH CHECK (organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()));
