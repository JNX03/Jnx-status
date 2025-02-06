import { getStatus } from "@/lib/status-service"
import { StatusWidget } from "@/components/status-widget"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const status = await getStatus()
  return status.projects.map((project: any) => ({
    projectName: project.name.toLowerCase().replace(/ /g, "-"),
  }))
}

export async function generateMetadata({ params }: { params: { projectName: string } }) {
  const status = await getStatus()
  const project = status.projects.find((p: any) => p.name.toLowerCase().replace(/ /g, "-") === params.projectName)

  if (!project) {
    return {}
  }

  return {
    title: `${project.name} Status - JNX03/Status`,
    description: `Current status and uptime information for ${project.name}`,
  }
}

export default async function ProjectStatusPage({ params }: { params: { projectName: string } }) {
  const status = await getStatus()
  const project = status.projects.find((p: any) => p.name.toLowerCase().replace(/ /g, "-") === params.projectName)

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{project.name} Status</h1>
      <StatusWidget projectName={params.projectName} />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Embed this status</h2>
        <p className="mb-2">Use the following HTML to embed this status on your website:</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          {`<iframe src="https://status.jnx03.xyz/status/${params.projectName}" width="100%" height="200" frameborder="0"></iframe>`}
        </pre>
      </div>
    </div>
  )
}

