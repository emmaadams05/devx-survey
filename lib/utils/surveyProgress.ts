import { surveyPages, PageType, QuestionGridPageConfig, DemographicsPageConfig, TextPageConfig } from "../const/surveyPages";
import type { Question } from "../const/questions";
import { questions as allQuestions } from "../const/questions";
import type { SurveyAnswers } from "../types/survey";

export function getFirstUnansweredPage(answers: Partial<SurveyAnswers>): string | null {

  for (const pageConfig of surveyPages) {
    let questionsForPage: Question[] = [];

    switch (pageConfig.type) {
      case PageType.Demographics:
      case PageType.Text:
        questionsForPage = (pageConfig as DemographicsPageConfig | TextPageConfig).questionIds
          .map(id => allQuestions.find(q => q.id === id))
          .filter((q): q is Question => !!q);
        break;
      case PageType.QuestionGrid:
        const gridThemes = (pageConfig as QuestionGridPageConfig).themes;
        questionsForPage = allQuestions.filter(q => gridThemes.includes(q.theme));
        break;
    }

    const isPageAnswered = questionsForPage.every((q) => {
      const val = answers[q.id as keyof SurveyAnswers];
      if (val === undefined) return false;
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === "string") return val.trim() !== "";
      return true;
    });

    if (!isPageAnswered) {
      return pageConfig.page;
    }
  }

  return null; // All answered
}

export function calculateProgress(answers: Partial<SurveyAnswers>): number {
  const totalQuestions: number = allQuestions.length;
  const answeredQuestions: number = allQuestions.reduce((count, q) => {
    const val = answers[q.id as keyof SurveyAnswers];
    if (val !== undefined) {
      if (Array.isArray(val) && val.length > 0) return count + 1;
      if (typeof val === 'string' && val.trim() !== '') return count + 1;
      if (typeof val === 'number') return count + 1;
    }
    return count;
  }, 0);
  
  return Math.round((answeredQuestions / totalQuestions) * 100);
} 