"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { AlertTriangle } from 'lucide-react'

export function ReportDialog({ triggerButton = true, onOpenChange }: { triggerButton?: boolean, onOpenChange?: (open: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const response = await fetch('https://discord.com/api/webhooks/1322955728826273792/eLziZ_qt6psN7N9LbhvI-GERUK5iLtCPA835ML0LRxalM1kXURNOEkcNa6rw4OpBtG_m', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `New Report:\nName: ${name}\nEmail: ${email}\nDescription: ${description}`,
      }),
    })

    if (response.ok) {
      toast({
        title: "Report Submitted",
        description: "Thank you for your report. We'll look into it as soon as possible.",
      })
      setIsOpen(false)
      setName('')
      setEmail('')
      setDescription('')
      if (onOpenChange) onOpenChange(false)
    } else {
      toast({
        title: "Error",
        description: "There was a problem submitting your report. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (onOpenChange) onOpenChange(open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {triggerButton && (
        <DialogTrigger asChild>
          <Button variant="outline">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Report an Issue
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report an Issue</DialogTitle>
          <DialogDescription>
            Please provide details about the issue you're experiencing.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue you're experiencing"
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Submit Report</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

