'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { questions, questionsById } from '@/lib/const/questions'
import { surveyPages, PageType, getNextPage, getPreviousPage, calculatePageProgress, isLastPage, getPageIndex } from '@/lib/const/surveyPages'
import { useSurvey, STORAGE_KEY, convertFromStorage } from '@/lib/hooks/useSurvey'
import RadioQuestion from '@/components/RadioQuestion'
import CheckboxQuestion from '@/components/CheckboxQuestion'
import TextareaQuestion from '@/components/TextareaQuestion'
import { QuestionGrid } from '@/components/QuestionGrid'
import { getFirstUnansweredPage } from '@/lib/utils/surveyProgress'
import { createPairsForThemes } from '@/lib/utils/questionPairs'
import type { SurveyAnswers, DemographicAnswers, LikertAnswers, TextAnswers } from '@/lib/types/survey'
import type { Question, LikertScale } from '@/lib/const/questions'
import { isLikertAnswer } from '@/lib/types/survey'
import { QuestionComponentType } from '@/lib/const/questions'

interface SurveyPageComponentProps {
  page: string
}

export function SurveyPageComponent({ page }: SurveyPageComponentProps): JSX.Element {
  const router = useRouter()
  const { answers, save, error } = useSurvey()
  const [hasAttemptedNext, setHasAttemptedNext] = useState<boolean>(false)

  // All hooks must be called at the top level
  const pageConfig = useMemo(() => surveyPages.find(p => p.page === page), [page])

  const currentPageQuestions = useMemo((): Question[] => {
    if (!pageConfig) return [];

    switch (pageConfig.type) {
      case PageType.Demographics:
      case PageType.Text:
        return pageConfig.questionIds.map(id => questionsById[id]).filter(Boolean);
      case PageType.QuestionGrid:
        return createPairsForThemes(questions, pageConfig.themes)
            .flatMap(pair => [pair.impactQuestion, pair.satisfactionQuestion]);
      default:
        return [];
    }
  }, [pageConfig])

  const allAnswered = useMemo(() => currentPageQuestions.every((q) => {
    const val = answers[q.id as keyof SurveyAnswers]

    if (val === undefined) return false

    // For checkbox questions (arrays) ensure at least one selection
    if (Array.isArray(val)) return val.length > 0

    // For text inputs ensure non-empty string
    if (typeof val === "string") return val.trim() !== ""

    return true // radio and other scalar answers
  }), [currentPageQuestions, answers])

  // --- Redirect logic: if user navigates past their last unanswered question, send them back ---
  useEffect(() => {
    // On the client side, after hydration, check for redirects.
    // Reading directly from cookies avoids state sync issues on navigation.
    const stored = Cookies.get(STORAGE_KEY)
    const answersFromCookie = stored ? convertFromStorage(JSON.parse(stored)) : {}

    const requiredPage = getFirstUnansweredPage(answersFromCookie)
    const currentPageIndex = getPageIndex(page)
    const requiredPageIndex = requiredPage ? getPageIndex(requiredPage) : -1

    if (requiredPage !== null && currentPageIndex > requiredPageIndex) {
      router.replace(`/${requiredPage}`)
    }

    // Reset attempt state when page changes
    setHasAttemptedNext(false)
  }, [page, router])


  // Early return after all hooks have been called
  if (!pageConfig) {
    return <div>Page not found</div>
  }

  const handleLikertAnswer = (questionId: string, value: LikertScale): void => {
    if (isLikertAnswer(value)) {
      save(questionId as keyof LikertAnswers, value)
    }
  }

  const handleStringAnswer = (questionId: string, value: string): void => {
    save(questionId as keyof (DemographicAnswers & TextAnswers), value)
  }

  const handleArrayAnswer = (questionId: string, value: string[]): void => {
    save(questionId as keyof SurveyAnswers, value as SurveyAnswers[keyof SurveyAnswers])
  }

  const handleNext = (): void => {
    setHasAttemptedNext(true)
    if (!allAnswered) {
      return // Don't proceed if not all answered
    }

    if (isLastPage(page)) {
      router.push('/finish')
    } else {
      const nextPage = getNextPage(page)
      if (nextPage) {
        router.push(`/${nextPage}`)
      }
    }
  }

  const handleBack = (): void => {
    const previousPage = getPreviousPage(page)
    if (previousPage) {
      router.push(`/${previousPage}`)
    } else {
      router.push('/intro')
    }
  }

  const renderQuestion = (question: Question) => {
    const value = answers[question.id as keyof SurveyAnswers];

    switch (question.component) {
      case QuestionComponentType.Radio:
        return (
          <RadioQuestion
            key={question.id}
            question={question}
            value={value as string | undefined}
            onChange={handleStringAnswer}
          />
        );
      case QuestionComponentType.Checkbox:
        return (
          <CheckboxQuestion
            key={question.id}
            question={question}
            value={value as string[] | undefined}
            onChange={handleArrayAnswer}
          />
        );
      case QuestionComponentType.Textarea:
        return (
          <TextareaQuestion
            key={question.id}
            question={question}
            value={value as string | undefined}
            onChange={handleStringAnswer}
          />
        );
      default:
        return null;
    }
  };

  const renderPage = (): JSX.Element => {
    switch (pageConfig.type) {
      case PageType.Demographics:
        return (
          <div className="demographics-page">
            {pageConfig.questionIds.map(id => renderQuestion(questionsById[id]))}
          </div>
        )
      case PageType.QuestionGrid:
        return (
          <QuestionGrid
            title={pageConfig.title}
            pairs={createPairsForThemes(questions, pageConfig.themes)}
            answers={answers}
            onChange={handleLikertAnswer}
          />
        )
      case PageType.Text:
        return (
          <div className="text-questions-page">
            {pageConfig.questionIds.map(id => renderQuestion(questionsById[id]))}
          </div>
        )
      default:
        // This should be exhaustive and ideally never hit
        // if pageConfig is defined.
        return <div>Invalid page type</div>;
    }
  }

  const currentPageIndex = getPageIndex(page)
  const pageProgress = calculatePageProgress(page)

  return (
    <div className="demo-card">
      <div className="progress">
        <div
          className="progress__bar"
          style={{ width: `${pageProgress}%` }}
        />
      </div>
      
      <section>
        <h2 className="section-title">
          Step {currentPageIndex + 1} of {surveyPages.length}: {pageConfig.title}
        </h2>
        {pageConfig.description && (
          <p className="page-description">{pageConfig.description}</p>
        )}

        {renderPage()}
      </section>

      {!allAnswered && hasAttemptedNext && (
        <p className="error-message">Please answer all questions to continue.</p>
      )}

      {error && <p className="error-message">Could not save progress. Please try again.</p>}

      <div className="btn-group">
        <button type="button" className="btn btn--secondary" onClick={handleBack}>
          Back
        </button>
        <button type="button" className="btn" onClick={handleNext}>
          {isLastPage(page) ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  )
} 