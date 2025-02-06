"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusIndicator } from "@/components/status-indicator"
import { Progress } from "@/components/ui/progress"
import { ref, onValue } from 'firebase/database'
import { db } from '@/lib/firebase'
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

type Status = {
  overall: 'operational' | 'degraded' | 'down'
  overallUptime: number
  lastChecked: string
}

export function StatusOverview() {
  const [status, setStatus] = useState<Status | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const statusRef = ref(db, 'status')
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setStatus(data)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">System Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-[100px] w-full" />
          <Skeleton className="h-[20px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!status) return null

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">System Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatusIndicator status={status.overall} size="lg" showText />
          <p className="text-lg text-muted-foreground">
            {status.overall === 'operational' 
              ? "All systems are operational." 
              : "We're experiencing some issues."}
          </p>
        </motion.div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Overall Uptime</span>
            <span>{status.overallUptime.toFixed(2)}%</span>
          </div>
          <Progress value={status.overallUptime} className="h-2" />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Last updated: {new Date(status.lastChecked).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  )
}

