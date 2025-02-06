import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertTriangle className="mx-auto h-24 w-24 text-yellow-500 mb-8" />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The page you're looking for doesn't exist or has been moved. Check out our status page to see if there are any
          ongoing issues.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/feed.xml">RSS Feed</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

