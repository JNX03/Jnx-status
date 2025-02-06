"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusIndicator } from "@/components/status-indicator"
import { Progress } from "@/components/ui/progress"
import { ref, onValue } from "firebase/database"
import { db } from "@/lib/firebase"
import { Skeleton } from "@/components/ui/skeleton"
import type { ProjectStatus } from "@/lib/status-service"
import { motion } from "framer-motion"
import Link from "next/link"
import { ShareDialog } from "@/components/share-dialog"

type StatusData = {
  projects: ProjectStatus[]
}

export function Projects() {
  const [data, setData] = useState<StatusData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const statusRef = ref(db, "status")
    const unsubscribe = onValue(statusRef, async (snapshot) => {
      if (snapshot.exists()) {
        const fetchedData = snapshot.val()
        const projectPromises = fetchedData.projects.map(async (project: ProjectStatus) => {
          try {
            const start = performance.now()
            const response = await fetch(project.url, {
              method: "HEAD",
              mode: "no-cors",
            })
            const end = performance.now()
            return { ...project, responseTime: Math.round(end - start) }
          } catch (error) {
            console.error(`Failed to fetch ${project.url}:`, error)
            return { ...project, responseTime: -1, status: "down" }
          }
        })

        Promise.all(projectPromises).then((updatedProjects) => {
          setData({ projects: updatedProjects })
          setLoading(false)
        })
      } else {
        setData({ projects: [] })
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Project Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[100px] w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Project Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {data.projects.map((project, index) => (
            <motion.div
              key={index}
              className="space-y-4 p-4 border rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/status/${project.name.toLowerCase().replace(/ /g, "-")}`}
                    className="text-lg font-semibold hover:underline"
                  >
                    {project.name}
                  </Link>
                  <ShareDialog projectName={project.name} />
                </div>
                <StatusIndicator status={project.status} showText />
              </div>
              {project.status !== "operational" && project.note && (
                <p className="text-sm text-muted-foreground">{project.note}</p>
              )}
              {project.status === "maintenance" ? (
                <div className="text-sm text-muted-foreground">
                  <p>
                    Maintenance Period: {project.maintenanceInfo?.startDate} - {project.maintenanceInfo?.endDate}
                  </p>
                  <p>{project.maintenanceInfo?.message}</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Response Time: {project.responseTime >= 0 ? `${project.responseTime}ms` : "N/A"}</span>
                    <span>Last checked: {new Date(project.lastChecked).toLocaleString()}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Uptime</span>
                      <span>{project.uptime.toFixed(2)}%</span>
                    </div>
                    <Progress value={project.uptime} className="h-2" />
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

