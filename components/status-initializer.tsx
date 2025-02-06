"use client"

import { useEffect } from 'react'
import { updateOverallStatus } from '@/lib/status-service'

export function StatusInitializer() {
  useEffect(() => {
    // Initial status check
    updateOverallStatus()
    
    // Set up interval for regular checks every 5 minutes
    const interval = setInterval(updateOverallStatus, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  return null
}

