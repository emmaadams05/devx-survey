import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { questions } from "@/lib/const/questions";
import type { Answers, SaveAnswer, SurveyAnswers } from "../types/survey";

export interface UseSurveyResult {
  answers: Answers;
  save: SaveAnswer;
  error?: string;
  clearAnswers: () => void;
  getSurveyData: () => SurveyAnswers;
}

export const STORAGE_KEY = "devexSurvey_v1";
const COOKIE_OPTIONS = {
  expires: 30, // 30 days
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production'
};

// Helper functions for cookie storage compatibility
function convertForStorage(answers: Answers): Record<string, string | number> {
  const converted: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(answers)) {
    if (Array.isArray(value)) {
      converted[key] = value.join(', ');
    } else if (value !== undefined) {
      converted[key] = value;
    }
  }
  return converted;
}

export function convertFromStorage(stored: Record<string, string | number>): Answers {
  const converted: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(stored)) {
    if (key === 'tech' && typeof value === 'string') {
      converted[key] = value ? value.split(', ').filter((item: string) => item.trim()) : [];
    } else {
      converted[key] = value;
    }
  }
  return converted as Answers;
}

export function useSurvey(): UseSurveyResult {
  const [error, setError] = useState<string>();
  const [answers, setAnswers] = useState<Answers>({});

  // Load answers from cookies on the client side after initial render
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = Cookies.get(STORAGE_KEY);
      if (stored) {
        const parsedStored = JSON.parse(stored);
        const convertedAnswers = convertFromStorage(parsedStored);
        setAnswers(convertedAnswers);
      }
    } catch (err) {
      console.warn("Failed to load survey data from cookies:", err);
      setError("Failed to load previously saved data. Starting fresh.");
    }
  }, []);

  const save: SaveAnswer = (id, value) => {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    try {
      const forStorage = convertForStorage(newAnswers);
      Cookies.set(STORAGE_KEY, JSON.stringify(forStorage), COOKIE_OPTIONS);
      if (error) setError(undefined);
    } catch (err) {
      console.error("Failed to save survey data to cookies:", err);
      setError("Failed to save your progress.");
    }
  };

  const clearAnswers = () => {
    setAnswers({});
    if (typeof window !== 'undefined') {
      Cookies.remove(STORAGE_KEY);
      // Remove the session ID so a fresh one is created on the next survey attempt
      try {
        window.localStorage.removeItem('devxSurvey_sessionId')
      } catch {
        /* ignore */
      }
    }
  };

  const getSurveyData = (): SurveyAnswers => {
    const surveyData: Record<string, string | number | string[]> = {};
    for (const question of questions) {
      const answer = answers[question.id as keyof Answers];
      if (answer !== undefined && answer !== null) {
        surveyData[question.id] = answer;
      } else {
        // Provide default values
        if (question.scale === 'impact' || question.scale === 'satisfaction') {
          surveyData[question.id] = 1;
        } else if (question.id === 'tech') {
          surveyData[question.id] = [];
        } else {
          surveyData[question.id] = '';
        }
      }
    }
    return surveyData as SurveyAnswers;
  }

  return { answers, save, error, clearAnswers, getSurveyData };
} 