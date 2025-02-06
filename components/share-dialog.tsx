"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type ShareDialogProps = {
  projectName?: string
}

export function ShareDialog({ projectName }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const baseUrl = "https://status.jnx03.xyz"

  const embedCode = projectName
    ? `<iframe src="${baseUrl}/status/${projectName.toLowerCase().replace(/ /g, "-")}" width="100%" height="200" style="border:none;border-radius:8px;" title="${projectName} Status"></iframe>`
    : `<iframe src="${baseUrl}" width="100%" height="600" style="border:none;border-radius:8px;" title="JNX03 Status Page"></iframe>`

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "The embed code has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the code manually.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Status Page</DialogTitle>
          <DialogDescription>
            {projectName
              ? `Embed the status widget for ${projectName} on your website.`
              : "Embed the full status page on your website."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Embed Code</p>
            <div className="relative">
              <Input readOnly value={embedCode} className="pr-20 font-mono text-xs" />
              <Button className="absolute right-1 top-1 h-7" size="sm" onClick={() => handleCopy(embedCode)}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Preview</p>
            <div className="rounded-lg border bg-muted p-2">
              <div dangerouslySetInnerHTML={{ __html: embedCode }} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

