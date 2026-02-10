# TBCP Compliance System - Quick Start Guide

## 30-Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Environment variables already configured (Supabase integration active)

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000
```

**That's it!** The app automatically:
- Connects to Supabase
- Creates database tables
- Seeds compliance frameworks
- Shows the dashboard

---

## What You'll See

### Dashboard Tab
Real-time overview with:
- 10 compliance frameworks loaded
- Framework status cards
- Assessment statistics
- System status indicator

### Key Features
- **View Frameworks** - See all 10 federal compliance requirements
- **Track Progress** - Monitor compliance status per framework
- **Review Assessments** - See submitted assessments
- **Admin Review** - Approve/reject compliance responses

---

## Core Concepts

### Compliance Frameworks
Federal requirements your organization must meet:
- 2 CFR Part 200 (Federal awards)
- Title VI (Civil rights)
- NEPA (Environmental)
- And 7 more...

### Assessments
Annual or as-needed reviews of compliance status.

### Responses
Answers to compliance questions with supporting evidence.

### Reviews
Admin approval/rejection of submitted responses.

---

## Database Tables

```
organizations
├── organization_members
├── compliance_assessments
│   ├── assessment_frameworks
│   └── compliance_responses
│       ├── evidence_files
│       └── response_reviews
├── compliance_frameworks
│   └── compliance_questions
└── audit_logs
```

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/frameworks` | Fetch all compliance frameworks |
| GET/POST | `/api/assessments` | Manage assessments |
| GET/POST/PUT | `/api/responses` | Handle compliance responses |
| POST | `/api/reviews` | Submit review decisions |
| POST | `/api/seed` | Initialize database (auto-runs) |

---

## Main Components

### LiveComplianceDashboard
Main dashboard with real-time data from Supabase.

### ComplianceReport
Compliance statistics and reporting view.

### AdminWorkflow
Review interface for approving/rejecting responses.

### QuestionnaireForm
Multi-type question answering interface.

---

## Environment Variables

All automatically set via Supabase integration:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
POSTGRES_URL
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DATABASE
```

---

## File Structure

```
app/
├── page.tsx - Main dashboard
├── layout.tsx - Root layout
├── api/
│   ├── frameworks/ - Framework endpoints
│   ├── assessments/ - Assessment endpoints
│   ├── responses/ - Response endpoints
│   ├── reviews/ - Review endpoints
│   └── seed/ - Database initialization

components/compliance/
├── live-dashboard.tsx
├── compliance-report.tsx
├── admin-workflow.tsx
├── questionnaire-form.tsx
└── framework-detail.tsx

lib/
├── compliance-status.ts - Status logic
├── compliance-utils.ts - Helper functions
├── supabase/ - Client utilities
└── types/compliance.ts - TypeScript types

hooks/
└── useCompliance.ts - Custom hooks
```

---

## Common Tasks

### View Compliance Status
```typescript
const { frameworks } = useFrameworks()
// All 10 frameworks with questions
```

### Create Assessment
```typescript
const { createAssessment } = useAssessments()
await createAssessment({
  organization_id: 'org-uuid',
  fiscal_year: 2024
})
```

### Submit Response
```typescript
const { submitResponse } = useResponses(assessmentId)
await submitResponse({
  assessment_id,
  question_id,
  response_type: 'yes_no',
  response_value: 'yes'
})
```

### Approve Response
```typescript
POST /api/reviews
{
  response_id: 'uuid',
  action: 'approved',
  comments: 'Well documented'
}
```

---

## Debugging

### Check Database Connection
```
Visit Supabase Dashboard → SQL Editor
Run: SELECT * FROM compliance_frameworks;
Should see 10 frameworks
```

### Check API Responses
```
Open browser DevTools → Network tab
Look for /api/frameworks, /api/assessments
Status should be 200
```

### Check Console
```
npm run dev shows all logs
Look for "[v0]" prefixed messages
```

---

## Troubleshooting

### Blank Dashboard
- Check browser console for errors
- Verify Supabase URL in env vars
- Run `/api/seed` manually if needed

### Database Connection Failed
- Confirm SUPABASE_URL is set
- Verify NEXT_PUBLIC_SUPABASE_ANON_KEY exists
- Check Supabase project is active

### No Frameworks Showing
- Open `/api/seed` endpoint to trigger initialization
- Check Supabase Studio → compliance_frameworks table

---

## Next: Full Documentation

For detailed info, see:
- `SUPABASE_INTEGRATION.md` - Database setup
- `FINAL_DELIVERABLES.md` - Complete overview
- `COMPLIANCE_SPECIFICATION.md` - Technical details
- `README.md` - Project information

---

## Quick Links

- **Supabase Dashboard**: Check in v0 sidebar → Integrations
- **Local Server**: http://localhost:3000
- **Database Browser**: Supabase Studio (via dashboard link)
- **API Playground**: Visit `/api/frameworks` in browser

---

## Support

1. Check the docs (links above)
2. Review console logs
3. Check Supabase dashboard
4. Verify environment variables

---

**You're ready to go!** 🚀

Start with the dashboard and explore the compliance frameworks.
