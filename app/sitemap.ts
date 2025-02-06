import type { MetadataRoute } from "next"
import { getStatus } from "@/lib/status-service"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://status.jnx03.xyz"
  const status = await getStatus()

  const routes = ["", "/dashboard"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  const projectRoutes = status.projects.map((project: any) => ({
    url: `${baseUrl}/status/${project.name.toLowerCase().replace(/ /g, "-")}`,
    lastModified: new Date(project.lastChecked).toISOString(),
  }))

  return [...routes, ...projectRoutes]
}

