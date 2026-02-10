'use client'

import { useState } from 'react'
import { ChevronRight, Upload, CheckCircle2, Zap, Shield } from 'lucide-react'

// Types
interface Question {
  id: string
  stage: 'applicability' | 'control' | 'effectiveness' | 'evidence'
  question: string
  type: 'yes-no' | 'implementation-level' | 'evidence-upload'
  answerOptions?: string[]
  requiresEvidence?: boolean
  condition?: { dependsOn: string; value: string }
}

interface Answer {
  questionId: string
  value: string
  evidence?: { name: string; confidence: number }
}

// Sample data
const PROJECTS = [
  { id: '1', name: '2 CFR 200 Compliance', regulation: '2 CFR 200', compliant: 78, pending: 15, nonCompliant: 7 },
  { id: '2', name: 'Title VI Assessment', regulation: 'Title VI', compliant: 82, pending: 12, nonCompliant: 6 },
  { id: '3', name: 'NEPA Documentation', regulation: 'NEPA', compliant: 45, pending: 35, nonCompliant: 20 },
]

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    stage: 'applicability',
    question: 'Is this regulation applicable to your organization?',
    type: 'yes-no',
    answerOptions: ['Yes', 'No', 'Partially'],
  },
  {
    id: 'q2',
    stage: 'applicability',
    condition: { dependsOn: 'q1', value: 'No' },
    question: 'Mark as not applicable and proceed?',
    type: 'yes-no',
    answerOptions: ['Confirm', 'Reconsider'],
  },
  {
    id: 'q3',
    stage: 'control',
    condition: { dependsOn: 'q1', value: 'Yes' },
    question: 'Do you have implemented controls for this requirement?',
    type: 'implementation-level',
    answerOptions: ['Fully implemented', 'Partially implemented', 'Not implemented'],
  },
  {
    id: 'q4',
    stage: 'effectiveness',
    condition: { dependsOn: 'q3', value: 'Fully implemented' },
    question: 'How effective are these controls in practice?',
    type: 'yes-no',
    answerOptions: ['Highly effective', 'Somewhat effective', 'Needs improvement'],
  },
  {
    id: 'q5',
    stage: 'evidence',
    condition: { dependsOn: 'q4', value: 'Highly effective' },
    question: 'Upload documentation to support your compliance claim',
    type: 'evidence-upload',
    requiresEvidence: true,
  },
]

// Dashboard Component
function DashboardView({ onSelectProject }: { onSelectProject: (id: string) => void }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafbfc' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#1f70e6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield style={{ width: '24px', height: '24px', color: '#ffffff' }} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', letterSpacing: '-0.02em', color: '#0f172a' }}>
                Compliance Manager
              </h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#6b7280' }}>Risk-based federal compliance assessment</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '700', letterSpacing: '-0.03em', margin: '0 0 12px 0', color: '#0f172a' }}>
            Compliance Projects
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280', margin: '0 0 32px 0', maxWidth: '600px' }}>
            Start a compliance assessment. Answer targeted questions based on your risk profile.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1f70e6'
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(31, 112, 230, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0', color: '#0f172a' }}>
                  {project.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                  {project.regulation}
                </p>
              </div>

              <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Compliance Score</span>
                  <span style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>{project.compliant}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', backgroundColor: '#10b981', width: `${project.compliant}%` }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px', fontSize: '12px' }}>
                <div style={{ padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '6px', textAlign: 'center' }}>
                  <p style={{ fontWeight: '700', color: '#047857', margin: 0 }}>{project.compliant}%</p>
                  <p style={{ fontSize: '11px', color: '#10b981', margin: '4px 0 0 0' }}>Compliant</p>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '6px', textAlign: 'center' }}>
                  <p style={{ fontWeight: '700', color: '#b45309', margin: 0 }}>{project.pending}%</p>
                  <p style={{ fontSize: '11px', color: '#f59e0b', margin: '4px 0 0 0' }}>Evidence</p>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#fee2e2', borderRadius: '6px', textAlign: 'center' }}>
                  <p style={{ fontWeight: '700', color: '#b91c1c', margin: 0 }}>{project.nonCompliant}%</p>
                  <p style={{ fontSize: '11px', color: '#ef4444', margin: '4px 0 0 0' }}>Non-Compliant</p>
                </div>
              </div>

              <div style={{ paddingTop: '20px', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f70e6' }}>Start Assessment</span>
                <ChevronRight style={{ width: '18px', height: '18px', color: '#1f70e6' }} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

// Questionnaire Component
function QuestionnaireView({ projectId, onBack }: { projectId: string; onBack: () => void }) {
  const [answers, setAnswers] = useState<Answer[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<{ name: string } | null>(null)
  const [showAIValidation, setShowAIValidation] = useState(false)

  const getVisibleQuestions = () => {
    return QUESTIONS.filter((q) => {
      if (!q.condition) return true
      const dependsOnAnswer = answers.find((a) => a.questionId === q.condition.dependsOn)
      return dependsOnAnswer?.value === q.condition.value
    })
  }

  const visibleQuestions = getVisibleQuestions()
  const currentQuestion = visibleQuestions[currentIndex]

  const handleAnswer = (value: string) => {
    const newAnswers = answers.filter((a) => a.questionId !== currentQuestion.id)
    newAnswers.push({ questionId: currentQuestion.id, value })
    setAnswers(newAnswers)

    if (currentIndex < visibleQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      alert('Assessment complete! ' + visibleQuestions.length + ' questions answered.')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setUploadedFile({ name: file.name })
      setTimeout(() => setShowAIValidation(true), 800)
    }
  }

  if (!currentQuestion) {
    return <div>Loading...</div>
  }

  const progress = ((currentIndex + 1) / visibleQuestions.length) * 100

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafbfc' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: '#1f70e6',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '12px',
            }}
          >
            ← Back to Projects
          </button>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0', color: '#0f172a' }}>
              Compliance Assessment
            </h1>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              Stage: <strong>{currentQuestion.stage.charAt(0).toUpperCase() + currentQuestion.stage.slice(1)}</strong>
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Progress */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280' }}>
              Question {currentIndex + 1} of {visibleQuestions.length}
            </span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280' }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ height: '100%', backgroundColor: '#1f70e6', width: `${progress}%`, transition: 'width 0.3s ease' }} />
          </div>
        </div>

        {/* Question */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '40px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.02em', margin: '0 0 24px 0', color: '#0f172a', lineHeight: 1.3 }}>
            {currentQuestion.question}
          </h2>

          {/* Answers */}
          <div style={{ marginBottom: currentQuestion.type === 'evidence-upload' ? '40px' : '0' }}>
            {currentQuestion.type !== 'evidence-upload' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentQuestion.answerOptions?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    style={{
                      padding: '16px 20px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '15px',
                      fontWeight: '500',
                      color: '#0f172a',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1f70e6'
                      e.currentTarget.style.backgroundColor = '#f0f7ff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb'
                      e.currentTarget.style.backgroundColor = '#ffffff'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'evidence-upload' && (
              <div>
                <div
                  style={{
                    border: '2px dashed #1f70e6',
                    borderRadius: '8px',
                    padding: '32px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#f0f7ff',
                    marginBottom: '24px',
                  }}
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <Upload style={{ width: '32px', height: '32px', color: '#1f70e6', margin: '0 auto 12px' }} />
                  <p style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>
                    Drop file or click to upload
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>PDF, DOCX, JPG, PNG (max 10MB)</p>
                  <input
                    id="file-input"
                    type="file"
                    hidden
                    onChange={handleFileUpload}
                    accept=".pdf,.docx,.jpg,.png"
                  />
                </div>

                {uploadedFile && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ padding: '16px', backgroundColor: '#f0fdf4', border: '1px solid #10b981', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <CheckCircle2 style={{ width: '20px', height: '20px', color: '#10b981', flexShrink: 0 }} />
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#047857' }}>
                        {uploadedFile.name} uploaded
                      </span>
                    </div>

                    {showAIValidation && (
                      <div style={{ padding: '24px', backgroundColor: '#f0f7ff', border: '1px solid #1f70e6', borderRadius: '8px', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                          <Zap style={{ width: '20px', height: '20px', color: '#1f70e6', flexShrink: 0 }} />
                          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                            AI Evidence Analysis
                          </h3>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Confidence Score</span>
                            <span style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>78%</span>
                          </div>
                          <div style={{ width: '100%', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '9999px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', backgroundColor: '#1f70e6', width: '78%' }} />
                          </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: '#374151', margin: '0 0 8px 0' }}>Status</p>
                          <div style={{ padding: '12px', backgroundColor: '#ffffff', borderRadius: '6px', borderLeft: '3px solid #f59e0b' }}>
                            <p style={{ fontSize: '13px', color: '#0f172a', margin: 0 }}>
                              <span style={{ fontWeight: '600' }}>Needs Review</span> – Evidence mentions compliance controls but lacks enforcement details
                            </p>
                          </div>
                        </div>

                        <div>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: '#374151', margin: '0 0 8px 0' }}>Findings</p>
                          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#6b7280' }}>
                            <li>✓ Mentions financial control procedures</li>
                            <li>✓ Documentation dated within 12 months</li>
                            <li>⚠ Missing specific control owner information</li>
                            <li>⚠ No evidence of audit trail</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={() => handleAnswer('Evidence Uploaded')}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: '#1f70e6',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: uploadedFile ? 'pointer' : 'not-allowed',
                    opacity: uploadedFile ? 1 : 0.5,
                  }}
                  disabled={!uploadedFile}
                >
                  Proceed to Next Question
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

// Main App
export default function Page() {
  const [view, setView] = useState<'dashboard' | 'questionnaire'>('dashboard')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  return (
    <>
      {view === 'dashboard' && (
        <DashboardView
          onSelectProject={(id) => {
            setSelectedProjectId(id)
            setView('questionnaire')
          }}
        />
      )}
      {view === 'questionnaire' && selectedProjectId && (
        <QuestionnaireView
          projectId={selectedProjectId}
          onBack={() => {
            setView('dashboard')
            setSelectedProjectId(null)
          }}
        />
      )}
    </>
  )
}
