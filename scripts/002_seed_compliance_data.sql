-- Seed data for TBCP Compliance System

-- ============================================================================
-- Insert Compliance Frameworks
-- ============================================================================

INSERT INTO public.compliance_frameworks (code, name, category, description, authority, reference_url) VALUES
('2CFR200', '2 CFR Part 200 - Uniform Guidance', 'Federal Requirements', 'Federal regulations governing awards and compliance requirements for tribal and state governments', 'Office of Management and Budget', 'https://www.ecfr.gov/current/title-2/part-200'),
('DOC', 'Department of Commerce Requirements', 'Federal Requirements', 'Commerce Department specific grant management requirements', 'Department of Commerce', 'https://www.commerce.gov'),
('OMB0660', 'OMB Form 0660-0047', 'Federal Requirements', 'Broadband Data Collection and State Broadband Program Infrastructure Grant', 'Office of Management and Budget', 'https://www.whitehouse.gov/'),
('5CFR1320', '5 CFR Part 1320 - Paperwork Reduction', 'Administrative Compliance', 'Federal paperwork reduction requirements', 'Office of Management and Budget', 'https://www.ecfr.gov/current/title-5/part-1320'),
('PROPERTY', 'Property & Financial Management', 'Financial Management', 'Requirements for management and disposition of property acquired with federal funds', 'Federal Regulations', 'https://www.ecfr.gov/current/title-2/part-200/section-200.313'),
('NEPA', 'National Environmental Policy Act', 'Environmental Compliance', 'Environmental impact assessment requirements for federal projects', 'NEPA', 'https://www.energy.gov/nepa/national-environmental-policy-act'),
('NHPA', 'National Historic Preservation Act', 'Environmental Compliance', 'Historic preservation requirements for federal undertakings', 'NHPA', 'https://www.nps.gov/nhl/'),
('TITLEVI', 'Title VI - Civil Rights', 'Civil Rights Compliance', 'Non-discrimination requirements in federally assisted programs', 'U.S. Department of Justice', 'https://www.justice.gov/crt/title-vi'),
('SECTION504', 'Section 504 - Rehabilitation Act', 'Disability Rights Compliance', 'Non-discrimination and accessibility requirements for individuals with disabilities', 'U.S. Department of Health & Human Services', 'https://www.hhs.gov/ocr/'),
('ADA', 'Americans with Disabilities Act', 'Disability Rights Compliance', 'Accessibility requirements for all programs and services', 'U.S. Department of Justice', 'https://www.ada.gov/')
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- Insert Compliance Questions for 2 CFR Part 200
-- ============================================================================

INSERT INTO public.compliance_questions (framework_id, question_number, question_text, question_type, guidance, required, display_order) VALUES
((SELECT id FROM public.compliance_frameworks WHERE code = '2CFR200'), '1', 'Does your organization have documented policies and procedures for managing federal awards?', 'yes_no', 'Include written policies for procurement, travel, equipment, and financial management', true, 1),
((SELECT id FROM public.compliance_frameworks WHERE code = '2CFR200'), '2', 'Are financial records maintained with adequate supporting documentation?', 'yes_no', 'All financial transactions must be documented and segregated by award', true, 2),
((SELECT id FROM public.compliance_frameworks WHERE code = '2CFR200'), '3', 'Has your organization conducted a single audit in the past fiscal year?', 'yes_no', 'Required if total federal expenditures exceeded $750,000', true, 3),
((SELECT id FROM public.compliance_frameworks WHERE code = '2CFR200'), '4', 'Please describe your indirect cost allocation method', 'text', 'Explain how indirect costs are calculated and allocated to awards', true, 4),
((SELECT id FROM public.compliance_frameworks WHERE code = '2CFR200'), '5', 'Provide evidence of documented cost sharing/matching arrangements if applicable', 'file_upload', 'Upload agreements, budget documents, or cost share verification', false, 5)
ON CONFLICT (framework_id, question_number) DO NOTHING;

-- ============================================================================
-- Insert Questions for Title VI
-- ============================================================================

INSERT INTO public.compliance_questions (framework_id, question_number, question_text, question_type, guidance, required, display_order) VALUES
((SELECT id FROM public.compliance_frameworks WHERE code = 'TITLEVI'), '1', 'Has your organization adopted a written non-discrimination policy?', 'yes_no', 'Policy must cover all programs and services receiving federal funds', true, 1),
((SELECT id FROM public.compliance_frameworks WHERE code = 'TITLEVI'), '2', 'Provide evidence of dissemination of non-discrimination policy to beneficiaries', 'file_upload', 'Include notices posted, websites, or other communication methods', true, 2)
ON CONFLICT (framework_id, question_number) DO NOTHING;

-- ============================================================================
-- Insert Questions for Section 504
-- ============================================================================

INSERT INTO public.compliance_questions (framework_id, question_number, question_text, question_type, guidance, required, display_order) VALUES
((SELECT id FROM public.compliance_frameworks WHERE code = 'SECTION504'), '1', 'Has your organization designated a Section 504 Coordinator?', 'yes_no', 'Name and contact information required', true, 1)
ON CONFLICT (framework_id, question_number) DO NOTHING;

-- ============================================================================
-- Insert Questions for Department of Commerce
-- ============================================================================

INSERT INTO public.compliance_questions (framework_id, question_number, question_text, question_type, guidance, required, display_order) VALUES
((SELECT id FROM public.compliance_frameworks WHERE code = 'DOC'), '1', 'Are all broadband infrastructure projects designed to serve unserved and underserved areas?', 'yes_no', 'Provide service area maps and coverage data', true, 1),
((SELECT id FROM public.compliance_frameworks WHERE code = 'DOC'), '2', 'Does your broadband project plan include network performance commitments?', 'yes_no', 'Specify minimum speeds and availability targets', true, 2)
ON CONFLICT (framework_id, question_number) DO NOTHING;

-- ============================================================================
-- Insert Questions for OMB 0660-0047
-- ============================================================================

INSERT INTO public.compliance_questions (framework_id, question_number, question_text, question_type, guidance, required, display_order) VALUES
((SELECT id FROM public.compliance_frameworks WHERE code = 'OMB0660'), '1', 'Has your organization submitted the required OMB Form 0660-0047?', 'yes_no', 'Form must be submitted annually or as required by grant', true, 1)
ON CONFLICT (framework_id, question_number) DO NOTHING;

-- Note: Additional frameworks (5CFR1320, PROPERTY, NEPA, NHPA, ADA) can have questions added as needed
-- The above provides a foundation for the compliance system
