import { NextResponse } from 'next/server'
import { updateOverallStatus } from '@/lib/status-service'

// This route can be called by a cron job service like Vercel Cron
export async function GET() {
  try {
    await updateOverallStatus()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    )
  }
}

