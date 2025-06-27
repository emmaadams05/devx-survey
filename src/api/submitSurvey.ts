import type { LikertScale } from "../const/questions";

// Generate a type for the survey answers based on the question IDs and their expected types
// This is a mapped type based on the current questions array

export type SurveyAnswers = {
  location: string;
  tech: string;
  day_to_day_impact: LikertScale;
  day_to_day_satisfaction: LikertScale;
  delivery_speed_impact: LikertScale;
  delivery_speed_satisfaction: LikertScale;
  build_test_impact: LikertScale;
  build_test_satisfaction: LikertScale;
  code_review_impact: LikertScale;
  code_review_satisfaction: LikertScale;
  incident_response_impact: LikertScale;
  incident_response_satisfaction: LikertScale;
  codebase_clarity_impact: LikertScale;
  codebase_clarity_satisfaction: LikertScale;
  dev_tools_impact: LikertScale;
  dev_tools_satisfaction: LikertScale;
  dev_environments_impact: LikertScale;
  dev_environments_satisfaction: LikertScale;
  deploy_autonomy_impact: LikertScale;
  deploy_autonomy_satisfaction: LikertScale;
  security_compliance_impact: LikertScale;
  security_compliance_satisfaction: LikertScale;
  onboarding_impact: LikertScale;
  onboarding_satisfaction: LikertScale;
  meetings_handoffs_impact: LikertScale;
  meetings_handoffs_satisfaction: LikertScale;
  sustainable_pace_impact: LikertScale;
  sustainable_pace_satisfaction: LikertScale;
  q_biggest_friction: string;
  q_best_change: string;
};

const submitSurvey = async (payload: SurveyAnswers) => {
    const res = await fetch("/api/devex-survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Submit failed");
};

  export default submitSurvey;