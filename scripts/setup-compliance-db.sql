-- TBCP Compliance Assessment System Database Schema

-- Compliance Frameworks
CREATE TABLE IF NOT EXISTS compliance_frameworks (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  sort_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Compliance Questions for each framework
CREATE TABLE IF NOT EXISTS compliance_questions (
  id SERIAL PRIMARY KEY,
  framework_id INT NOT NULL REFERENCES compliance_frameworks(id),
  question_number VARCHAR(20),
  question_text TEXT NOT NULL,
  help_text TEXT,
  evidence_types VARCHAR(255),
  required_evidence BOOLEAN DEFAULT TRUE,
  validation_rules JSONB,
  sort_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Compliance Assessments
CREATE TABLE IF NOT EXISTS project_compliance_assessments (
  id SERIAL PRIMARY KEY,
  project_id INT NOT NULL,
  client_id INT NOT NULL,
  assessment_period_year INT NOT NULL,
  status VARCHAR(50) DEFAULT 'In Progress',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  started_by VARCHAR(255),
  last_modified_by VARCHAR(255)
);

-- Compliance Framework Status per Project
CREATE TABLE IF NOT EXISTS framework_compliance_status (
  id SERIAL PRIMARY KEY,
  assessment_id INT NOT NULL REFERENCES project_compliance_assessments(id),
  framework_id INT NOT NULL REFERENCES compliance_frameworks(id),
  status VARCHAR(50) DEFAULT 'Not Started',
  progress_percentage INT DEFAULT 0,
  completed_at TIMESTAMP,
  reviewed_at TIMESTAMP,
  reviewed_by VARCHAR(255),
  notes TEXT,
  UNIQUE(assessment_id, framework_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Compliance Question Responses
CREATE TABLE IF NOT EXISTS compliance_responses (
  id SERIAL PRIMARY KEY,
  assessment_id INT NOT NULL REFERENCES project_compliance_assessments(id),
  question_id INT NOT NULL REFERENCES compliance_questions(id),
  response_value JSONB NOT NULL,
  evidence_metadata JSONB,
  status VARCHAR(50) DEFAULT 'Pending',
  reviewer_notes TEXT,
  reviewed_by VARCHAR(255),
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(assessment_id, question_id)
);

-- Evidence/Document Storage
CREATE TABLE IF NOT EXISTS compliance_evidence (
  id SERIAL PRIMARY KEY,
  response_id INT NOT NULL REFERENCES compliance_responses(id),
  file_name VARCHAR(255),
  file_size INT,
  file_type VARCHAR(50),
  file_path VARCHAR(500),
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  uploaded_by VARCHAR(255),
  file_hash VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Pending Review'
);

-- Compliance Review Audit Log
CREATE TABLE IF NOT EXISTS compliance_audit_log (
  id SERIAL PRIMARY KEY,
  assessment_id INT NOT NULL REFERENCES project_compliance_assessments(id),
  action VARCHAR(100),
  user_id VARCHAR(255),
  user_email VARCHAR(255),
  changes JSONB,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert TBCP Compliance Frameworks
INSERT INTO compliance_frameworks (code, name, description, category, sort_order) VALUES
('2CFR200', '2 CFR Part 200', 'Uniform Administrative Requirements, Cost Principles, and Audit Requirements for Federal Awards', 'Federal Requirements', 1),
('COMMERCE', 'Department of Commerce ST&C', '15 CFR Part 14/24 - Commerce Department Standards and Conditions', 'Federal Requirements', 2),
('OMB0660', 'OMB 0660-0047 Reports', 'Broadband Initiatives Program - Annual Report Requirements', 'Federal Requirements', 3),
('5CFR1320', '5 CFR Part 1320', 'Information Collections and Paperwork Reduction Act Compliance', 'Administrative', 4),
('PROPERTY', 'Property & Financial Regulations', '2 CFR 200.316–326 - Real Property and Equipment Management', 'Financial Management', 5),
('NEPA', 'National Environmental Policy Act', 'NEPA Compliance and Environmental Review Requirements', 'Environmental', 6),
('NHPA', 'National Historic Preservation Act', '36 CFR Part 800 - Historic Property Assessment', 'Environmental', 7),
('TITLEVI', 'Title VI Civil Rights Act', 'Title VI of the Civil Rights Act of 1964 - Non-Discrimination', 'Civil Rights', 8),
('SECTION504', 'Section 504 Rehabilitation Act', 'Section 504 - Accessibility and Program Access Requirements', 'Disability Rights', 9),
('ADA', 'Americans with Disabilities Act', 'ADA Title II & III - Accessibility Standards and Compliance', 'Disability Rights', 10)
ON CONFLICT (code) DO NOTHING;

-- Insert Sample Compliance Questions for 2 CFR Part 200
INSERT INTO compliance_questions (framework_id, question_number, question_text, help_text, evidence_types, required_evidence, validation_rules, sort_order)
SELECT id, '200.1', 'Does your organization have documented policies for procurement that comply with 2 CFR Part 200 Subpart D?', 'Procurement policies must ensure open and fair competition, conflict of interest management, and cost effectiveness.', 'document', TRUE, '{"maxSize": 10485760, "allowedTypes": ["pdf", "docx"]}', 1
FROM compliance_frameworks WHERE code = '2CFR200'
UNION ALL
SELECT id, '200.2', 'Are all procurement transactions documented with evidence of fair competition (bids, quotes, or justification)?', 'Maintain records showing competitive solicitation or documented justification for non-competitive procurements.', 'document,checkbox', TRUE, '{}', 2
FROM compliance_frameworks WHERE code = '2CFR200'
UNION ALL
SELECT id, '200.3', 'Do you have documented conflict of interest policies applicable to procurement activities?', 'Staff involved in procurement must disclose and manage conflicts of interest per federal requirements.', 'document', TRUE, '{"maxSize": 10485760}', 3
FROM compliance_frameworks WHERE code = '2CFR200'
UNION ALL
SELECT id, '200.4', 'Have you maintained records of all purchases and payments for federal awards for the past 3 years?', 'Financial records must be retained for the period required by your federal funding agency (typically 3-7 years).', 'document,checkbox', TRUE, '{}', 4
FROM compliance_frameworks WHERE code = '2CFR200'
ON CONFLICT DO NOTHING;
