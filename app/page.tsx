'use client'

import { useState } from 'react'
import { Search, ChevronRight, CheckCircle2 } from 'lucide-react'

const PROJECTS = [
  {
    id: '1',
    name: 'Northern Network Broadband',
    client: 'Northern Tribes',
    score: 82,
    status: 'great',
    regulation: '2 CFR 200',
    compliant: 82,
    pending: 12,
    non: 6,
  },
  {
    id: '2',
    name: 'Digital Equity Initiative',
    client: 'Mountain County',
    score: 65,
    status: 'good',
    regulation: 'Title VI',
    compliant: 65,
    pending: 20,
    non: 15,
  },
  {
    id: '3',
    name: 'Rural Connectivity',
    client: 'Eastern Region',
    score: 45,
    status: 'partial',
    regulation: '2 CFR 200',
    compliant: 45,
    pending: 35,
    non: 20,
  },
  {
    id: '4',
    name: 'Coastal Broadband',
    client: 'Pacific Nations',
    score: 55,
    status: 'in-progress',
    regulation: 'NEPA',
    compliant: 55,
    pending: 30,
    non: 15,
  },
  {
    id: '5',
    name: 'Tech Support Center',
    client: 'Central Services',
    score: 28,
    status: 'not-started',
    regulation: 'ADA',
    compliant: 28,
    pending: 40,
    non: 32,
  },
]

export default function Page() {
  const [search, setSearch] = useState('')

  const filtered = PROJECTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'great':
        return '#f0fdf4'
      case 'good':
        return '#f0f9ff'
      case 'partial':
        return '#fffbeb'
      default:
        return '#f3f4f6'
    }
  }

  const getStatusBorder = (status: string) => {
    switch (status) {
      case 'great':
        return '#bbf7d0'
      case 'good':
        return '#bfdbfe'
      case 'partial':
        return '#fcd34d'
      default:
        return '#e5e7eb'
    }
  }

  const getScoreColor = (status: string) => {
    switch (status) {
      case 'great':
        return '#22c55e'
      case 'good':
        return '#3b82f6'
      case 'partial':
        return '#f59e0b'
      default:
        return '#9ca3af'
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <header
        style={{
          borderBottom: '1px solid #e5e7eb',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '64px',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#2563eb',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#111827' }}>
                Compliance Manager
              </h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
                Federal Grants Assessment
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Title Section */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
            Compliance Projects
          </h2>
          <p style={{ fontSize: '16px', color: '#4b5563', margin: '0 0 24px 0' }}>
            Track and manage federal compliance across all projects
          </p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: '320px' }}>
            <Search
              style={{
                position: 'absolute',
                left: '12px',
                top: '12px',
                width: '20px',
                height: '20px',
                color: '#9ca3af',
              }}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filtered.map((project) => (
            <div
              key={project.id}
              style={{
                backgroundColor: getStatusBg(project.status),
                border: `1px solid ${getStatusBorder(project.status)}`,
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.borderColor = '#bfdbfe'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = getStatusBorder(project.status)
              }}
            >
              {/* Project Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      margin: '0 0 4px 0',
                      color: '#111827',
                    }}
                  >
                    {project.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    {project.client}
                  </p>
                </div>
                {project.status === 'great' && (
                  <CheckCircle2 style={{ width: '24px', height: '24px', color: '#16a34a', marginLeft: '8px' }} />
                )}
              </div>

              {/* Score Section */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                    Overall Score
                  </span>
                  <span
                    style={{
                      fontSize: '32px',
                      fontWeight: '700',
                      color: '#111827',
                    }}
                  >
                    {project.score}%
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: getScoreColor(project.status),
                      width: `${project.score}%`,
                      borderRadius: '9999px',
                    }}
                  />
                </div>
              </div>

              {/* Status Breakdown */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginBottom: '16px',
                  textAlign: 'center',
                  fontSize: '12px',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#f0fdf4',
                    borderRadius: '6px',
                    padding: '8px',
                  }}
                >
                  <p style={{ fontWeight: '600', color: '#166534', margin: 0 }}>
                    {project.compliant}%
                  </p>
                  <p style={{ fontSize: '11px', color: '#16a34a', margin: '4px 0 0 0' }}>
                    Compliant
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: '#fef3c7',
                    borderRadius: '6px',
                    padding: '8px',
                  }}
                >
                  <p style={{ fontWeight: '600', color: '#92400e', margin: 0 }}>
                    {project.pending}%
                  </p>
                  <p style={{ fontSize: '11px', color: '#ca8a04', margin: '4px 0 0 0' }}>
                    Evidence
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: '#fee2e2',
                    borderRadius: '6px',
                    padding: '8px',
                  }}
                >
                  <p style={{ fontWeight: '600', color: '#991b1b', margin: 0 }}>
                    {project.non}%
                  </p>
                  <p style={{ fontSize: '11px', color: '#dc2626', margin: '4px 0 0 0' }}>
                    Non-Compliant
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: `1px solid ${getStatusBorder(project.status)}`,
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#4b5563',
                    backgroundColor: '#e5e7eb',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                  }}
                >
                  {project.regulation}
                </span>
                <ChevronRight style={{ width: '16px', height: '16px', color: '#2563eb' }} />
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              paddingTop: '48px',
              color: '#9ca3af',
            }}
          >
            <p style={{ fontSize: '16px' }}>No projects found</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid #e5e7eb',
          backgroundColor: '#ffffff',
          marginTop: '64px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              marginBottom: '32px',
            }}
          >
            <div>
              <h3 style={{ fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                Support
              </h3>
              <p style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>
                compliance@support.gov
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                Frameworks
              </h3>
              <p style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>
                10 CFR codes with 25+ obligations
              </p>
            </div>
            <div>
              <h3 style={{ fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                Version
              </h3>
              <p style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>
                Compliance Manager v3.0
              </p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '32px' }}>
            <p style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>
              © 2026 Compliance Manager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
}
