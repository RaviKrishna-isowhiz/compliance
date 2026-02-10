# TBCP Compliance System - Visual Workflow Guide

## System Workflows

### 1. Organization Assessment Initialization

```
┌─────────────────────────────────────────────────────────────────┐
│ ORGANIZATION INITIATES COMPLIANCE ASSESSMENT                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ SELECT PROJECT & FISCAL YEAR                                    │
│ • Choose project from organization's project list              │
│ • Select assessment year (e.g., 2024)                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ CREATE NEW ASSESSMENT RECORD                                    │
│ • Status: "Not Started"                                         │
│ • Initialize all 10 frameworks                                 │
│ • Load compliance questions                                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ DASHBOARD DISPLAYS                                              │
│ ✓ Overall compliance score (0%)                                 │
│ ✓ 10 frameworks (all "Not Started")                             │
│ ✓ Action buttons: "Start Assessment" / "View Details"          │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2. Framework Assessment Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ USER SELECTS FRAMEWORK (e.g., "2 CFR Part 200")                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ FRAMEWORK DETAIL SCREEN OPENS                                   │
│                                                                 │
│ Header: 2CFR200 | Status Badge | Progress: 0/5 Questions      │
│                                                                 │
│ Questions List:                                                │
│ ├─ Q1: Does your organization have documented procurement...   │
│ │  └─ Status: ⊘ Unanswered                                    │
│ ├─ Q2: Are all procurement transactions documented...          │
│ │  └─ Status: ⊘ Unanswered                                    │
│ └─ Q3-Q5: [More questions...]                                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ USER CLICKS "ADD RESPONSE" ON QUESTION 1                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ QUESTIONNAIRE FORM OPENS                                        │
│                                                                 │
│ Question Text (Bold)                                           │
│ Help Text (Info Box)                                           │
│ Response Fields:                                                │
│ ├─ Checkbox: "Yes, we comply"                                  │
│ ├─ Text Area: "Explanation"                                    │
│ └─ File Upload: "Upload supporting document"                   │
│                                                                 │
│ Validation Rules:                                              │
│ • File Types: PDF, DOCX                                        │
│ • Max Size: 10 MB                                              │
│ • Required: Yes                                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ USER FILLS FORM                                                 │
│                                                                 │
│ ✓ Checks "Yes, we comply"                                      │
│ ✓ Enters explanation: "We maintain comprehensive..."           │
│ ✓ Uploads: "Procurement_Policy_2024.pdf" (2.1 MB)              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ VALIDATION CHECK                                                │
│                                                                 │
│ ✓ Checkbox: Filled                                             │
│ ✓ Explanation: Provided                                        │
│ ✓ File Size: 2.1 MB ≤ 10 MB ✓                                  │
│ ✓ File Type: PDF ✓                                             │
│ ✓ All required fields: ✓                                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ USER CLICKS "SUBMIT RESPONSE"                                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ RESPONSE SAVED & STATUS UPDATES                                │
│                                                                 │
│ • Response Status: "Pending Review" (Yellow)                   │
│ • Question Status: ✓ Answered                                  │
│ • Framework Progress: 1/5 (20%)                                │
│ • Framework Status: "Evidence Pending"                         │
│ • Notification: Sent to reviewers                              │
└─────────────────────────────────────────────────────────────────┘
```

---

### 3. Admin Review Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│ REVIEWER RECEIVES NOTIFICATION                                  │
│ "New compliance response pending review: 2 CFR Part 200"        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ REVIEWER OPENS ADMIN PANEL                                      │
│                                                                 │
│ Tabs: Pending (1) | Approved | Rejected                        │
│                                                                 │
│ Pending Responses:                                             │
│ ├─ Question 1: "Does your organization have..."                │
│ │  └─ Status Badge: ⏳ Pending Review                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ REVIEWER CLICKS ON RESPONSE TO EXPAND                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ RESPONSE DETAIL VIEW                                            │
│                                                                 │
│ User's Response:                                               │
│ • Answer: Yes, we comply                                       │
│ • Explanation: We maintain comprehensive procurement...        │
│                                                                 │
│ Evidence File:                                                 │
│ 📄 Procurement_Policy_2024.pdf [Download]                       │
│ 2.1 MB | Uploaded on Feb 1, 2024                               │
│                                                                 │
│ Reviewer Notes (Textarea):                                     │
│ "Comprehensive policy. Please provide additional details..."   │
│                                                                 │
│ Action Buttons:                                                │
│ [✓ Approve] [✗ Reject]                                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────┴────────────────┐
        │                                 │
        ▼                                 ▼
┌──────────────────────┐      ┌──────────────────────┐
│ REVIEWER APPROVES    │      │ REVIEWER REJECTS     │
│                      │      │                      │
│ • Adds notes         │      │ • Adds rejection     │
│ • Clicks "Approve"   │      │   reason             │
│                      │      │ • Clicks "Reject"    │
└──────────┬───────────┘      └──────────┬───────────┘
           │                            │
           ▼                            ▼
    ✓ Response Status           Question Returns to
    "Approved"                  "Needs Review"
    Progress Updates            User notified of
    to 40%                       rejection reason
    User notified
```

---

### 4. Overall Assessment Completion Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ FRAMEWORK COMPLETION CYCLE (REPEAT FOR ALL 10)                  │
│                                                                 │
│ 2 CFR Part 200     ✓ Complete (Compliant)                       │
│ Commerce ST&C      ✓ Complete (Compliant)                       │
│ OMB 0660-0047      ⏳ In Progress (60%)                          │
│ 5 CFR 1320         ⏳ In Progress (40%)                          │
│ Property & Finance ⏳ In Progress (20%)                          │
│ NEPA               ⊘ Not Started (0%)                           │
│ NHPA               ⊘ Not Started (0%)                           │
│ Title VI           ✓ Complete (Needs Review)                    │
│ Section 504        ⏳ In Progress (50%)                          │
│ ADA                ⏳ In Progress (30%)                          │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ DASHBOARD UPDATES IN REAL-TIME                                  │
│                                                                 │
│ Overall Compliance: 45%                                         │
│ Compliant: 2/10 frameworks                                     │
│ Needs Attention: 3 frameworks                                  │
│ Average Progress: 33%                                          │
│                                                                 │
│ Status: Partially Compliant                                    │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ ALL FRAMEWORKS COMPLETED & APPROVED                            │
│                                                                 │
│ Assessment Status: "Approved"                                  │
│ Overall Status: "Compliant"                                    │
│ Completion Date: Feb 15, 2024                                  │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ EXPORT COMPLIANCE REPORT                                        │
│                                                                 │
│ Available Formats:                                             │
│ • PDF (Formatted, printable)                                   │
│ • DOCX (Editable)                                              │
│ • CSV (For data analysis)                                      │
│                                                                 │
│ Report Contents:                                               │
│ ✓ Organization info                                            │
│ ✓ Assessment period                                            │
│ ✓ Overall compliance status                                    │
│ ✓ Framework breakdown                                          │
│ ✓ Reviewer signatures                                          │
│ ✓ Audit trail                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Status Badge Legend

```
┌──────────────────────────────────────────┐
│ COMPLIANCE STATUS INDICATORS             │
├──────────────────────────────────────────┤
│ ✓  Compliant          (Green #10B981)    │
│    All requirements met and approved     │
├──────────────────────────────────────────┤
│ ▼  Partially Compliant (Yellow #F59E0B) │
│    Most requirements met or approved     │
├──────────────────────────────────────────┤
│ ✗  Non-Compliant      (Red #EF4444)     │
│    One or more requirements not met      │
├──────────────────────────────────────────┤
│ ⏳ Evidence Pending    (Blue #3B82F6)    │
│    Awaiting reviewer approval            │
├──────────────────────────────────────────┤
│ ⚠  Needs Review       (Orange #F59E0B)  │
│    Responses require resubmission        │
└──────────────────────────────────────────┘
```

---

## Dashboard Metrics Reference

### Overall Assessment Screen

```
┌────────────────────────────────────────────────────────────────┐
│ TBCP COMPLIANCE SYSTEM - FISCAL YEAR 2024                     │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│ │ Compliance   │  │ Status       │  │ Frameworks   │         │
│ │ Score        │  │              │  │ Compliant    │         │
│ │              │  │              │  │              │         │
│ │     45%      │  │ Partial      │  │   2 / 10     │         │
│ │              │  │ Compliant    │  │              │         │
│ └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                │
│ ┌────────────────────────────────────────────────────────────┐│
│ │ FRAMEWORKS STATUS                                          ││
│ ├────────────────────────────────────────────────────────────┤│
│ │ 2CFR200          [████████████░░░░] 60% • Status: Partial  ││
│ │ COMMERCE         [████████████████] 100% • Status: OK      ││
│ │ OMB0660          [██████░░░░░░░░░░] 35% • Status: Pending  ││
│ │ 5CFR1320         [████░░░░░░░░░░░░] 20% • Status: Review   ││
│ │ PROPERTY         [░░░░░░░░░░░░░░░░] 0%  • Status: Not Yet  ││
│ │ NEPA             [░░░░░░░░░░░░░░░░] 0%  • Status: Not Yet  ││
│ │ NHPA             [░░░░░░░░░░░░░░░░] 0%  • Status: Not Yet  ││
│ │ TITLEVI          [██████████░░░░░░] 60% • Status: Review   ││
│ │ SECTION504       [██████████████░░] 75% • Status: OK       ││
│ │ ADA              [████████░░░░░░░░] 50% • Status: Pending   ││
│ └────────────────────────────────────────────────────────────┘│
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## Review Queue Management

```
┌────────────────────────────────────────────────────────────────┐
│ ADMIN REVIEW QUEUE                                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Tabs: [Pending: 5] [Approved: 12] [Rejected: 2]              │
│                                                                │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ PENDING REVIEWS                                          │  │
│ ├──────────────────────────────────────────────────────────┤  │
│ │                                                          │  │
│ │ 2CFR200 - Q1: "Procurement policies documentation"      │  │
│ │ Submitted: Feb 1, 2024 | File: Policy_2024.pdf          │  │
│ │ [Review Now]                                             │  │
│ │                                                          │  │
│ │ COMMERCE - Q2: "Project milestone tracking"             │  │
│ │ Submitted: Feb 2, 2024 | File: Milestones.xlsx          │  │
│ │ [Review Now]                                             │  │
│ │                                                          │  │
│ │ TITLEVI - Q1: "Non-discrimination policy"               │  │
│ │ Submitted: Feb 2, 2024 | File: COI_Policy.pdf           │  │
│ │ [Review Now]                                             │  │
│ │                                                          │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## Framework Progress Calculation

```
Framework Status Determination Algorithm
═════════════════════════════════════════════════════════════════

Input:  List of responses for a framework
Output: Status (Compliant/Partial/Non-Compliant/Pending/Needs Review)

Step 1: Count responses by status
  ├─ Total Responses: 5
  ├─ Unanswered: 0
  ├─ Answered: 4
  ├─ Pending Review: 1
  ├─ Approved: 3
  └─ Rejected: 0

Step 2: Calculate metrics
  ├─ Progress %: (Answered / Total) × 100 = 80%
  ├─ Approval Rate: (Approved / Answered) × 100 = 75%
  └─ Rejection Rate: (Rejected / Answered) × 100 = 0%

Step 3: Apply business rules
  ├─ IF Rejected > 0 → "Non-Compliant" ✓
  ├─ IF All Answered AND All Approved → "Compliant" ✓
  ├─ IF Approval Rate ≥ 70% AND Rejected = 0 → "Partially Compliant" ✓
  ├─ IF Pending Review > 0 → "Needs Review" ✓
  └─ IF Unanswered > 0 → "Evidence Pending" ✓

Result: "Partially Compliant" (80% progress, 75% approved)
```

---

## User Role Permissions

```
┌─────────────────────────────────────────────────────────────┐
│ ROLE-BASED ACCESS CONTROL                                   │
├──────────────┬──────────┬──────────┬──────────┬─────────────┤
│ Permission   │Submitter │ Reviewer │  Admin   │   Viewer    │
├──────────────┼──────────┼──────────┼──────────┼─────────────┤
│ View Assess  │    ✓     │    ✓     │    ✓     │      ✓      │
│ Submit Resp  │    ✓     │    -     │    ✓     │      -      │
│ Upload Files │    ✓     │    -     │    ✓     │      -      │
│ Review Resp  │    -     │    ✓     │    ✓     │      -      │
│ Approve Resp │    -     │    ✓     │    ✓     │      -      │
│ Reject Resp  │    -     │    ✓     │    ✓     │      -      │
│ Export Report│    ✓     │    ✓     │    ✓     │      ✓      │
│ View Audit   │    -     │    ✓     │    ✓     │      -      │
│ Manage Users │    -     │    -     │    ✓     │      -      │
│ Edit Framewo │    -     │    -     │    ✓     │      -      │
└──────────────┴──────────┴──────────┴──────────┴─────────────┘
```

---

## Data Flow Diagram

```
┌─────────────────┐
│  Organization   │
│   User (Web)    │
└────────┬────────┘
         │
         ▼
    ┌─────────────────────────┐
    │  React Frontend         │
    │  (Components, Hooks)    │
    └────────┬────────────────┘
             │
             ▼
    ┌─────────────────────────┐
    │  Next.js API Routes     │
    │  (Validation Layer)     │
    └────────┬────────────────┘
             │
             ▼
    ┌─────────────────────────┐
    │  Database Layer         │
    │  (PostgreSQL)           │
    │  ├─ Frameworks          │
    │  ├─ Questions           │
    │  ├─ Assessments         │
    │  ├─ Responses           │
    │  └─ Evidence            │
    └────────┬────────────────┘
             │
             ▼
    ┌─────────────────────────┐
    │  File Storage           │
    │  (Vercel Blob / S3)     │
    │  ├─ Policy PDFs         │
    │  └─ Evidence Files      │
    └─────────────────────────┘
```

---

This visual workflow guide helps understand the complete compliance assessment process from initialization through final report generation.
