'use client'

import { useState } from 'react'
import { Shield, Search, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react'
import { FunnelQuestionnaire } from '@/components/compliance/funnel-questionnaire'

interface Project {
  id: string
  name: string
  clientName: string
  score: number
  status: 'great' | 'good' | 'partial' | 'in-progress' | 'not-started'
  regulation: string
  compliant: number
  needsEvidence: number
  nonCompliant: number
}

const PROJECTS: Project[] = [
  { id: 'p1', name: 'Northern Network Broadband', clientName: 'Northern Tribes', score: 82, status: 'great', regulation: '2 CFR 200', compliant: 82, needsEvidence: 12, nonCompliant: 6 },
  { id: 'p2', name: 'Digital Equity Initiative', clientName: 'Mountain County', score: 65, status: 'good', regulation: 'Title VI', compliant: 65, needsEvidence: 20, nonCompliant: 15 },
  { id: 'p3', name: 'Rural Connectivity', clientName: 'Eastern Region', score: 45, status: 'partial', regulation: '2 CFR 200', compliant: 45, needsEvidence: 35, nonCompliant: 20 },
  { id: 'p4', name: 'Coastal Broadband', clientName: 'Pacific Nations', score: 55, status: 'in-progress', regulation: 'NEPA', compliant: 55, needsEvidence: 30, nonCompliant: 15 },
  { id: 'p5', name: 'Tech Support Center', clientName: 'Central Services', score: 28, status: 'not-started', regulation: 'ADA', compliant: 28, needsEvidence: 40, nonCompliant: 32 },
]

export default function Page() {
  const [view, setView] = useState<'dashboard' | 'questionnaire'>('dashboard')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = PROJECTS.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId)
    setView('questionnaire')
  }

  const handleBack = () => {
    setView('dashboard')
    setSelectedProjectId(null)
  }

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId)

  if (view === 'questionnaire' && selectedProject) {
    return (
      <FunnelQuestionnaire
        regulationCode={selectedProject.regulation}
        onComplete={() => {
          handleBack()
        }}
        onBack={handleBack}
      />
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '0.5rem', backgroundColor: '#2563eb' }}>
              <Shield style={{ width: '24px', height: '24px', color: '#ffffff' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>Compliance Manager</h1>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>Federal Grants Assessment Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 1.5rem' }}>
        {/* Hero Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.5rem 0' }}>Compliance Projects</h2>
          <p style={{ fontSize: '1.125rem', color: '#4b5563', margin: '0 0 2rem 0' }}>Track and manage federal compliance across all projects. Risk-based assessment system.</p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: '28rem' }}>
            <Search style={{ position: 'absolute', left: '0.75rem', top: '0.875rem', width: '20px', height: '20px', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', paddingLeft: '2.5rem', paddingRight: '1rem', paddingTop: '0.625rem', paddingBottom: '0.625rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', color: '#111827', fontSize: '1rem', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filteredProjects.map(project => {
            const bgColor = project.status === 'great' ? '#f0fdf4' : project.status === 'good' ? '#f0f9ff' : project.status === 'partial' ? '#fffbeb' : '#f3f4f6'
            const borderColor = project.status === 'great' ? '#bbf7d0' : project.status === 'good' ? '#bfdbfe' : project.status === 'partial' ? '#fcd34d' : '#e5e7eb'
            const scoreColor = project.status === 'great' ? '#22c55e' : project.status === 'good' ? '#3b82f6' : project.status === 'partial' ? '#f59e0b' : '#9ca3af'

            return (
              <div
                key={project.id}
                style={{ padding: '1.5rem', borderRadius: '1rem', border: `1px solid ${borderColor}`, backgroundColor: bgColor, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  el.style.borderColor = '#3b82f6'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.boxShadow = 'none'
                  el.style.borderColor = borderColor
                }}
                onClick={() => handleSelectProject(project.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>{project.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>{project.clientName}</p>
                  </div>
                  {project.status === 'great' && <CheckCircle2 style={{ width: '24px', height: '24px', color: '#16a34a', marginLeft: '0.5rem', flexShrink: 0 }} />}
                </div>

                {/* Compliance Metrics */}
                <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Overall Score</span>
                    <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827' }}>{project.score}%</span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ height: '8px', borderRadius: '9999px', backgroundColor: scoreColor, width: `${project.score}%`, transition: 'width 0.3s' }} />
                  </div>
                </div>

                {/* Status Breakdown */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem', textAlign: 'center' }}>
                  <div style={{ padding: '0.5rem', backgroundColor: '#f0fdf4', borderRadius: '0.375rem' }}>
                    <p style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '600', margin: 0 }}>{project.compliant}%</p>
                    <p style={{ fontSize: '0.75rem', color: '#16a34a', margin: '0.25rem 0 0 0' }}>Compliant</p>
                  </div>
                  <div style={{ padding: '0.5rem', backgroundColor: '#fef3c7', borderRadius: '0.375rem' }}>
                    <p style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: '600', margin: 0 }}>{project.needsEvidence}%</p>
                    <p style={{ fontSize: '0.75rem', color: '#ca8a04', margin: '0.25rem 0 0 0' }}>Evidence</p>
                  </div>
                  <div style={{ padding: '0.5rem', backgroundColor: '#fee2e2', borderRadius: '0.375rem' }}>
                    <p style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: '600', margin: 0 }}>{project.nonCompliant}%</p>
                    <p style={{ fontSize: '0.75rem', color: '#dc2626', margin: '0.25rem 0 0 0' }}>Non-Compliant</p>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: `1px solid ${borderColor}` }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', backgroundColor: '#e5e7eb', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                    {project.regulation}
                  </span>
                  <ArrowRight style={{ width: '16px', height: '16px', color: '#2563eb' }} />
                </div>
              </div>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', paddingTop: '3rem' }}>
            <AlertCircle style={{ width: '48px', height: '48px', color: '#d1d5db', margin: '0 auto 1rem' }} />
            <p style={{ color: '#4b5563' }}>No projects found</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e5e7eb', marginTop: '4rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Support</h3>
              <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>compliance@support.gov</p>
            </div>
            <div>
              <h3 style={{ fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Frameworks</h3>
              <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>10 CFR codes with 25+ obligations</p>
            </div>
            <div>
              <h3 style={{ fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Version</h3>
              <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>Compliance Manager v3.0</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: 0 }}>© 2026 Compliance Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
