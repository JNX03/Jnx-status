import { ModeToggle } from "@/components/ui/mode-toggle"
import { StatusOverview } from "@/components/status-overview"
import { Projects } from "@/components/projects"
import { CommandMenu } from "@/components/command-menu"
import { StatusInitializer } from "@/components/status-initializer"
import { ReportDialog } from "@/components/report-dialog"
import { ShareDialog } from "@/components/share-dialog"
import { Incidents } from "@/components/incidents"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <StatusInitializer />
      <div className="container mx-auto p-4 flex flex-col min-h-screen">
        <header className="flex justify-between items-center py-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
              JNX03/Status
            </h1>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Real-time monitoring and status updates for all JNX03 services and projects. Track system health, incident
              reports, and maintenance schedules all in one place.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <ShareDialog />
            <ReportDialog />
            <ModeToggle />
          </div>
        </header>

        <main className="flex-grow">
          <section className="mb-8">
            <StatusOverview />
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About Our Status Page</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                Welcome to JNX03's comprehensive status monitoring platform. Our status page provides real-time insights
                into the health and performance of our services, ensuring transparency and keeping you informed about
                any incidents or maintenance activities.
              </p>
              <p>
                Each service is continuously monitored for availability, response time, and overall performance. We
                track these metrics to maintain high reliability standards and quickly address any issues that may
                arise.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <Projects />
          </section>

          <section className="mb-8">
            <Incidents />
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                Subscribe to our{" "}
                <a href="/feed.xml" className="text-primary hover:underline">
                  RSS feed
                </a>{" "}
                to receive real-time updates about service status changes and incidents. You can also embed our status
                widgets on your website to keep your users informed.
              </p>
              <p>
                For immediate assistance or to report an issue, use the "Report an Issue" button in the header or press{" "}
                <kbd className="px-2 py-1 rounded bg-muted">⌘K</kbd> to access the command menu.
              </p>
            </div>
          </section>
        </main>

        <footer className="mt-16 text-center text-sm text-muted-foreground py-4">
          <p>© 2024 JNX03. All rights reserved.</p>
          <p className="mt-2">
            <a href="/feed.xml" className="hover:underline">
              RSS Feed
            </a>
            {" • "}
            <a href="/sitemap.xml" className="hover:underline">
              Sitemap
            </a>
          </p>
        </footer>
      </div>
      <CommandMenu />
    </div>
  )
}

