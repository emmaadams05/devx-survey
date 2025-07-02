'use client'

import React from 'react';
import { SCALE_LABELS } from '@/lib/const/questions';
import type { LikertScale } from '@/lib/const/questions';
import type { LikertAnswers } from '@/lib/types/survey';

interface LikertScaleRowProps {
  title: string;
  impactId: keyof LikertAnswers;
  satisfactionId: keyof LikertAnswers;
  answers: Partial<LikertAnswers>;
  onChange: (questionId: string, value: LikertScale) => void;
}

export function LikertScaleRow({ title, impactId, answers, onChange }: LikertScaleRowProps): JSX.Element {
  const scaleType = title.toLowerCase() as 'impact' | 'satisfaction';

  return (
    <div className="likert">
      <label>{title}</label>
      <div className="pill-buttons">
        {[1, 2, 3, 4, 5].map((val) => (
          <button
            key={val}
            type="button"
            className={`pill ${answers[impactId] === val ? 'selected' : ''}`}
            onClick={() => onChange(impactId, val as LikertScale)}
          >
            {val}
            <span className="sr-only">{SCALE_LABELS[scaleType][val - 1]}</span>
          </button>
        ))}
      </div>
      <span className="label-text">{SCALE_LABELS[scaleType][4]}</span>
    </div>
  );
} 