'use client'

import { useState } from 'react'
import { Shield, Search, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FunnelQuestionnaire } from '@/components/compliance/funnel-questionnaire'

interface Project {
  id: string
  name: string
  clientName: string
  score: number
  status: 'great' | 'good' | 'partial' | 'in-progress' | 'not-started'
  regulation: string
}

const PROJECTS: Project[] = [
  { id: 'p1', name: 'Northern Network Broadband', clientName: 'Northern Tribes', score: 82, status: 'great', regulation: '2 CFR 200' },
  { id: 'p2', name: 'Digital Equity Initiative', clientName: 'Mountain County', score: 65, status: 'good', regulation: 'Title VI' },
  { id: 'p3', name: 'Rural Connectivity', clientName: 'Eastern Region', score: 45, status: 'partial', regulation: '2 CFR 200' },
  { id: 'p4', name: 'Coastal Broadband', clientName: 'Pacific Nations', score: 55, status: 'in-progress', regulation: 'NEPA' },
  { id: 'p5', name: 'Tech Support Center', clientName: 'Central Services', score: 28, status: 'not-started', regulation: 'ADA' },
]

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    great: 'bg-green-50 border-green-200',
    good: 'bg-blue-50 border-blue-200',
    partial: 'bg-amber-50 border-amber-200',
    'in-progress': 'bg-purple-50 border-purple-200',
    'not-started': 'bg-gray-50 border-gray-200',
  }
  return colors[status] || colors['not-started']
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    great: 'Great',
    good: 'Good',
    partial: 'Partial',
    'in-progress': 'In Progress',
    'not-started': 'Not Started',
  }
  return labels[status] || status
}

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 font-display">Compliance Manager</h1>
                <p className="text-xs text-slate-500 font-medium">Federal Grants Assessment</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {view === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
            {/* Hero Section */}
            <div className="mb-12">
              <h2 className="text-4xl font-display text-slate-900 mb-3">Compliance Projects</h2>
              <p className="text-lg text-slate-600 font-medium mb-8">Track and manage federal compliance across all projects</p>

              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <div
                  key={project.id}
                  className={`rounded-xl border p-6 cursor-pointer transition-all hover:shadow-lg ${getStatusColor(project.status)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">{project.name}</h3>
                      <p className="text-sm text-slate-600">{project.clientName}</p>
                    </div>
                    {project.status === 'great' && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 ml-2" />}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-700">Compliance Score</span>
                      <span className="text-2xl font-bold text-slate-900">{project.score}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          project.status === 'great'
                            ? 'bg-green-500'
                            : project.status === 'good'
                            ? 'bg-blue-500'
                            : project.status === 'partial'
                            ? 'bg-amber-500'
                            : 'bg-slate-400'
                        }`}
                        style={{ width: `${project.score}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600 bg-slate-200/50 px-2.5 py-1 rounded">
                      {project.regulation}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleSelectProject(project.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No projects found</p>
              </div>
            )}
          </div>
        )}

        {view === 'questionnaire' && selectedProject && (
          <FunnelQuestionnaire
            regulationCode={selectedProject.regulation}
            onComplete={() => {
              handleBack()
            }}
            onBack={handleBack}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Support</h3>
              <p className="text-sm text-slate-600">compliance@support.gov</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Frameworks</h3>
              <p className="text-sm text-slate-600">10 CFR codes with 25+ obligations</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Version</h3>
              <p className="text-sm text-slate-600">Compliance Manager v2.0</p>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8">
            <p className="text-sm text-slate-600">© 2026 Compliance Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
