# TBCP Compliance System - Architecture Guide

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      Client Browser (React/Next.js)             │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              Main Page (app/page.tsx)                    │ │
│  │  - Header with TBCP branding                            │ │
│  │  - Navigation tabs                                       │ │
│  │  - Footer with system info                              │ │
│  └────────────────┬─────────────────────────────────────────┘ │
│                   │                                             │
│  ┌────────────────▼─────────────────────────────────────────┐ │
│  │         LiveComplianceDashboard Component              │ │
│  │  - Dashboard initialization (auto-seed)                │ │
│  │  - Framework overview cards                            │ │
│  │  - Assessment statistics                               │ │
│  │  - Status indicators                                   │ │
│  └────────────────┬─────────────────────────────────────────┘ │
│                   │                                             │
│  ┌────────────────▼─────────────────────────────────────────┐ │
│  │         useCompliance Custom Hook                       │ │
│  │  - useFrameworks() → SWR data fetching                 │ │
│  │  - useAssessments() → Assessment CRUD                  │ │
│  │  - useResponses() → Response submission                │ │
│  │  - seedDatabase() → Initialize DB                      │ │
│  └────────────────┬─────────────────────────────────────────┘ │
│                   │                                             │
│                   │ HTTP Requests                              │
└───────────────────┼──────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│              API Layer (Next.js Route Handlers)                 │
│                                                                 │
│  /api/frameworks ──────────────────┐                           │
│  ├─ GET /api/frameworks            │                           │
│  │  └─ Returns all frameworks + questions                      │
│  │                                                             │
│  /api/assessments ─────────────────┤                           │
│  ├─ GET /api/assessments           │                           │
│  │  └─ Fetch assessments for user's org                       │
│  ├─ POST /api/assessments          │                           │
│  │  └─ Create new assessment                                  │
│  │                                                             │
│  /api/responses ───────────────────┤                           │
│  ├─ GET /api/responses?assessmentId│                           │
│  │  └─ Fetch responses for assessment                         │
│  ├─ POST /api/responses            │                           │
│  │  └─ Submit new response                                    │
│  ├─ PUT /api/responses             │                           │
│  │  └─ Update response status                                 │
│  │                                                             │
│  /api/reviews ────────────────────┤                           │
│  ├─ POST /api/reviews              │                           │
│  │  └─ Approve/reject/revise response                        │
│  ├─ GET /api/reviews?responseId    │                           │
│  │  └─ Get review history                                    │
│  │                                                             │
│  /api/seed ───────────────────────┘                           │
│  ├─ POST /api/seed                                            │
│  │  └─ Initialize DB with frameworks & questions             │
│                                                                 │
│  All routes use Supabase client libraries:                    │
│  ├─ lib/supabase/server.ts (server-side)                     │
│  └─ lib/supabase/client.ts (client-side)                     │
│                                                                 │
└────────────────────────┬──────────────────────────────────────┘
                         │
                         │ SQL Queries
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│          Supabase PostgreSQL Database                           │
│                                                                 │
│  ┌───────────────────┐  ┌──────────────────────────────────┐  │
│  │   Organizations   │  │   Compliance Frameworks          │  │
│  ├─────────────────┤  ├────────────────────────────────────┤ │
│  │ id (PK)         │  │ id (PK)                            │ │
│  │ name            │  │ code (UNIQUE)                      │ │
│  │ type            │  │ name                               │ │
│  │ contact_*       │  │ category                           │ │
│  └──────┬──────────┘  │ authority                          │
│         │             │ description                        │
│         │             └────────────┬──────────────────────┘
│         │                         │
│         │              ┌──────────▼──────────────┐
│         │              │ Compliance Questions    │
│         │              ├────────────────────────┤
│         │              │ id (PK)                │
│         │              │ framework_id (FK)      │
│         │              │ question_text          │
│         │              │ question_type          │
│         │              │ guidance               │
│         │              └────────────┬───────────┘
│         │                          │
│         │  ┌───────────────────────┘
│         │  │
│  ┌──────▼──────────────────────────────────────────────────────┐
│  │  Org Members                                                │
│  ├──────────────────────────────────────────────────────────┤ │
│  │ id, organization_id (FK), user_id (FK), role             │ │
│  └────────┬───────────────────────────────────────────────────┘
│           │
│           │ Links to auth.users
│           │
│  ┌────────▼─────────────────────────────────────────────────┐ │
│  │  Compliance Assessments                                  │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │ id (PK), organization_id (FK), fiscal_year, status      │ │
│  │ created_by, submitted_at, reviewed_by                   │ │
│  └────────┬──────────────────────────────────────────────────┘ │
│           │                                                     │
│           ├──┬─────────────────────────────────────────────────┤
│           │  │  Assessment Frameworks (Junction)             │ │
│           │  ├───────────────────────────────────────────────┤ │
│           │  │ id, assessment_id (FK), framework_id (FK)     │ │
│           │  │ status, progress_%, reviewer_comments        │ │
│           │  └────────┬──────────────────────────────────────┘ │
│           │           │                                         │
│           │  ┌────────▼──────────────────────────────────────┐ │
│           │  │  Compliance Responses                         │ │
│           │  ├──────────────────────────────────────────────┤ │
│           │  │ id (PK), assessment_id (FK)                  │ │
│           │  │ question_id (FK), response_value             │ │
│           │  │ response_text, status, submitted_by          │ │
│           │  └────────┬────────────────────────────────────┘ │
│           │           │                                       │
│           │  ┌────────▼────────────┐  ┌─────────────────────┐
│           │  │  Evidence Files    │  │  Response Reviews   │
│           │  ├───────────────────┤  ├─────────────────────┤
│           │  │ id, response_id   │  │ id, response_id     │
│           │  │ file_name, path   │  │ reviewed_by, action │
│           │  │ uploaded_by, date │  │ comments, timestamp │
│           │  └───────────────────┘  └─────────────────────┘
│           │
│  ┌────────▼──────────────────────────────────────────────────┐ │
│  │  Audit Logs (Complete Audit Trail)                        │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │ id (PK), assessment_id (FK), action, actor_id            │ │
│  │ changes (JSONB), timestamp, ip_address, user_agent       │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  All tables have:                                             │
│  ✓ Row Level Security (RLS) enabled                          │
│  ✓ Indexes on foreign keys                                   │
│  ✓ Triggers for updated_at                                   │
│  ✓ Relationships enforced with foreign keys                  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### 1. First Load - Database Initialization

```
User visits app
       │
       ▼
  LiveComplianceDashboard mounts
       │
       ├─ useFrameworks() called
       │  └─ Fetches /api/frameworks
       │
       ▼
  No data in DB?
       │
       ├─ YES ──▶ seedDatabase() triggered
       │          └─ POST /api/seed
       │             ├─ Insert 10 frameworks
       │             ├─ Insert sample questions
       │             └─ Returns counts
       │
       ▼
  SWR cache updated
       │
       ▼
  Dashboard renders with live data
  ├─ Framework cards
  ├─ Question counts
  └─ Assessment statistics
```

### 2. Assessment Submission Flow

```
User clicks "Submit Response"
       │
       ▼
  Form validation
       │
       ├─ Text length check
       ├─ File size check
       └─ Required field check
       │
       ▼
  POST /api/responses
       │
       ├─ Server-side validation
       │  └─ RLS check (user's org)
       │
       ▼
  Insert into compliance_responses
       │
       ├─ status = 'submitted'
       ├─ submitted_by = user_id
       └─ submitted_at = NOW()
       │
       ▼
  Create audit_log entry
       │
       ▼
  SWR revalidates /api/responses
       │
       ▼
  UI updates with new response
```

### 3. Admin Review Workflow

```
Admin sees pending responses
       │
       ▼
  AdminWorkflow component loads
       │
       ├─ GET /api/responses?assessmentId=X
       │  └─ Filters status = 'submitted'
       │
       ▼
  Admin reviews response + evidence
       │
       ├─ Reads question
       ├─ Reads response
       └─ Views evidence files
       │
       ▼
  Admin enters comments
       │
       ▼
  Admin clicks decision (Approve/Reject/Revise)
       │
       ▼
  POST /api/reviews
       │
       ├─ Insert response_reviews row
       │
       ├─ Update compliance_responses status
       │  ├─ 'approved' → approved
       │  ├─ 'rejected' → rejected
       │  └─ 'revision_requested' → needs_revision
       │
       ├─ Create audit_log entry
       │
       └─ Update assessment_frameworks progress
           └─ Recalculate % complete
       │
       ▼
  UI shows confirmation
  │
  └─ Move to next pending review
```

## Component Hierarchy

```
RootLayout
└── Page
    └── Header (sticky)
    │   ├── TBCP Logo & Title
    │   └── Export Report Button
    │
    └── Main Content
    │   └── LiveComplianceDashboard
    │       ├── Summary Stats (4 cards)
    │       │   ├─ Frameworks count
    │       │   ├─ Questions count
    │       │   ├─ Active assessments
    │       │   └─ System status
    │       │
    │       └── Frameworks List
    │           └── Framework Cards (repeating)
    │               ├─ Code + Name
    │               ├─ Category badge
    │               ├─ Progress bar
    │               └─ Question count
    │
    │       └── Recent Assessments
    │           └── Assessment Cards (repeating)
    │               ├─ Fiscal year
    │               ├─ Framework count
    │               └─ Status badge
    │
    └── Footer
        ├─ System Information
        ├─ Database Status
        └─ Support Contact
```

## State Management

### Global State (SWR Caching)
```
useFrameworks()
├─ Key: '/api/frameworks'
└─ Data: Array of frameworks with questions

useAssessments()
├─ Key: '/api/assessments'
└─ Data: Array of user's assessments

useResponses(assessmentId)
├─ Key: '/api/responses?assessmentId=X'
└─ Data: Array of responses for assessment
```

### Component State
```
LiveComplianceDashboard
├─ initialized: boolean (seed DB trigger)
└─ seedError: string | null

AdminWorkflow
├─ selectedResponse: ResponseData
├─ reviewComments: string
├─ isSubmitting: boolean
└─ actionMessage: { type, text }
```

## Security Architecture

### Row Level Security (RLS)

```
organizations
├─ SELECT: Users in organization_members
└─ UPDATE: Users with admin role

compliance_assessments
├─ SELECT: Users in organization
├─ INSERT: Compliance officers only
└─ UPDATE: Same org members

compliance_responses
├─ SELECT: Users in organization
├─ INSERT: Compliance officers
└─ UPDATE: Compliance officers

audit_logs
├─ SELECT: Organization members
└─ INSERT: Automatic via triggers
```

### Authentication Flow

```
Request comes in
├─ Supabase checks auth.users
│  └─ Validates JWT token
├─ Check organization_members
│  └─ Validate user-org relationship
├─ RLS policies evaluate
│  ├─ Row must match user's org
│  ├─ Role must have permission
│  └─ Return only allowed rows
└─ Response sent to user
```

## Scalability Considerations

### Database Optimization
- Indexes on frequently queried columns
- Relationships normalized (3NF)
- Audit logs partitioned by date (future)
- Soft deletes for compliance history

### API Optimization
- Selective field fetching (no `SELECT *`)
- Relationship joins in queries
- Caching via SWR
- Rate limiting (future)

### Frontend Optimization
- Code-splitting by route
- Lazy loading components
- Image optimization
- CSS minification

## Deployment Architecture

```
Local Development
└─ npm run dev
   ├─ Next.js dev server
   └─ Supabase connection (via env vars)

Production (Vercel)
└─ vercel.com
   ├─ Auto-deploys on git push
   ├─ Environment variables auto-configured
   ├─ Edge functions (optional)
   └─ Supabase remains connected

Database (Supabase)
└─ PostgreSQL cluster
   ├─ Automatic backups
   ├─ Read replicas (optional)
   └─ Connection pooling
```

## Future Enhancement Architecture

```
Phase 2: Authentication
├─ Supabase Auth
├─ Magic links
└─ OAuth providers

Phase 3: File Storage
├─ Supabase Storage
├─ Signed URLs
└─ Virus scanning

Phase 4: Notifications
├─ Supabase Realtime
├─ Email service (SendGrid)
└─ SMS (Twilio)

Phase 5: Analytics
├─ PostHog
├─ Compliance trends
└─ Risk scoring
```

---

This architecture ensures:
- ✅ Security through RLS
- ✅ Scalability through database design
- ✅ Performance through caching
- ✅ Maintainability through component separation
- ✅ Compliance through audit logging
