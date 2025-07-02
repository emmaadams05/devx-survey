'use client'

import React from 'react';
import type { Question } from '@/lib/const/questions';

interface TextareaQuestionProps {
  question: Question;
  value: string | undefined;
  onChange: (questionId: string, value: string) => void;
}

export default function TextareaQuestion({ question, value, onChange }: TextareaQuestionProps): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(question.id, event.target.value);
  };

  return (
    <div className="question-row">
      <p>{question.text}</p>
      <textarea
        value={value || ''}
        onChange={handleChange}
        placeholder="Enter your response..."
        rows={4}
      />
    </div>
  );
} 