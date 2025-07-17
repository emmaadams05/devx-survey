'use client'

import Link from 'next/link'

export default function SurveyIntroPage() {
  return (
    <div className="card intro-card">
       <h1 style={{ textAlign: 'center', marginTop: 0 }}>
        Synchrony Developer Experience Survey
       </h1>
       <div className="progress-preview">≈ 5 min · 5 steps</div>
       <p>This survey contains questions regarding your developer experience at Synchrony.
        Please read each question <strong>carefully</strong> and respond honestly.
       </p>
       <p>
        Results from this survey will be shared with leadership to inform future decisions and will be used to help improve the existing developer experience at Synchrony.
       </p>
       <p>
         Thanks for helping us improve our engineering environment. Your feedback highlights friction, guides improvements, and allows us to track progress over time.
       </p>
       <p>
         Responses are <strong>anonymous</strong> and aggregated.
       </p>
       <Link href="/demographics" className="btn center-button">
         Start Survey
       </Link>
    </div>
  )
} 