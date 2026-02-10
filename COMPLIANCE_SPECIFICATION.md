# TBCP Compliance Assessment System - Complete Specification

## Executive Summary

This document provides the complete technical and functional specification for the Tribal Broadband Connectivity Program (TBCP) Compliance Assessment System. The system is designed as a production-grade compliance review platform following enterprise patterns used by government agencies, financial institutions, and compliance software vendors.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Compliance Frameworks](#compliance-frameworks)
3. [High-Level Flow](#high-level-flow)
4. [Data Models](#data-models)
5. [Questionnaire Schema](#questionnaire-schema)
6. [Status Determination Logic](#status-determination-logic)
7. [UI/UX Specifications](#uiux-specifications)
8. [API Requirements](#api-requirements)
9. [Integration Points](#integration-points)

---

## System Overview

### Purpose

The TBCP Compliance Assessment System enables organizations to systematically assess, document, and review compliance with 10 major federal compliance frameworks relevant to broadband connectivity grants.

### Key Features

- **Multi-Framework Assessment**: Support for 10 distinct federal compliance frameworks
- **Evidence Tracking**: Upload, validate, and manage supporting documentation
- **Review Workflow**: Multi-step approval process with reviewer notes
- **Status Calculation**: Automatic and manual compliance status determination
- **Audit Trail**: Complete logging of all compliance activities
- **Reporting**: Export and generate compliance reports by framework

### Design Principles

1. **Trustworthiness**: Clear, professional design that inspires confidence
2. **Clarity**: Unambiguous language using official federal definitions
3. **Auditability**: Every action tracked and documented
4. **Accessibility**: WCAG 2.1 AA compliant UI
5. **Efficiency**: Streamlined workflows for both submitters and reviewers

---

## Compliance Frameworks

### Framework Registry

| Code | Name | Category | Sort Order |
|------|------|----------|-----------|
| 2CFR200 | 2 CFR Part 200 | Federal Requirements | 1 |
| COMMERCE | Department of Commerce ST&C | Federal Requirements | 2 |
| OMB0660 | OMB 0660-0047 Reports | Federal Requirements | 3 |
| 5CFR1320 | 5 CFR Part 1320 | Administrative | 4 |
| PROPERTY | Property & Financial Regulations | Financial Management | 5 |
| NEPA | National Environmental Policy Act | Environmental | 6 |
| NHPA | National Historic Preservation Act | Environmental | 7 |
| TITLEVI | Title VI Civil Rights Act | Civil Rights | 8 |
| SECTION504 | Section 504 Rehabilitation Act | Disability Rights | 9 |
| ADA | Americans with Disabilities Act | Disability Rights | 10 |

### Framework Category Grouping

**Federal Requirements** (3 frameworks)
- Direct compliance requirements from federal award terms
- Most frequently reviewed by federal auditors

**Administrative & Reporting** (2 frameworks)
- Paperwork reduction and information collection requirements
- Property and equipment management standards

**Financial Management** (1 framework)
- Financial controls, procurement, and asset tracking
- Critical for federal audit findings

**Environmental** (2 frameworks)
- NEPA and historic preservation assessments
- Project-specific compliance requirements

**Civil Rights & Accessibility** (2 frameworks)
- Non-discrimination and accessibility requirements
- Cross-cutting compliance across all programs

---

## High-Level Flow

### 1. Assessment Initialization

```
Organization initiates compliance assessment
    ↓
System loads all 10 compliance frameworks
    ↓
User selects fiscal year for assessment
    ↓
Assessment record created with "Not Started" status
```

### 2. Framework Completion

```
User selects framework
    ↓
System displays framework-specific questions
    ↓
User answers each question (5-15 questions per framework)
    ↓
User uploads supporting evidence documents
    ↓
System validates document format and size
    ↓
User submits response (moves to "Pending Review")
```

### 3. Review & Approval

```
Compliance reviewer notified of pending submission
    ↓
Reviewer examines question response and evidence
    ↓
Reviewer chooses: Approve | Request Changes | Reject
    ↓
If approved: Framework status → "Compliant/Partial/Non-Compliant"
    ↓
If rejected: Notification sent to submitter with reasons
```

### 4. Overall Assessment Completion

```
All frameworks reviewed
    ↓
System calculates overall compliance status
    ↓
Assessment marked "Complete"
    ↓
Organization can export final compliance report
```

---

## Data Models

### Core Entities

#### 1. ComplianceFramework
```json
{
  "id": "uuid",
  "code": "2CFR200",
  "name": "2 CFR Part 200",
  "description": "Uniform Administrative Requirements, Cost Principles, and Audit Requirements for Federal Awards",
  "category": "Federal Requirements",
  "sortOrder": 1,
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

**Fields:**
- `code`: Unique federal regulation code
- `category`: Used for grouping and navigation
- `sortOrder`: Display order in UI

---

#### 2. ComplianceQuestion
```json
{
  "id": "uuid",
  "frameworkId": "uuid",
  "questionNumber": "200.1",
  "questionText": "Does your organization have documented procurement policies?",
  "helpText": "Policy must comply with 2 CFR Part 200 Subpart D requirements...",
  "evidenceTypes": ["document", "checkbox", "date", "numeric", "text"],
  "requiredEvidence": true,
  "validationRules": {
    "maxSize": 10485760,
    "allowedTypes": ["pdf", "docx", "xlsx"],
    "required": true
  },
  "sortOrder": 1,
  "createdAt": "ISO-8601"
}
```

**Fields:**
- `evidenceTypes`: Array of acceptable response types
- `validationRules`: File and format constraints
- `requiredEvidence`: Whether documentation is mandatory

**Evidence Types:**
- `document`: File upload (PDF, Word, Excel, etc.)
- `checkbox`: Yes/No confirmation
- `date`: Date input (for completion dates)
- `numeric`: Number input (for counts, amounts)
- `text`: Free-form text explanation

---

#### 3. ProjectComplianceAssessment
```json
{
  "id": "uuid",
  "projectId": "uuid",
  "clientId": "uuid",
  "assessmentPeriodYear": 2024,
  "status": "In Progress | Under Review | Approved | Non-Compliant",
  "frameworks": ["uuid"],
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601",
  "startedBy": "user@organization.com",
  "lastModifiedBy": "user@organization.com"
}
```

**Status Values:**
- `Not Started`: No responses submitted
- `In Progress`: Responses being collected
- `Under Review`: All responses submitted, awaiting approval
- `Approved`: All frameworks approved
- `Non-Compliant`: One or more frameworks marked non-compliant

---

#### 4. FrameworkComplianceStatus
```json
{
  "id": "uuid",
  "assessmentId": "uuid",
  "frameworkId": "uuid",
  "status": "Compliant | Partially Compliant | Non-Compliant | Evidence Pending | Needs Review",
  "progressPercentage": 60,
  "questionsTotal": 5,
  "questionsAnswered": 3,
  "completedAt": "ISO-8601",
  "reviewedAt": "ISO-8601",
  "reviewedBy": "reviewer@organization.com",
  "notes": "Procurement policies approved. Pending equipment inventory...",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

**Status Determination:**

| Condition | Status |
|-----------|--------|
| All questions answered + all approved | Compliant |
| 70%+ questions approved + some pending | Partially Compliant |
| Any question marked non-compliant | Non-Compliant |
| Responses submitted but not reviewed | Evidence Pending |
| Responses need resubmission | Needs Review |

---

#### 5. ComplianceResponse
```json
{
  "id": "uuid",
  "assessmentId": "uuid",
  "questionId": "uuid",
  "responseValue": {
    "answer": "Yes",
    "explanation": "We maintain comprehensive procurement records",
    "documentName": "Procurement_Policy_2024.pdf"
  },
  "evidenceMetadata": {
    "fileName": "Procurement_Policy_2024.pdf",
    "fileSize": 2048000,
    "fileHash": "sha256-hash",
    "uploadDate": "ISO-8601"
  },
  "status": "Unanswered | Answered | Pending Review | Approved | Rejected",
  "reviewerNotes": "Comprehensive policy. Meets all 2 CFR requirements.",
  "reviewedBy": "reviewer@organization.com",
  "reviewedAt": "ISO-8601",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

**Response Status Flow:**
```
Unanswered
    ↓
Answered (user submits)
    ↓
Pending Review (submitted for approval)
    ↓
Approved OR Rejected (reviewer decision)
    ↓
If rejected: back to Answered
```

---

#### 6. ComplianceEvidence
```json
{
  "id": "uuid",
  "responseId": "uuid",
  "fileName": "Policy_Document.pdf",
  "fileSize": 2048000,
  "fileType": "application/pdf",
  "filePath": "s3://bucket/compliance/evidence/uuid/file.pdf",
  "fileHash": "sha256-hash",
  "uploadDate": "ISO-8601",
  "uploadedBy": "user@organization.com",
  "status": "Pending Review | Approved | Rejected",
  "virusScanned": true,
  "scanDate": "ISO-8601"
}
```

---

#### 7. ComplianceAuditLog
```json
{
  "id": "uuid",
  "assessmentId": "uuid",
  "action": "response_submitted | response_approved | response_rejected | assessment_completed",
  "userId": "uuid",
  "userEmail": "user@organization.com",
  "changes": {
    "before": {},
    "after": {}
  },
  "timestamp": "ISO-8601",
  "ipAddress": "192.168.1.1"
}
```

---

## Questionnaire Schema

### 2 CFR Part 200 Framework (5 Questions)

#### Question 200.1
- **Text**: Does your organization have documented policies for procurement that comply with 2 CFR Part 200 Subpart D?
- **Help**: Procurement policies must ensure open and fair competition, conflict of interest management, and cost effectiveness.
- **Evidence Types**: document
- **Required**: Yes
- **Validation**: PDF or DOCX, max 10MB

#### Question 200.2
- **Text**: Are all procurement transactions documented with evidence of fair competition (bids, quotes, or justification)?
- **Help**: Maintain records showing competitive solicitation or documented justification for non-competitive procurements.
- **Evidence Types**: document, checkbox
- **Required**: Yes

#### Question 200.3
- **Text**: Do you have documented conflict of interest policies applicable to procurement activities?
- **Help**: Staff involved in procurement must disclose and manage conflicts of interest per federal requirements.
- **Evidence Types**: document
- **Required**: Yes

#### Question 200.4
- **Text**: Have you maintained records of all purchases and payments for federal awards for the past 3 years?
- **Help**: Financial records must be retained for the period required by your federal funding agency.
- **Evidence Types**: document, checkbox
- **Required**: Yes

#### Question 200.5
- **Text**: Does your organization maintain an inventory of equipment purchased with federal funds?
- **Help**: Equipment inventories must track cost, location, condition, and current status per 2 CFR 200.313.
- **Evidence Types**: document, numeric
- **Required**: No

---

### Commerce Department ST&C (2 Questions)

#### Question COM.1
- **Text**: Has your project met all reporting requirements specified in the Department of Commerce award?
- **Help**: Review your award documents for specific reporting deadlines and content requirements.
- **Evidence Types**: document, date
- **Required**: Yes

#### Question COM.2
- **Text**: Are project milestones and deliverables being tracked and documented?
- **Help**: Maintain current records of all project activities, timelines, and accomplishments.
- **Evidence Types**: document
- **Required**: Yes

---

### OMB 0660-0047 Reports (1 Question)

#### Question OMB.1
- **Text**: Have you completed the OMB 0660-0047 Annual Report with all required data?
- **Help**: The OMB 0660-0047 form collects data on broadband deployment, adoption, and related activities.
- **Evidence Types**: document, date
- **Required**: Yes

---

### Civil Rights & Accessibility (Sample Questions)

#### Question VI.1 (Title VI)
- **Text**: Does your organization have a written Title VI non-discrimination policy in place?
- **Help**: Title VI requires that no person be excluded from programs or activities based on protected characteristics.
- **Evidence Types**: document
- **Required**: Yes

#### Question VI.2 (Title VI)
- **Text**: Has your organization designated a Title VI Coordinator?
- **Help**: A coordinator must be responsible for investigating and resolving discrimination complaints.
- **Evidence Types**: document, text
- **Required**: Yes

#### Question 504.1 (Section 504)
- **Text**: Has your organization conducted a self-evaluation of programs and services for accessibility barriers?
- **Help**: Section 504 requires periodic self-evaluation of accessibility compliance.
- **Evidence Types**: document, date
- **Required**: Yes

#### Question ADA.1 (ADA)
- **Text**: Are all public-facing websites and digital resources compliant with WCAG 2.1 AA standards?
- **Help**: ADA Title II and III require digital accessibility. WCAG 2.1 AA is the minimum standard.
- **Evidence Types**: document, checkbox
- **Required**: Yes

---

## Status Determination Logic

### Framework Status Calculation Algorithm

```
FUNCTION CalculateFrameworkStatus(framework):
  
  totalQuestions = COUNT(framework.questions)
  answeredQuestions = COUNT(responses WHERE status != "Unanswered")
  approvedQuestions = COUNT(responses WHERE status == "Approved")
  rejectedQuestions = COUNT(responses WHERE status == "Rejected")
  
  progressPercentage = (answeredQuestions / totalQuestions) * 100
  
  IF answeredQuestions == 0:
    RETURN "Not Started"
  
  IF rejectedQuestions > 0:
    RETURN "Non-Compliant"
  
  IF answeredQuestions == totalQuestions AND approvedQuestions == totalQuestions:
    RETURN "Compliant"
  
  IF answeredQuestions < totalQuestions:
    RETURN "Evidence Pending"
  
  IF approvedQuestions >= (totalQuestions * 0.7) AND rejectedQuestions == 0:
    RETURN "Partially Compliant"
  
  IF ANY(responses.status == "Pending Review"):
    RETURN "Needs Review"
  
  RETURN "Needs Review"
```

### Overall Assessment Status

```
FUNCTION CalculateAssessmentStatus(assessment):
  
  frameworkStatuses = [status for each framework]
  
  IF ANY(status == "Non-Compliant"):
    RETURN "Non-Compliant"
  
  IF ALL(status IN ["Compliant", "Partially Compliant"]):
    IF COUNT(status == "Compliant") == frameworks.length:
      RETURN "Approved"
    ELSE:
      RETURN "Approved with Exceptions"
  
  IF ANY(status IN ["Needs Review", "Evidence Pending"]):
    RETURN "Under Review"
  
  RETURN "In Progress"
```

---

## UI/UX Specifications

### Design System

#### Color Palette

| Token | Color | Usage |
|-------|-------|-------|
| `--primary` | #1F2937 (Slate 800) | Buttons, headers, primary text |
| `--primary-foreground` | #FFFFFF | Text on primary backgrounds |
| `--success` | #10B981 (Emerald 500) | Compliant status, approved badges |
| `--warning` | #F59E0B (Amber 500) | Partial compliance, pending review |
| `--danger` | #EF4444 (Red 500) | Non-compliant, errors |
| `--info` | #3B82F6 (Blue 500) | Evidence pending, info alerts |
| `--background` | #F9FAFB (Slate 50) | Page backgrounds |
| `--muted` | #E5E7EB (Gray 200) | Disabled states, tertiary elements |

#### Typography

- **Headings**: Inter Bold (font-weight: 700)
- **Body**: Inter Regular (font-weight: 400)
- **Labels**: Inter Medium (font-weight: 500)
- **Monospace**: Space Mono (code blocks, file names)

---

### Screen 1: Dashboard Overview

**Purpose**: High-level compliance status across all frameworks

**Key Metrics:**
- Overall Compliance Score (%)
- Total Frameworks: X
- Compliant: Y
- Needs Attention: Z

**Elements:**
- Framework status cards (grid layout)
- Progress indicators per framework
- Quick-action buttons ("View Framework", "Review Responses")
- Alerts for frameworks requiring attention

**Interactions:**
- Click framework card → Navigate to framework detail
- Click "Review Responses" → Navigate to admin review panel
- Export button → Generate compliance report

---

### Screen 2: Framework Detail View

**Purpose**: View all questions and responses for a specific framework

**Components:**
- Framework header with code, name, category
- Progress summary (X/Y questions answered)
- Expandable question list with:
  - Question number and text
  - Help text (collapsible)
  - Current response (if submitted)
  - Reviewer notes (if reviewed)
  - Evidence files (if attached)

**Actions:**
- "Add Response" / "Update Response" button (if unanswered or rejected)
- "View Full Question" button
- Back navigation

---

### Screen 3: Questionnaire Response Form

**Purpose**: Collect user response to a compliance question

**Form Elements:**
1. Question display (bold, clear)
2. Help text (blue info box)
3. Response input (varies by question type):
   - Checkbox for Yes/No
   - Text area for explanation
   - Date picker for dates
   - Number input for counts
   - File upload with drag-drop
4. Evidence requirements indicator
5. File validation feedback
6. Submit and Save Draft buttons

**Validation:**
- Required field indicators
- File size validation (real-time)
- File type validation
- Character limits for text fields

---

### Screen 4: Admin Review Dashboard

**Purpose**: Manage compliance submissions for review and approval

**Layout:**
- Tabs: Pending | Approved | Rejected
- For each response:
  - Question number and text
  - Submitted answer
  - Evidence file with download
  - Previous reviewer notes (if any)
  - New review notes textarea
  - Action buttons: Approve | Reject

**Status Indicators:**
- Red badge: Rejected
- Green badge: Approved
- Yellow badge: Pending
- Orange badge: Needs resubmission

---

### Screen 5: Compliance Report

**Purpose**: Export final compliance assessment

**Report Contents:**
- Organization name and assessment period
- Overall compliance status
- Framework-by-framework breakdown:
  - Status (Compliant/Partial/Non-Compliant)
  - Progress percentage
  - Questions answered
  - Last review date
  - Reviewer notes
- Signature block for authorized reviewer

**Export Formats:**
- PDF (formatted for printing)
- DOCX (editable)
- CSV (for data analysis)

---

## API Requirements

### 1. Assessment Endpoints

#### GET `/api/assessments/:assessmentId`
**Purpose**: Retrieve full assessment details

**Response**:
```json
{
  "id": "uuid",
  "projectId": "uuid",
  "assessmentPeriodYear": 2024,
  "status": "Under Review",
  "frameworks": [...],
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

#### POST `/api/assessments`
**Purpose**: Create new compliance assessment

**Body**:
```json
{
  "projectId": "uuid",
  "clientId": "uuid",
  "assessmentPeriodYear": 2024
}
```

---

### 2. Framework Endpoints

#### GET `/api/frameworks`
**Purpose**: Retrieve all compliance frameworks

**Query Params**:
- `category`: Filter by category
- `sortBy`: Sort field (sortOrder, code, name)

#### GET `/api/frameworks/:frameworkId/questions`
**Purpose**: Retrieve all questions for a framework

---

### 3. Response Endpoints

#### POST `/api/responses`
**Purpose**: Submit a compliance response

**Body**:
```json
{
  "assessmentId": "uuid",
  "questionId": "uuid",
  "responseValue": {},
  "evidence": "file_content_base64"
}
```

**Response**:
```json
{
  "id": "uuid",
  "status": "Pending Review",
  "message": "Response submitted successfully"
}
```

#### PUT `/api/responses/:responseId/approve`
**Purpose**: Approve a submitted response

**Body**:
```json
{
  "reviewerNotes": "Comprehensive policy...",
  "reviewedBy": "reviewer@org.com"
}
```

#### PUT `/api/responses/:responseId/reject`
**Purpose**: Reject a submitted response

**Body**:
```json
{
  "reviewerNotes": "Missing required section on...",
  "reviewedBy": "reviewer@org.com"
}
```

---

### 4. Report Endpoints

#### GET `/api/assessments/:assessmentId/report`
**Purpose**: Generate compliance report

**Query Params**:
- `format`: pdf | docx | csv

**Response**: File download

---

## Integration Points

### 1. Project Management System

**Current State**: Organization can create clients and projects

**Integration Required**:
- Link compliance assessments to specific projects
- Retrieve project details for assessment context
- Link compliance findings to project records

**Flow**:
```
Projects List
    ↓
[Select Project] → [Start Compliance Assessment]
    ↓
Compliance Assessment linked to project
    ↓
Findings saved in project compliance history
```

---

### 2. Annual Report Generation

**Current State**: Organization generates annual reports

**Integration Required**:
- Compliance assessment status displayed in annual report
- Compliance findings included in report
- Non-compliant items flagged in report

**Data Flow**:
```
Annual Report
    ↓
[Include Compliance Status]
    ↓
System retrieves compliance assessment for period
    ↓
Report displays: Compliant / Partially Compliant / Non-Compliant
    ↓
Report includes compliance framework details
```

---

### 3. User Access Control

**Roles**:
- **Submitter**: Can create assessments and submit responses
- **Reviewer**: Can review and approve responses
- **Admin**: Can manage frameworks and users
- **Viewer**: Read-only access to assessments

**Permissions Matrix**:

| Action | Submitter | Reviewer | Admin | Viewer |
|--------|-----------|----------|-------|--------|
| View Assessment | ✓ | ✓ | ✓ | ✓ |
| Submit Response | ✓ | - | ✓ | - |
| Review Response | - | ✓ | ✓ | - |
| Approve Response | - | ✓ | ✓ | - |
| Manage Frameworks | - | - | ✓ | - |
| Export Report | ✓ | ✓ | ✓ | ✓ |

---

### 4. Notification System

**Triggers**:
- Response submitted → Notify reviewers
- Response approved → Notify submitter
- Response rejected → Notify submitter with reason
- Assessment completed → Notify stakeholders

**Channels**: Email, in-app notifications

---

## Sample API Response Data

### Assessment with Frameworks
```json
{
  "id": "assess-001",
  "projectId": "proj-001",
  "clientId": "client-001",
  "assessmentPeriodYear": 2024,
  "status": "Under Review",
  "frameworks": [
    {
      "frameworkId": "1",
      "frameworkCode": "2CFR200",
      "frameworkName": "2 CFR Part 200",
      "status": "Partially Compliant",
      "progressPercentage": 60,
      "questionsTotal": 5,
      "questionsAnswered": 3,
      "notes": "Procurement policies approved. Pending equipment inventory."
    },
    {
      "frameworkId": "8",
      "frameworkCode": "TITLEVI",
      "frameworkName": "Title VI Civil Rights Act",
      "status": "Needs Review",
      "progressPercentage": 75,
      "questionsTotal": 2,
      "questionsAnswered": 2,
      "notes": "Documentation submitted. Coordinator details under verification."
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-02-05T14:22:00Z",
  "startedBy": "jane.doe@organization.com"
}
```

---

## Implementation Checklist

- [x] Database schema designed
- [x] Data models defined
- [x] UI components created
- [x] Mock data implemented
- [x] Dashboard view completed
- [x] Framework detail view implemented
- [x] Questionnaire form created
- [x] Admin review panel built
- [ ] API endpoints implemented
- [ ] Database migrations
- [ ] Authentication integration
- [ ] File storage (S3/Blob)
- [ ] Email notifications
- [ ] Report generation
- [ ] Audit logging
- [ ] Testing suite
- [ ] Deployment configuration

---

## Conclusion

This TBCP Compliance Assessment System provides a comprehensive, production-grade solution for managing federal compliance obligations across 10 critical frameworks. The system balances technical robustness with user accessibility, designed to support organizations in their compliance efforts while maintaining audit trail integrity required by federal regulators.
