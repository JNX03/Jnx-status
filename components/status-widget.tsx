"use client"

import { useState, useEffect } from "react"
import { StatusIndicator } from "@/components/status-indicator"

type WidgetProps = {
  projectName: string
}

export function StatusWidget({ projectName }: WidgetProps) {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`/api/widget/${projectName}`)
        if (!response.ok) throw new Error("Failed to fetch status")
        const data = await response.json()
        setStatus(data)
      } catch (error) {
        console.error("Error fetching status:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [projectName])

  if (loading) return <div>Loading...</div>
  if (!status) return <div>Error loading status</div>

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-background">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{status.name}</h3>
        <StatusIndicator status={status.status} showText />
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        <p>Uptime: {status.uptime.toFixed(2)}%</p>
        <p>Last checked: {new Date(status.lastChecked).toLocaleString()}</p>
      </div>
    </div>
  )
}

