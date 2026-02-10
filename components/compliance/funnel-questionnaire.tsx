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

    setResponses([...responses, newResponse])

    const nextQuestionId = getNextQuestion(currentQuestion.id, currentAnswer)

    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId)
      resetForm()
    } else {
      onComplete(responses)
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

  if (!currentQuestion) return null

  const progress = Math.round(((responses.length + 1) / questions.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-6 -ml-2 text-slate-600 hover:text-slate-900">
            ← Back to Projects
          </Button>
          <div className="space-loose">
            <h1 className="font-display text-slate-900">{regulation?.name}</h1>
            <p className="text-slate-600 text-lg">
              {regulation?.code} - {currentQuestion.obligation}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">
              Question {responses.length + 1} of {questions.length}
            </span>
            <span className="text-sm font-semibold text-slate-500">{progress}% complete</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question Card */}
        <div className={`border-2 rounded-2xl p-8 mb-8 bg-white ${riskColor[currentQuestion.riskLevel]}`}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">{currentQuestion.question}</h2>
              <p className="text-slate-600">{currentQuestion.hint}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${riskBadge[currentQuestion.riskLevel]}`}>
              {currentQuestion.riskLevel.charAt(0).toUpperCase() + currentQuestion.riskLevel.slice(1)} Risk
            </span>
          </div>

          {/* Answer Options */}
          <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer}>
            <div className="space-tight">
              {currentQuestion.answers?.map((answer) => (
                <div key={answer} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
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
            <div className="mt-6 pt-6 border-t border-slate-200">
              <Label className="text-sm font-semibold text-slate-700 mb-4 block flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Evidence
              </Label>

              {!uploadedFile ? (
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 cursor-pointer transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    onChange={handleFileUpload}
                    accept=".pdf,.docx,.xlsx,.jpg,.png"
                  />
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 font-medium">
                    Drop file or click to upload
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    PDF, DOCX, XLSX, JPG, PNG
                  </p>
                </div>
              ) : (
                <div className="space-tight">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-sm font-medium text-slate-700 truncate">{uploadedFile.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>

                  {showAIValidation && (
                    <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-semibold text-blue-900 text-sm">AI Evidence Verification</p>
                          <div className="mt-3 space-tight text-sm">
                            <p className="text-blue-800">
                              <span className="font-semibold">Confidence: 82%</span> - Document contains relevant compliance evidence
                            </p>
                            <p className="text-blue-700">
                              ✓ Mentions financial controls <br />
                              ✓ Documentation date found <br />
                              ⚠ Missing specific control owner
                            </p>
                          </div>
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
        <div className="flex gap-3 justify-between">
          <Button variant="outline" onClick={onBack} className="bg-transparent">
            Cancel Assessment
          </Button>
          <Button onClick={handleAnswer} disabled={!currentAnswer} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            {getNextQuestion(currentQuestion.id, currentAnswer) ? 'Next Question' : 'Complete Assessment'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
