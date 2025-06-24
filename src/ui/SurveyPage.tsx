import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { questions } from "../const/questions";
import { useSurvey } from "../hooks/useSurvey";
import QuestionRow from "./QuestionRow";
import QuestionGrid from "./QuestionGrid";
import { getFirstUnansweredPage } from "../utils/surveyProgress";
import { createDeliveryFlowPairs, createQualitySafetyPairs, createTeamDynamicsPairs } from "../utils/questionPairs";
import type { SurveyAnswers } from "../api/submitSurvey";
import type { Question } from "../const/questions";

const INTRO_PAGE = 0;
const DEMOGRAPHICS_PAGE = 1;
const DELIVERY_FLOW_PAGE = 2;
const QUALITY_SAFETY_PAGE = 3;
const TEAM_DYNAMICS_PAGE = 4;
const TEXT_QUESTIONS_PAGE = 5;

// Character limit for feedback questions
const CHAR_LIMIT = 280;

// Feedback Question Component with character counter
const FeedbackQuestion: React.FC<{
  question: Question;
  value: string;
  onChange: (value: string) => void;
}> = ({ question, value, onChange }) => {
  const [charCount, setCharCount] = useState(value?.length || 0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setCharCount(newValue.length);
    onChange(newValue);
  };

  useEffect(() => {
    setCharCount(value?.length || 0);
  }, [value]);

  return (
    <div className="feedback-question">
      <label htmlFor={question.id}>
        <p>{question.text}</p>
      </label>
      <div style={{ position: 'relative' }}>
        <textarea
          id={question.id}
          rows={6}
          value={value || ""}
          onChange={handleChange}
          placeholder="Type here…"
          maxLength={CHAR_LIMIT}
        />
        <span className="char-count">
          {charCount} / {CHAR_LIMIT}
        </span>
      </div>
    </div>
  );
};

const SurveyPage: React.FC = () => {
  const { page = "0" } = useParams();
  const pg = parseInt(page, 10);
  const nav = useNavigate();
  const { answers, save, error } = useSurvey(questions);

  // Separate questions by type and page groupings
  const demographicQuestions = questions.filter(q => q.scale === "demographic");
  const textQuestions = questions.filter(q => q.scale === "text");
  const deliveryFlowPairs = createDeliveryFlowPairs(questions);
  const qualitySafetyPairs = createQualitySafetyPairs(questions);
  const teamDynamicsPairs = createTeamDynamicsPairs(questions);

  const totalPages = 6; // intro + demographics + delivery_flow + quality_safety + team_dynamics + text

  // Function to check if current page questions are all answered
  const getCurrentPageQuestions = () => {
    switch (pg) {
      case DEMOGRAPHICS_PAGE:
        return demographicQuestions;
      case DELIVERY_FLOW_PAGE:
        return deliveryFlowPairs.flatMap(pair => [pair.impactQuestion, pair.satisfactionQuestion]);
      case QUALITY_SAFETY_PAGE:
        return qualitySafetyPairs.flatMap(pair => [pair.impactQuestion, pair.satisfactionQuestion]);
      case TEAM_DYNAMICS_PAGE:
        return teamDynamicsPairs.flatMap(pair => [pair.impactQuestion, pair.satisfactionQuestion]);
      case TEXT_QUESTIONS_PAGE:
        return textQuestions;
      default:
        return [];
    }
  };

  const currentPageQuestions = getCurrentPageQuestions();
  const allAnswered = currentPageQuestions.every((q) => {
    const val = answers[q.id as keyof typeof answers];

    if (val === undefined) return false;

    // For checkbox questions (arrays) ensure at least one selection
    if (Array.isArray(val)) return val.length > 0;

    // For text inputs ensure non-empty string
    if (typeof val === "string") return val.trim() !== "";

    return true; // radio and other scalar answers
  });

  // Get page title mapping
  const getPageTitle = () => {
    switch (pg) {
      case DEMOGRAPHICS_PAGE:
        return "Demographics";
      case DELIVERY_FLOW_PAGE:
        return "Delivery & Flow";
      case QUALITY_SAFETY_PAGE:
        return "Quality & Safety";
      case TEAM_DYNAMICS_PAGE:
        return "Team Dynamics & Well-being";
      case TEXT_QUESTIONS_PAGE:
        return "Additional Feedback";
      default:
        return "Welcome";
    }
  };

  // --- Redirect logic: if user navigates past their last unanswered question, send them back ---
  useEffect(() => {
    if (pg < 1) return; // Only for question pages
    const requiredPage = getFirstUnansweredPage(questions, answers);
    if (requiredPage !== null && pg > requiredPage) {
      nav(`/survey/${requiredPage}`, { replace: true });
    }
  }, [pg, answers, nav]);

  // Type-safe onChange handler for questions
  const handleQuestionChange = (questionId: string, value: unknown) => {
    // We know the questionId matches a key in SurveyAnswers since it comes from our questions
    save(questionId as keyof SurveyAnswers, value as SurveyAnswers[keyof SurveyAnswers]);
  };

  if (pg === INTRO_PAGE) {
    // --- Intro screen ---
    return (
      <div className="container">
        <h1>Developer Experience Survey</h1>
        <p>
          Thanks for helping us improve our engineering environment. Your
          feedback highlights friction, guides improvements, and tracks progress
          over time.
        </p>
        <p>
          The survey contains questions about your development experience
          and should take less than 5 minutes to complete. Responses
          are <strong>anonymous</strong> and aggregated.
        </p>
        <button className="btn" onClick={() => nav("/survey/1")}>Begin</button>
      </div>
    );
  }

  // --- Question pages ---
  return (
    <div className="container">
        <div className="progress">
          <div
            className="progress__bar"
            style={{ width: `${(pg / (totalPages - 1)) * 100}%` }}
          />
        </div>  
        <h2 className="section-title">
          Step {pg} of {totalPages - 1}: {getPageTitle()}
        </h2>

        <div className="error-slot">
          {error && (
            <div className="error-text">
              {error}
            </div>
          )}
          {!allAnswered && (
            <div className="error-text">
              Please answer all questions before continuing.
            </div>
          )}
        </div>

        {/* Demographics Page */}
        {pg === DEMOGRAPHICS_PAGE && (
          <div>
            {demographicQuestions.map((q) => (
              <QuestionRow
                key={q.id}
                q={q}
                value={answers[q.id as keyof typeof answers]}
                onChange={(v) => handleQuestionChange(q.id, v)}
              />
            ))}
          </div>
        )}

        {/* Delivery & Flow Page */}
        {pg === DELIVERY_FLOW_PAGE && (
          <div>
            <p className="grid-title">
              Please rate the following statements on <strong>Satisfaction</strong> and <strong>Importance</strong>.
            </p>
            <QuestionGrid
              pairs={deliveryFlowPairs}
              answers={answers}
              onChange={(id, value) => save(id, value)}
            />
          </div>
        )}

        {/* Quality & Safety Page */}
        {pg === QUALITY_SAFETY_PAGE && (
          <div>
            <p className="grid-title">
              Please rate the following statements on <strong>Satisfaction</strong> and <strong>Importance</strong>.
            </p>
            <QuestionGrid
              pairs={qualitySafetyPairs}
              answers={answers}
              onChange={(id, value) => save(id, value)}
            />
          </div>
        )}

        {/* Team Dynamics & Well-being Page */}
        {pg === TEAM_DYNAMICS_PAGE && (
          <div>
            <p className="grid-title">
              Please rate the following statements on <strong>Satisfaction</strong> and <strong>Importance</strong>.
            </p>
            <QuestionGrid
              pairs={teamDynamicsPairs}
              answers={answers}
              onChange={(id, value) => save(id, value)}
            />
          </div>
        )}

        {/* Text Questions Page */}
        {pg === TEXT_QUESTIONS_PAGE && (
          <div className="feedback-card">
            {textQuestions.map((q) => (
              <FeedbackQuestion
                key={q.id}
                question={q}
                value={answers[q.id as keyof typeof answers] as string}
                onChange={(value) => handleQuestionChange(q.id, value)}
              />
            ))}

            <div className="sticky-btns">
              {pg > 1 && (
                <button
                  className="btn btn--secondary"
                  onClick={() => nav(`/survey/${pg - 1}`)}
                >
                  Back
                </button>
              )}
              <button
                className="btn"
                onClick={() => nav("/finish")}
                disabled={!allAnswered}
              >
                Finish
              </button>
            </div>
          </div>
        )}

        {/* Regular button group for non-feedback pages */}
        {pg !== TEXT_QUESTIONS_PAGE && (
          <div className="btn-group">
            {pg > 1 && (
              <button
                className="btn btn--secondary"
                onClick={() => nav(`/survey/${pg - 1}`)}
              >
                Back
              </button>
            )}
            {pg < totalPages - 1 ? (
              <button
                className="btn"
                onClick={() => nav(`/survey/${pg + 1}`)}
                disabled={!allAnswered}
              >
                Next
              </button>
            ) : (
              <button
                className="btn"
                onClick={() => nav("/finish")}
                disabled={!allAnswered}
              >
                Finish
              </button>
            )}
          </div>
        )}
    </div>
  );
};

export default SurveyPage;