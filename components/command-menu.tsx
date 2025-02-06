"use client"

import * as React from "react"
import { Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useToast } from "@/components/ui/use-toast"
import { ReportDialog } from "./report-dialog"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const [showReportDialog, setShowReportDialog] = React.useState(false)
  const router = useRouter()
  const { toast } = useToast()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <p className="fixed bottom-0 left-0 right-0 hidden border-t border-t-muted bg-background p-1 text-center text-sm text-muted-foreground print:hidden md:block">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>{" "}
        to open the command menu
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Status Actions">
            <CommandItem
              onSelect={() => runCommand(() => {
                toast({
                  title: "Checking system status...",
                  description: "Please wait while we fetch the latest status.",
                })
                router.refresh()
              })}
            >
              <Activity className="mr-2 h-4 w-4" />
              Check System Status
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => {
                setShowReportDialog(true)
              })}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Report an Issue
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Projects">
            <CommandItem
              onSelect={() => runCommand(() => window.open('https://notex.jnx03.xyz', '_blank'))}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Notex Status
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => window.open('https://nova.jnx03.xyz', '_blank'))}
            >
              <Clock className="mr-2 h-4 w-4" />
              Nova Status
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <ReportDialog 
        triggerButton={false} 
        onOpenChange={(open) => {
          setShowReportDialog(open)
          if (!open) setOpen(false)
        }}
      />
    </>
  )
}

