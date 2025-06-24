import type { Question } from "../const/questions";
import type { Answers } from "../hooks/useSurvey";
import { createDeliveryFlowPairs, createQualitySafetyPairs, createTeamDynamicsPairs } from "./questionPairs";

export function getFirstUnansweredPage(
  questions: Question[],
  answers: Answers
): number | null {
  
  // Check demographics first (page 1)
  const demographicQuestions = questions.filter(q => q.scale === "demographic");
  const demographicsIncomplete = demographicQuestions.some(q => {
    const val = answers[q.id as keyof Answers];
    if (val === undefined) return true;
    if (Array.isArray(val)) return val.length === 0;
    if (typeof val === "string") return val.trim() === "";
    return false;
  });
  
  if (demographicsIncomplete) {
    return 1; // Demographics page
  }

  // Check Delivery & Flow questions (page 2)
  const deliveryFlowPairs = createDeliveryFlowPairs(questions);
  const deliveryFlowQuestions = deliveryFlowPairs.flatMap(pair => [pair.impactQuestion, pair.satisfactionQuestion]);
  const deliveryFlowIncomplete = deliveryFlowQuestions.some(q => {
    const val = answers[q.id as keyof Answers];
    if (val === undefined) return true;
    if (Array.isArray(val)) return val.length === 0;
    if (typeof val === "string") return val.trim() === "";
    return false;
  });
  
  if (deliveryFlowIncomplete) {
    return 2; // Delivery & Flow page
  }

  // Check Quality & Safety questions (page 3)
  const qualitySafetyPairs = createQualitySafetyPairs(questions);
  const qualitySafetyQuestions = qualitySafetyPairs.flatMap(pair => [pair.impactQuestion, pair.satisfactionQuestion]);
  const qualitySafetyIncomplete = qualitySafetyQuestions.some(q => {
    const val = answers[q.id as keyof Answers];
    if (val === undefined) return true;
    if (Array.isArray(val)) return val.length === 0;
    if (typeof val === "string") return val.trim() === "";
    return false;
  });
  
  if (qualitySafetyIncomplete) {
    return 3; // Quality & Safety page
  }

  // Check Team Dynamics questions (page 4)
  const teamDynamicsPairs = createTeamDynamicsPairs(questions);
  const teamDynamicsQuestions = teamDynamicsPairs.flatMap(pair => [pair.impactQuestion, pair.satisfactionQuestion]);
  const teamDynamicsIncomplete = teamDynamicsQuestions.some(q => {
    const val = answers[q.id as keyof Answers];
    if (val === undefined) return true;
    if (Array.isArray(val)) return val.length === 0;
    if (typeof val === "string") return val.trim() === "";
    return false;
  });
  
  if (teamDynamicsIncomplete) {
    return 4; // Team Dynamics page
  }

  // Check text questions (page 5)
  const textQuestions = questions.filter(q => q.scale === "text");
  const textIncomplete = textQuestions.some(q => {
    const val = answers[q.id as keyof Answers];
    if (val === undefined) return true;
    if (Array.isArray(val)) return val.length === 0;
    if (typeof val === "string") return val.trim() === "";
    return false;
  });
  
  if (textIncomplete) {
    return 5; // Text questions page
  }

  // All questions answered
  return null;
} 