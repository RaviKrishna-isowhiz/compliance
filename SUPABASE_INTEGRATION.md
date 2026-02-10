# Supabase Integration Guide - TBCP Compliance System

## Overview

This document explains how the TBCP Compliance System integrates with Supabase PostgreSQL for real-time data management and compliance tracking.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Layer (Next.js)                    │
│  - React Components (live-dashboard.tsx)                    │
│  - Custom Hooks (useCompliance.ts)                          │
│  - Real-time data via SWR                                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Layer (Route Handlers)                │
│  - /api/frameworks       (GET frameworks + questions)       │
│  - /api/assessments      (GET/POST assessments)            │
│  - /api/responses        (GET/POST/PUT responses)           │
│  - /api/seed             (POST database initialization)     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│             Supabase Client Library (@supabase/js)          │
│  - Browser Client (lib/supabase/client.ts)                 │
│  - Server Client (lib/supabase/server.ts)                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Supabase PostgreSQL Database                    │
│  - 11 tables with RLS policies                             │
│  - Row Level Security enabled                              │
│  - Real-time subscriptions                                 │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema

### Core Tables

1. **organizations**
   - Tribal entities and organizations
   - Links to auth users via organization_members

2. **organization_members**
   - User-organization relationships
   - Role-based access control (admin, compliance_officer, reviewer, viewer)

3. **compliance_frameworks**
   - 10 federal compliance frameworks
   - Code, name, category, authority, description

4. **compliance_questions**
   - Questions per framework
   - Question type, guidance, required flag

5. **compliance_assessments**
   - Annual or as-needed assessments
   - Organization, fiscal year, status tracking

6. **assessment_frameworks**
   - Framework status per assessment
   - Progress percentage, reviewer comments

7. **compliance_responses**
   - Answers to compliance questions
   - Draft/submitted/approved/rejected status

8. **evidence_files**
   - Uploaded documents supporting responses
   - File metadata, verification status

9. **response_reviews**
   - Review actions (approved, rejected, revision requested)
   - Reviewer notes and timestamps

10. **audit_logs**
    - Complete audit trail of all changes
    - Who changed what, when, and why

## Environment Variables

Your `.env.local` file should contain:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
POSTGRES_URL=postgresql://user:password@host/database
POSTGRES_PRISMA_URL=postgresql://user:password@host/database?schema=public
POSTGRES_URL_NON_POOLING=postgresql://user:password@host/database
SUPABASE_JWT_SECRET=your_jwt_secret
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=postgres
POSTGRES_HOST=your_host
SUPABASE_ANON_KEY=your_anon_key
```

These are automatically set when you connect Supabase integration in v0.

## Data Flow

### 1. Database Initialization (First Load)

```
User visits app
    ↓
LiveComplianceDashboard mounts
    ↓
useFrameworks() hook calls /api/frameworks
    ↓
No frameworks found in database
    ↓
seedDatabase() triggered automatically
    ↓
/api/seed endpoint inserts 10 frameworks + 5 sample questions
    ↓
Database now contains compliance data
    ↓
Dashboard displays all frameworks
```

### 2. Creating an Assessment

```
User submits assessment form
    ↓
Call useAssessments().createAssessment()
    ↓
POST /api/assessments with organization_id, fiscal_year
    ↓
Server creates row in compliance_assessments table
    ↓
SWR cache updated automatically
    ↓
UI reflects new assessment
```

### 3. Submitting Compliance Responses

```
User answers compliance question
    ↓
Call useResponses().submitResponse()
    ↓
POST /api/responses with question_id, response_value
    ↓
Server inserts row in compliance_responses table
    ↓
Status set to 'draft' initially
    ↓
User can edit/update before final submission
    ↓
PUT /api/responses updates status to 'submitted'
```

## Row Level Security (RLS)

All tables have RLS enabled. Key policies:

### Organizations
- Users can view organizations they're members of
- Admins can manage their organization's data

### Assessments
- Users can view assessments for their organization
- Only compliance officers can create/edit assessments

### Responses & Evidence
- Users see only responses from their organization's assessments
- Compliance officers can submit/update
- Reviewers can approve/reject

### Audit Logs
- Users view logs for their organization only
- Creates complete compliance audit trail

## API Endpoints Reference

### GET /api/frameworks
Retrieves all compliance frameworks with their questions.

**Response:**
```json
{
  "frameworks": [
    {
      "id": "uuid",
      "code": "2CFR200",
      "name": "2 CFR Part 200",
      "category": "Federal Requirements",
      "compliance_questions": [...]
    }
  ]
}
```

### POST /api/assessments
Creates a new compliance assessment.

**Request:**
```json
{
  "organization_id": "uuid",
  "fiscal_year": 2024,
  "notes": "Optional notes"
}
```

### GET /api/assessments
Retrieves user's organization's assessments.

### POST /api/responses
Submits a compliance response.

**Request:**
```json
{
  "assessment_id": "uuid",
  "question_id": "uuid",
  "response_type": "yes|no|text|file|multiple_choice",
  "response_value": "value",
  "response_text": "Optional text explanation"
}
```

### PUT /api/responses
Updates an existing response.

### POST /api/seed
Initializes database with compliance frameworks and sample questions.

## Development Workflow

### 1. Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Visit http://localhost:3000
```

The app automatically:
- Connects to Supabase using your env vars
- Seeds the database if empty
- Displays live data from PostgreSQL

### 2. Testing

Use Supabase Studio to:
- View tables and data
- Test RLS policies
- Monitor real-time updates
- View audit logs

### 3. Production Deployment

```bash
# Deploy to Vercel
npm run build
git push  # Triggers Vercel deployment

# Supabase connection persists automatically
# Database continues to sync via environment variables
```

## Common Tasks

### Add a New Compliance Framework

1. Go to Supabase Studio → SQL Editor
2. Insert into `compliance_frameworks` table
3. Create questions by inserting into `compliance_questions`
4. Reload app (SWR will fetch new data)

### Query Assessment Data

```sql
-- Get all assessments with their framework statuses
SELECT 
  ca.*,
  af.framework_id,
  af.status,
  af.progress_percentage
FROM compliance_assessments ca
LEFT JOIN assessment_frameworks af ON ca.id = af.assessment_id
WHERE ca.organization_id = '<org-id>'
ORDER BY ca.created_at DESC;
```

### Export Compliance Report

```typescript
// In a server action or API route
const { data } = await supabase
  .from('compliance_assessments')
  .select(`
    *,
    assessment_frameworks(*),
    compliance_responses(*, compliance_questions(*))
  `)
  .eq('id', assessmentId);

// Format as PDF/CSV
generateReport(data);
```

### Monitor Compliance Progress

```typescript
// Get overall compliance status
const { data } = await supabase
  .from('assessment_frameworks')
  .select('status, progress_percentage')
  .eq('assessment_id', assessmentId);

// Calculate aggregate
const compliant = data.filter(f => f.status === 'compliant').length;
const percentage = data.reduce((sum, f) => sum + f.progress_percentage, 0) / data.length;
```

## Security Best Practices

1. **Environment Variables**
   - Keep SUPABASE_SERVICE_ROLE_KEY secret
   - Use NEXT_PUBLIC_ prefix only for public keys
   - Never commit env vars to git

2. **RLS Policies**
   - Always implement at the table level
   - Test policies with different user roles
   - Monitor audit logs for unauthorized access attempts

3. **Data Validation**
   - Validate input on client AND server
   - Use TypeScript for type safety
   - Sanitize file uploads

4. **Audit Trail**
   - Every change logged with user, timestamp, changes
   - Review audit logs regularly
   - Export for compliance reports

## Troubleshooting

### Database Connection Issues

```typescript
// Check if client is initialized
console.log('[v0] Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('[v0] Auth configured:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
```

### RLS Policy Errors

- Check that user is in organization_members table
- Verify role matches policy conditions
- View audit_logs for access attempts

### SWR Cache Issues

```typescript
// Force refresh data
import { mutate } from 'swr';
mutate('/api/frameworks');
```

### Seed Data Not Appearing

- Check if database tables exist
- View Supabase logs for SQL errors
- Manually run SQL migration if needed

## Next Steps

1. **Authentication**: Integrate Supabase Auth for user sign-up/login
2. **File Storage**: Use Supabase Storage for evidence uploads
3. **Notifications**: Send emails when assessments are ready for review
4. **Analytics**: Track compliance trends over time
5. **Export**: Generate PDF/CSV reports with assessment data

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://github.com/supabase/supabase-js)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [SWR Documentation](https://swr.vercel.app/)
