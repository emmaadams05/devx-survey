import { useState, useEffect } from "react";
import type { Question } from "../const/questions";
import type { SurveyAnswers } from "../api/submitSurvey";

export type Answers = Partial<SurveyAnswers>;
export type SaveAnswer = (id: keyof SurveyAnswers, value: SurveyAnswers[keyof SurveyAnswers]) => void;
export interface UseSurveyResult {
  answers: Answers;
  save: SaveAnswer;
  pages: number;
  error?: string;
}

const STORAGE_KEY = "devexSurvey_v1";

export function useSurvey(allQuestions: Question[]): UseSurveyResult {
  const [error, setError] = useState<string>();
  const [answers, setAnswers] = useState<Answers>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as Answers;
      }
      return {};
    } catch (err) {
      console.warn("Failed to load survey data from localStorage:", err);
      setError("Failed to load previously saved data. Starting fresh.");
      return {};
    }
  });

  const save: SaveAnswer = (id, value) =>
    setAnswers(prev => ({ ...prev, [id]: value }));

  // Persist on every change
  useEffect(() => {
    try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      // Clear any previous errors if save succeeds
      if (error) setError(undefined);
    } catch (err) {
      console.error("Failed to save survey data to localStorage:", err);
      setError("Failed to save your progress. Your answers may be lost if you refresh the page.");
    }
  }, [answers, error]);

  // Page math: 2 questions per page
  const pages = Math.ceil(allQuestions.length / 2);

  return { answers, save, pages, error };
}