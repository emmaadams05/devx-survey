import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import submitSurvey from "../api/submitSurvey";
import { useSurvey } from "../hooks/useSurvey";
import { questions } from "../const/questions";
import type { SurveyAnswers } from "../api/submitSurvey";
import { getFirstUnansweredPage } from "../utils/surveyProgress";

// Helper to check if all fields are present
function isCompleteSurvey(answers: Partial<SurveyAnswers>): answers is SurveyAnswers {
  // Define all required fields explicitly based on SurveyAnswers type
  const requiredFields: (keyof SurveyAnswers)[] = [
    "location",
    "tech",
    "day_to_day_impact",
    "day_to_day_satisfaction",
    "delivery_speed_impact",
    "delivery_speed_satisfaction",
    "build_test_impact",
    "build_test_satisfaction",
    "code_review_impact",
    "code_review_satisfaction",
    "incident_response_impact",
    "incident_response_satisfaction",
    "codebase_clarity_impact",
    "codebase_clarity_satisfaction",
    "dev_tools_impact",
    "dev_tools_satisfaction",
    "dev_environments_impact",
    "dev_environments_satisfaction",
    "deploy_autonomy_impact",
    "deploy_autonomy_satisfaction",
    "security_compliance_impact",
    "security_compliance_satisfaction",
    "onboarding_impact",
    "onboarding_satisfaction",
    "meetings_handoffs_impact",
    "meetings_handoffs_satisfaction",
    "sustainable_pace_impact",
    "sustainable_pace_satisfaction",
    "q_biggest_friction",
    "q_best_change"
  ];

  return requiredFields.every(field => {
    const value = answers[field];
    if (value === undefined || value === null) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.trim() !== "";
    return true;
  });
}

const Finish: React.FC = () => {
  const { answers } = useSurvey(questions);
  const [status, setStatus] = useState<"pending" | "ok" | "err">("pending");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    if (isCompleteSurvey(answers)) {
    submitSurvey(answers)
        .then(() => {
          if (isMounted) setStatus("ok");
        })
        .catch(() => {
          if (isMounted) setStatus("err");
        });
    } else {
      // Redirect to the next unanswered question page
      const page = getFirstUnansweredPage(questions, answers);
      if (page !== null) {
        navigate(`/survey/${page}`, { replace: true });
      } else {
        if (isMounted) setStatus("err");
      }
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card finish-card">
        {status === "pending" && (
          <p className="finish-message">Submitting your responses…</p>
        )}

        {status === "ok" && (
          <>
            <h2 className="finish-message">
              🎉 Thanks! Your responses were submitted.
            </h2>
            <button className="btn" onClick={handleRestart}>
              Close
            </button>
          </>
        )}

        {status === "err" && (
          <>
            <h2 className="finish-message error">
              ⚠️ Error submitting. We saved your data locally; please try again
              later.
            </h2>
            <button className="btn btn--secondary" onClick={handleRestart}>
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Finish;