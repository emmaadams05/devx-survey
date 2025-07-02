import type { SurveyAnswers } from '@/lib/types/survey'

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  details?: Record<string, string[]>
  message?: string
  id?: string
}

export class SurveyService {
  private static readonly API_BASE: string = '/api/survey'

  /**
   * Retrieve an existing session ID from localStorage or generate/store a new one.
   * The ID is used by the API to "upsert" (create-or-update) a draft/final record.
   */
  private static getSessionId(): string {
    // During SSR this code is never run because submitSurvey is only invoked from the client.
    if (typeof window === 'undefined') {
      // Fallback ─ shouldn't really happen, but keeps TypeScript happy.
      return ''
    }

    const STORAGE_KEY = 'devxSurvey_sessionId'
    let sessionId = window.localStorage.getItem(STORAGE_KEY)

    if (!sessionId) {
      // `crypto.randomUUID()` is available in all modern browsers; if not, fall back to a timestamp-based ID.
      try {
        sessionId = crypto.randomUUID()
      } catch {
        sessionId = `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`
      }
      window.localStorage.setItem(STORAGE_KEY, sessionId)
    }

    return sessionId
  }

  /**
   * Submit complete survey (final submission only)
   */
  static async submitSurvey(
    answers: SurveyAnswers,
    isDraft: boolean = false
  ): Promise<ApiResponse<{ id: string; sessionId: string | null }>> {
    try {
      const payload = {
        sessionId: this.getSessionId(),
        isDraft,
        answers,
      }

      const response = await fetch(this.API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = (await response.json()) as ApiResponse<{
        id: string
        sessionId: string | null
      }>

      if (!response.ok) {
        return {
          success: false,
          error: result.error || 'Failed to submit survey',
          details: result.details,
        }
      }

      return result
    } catch (error) {
      console.error('Survey submission error:', error)
      return {
        success: false,
        error: 'Failed to submit survey. Please try again.',
      }
    }
  }
} 