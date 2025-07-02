'use client'

import Link from 'next/link'

export default function SurveyIntroPage() {
  return (
    <div className="card intro-card">
       <h1 style={{ textAlign: 'center', marginTop: 0 }}>
         <span role="img" aria-hidden="true">🛠️</span> Developer Experience Survey
       </h1>
       <div className="progress-preview">≈ 5 min · 5 steps</div>
       <p>
         Thanks for helping us improve our engineering environment. Your feedback:
       </p>
       <ul className="hero-list">
         <li>Highlights friction</li>
         <li>Guides improvements</li>
         <li>Tracks progress over time</li>
       </ul>
       <p>
         Responses are <strong>anonymous</strong> and aggregated.
       </p>
       <Link href="/demographics" className="btn center-button">
         Start Survey
       </Link>
    </div>
  )
} 