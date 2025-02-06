import { ref, set, get } from 'firebase/database'
import { db } from './firebase'

export type ServiceStatus = {
  status: 'operational' | 'degraded' | 'down' | 'maintenance'
  responseTime: number
  lastChecked: string
  uptime: number
  url: string
  note?: string
  maintenanceInfo?: {
    startDate: string
    endDate: string
    message: string
  }
}

export type ProjectStatus = {
  name: string
  url: string
} & ServiceStatus

export async function getStatus() {
  const statusRef = ref(db, 'status')
  const snapshot = await get(statusRef)
  if (!snapshot.exists()) {
    return { projects: [] }
  }
  return snapshot.val()
}

export async function updateProjectStatus(projectIndex: number, updates: Partial<ProjectStatus>) {
  const statusRef = ref(db, 'status')
  const snapshot = await get(statusRef)
  if (!snapshot.exists()) {
    throw new Error("Status data doesn't exist")
  }

  const data = snapshot.val()
  data.projects[projectIndex] = { ...data.projects[projectIndex], ...updates }

  await set(statusRef, data)
  return updateOverallStatus()
}

export async function addProject(newProject: ProjectStatus) {
  const statusRef = ref(db, 'status')
  const snapshot = await get(statusRef)
  const data = snapshot.exists() ? snapshot.val() : { projects: [] }

  data.projects.push(newProject)

  await set(statusRef, data)
  return updateOverallStatus()
}

export async function updateOverallStatus() {
  const statusRef = ref(db, 'status')
  const snapshot = await get(statusRef)
  if (!snapshot.exists()) {
    throw new Error("Status data doesn't exist")
  }

  const data = snapshot.val()
  const projects = data.projects

  const overallStatus = projects.every((p: ProjectStatus) => p.status === 'operational')
    ? 'operational'
    : projects.some((p: ProjectStatus) => p.status === 'down')
    ? 'down'
    : 'degraded'

  const overallUptime = projects.reduce((sum: number, p: ProjectStatus) => sum + p.uptime, 0) / projects.length

  const updatedData = {
    ...data,
    overall: overallStatus,
    overallUptime,
    lastChecked: new Date().toISOString()
  }

  await set(statusRef, updatedData)
  return updatedData
}

