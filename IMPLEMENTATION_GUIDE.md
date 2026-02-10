# TBCP Compliance System - Implementation Guide

## Overview

This guide walks developers through implementing the TBCP Compliance Assessment System from the current mock data state to a fully functional production system with real database backend, authentication, and file storage.

## Phase 1: Foundation (Current State ✅)

### What's Already Built

- ✅ Production-grade UI components
- ✅ TypeScript type definitions
- ✅ Mock data for demonstration
- ✅ Database schema (SQL)
- ✅ Utility functions for compliance calculations
- ✅ Professional dashboard and admin panels
- ✅ Complete specification documentation

### Current Architecture

```
Mock Data (In Memory)
    ↓
React Components (Client-side rendering)
    ↓
Browser Display
```

## Phase 2: Database Integration

### Step 1: Choose Database Provider

**Recommended: PostgreSQL**

Options:
- **Neon** (Serverless, Vercel-integrated)
- **Supabase** (PostgreSQL with Auth included)
- **AWS RDS** (Managed relational database)
- **PlanetScale** (MySQL-based)

### Step 2: Set Up Database

#### For Neon:

```bash
# Install Neon CLI
npm install -g neonctl

# Create database
neonctl databases create tbcp-compliance

# Get connection string
neonctl connection-string
```

#### For Supabase:

1. Go to supabase.com
2. Create new project
3. Get connection string from Settings > Database

### Step 3: Run Database Schema

```bash
# Using psql
psql -h hostname -U user -d database_name -f scripts/setup-compliance-db.sql

# Or via Docker
docker exec -i postgres_container psql -U user -d database_name < scripts/setup-compliance-db.sql
```

### Step 4: Update Environment Variables

```env
# .env.local
DATABASE_URL=postgresql://user:password@host:5432/tbcp
DATABASE_HOST=host
DATABASE_PORT=5432
DATABASE_NAME=tbcp
DATABASE_USER=user
DATABASE_PASSWORD=password
```

## Phase 3: API Development

### Step 1: Set Up API Routes

Create API endpoints in `app/api/`:

```
app/api/
├── frameworks/
│   └── route.ts
├── assessments/
│   ├── route.ts
│   └── [id]/
│       ├── route.ts
│       └── report/
│           └── route.ts
├── questions/
│   └── route.ts
├── responses/
│   ├── route.ts
│   └── [id]/
│       ├── approve/route.ts
│       └── reject/route.ts
└── evidence/
    └── route.ts
```

### Step 2: Implement API Endpoints

#### Example: GET /api/frameworks

```typescript
// app/api/frameworks/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const frameworks = await db.query(
      'SELECT * FROM compliance_frameworks ORDER BY sort_order'
    );
    return NextResponse.json(frameworks);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
```

#### Example: POST /api/responses

```typescript
// app/api/responses/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.assessmentId || !body.questionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert into database
    const response = await db.query(
      `INSERT INTO compliance_responses 
       (assessment_id, question_id, response_value, status)
       VALUES ($1, $2, $3, 'Pending Review')
       RETURNING *`,
      [body.assessmentId, body.questionId, JSON.stringify(body.responseValue)]
    );

    return NextResponse.json(response.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save response' }, { status: 500 });
  }
}
```

### Step 3: Add Database Client

Install database package:

```bash
npm install pg
# or
npm install @neon/serverless
# or
npm install @supabase/supabase-js
```

Create database utility:

```typescript
// lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error('Database error', error);
    throw error;
  }
}

export default pool;
```

## Phase 4: Authentication

### Step 1: Choose Auth Solution

**Options:**
- **Supabase Auth** (Best if using Supabase)
- **Auth.js** (Open-source, NextAuth.js)
- **Clerk** (Developer-friendly)
- **Custom JWT** (Maximum control)

### Step 2: Implement Auth with Auth.js

```bash
npm install next-auth
```

Create auth configuration:

```typescript
// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Query user from database
        const user = await db.query(
          'SELECT * FROM users WHERE email = $1',
          [credentials?.email]
        );

        if (user.rows.length === 0) {
          throw new Error('User not found');
        }

        // Verify password
        const valid = await bcrypt.compare(
          credentials?.password || '',
          user.rows[0].password_hash
        );

        if (!valid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.rows[0].id,
          email: user.rows[0].email,
          name: user.rows[0].name,
          role: user.rows[0].role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};
```

### Step 3: Protect API Routes

```typescript
// app/api/responses/route.ts
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // API logic here
}
```

## Phase 5: File Storage

### Step 1: Choose File Storage

**Options:**
- **Vercel Blob** (Simple, integrated)
- **AWS S3** (Scalable, industry standard)
- **Supabase Storage** (If using Supabase)

### Step 2: Implement File Upload

#### Using Vercel Blob:

```bash
npm install @vercel/blob
```

```typescript
// app/api/evidence/upload/route.ts
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return Response.json(
      { error: 'No file provided' },
      { status: 400 }
    );
  }

  const blob = await put(file.name, file, {
    access: 'private',
  });

  // Save blob metadata to database
  await db.query(
    `INSERT INTO compliance_evidence 
     (response_id, file_name, file_path, file_size, file_type)
     VALUES ($1, $2, $3, $4, $5)`,
    [responseId, file.name, blob.url, file.size, file.type]
  );

  return Response.json(blob);
}
```

## Phase 6: Email Notifications

### Step 1: Set Up Email Service

**Options:**
- **SendGrid** (Reliable, scalable)
- **Resend** (Modern, TypeScript-first)
- **Amazon SES** (AWS service)

### Step 2: Implement Notification System

```bash
npm install resend
```

```typescript
// lib/notifications.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function notifyReviewersOfSubmission(
  assessmentId: string,
  frameworkName: string
) {
  const reviewers = await db.query(
    `SELECT email FROM users WHERE role = 'reviewer' AND active = true`
  );

  for (const reviewer of reviewers.rows) {
    await resend.emails.send({
      from: 'compliance@tbcp.gov',
      to: reviewer.email,
      subject: `New Compliance Response Pending Review: ${frameworkName}`,
      html: `
        <p>A new compliance response is pending your review.</p>
        <p>Framework: ${frameworkName}</p>
        <p><a href="https://tbcp.app/admin/reviews/${assessmentId}">Review Now</a></p>
      `,
    });
  }
}
```

## Phase 7: Reporting

### Step 1: Add Report Generation

```bash
npm install puppeteer jsPDF
```

```typescript
// app/api/assessments/[id]/report/route.ts
import { jsPDF } from 'jspdf';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const format = request.nextUrl.searchParams.get('format') || 'pdf';

  // Get assessment data
  const assessment = await db.query(
    'SELECT * FROM project_compliance_assessments WHERE id = $1',
    [params.id]
  );

  if (format === 'pdf') {
    const doc = new jsPDF();
    // Generate PDF content
    return new Response(doc.output('arraybuffer'), {
      headers: { 'Content-Type': 'application/pdf' },
    });
  }
}
```

## Phase 8: Testing

### Add Testing Libraries

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### Example Test

```typescript
// __tests__/compliance-utils.test.ts
import { describe, it, expect } from 'vitest';
import { calculateFrameworkStatus } from '@/lib/compliance-utils';

describe('compliance-utils', () => {
  it('should return Compliant when all questions approved', () => {
    const responses = [
      { status: 'Approved' },
      { status: 'Approved' },
    ];
    
    const status = calculateFrameworkStatus(responses, 2);
    expect(status).toBe('Compliant');
  });
});
```

## Phase 9: Deployment

### Step 1: Set Environment Variables in Vercel

```bash
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add RESEND_API_KEY
vercel env add VERCEL_BLOB_API_TOKEN
```

### Step 2: Deploy

```bash
vercel deploy --prod
```

## Migration Checklist

- [ ] Database created and schema applied
- [ ] Environment variables configured
- [ ] API endpoints implemented
- [ ] Database queries tested
- [ ] Authentication configured
- [ ] File storage integrated
- [ ] Email notifications working
- [ ] Report generation tested
- [ ] Tests written and passing
- [ ] Security audit completed
- [ ] Performance tested
- [ ] Deployed to production

## Common Issues & Solutions

### Issue: Connection timeout to database

**Solution:**
- Check DATABASE_URL format
- Verify database is accessible
- Check firewall rules
- Test with psql directly

### Issue: Authentication not persisting

**Solution:**
- Verify NEXTAUTH_SECRET is set
- Check cookie settings
- Clear browser cookies
- Verify session configuration

### Issue: File uploads failing

**Solution:**
- Check file size limits
- Verify storage service credentials
- Check CORS configuration
- Review file validation logic

## Performance Optimization

### Add Caching

```typescript
import { unstable_cache } from 'next/cache';

export const getCachedFrameworks = unstable_cache(
  async () => {
    return db.query('SELECT * FROM compliance_frameworks');
  },
  ['frameworks'],
  { revalidate: 3600 } // 1 hour
);
```

### Add Database Indexing

```sql
CREATE INDEX idx_assessments_project_id ON project_compliance_assessments(project_id);
CREATE INDEX idx_responses_assessment_id ON compliance_responses(assessment_id);
CREATE INDEX idx_evidence_response_id ON compliance_evidence(response_id);
```

## Security Hardening

1. **Input Validation**: Validate all user input
2. **Rate Limiting**: Add rate limiting to API endpoints
3. **HTTPS**: Enforce HTTPS in production
4. **CORS**: Configure appropriate CORS policies
5. **SQL Injection**: Use parameterized queries (already in examples)
6. **XSS Protection**: Sanitize user input
7. **File Upload Security**: Scan uploaded files for malware

## Monitoring & Logging

```typescript
// lib/logger.ts
export function logComplianceAction(
  action: string,
  userId: string,
  details: Record<string, any>
) {
  const log = {
    timestamp: new Date().toISOString(),
    action,
    userId,
    details,
  };

  // Send to logging service (e.g., Sentry, LogRocket)
  console.log(JSON.stringify(log));
}
```

## Support & Resources

- PostgreSQL Docs: https://www.postgresql.org/docs/
- Next.js Docs: https://nextjs.org/docs
- TypeScript Docs: https://www.typescriptlang.org/docs/
- Auth.js Docs: https://authjs.dev
- Vercel Docs: https://vercel.com/docs

---

**Last Updated**: February 2024
**Version**: 1.0.0
