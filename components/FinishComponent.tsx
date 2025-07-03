'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '@/lib/const/questions'
import { useSurvey } from '@/lib/hooks/useSurvey'
import { SurveyService } from '@/lib/services/surveyService'
import type { SurveyAnswers } from '@/lib/types/survey'

const SUBMISSION_FLAG_KEY = 'devxSurvey_hasSubmitted'

export function FinishComponent() {
  const router = useRouter()
  const { answers, getSurveyData } = useSurvey()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string>()

  // Check localStorage for previous submission on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSubmitted = localStorage.getItem(SUBMISSION_FLAG_KEY)
      if (hasSubmitted === 'true') {
        setIsSubmitted(true)
      }
    }
  }, [])

  // Check if all required questions are answered
  const allRequiredQuestions = questions.filter(q => q.scale !== 'text') // Text questions are optional
  const allRequiredAnswered = allRequiredQuestions.every((q) => {
    const val = answers[q.id as keyof SurveyAnswers]
    if (val === undefined) return false
    if (typeof val === "string") return val.trim() !== ""
    return true
  })

  const handleSubmit = async () => {
    if (!allRequiredAnswered || isSubmitting || isSubmitted) return

    setIsSubmitting(true)
    setSubmitError(undefined)

    try {
      const surveyData = getSurveyData();
      const result = await SurveyService.submitSurvey(surveyData)

      if (result.success) {
        setIsSubmitted(true)
        // Mark as submitted in localStorage to prevent double submissions
        if (typeof window !== 'undefined') {
          localStorage.setItem(SUBMISSION_FLAG_KEY, 'true')
        }
      } else {
        setSubmitError(result.error || 'Failed to submit survey. Please try again.')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitError('Failed to submit survey. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoBack = () => {
    router.push('/additional-feedback') // Go back to last page
  }

  useEffect(() => {
    // Only attempt if answers have loaded and we haven't tried yet
    if (Object.keys(answers).length === 0) return

    // Don't auto-submit if already submitted
    if (isSubmitted) return

    if (!isSubmitting && !isSubmitted && allRequiredAnswered) {
      handleSubmit()
    }
  }, [answers, isSubmitting, isSubmitted, allRequiredAnswered, handleSubmit])

  // ------------------ Render ------------------

  // Show spinner / submitting state
  if (isSubmitting && !isSubmitted) {
    return (
      <div className="demo-card">
        <section>
          <h2 className="section-title">Submitting...</h2>
          <p>Your responses are being saved. Please wait.</p>
        </section>
      </div>
    )
  }

  // After submission success
  if (isSubmitted) {
    return (
      <div className="demo-card">
        <div className="success-card">
          <div className="success-icon">
            ✓
          </div>
          <h2 className="section-title">Thank you!</h2>
          <div className="success-message">
            <p>
              Your survey has been submitted successfully. Thank you for sharing your 
              developer experience insights!
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Error state if submission failed
  return (
    <div className="demo-card">
      <section>
        <h2 className="section-title">Submission Error</h2>
        <div className="error-message">
          {submitError || 'Unknown error. Please try again.'}
        </div>
        <div className="btn-group">
          <button type="button" className="btn" onClick={handleSubmit} disabled={isSubmitting}>
            Retry Submit
          </button>
          <button type="button" className="btn btn--secondary" onClick={handleGoBack} disabled={isSubmitting}>
            Back to Survey
          </button>
        </div>
      </section>
    </div>
  )
} 