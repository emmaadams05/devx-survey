import React from "react";
import { SCALE_LABELS, type Question, type LikertScale } from "../const/questions";
import type { SurveyAnswers } from "../api/submitSurvey";

interface QuestionPair {
  title: string;
  impactQuestion: Question;
  satisfactionQuestion: Question;
}

interface Props {
  pairs: QuestionPair[];
  answers: Partial<SurveyAnswers>;
  onChange: (id: keyof SurveyAnswers, value: LikertScale) => void;
}

const QuestionGrid: React.FC<Props> = ({ pairs, answers, onChange }) => {
  const satisfactionLabels = SCALE_LABELS.satisfaction;
  const importanceLabels = SCALE_LABELS.impact;

  return (
    <div className="question-grid" role="table" aria-label="Developer experience ratings">
      <div className="grid-header">
        <div className="grid-columns" role="row">
          <div className="column-spacer"></div>
          <div className="column-header" role="columnheader">
            <h3>Satisfaction</h3>
          </div>
          <div className="column-header" role="columnheader">
            <h3>Importance</h3>
          </div>
        </div>
      </div>

      <div className="grid-body" role="rowgroup">
        {pairs.map((pair, index) => (
          <div key={index} className="grid-row" role="row">
            <div className="row-title" role="rowheader">{pair.title}</div>
            
            {/* Satisfaction column */}
            <fieldset className="rating-column" role="cell">
              <legend className="sr-only">Satisfaction rating for: {pair.title}</legend>
              <div className="pill-buttons">
                {satisfactionLabels.map((label, n) => (
                  <button
                    key={`sat-${n}`}
                    type="button"
                    className={`pill-button ${answers[pair.satisfactionQuestion.id as keyof SurveyAnswers] === n + 1 ? 'pill-button--selected' : ''}`}
                    onClick={() => onChange(pair.satisfactionQuestion.id as keyof SurveyAnswers, (n + 1) as LikertScale)}
                    aria-label={`${label} satisfaction`}
                    title={label}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
            
            {/* Importance column */}
            <fieldset className="rating-column" role="cell">
              <legend className="sr-only">Importance rating for: {pair.title}</legend>
              <div className="pill-buttons">
                {importanceLabels.map((label, n) => (
                  <button
                    key={`imp-${n}`}
                    type="button"
                    className={`pill-button ${answers[pair.impactQuestion.id as keyof SurveyAnswers] === n + 1 ? 'pill-button--selected' : ''}`}
                    onClick={() => onChange(pair.impactQuestion.id as keyof SurveyAnswers, (n + 1) as LikertScale)}
                    aria-label={`${label} importance`}
                    title={label}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionGrid; 