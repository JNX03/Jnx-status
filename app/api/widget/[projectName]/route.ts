import { NextResponse } from "next/server"
import { getStatus } from "@/lib/status-service"

export async function GET(request: Request, { params }: { params: { projectName: string } }) {
  try {
    const status = await getStatus()

    if (!status || !status.projects) {
      return NextResponse.json({ error: "No status data available" }, { status: 500 })
    }

    const normalizedProjectName = decodeURIComponent(params.projectName).toLowerCase()
    const project = status.projects.find((p: any) => p.name.toLowerCase().replace(/ /g, "-") === normalizedProjectName)

    if (!project) {
      return NextResponse.json(
        { error: "Project not found", availableProjects: status.projects.map((p: any) => p.name) },
        { status: 404 },
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Widget API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

