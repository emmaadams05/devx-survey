import { z } from 'zod'

// Likert scale validation (1-5)
const likertScale = z.number().int().min(1).max(5)

// Survey response validation schema
export const surveyResponseSchema = z.object({
  // Demographics
  location: z.string().min(1, "Location is required").optional(),
  tech: z.array(z.string()).min(1, "Please select at least one technology area").optional(),

  // Day-to-day Experience
  dayToDayImpact: likertScale.optional(),
  dayToDaySatisfaction: likertScale.optional(),

  // Delivery Speed
  deliverySpeedImpact: likertScale.optional(),
  deliverySpeedSatisfaction: likertScale.optional(),

  // Build/Test Flow
  buildTestImpact: likertScale.optional(),
  buildTestSatisfaction: likertScale.optional(),

  // Code Review
  codeReviewImpact: likertScale.optional(),
  codeReviewSatisfaction: likertScale.optional(),

  // Incident Response
  incidentResponseImpact: likertScale.optional(),
  incidentResponseSatisfaction: likertScale.optional(),

  // Codebase Clarity
  codebaseClarityImpact: likertScale.optional(),
  codebaseClaritySatisfaction: likertScale.optional(),

  // Dev Tools
  devToolsImpact: likertScale.optional(),
  devToolsSatisfaction: likertScale.optional(),

  // Dev Environments
  devEnvironmentsImpact: likertScale.optional(),
  devEnvironmentsSatisfaction: likertScale.optional(),

  // Deploy Autonomy
  deployAutonomyImpact: likertScale.optional(),
  deployAutonomySatisfaction: likertScale.optional(),

  // Security & Compliance
  securityComplianceImpact: likertScale.optional(),
  securityComplianceSatisfaction: likertScale.optional(),

  // Onboarding
  onboardingImpact: likertScale.optional(),
  onboardingSatisfaction: likertScale.optional(),

  // Meetings & Hand-offs
  meetingsHandoffsImpact: likertScale.optional(),
  meetingsHandoffsSatisfaction: likertScale.optional(),

  // Sustainable Pace
  sustainablePaceImpact: likertScale.optional(),
  sustainablePaceSatisfaction: likertScale.optional(),

  // Text feedback
  biggestFriction: z.string().max(500, "Maximum 500 characters").optional(),
  bestChange: z.string().max(500, "Maximum 500 characters").optional(),
})

// Partial schema for draft updates
export const surveyDraftSchema = surveyResponseSchema.partial()

// Submission schema that wraps the survey data with metadata
export const surveySubmissionSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),
  isDraft: z.boolean(),
  answers: surveyResponseSchema
})

// Complete survey schema for final submission
export const surveyCompleteSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),
  isDraft: z.literal(false),
  answers: surveyResponseSchema.required({
  location: true,
  tech: true,
  dayToDayImpact: true,
  dayToDaySatisfaction: true,
  deliverySpeedImpact: true,
  deliverySpeedSatisfaction: true,
  buildTestImpact: true,
  buildTestSatisfaction: true,
  codeReviewImpact: true,
  codeReviewSatisfaction: true,
  incidentResponseImpact: true,
  incidentResponseSatisfaction: true,
  codebaseClarityImpact: true,
  codebaseClaritySatisfaction: true,
  devToolsImpact: true,
  devToolsSatisfaction: true,
  devEnvironmentsImpact: true,
  devEnvironmentsSatisfaction: true,
  deployAutonomyImpact: true,
  deployAutonomySatisfaction: true,
  securityComplianceImpact: true,
  securityComplianceSatisfaction: true,
  onboardingImpact: true,
  onboardingSatisfaction: true,
  meetingsHandoffsImpact: true,
  meetingsHandoffsSatisfaction: true,
  sustainablePaceImpact: true,
  sustainablePaceSatisfaction: true,
  biggestFriction: true,
  bestChange: true,
  })
})

export type SurveyResponse = z.infer<typeof surveyResponseSchema>
export type SurveyDraft = z.infer<typeof surveyDraftSchema>
export type SurveySubmission = z.infer<typeof surveySubmissionSchema> 
export type SurveyComplete = z.infer<typeof surveyCompleteSchema> 