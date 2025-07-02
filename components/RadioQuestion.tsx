'use client'

import React, { useState, useEffect } from 'react';
import type { Question } from '@/lib/const/questions';

interface RadioQuestionProps {
  question: Question;
  value: string | undefined;
  onChange: (questionId: string, value: string) => void;
}

export default function RadioQuestion({ question, value, onChange }: RadioQuestionProps): JSX.Element {
  const [isOtherLocation, setIsOtherLocation] = useState(false);
  const locationOptions = question.options || [];
  const predefinedOptions = locationOptions.slice(0, -1);

  useEffect(() => {
    // This effect syncs the local state if an "Other" value is loaded from cookies
    if (question.id === 'location' && typeof value === 'string' && value && !predefinedOptions.includes(value)) {
      setIsOtherLocation(true);
    }
  }, [value, question.id, predefinedOptions]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(question.id, event.target.value);
  };

  const isOtherValuePresent = typeof value === 'string' && value !== '' && !predefinedOptions.includes(value);
  const isOtherSelected = isOtherLocation || isOtherValuePresent;
  const otherValue = isOtherSelected && isOtherValuePresent ? value : '';

  return (
    <div className="question-row">
      <fieldset>
        <legend>{question.text}</legend>
        <div className="radio-group">
          {locationOptions.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={option === "Other" ? isOtherSelected : value === option && value !== ''}
                onChange={() => {
                  if (option === "Other") {
                    setIsOtherLocation(true);
                    onChange(question.id, ""); // Clear value for custom input
                  } else {
                    setIsOtherLocation(false);
                    onChange(question.id, option);
                  }
                }}
              />
              {option}
            </label>
          ))}
        </div>
        {isOtherSelected && question.id === 'location' && (
          <div className="other-input-container">
            <input
              type="text"
              placeholder="Please specify..."
              value={otherValue}
              onChange={handleChange}
              className="other-text-input"
            />
          </div>
        )}
      </fieldset>
    </div>
  );
} 