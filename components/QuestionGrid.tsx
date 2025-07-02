'use client'

import React from 'react';
import { SCALE_LABELS, GRID_TITLES } from '@/lib/const/questions';
import type { LikertScale } from '@/lib/const/questions';
import type { SurveyAnswers, LikertAnswers } from '@/lib/types/survey';
import type { QuestionPair } from '@/lib/utils/questionPairs';

interface QuestionGridProps {
  title: string;
  pairs: QuestionPair[];
  answers: Partial<SurveyAnswers>;
  onChange: (questionId: string, value: LikertScale) => void;
}

export function QuestionGrid({ title, pairs, answers, onChange }: QuestionGridProps): JSX.Element {
  return (
    <div className="question-grid">
      <h2 className="grid-title">{title}</h2>

      <div className="grid-columns">
        <div />
        <div className="column-header">
          <h3>Satisfaction</h3>
        </div>
        <div className="column-header">
          <h3>Importance</h3>
        </div>
      </div>

      <div className="grid-body">
        {pairs.map((pair) => {
          const impactId = pair.impactQuestion.id as keyof LikertAnswers;
          const satisfactionId = pair.satisfactionQuestion.id as keyof LikertAnswers;

          return (
            <div key={pair.theme} className="grid-row">
              <div className="row-title">{GRID_TITLES[pair.theme as keyof typeof GRID_TITLES] ?? pair.theme}</div>

              <div className="rating-column">
                <div className="pill-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`pill-button ${answers[satisfactionId] === val ? 'pill-button--selected' : ''}`}
                      onClick={() => onChange(satisfactionId, val as LikertScale)}
                    >
                      {SCALE_LABELS.satisfaction[val - 1]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rating-column">
                <div className="pill-buttons">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`pill-button ${answers[impactId] === val ? 'pill-button--selected' : ''}`}
                      onClick={() => onChange(impactId, val as LikertScale)}
                    >
                      {SCALE_LABELS.impact[val - 1]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 