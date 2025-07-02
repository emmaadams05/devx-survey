import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import { surveySubmissionSchema } from '@/lib/validations/survey'

// Helper functions to convert arrays to/from comma-separated strings
function convertArraysToStrings(data: Record<string, unknown>): Record<string, unknown> {
  const converted = { ...data }
  if (Array.isArray(converted.tech)) {
    converted.tech = converted.tech.join(', ')
  }
  return converted
}

function convertStringsToArrays(data: Record<string, unknown>): Record<string, unknown> {
  const converted = { ...data }
  if (typeof converted.tech === 'string' && converted.tech) {
    converted.tech = converted.tech.split(', ').filter((item: string) => item.trim())
  }
  return converted
}

// POST - Submit final survey or save draft
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, isDraft, answers } = surveySubmissionSchema.parse(body)

    // Convert arrays to strings for database storage
    const convertedAnswers = convertArraysToStrings(answers)

    const surveyData = {
      sessionId,
      isDraft,
      isComplete: !isDraft,
      ...convertedAnswers,
    }

    const result = await prisma.surveyResponse.upsert({
      where: { sessionId },
      update: {
        ...surveyData,
      },
      create: {
        ...surveyData,
      }
    })

    return NextResponse.json({
      success: true,
      data: { id: result.id, sessionId: result.sessionId }
    })

  } catch (error) {
    console.error('Survey submission error:', error)
    return NextResponse.json(
      { error: 'Failed to save survey' },
      { status: 500 }
    )
  }
}

// GET - Retrieve draft by session ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const draft = await prisma.surveyResponse.findUnique({
      where: { 
        sessionId
      },
    })

    if (!draft || !draft.isDraft) {
      return NextResponse.json(
        { error: 'Draft not found' },
        { status: 404 }
      )
    }

    // Convert strings back to arrays for frontend consumption
    const convertedDraft = convertStringsToArrays(draft)

    return NextResponse.json({
      success: true,
      data: convertedDraft
    })

  } catch (error) {
    console.error('Draft retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve draft' },
      { status: 500 }
    )
  }
} 