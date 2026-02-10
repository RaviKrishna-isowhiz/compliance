'use client'

import React from "react"

import { useState, useRef } from 'react'
import { ChevronRight, Upload, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  COMPLIANCE_REGULATIONS,
  getNextQuestion,
  getQuestionsForRegulation,
  type FunnelQuestion,
  type ComplianceResponse,
} from '@/lib/funnel-questionnaire'

interface FunnelQuestionnaireProps {
  regulationCode: string
  onComplete: (responses: ComplianceResponse[]) => void
  onBack: () => void
}

export function FunnelQuestionnaire({
  regulationCode,
  onComplete,
  onBack,
}: FunnelQuestionnaireProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null)
  const [responses, setResponses] = useState<ComplianceResponse[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showAIValidation, setShowAIValidation] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const questions = getQuestionsForRegulation(regulationCode)
  const currentQuestion = questions.find((q) => q.id === currentQuestionId)

  // Initialize with first question
  if (currentQuestionId === null && questions.length > 0) {
    setCurrentQuestionId(questions[0].id)
  }

  const regulation = COMPLIANCE_REGULATIONS.find((r) => r.code === regulationCode)

  const handleAnswer = () => {
    if (!currentQuestion || !currentAnswer) return

    const newResponse: ComplianceResponse = {
      questionId: currentQuestion.id,
      answer: currentAnswer,
      notes: notes || undefined,
    }

    const updatedResponses = [...responses, newResponse]
    setResponses(updatedResponses)

    const nextQuestionId = getNextQuestion(currentQuestion.id, currentAnswer)

    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId)
      resetForm()
    } else {
      setShowCompletion(true)
    }
  }

  const resetForm = () => {
    setCurrentAnswer('')
    setNotes('')
    setUploadedFile(null)
    setShowAIValidation(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // Simulate AI validation after 1.5s
      setTimeout(() => {
        setShowAIValidation(true)
      }, 1500)
    }
  }

  const riskColor = {
    critical: 'border-red-300 bg-red-50',
    high: 'border-orange-300 bg-orange-50',
    medium: 'border-yellow-300 bg-yellow-50',
    low: 'border-green-300 bg-green-50',
  }

  const riskBadge = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  }

  if (showCompletion) {
    const compliantCount = Math.round(responses.length * 0.65)
    const needsEvidenceCount = Math.round(responses.length * 0.25)
    const nonCompliantCount = responses.length - compliantCount - needsEvidenceCount

    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Assessment Complete</h1>
            <p className="text-lg text-slate-600">All {questions.length} questions reviewed for {regulation?.code}</p>
          </div>

          {/* Summary Stats */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Compliance Status Summary</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 font-semibold mb-1">Compliant</p>
                <p className="text-3xl font-bold text-green-600">{compliantCount}</p>
                <p className="text-xs text-green-600 mt-1">{Math.round((compliantCount / responses.length) * 100)}% of assessment</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-700 font-semibold mb-1">Needs Evidence</p>
                <p className="text-3xl font-bold text-yellow-600">{needsEvidenceCount}</p>
                <p className="text-xs text-yellow-600 mt-1">{Math.round((needsEvidenceCount / responses.length) * 100)}% of assessment</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-700 font-semibold mb-1">Non-Compliant</p>
                <p className="text-3xl font-bold text-red-600">{nonCompliantCount}</p>
                <p className="text-xs text-red-600 mt-1">{Math.round((nonCompliantCount / responses.length) * 100)}% of assessment</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4">Next Steps</h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">1.</span>
                  <span>Review the <strong>Needs Evidence</strong> items and upload supporting documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">2.</span>
                  <span>Address <strong>Non-Compliant</strong> items with corrective actions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">3.</span>
                  <span>Schedule a compliance review with your audit team</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">4.</span>
                  <span>Download the full compliance report for your records</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-between">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowCompletion(false)
                onBack()
              }}
              className="bg-white text-slate-700 hover:bg-slate-50 border-slate-300"
            >
              ← Back to Dashboard
            </Button>
            <Button 
              onClick={() => {
                onComplete(responses)
              }}
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Download Report
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!currentQuestion) return null

  const progress = Math.round(((responses.length + 1) / questions.length) * 100)

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <Button variant="ghost" onClick={onBack} className="mb-6 -ml-2 text-slate-600 hover:text-slate-900 text-sm">
            ← Back to Projects
          </Button>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900">{regulation?.name}</h1>
            <p className="text-slate-600 text-base">
              {regulation?.code} <span className="text-slate-500">—</span> {currentQuestion.obligation}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-700">
              Question {responses.length + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-slate-600">{progress}% complete</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question Card */}
        <div className={`border-2 rounded-2xl p-8 mb-8 bg-white ${riskColor[currentQuestion.riskLevel]}`}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">{currentQuestion.question}</h2>
              <p className="text-slate-600 text-base">{currentQuestion.hint}</p>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${riskBadge[currentQuestion.riskLevel]}`}>
              {currentQuestion.riskLevel.charAt(0).toUpperCase() + currentQuestion.riskLevel.slice(1)} Risk
            </span>
          </div>

          {/* Answer Options */}
          <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer}>
            <div className="space-y-3">
              {currentQuestion.answers?.map((answer) => (
                <div key={answer} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-slate-50 border border-slate-200 cursor-pointer transition-all hover:border-blue-300 hover:shadow-sm"
                  onClick={() => setCurrentAnswer(answer)}>
                  <RadioGroupItem value={answer} id={answer} />
                  <Label htmlFor={answer} className="flex-1 cursor-pointer text-slate-700 font-medium">
                    {answer}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          {/* Notes */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <Label className="text-sm font-semibold text-slate-700 mb-2 block">Add context or notes (optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="E.g., Documented in policy XYZ, effective since..."
              className="text-slate-700"
              rows={3}
            />
          </div>

          {/* Evidence Upload */}
          {currentQuestion.requiresEvidence && currentAnswer && (
            <div className="mt-7 pt-7 border-t border-slate-200">
              <Label className="text-sm font-semibold text-slate-700 mb-4 block flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Evidence Document
              </Label>

              {!uploadedFile ? (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    onChange={handleFileUpload}
                    accept=".pdf,.docx,.xlsx,.jpg,.png"
                  />
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm text-slate-700 font-semibold">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    PDF, DOCX, XLSX, JPG, PNG (max 10MB)
                  </p>
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-900 truncate">{uploadedFile.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setUploadedFile(null)
                        setShowAIValidation(false)
                      }}
                      className="text-slate-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>

                  {showAIValidation && (
                    <div className="border border-blue-200 bg-blue-50 rounded-lg p-5 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-blue-900 text-sm">AI Evidence Verification</p>
                        </div>
                      </div>
                      <div className="ml-8 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-blue-800">AI Confidence Score</span>
                          <span className="text-lg font-bold text-blue-900">82%</span>
                        </div>
                        <div className="bg-blue-100 rounded h-2">
                          <div className="bg-blue-600 h-2 rounded" style={{ width: '82%' }} />
                        </div>
                        <p className="text-xs text-blue-700 mt-2">Document contains relevant compliance evidence</p>
                        <div className="mt-3 space-y-2">
                          <p className="text-sm text-blue-800"><span className="font-semibold">✓</span> Mentions financial controls</p>
                          <p className="text-sm text-blue-800"><span className="font-semibold">✓</span> Documentation date found</p>
                          <p className="text-sm text-amber-700"><span className="font-semibold">⚠</span> Missing specific control owner</p>
                        </div>
                        <div className="mt-3 p-3 bg-blue-100 rounded text-xs text-blue-800">
                          <span className="font-semibold">Status: </span>Needs Review - Evidence accepted with notes
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-between pt-6">
          <Button variant="outline" onClick={onBack} className="bg-white text-slate-700 hover:bg-slate-50 border-slate-300">
            Cancel Assessment
          </Button>
          <Button onClick={handleAnswer} disabled={!currentAnswer} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            {getNextQuestion(currentQuestion.id, currentAnswer) ? 'Next Question' : 'Complete Assessment'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
