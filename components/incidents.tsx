"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Incident = {
  date: string
  title: string
  description: string
  status: 'investigating' | 'resolved'
}

export function Incidents() {
  const [incidents, setIncidents] = useState<Incident[]>([])

  useEffect(() => {
    const fetchIncidents = async () => {
      // In a real-world scenario, this would be a separate API endpoint
      const mockIncidents: Incident[] = [
        {
          date: new Date().toISOString(),
          title: "Nova Partial Outage",
          description: "We are investigating issues with the Nova platform. Some users may experience slow response times.",
          status: "investigating",
        },
        {
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
          title: "Notex Scheduled Maintenance",
          description: "Notex underwent scheduled maintenance. The platform was unavailable for 2 hours.",
          status: "resolved",
        },
      ]
      setIncidents(mockIncidents)
    }

    fetchIncidents()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Incidents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incidents.map((incident, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{incident.title}</h3>
                <span className="text-sm text-muted-foreground">
                  {new Date(incident.date).toLocaleString()}
                </span>
              </div>
              <p className="text-sm mb-2">{incident.description}</p>
              <span className={`text-sm font-medium ${
                incident.status === "investigating" ? "text-yellow-500" : "text-green-500"
              }`}>
                {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

