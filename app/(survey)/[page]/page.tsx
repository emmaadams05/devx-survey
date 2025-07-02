'use client'

import { SurveyPageComponent } from '@/components/SurveyPageComponent'
import { surveyPages } from '@/lib/const/surveyPages'
import Link from 'next/link'
import React from 'react'

interface SurveyPageProps {
  params: { page: string }
}

export default function SurveyPage({ params }: SurveyPageProps) {
  const { page } = params

  // Validate page identifier
  const isValidPage = surveyPages.some(p => p.page === page)
  
  if (!isValidPage) {
    return (
      <div className="demo-card">
        <h2>Page Not Found</h2>
        <p>Invalid survey page. Please start from the beginning.</p>
        <Link href="/intro" className="btn">
          Start Survey
        </Link>
      </div>
    )
  }

  return <SurveyPageComponent page={page} />
} 