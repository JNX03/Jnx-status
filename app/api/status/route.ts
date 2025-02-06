import { NextResponse } from 'next/server'
import { getStatus, updateOverallStatus } from '@/lib/status-service'

export async function GET() {
  try {
    const status = await getStatus()
    if (!status || !status.projects || status.projects.length === 0) {
      // If no status exists, create initial status
      return NextResponse.json(await updateOverallStatus())
    }
    return NextResponse.json(status)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch status' },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const status = await updateOverallStatus()
    return NextResponse.json(status)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    )
  }
}

