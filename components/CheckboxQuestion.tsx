'use client'

import React from 'react';
import type { Question } from '@/lib/const/questions';

interface CheckboxQuestionProps {
  question: Question;
  value: string[] | undefined;
  onChange: (questionId: string, value: string[]) => void;
}

export default function CheckboxQuestion({ question, value, onChange }: CheckboxQuestionProps): JSX.Element {
  const techOptions = question.options || [];
  const currentValues = value || [];

  const handleCheckboxChange = (option: string, checked: boolean) => {
    const newValues = checked
      ? [...currentValues, option]
      : currentValues.filter(v => v !== option);
    
    onChange(question.id, newValues);
  };

  return (
    <div className="question-row">
      <fieldset data-question="tech">
        <legend>{question.text}</legend>
        {techOptions.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              name={question.id}
              value={option}
              checked={currentValues.includes(option)}
              onChange={(e) => handleCheckboxChange(option, e.target.checked)}
            />
            {option}
          </label>
        ))}
      </fieldset>
    </div>
  );
} 