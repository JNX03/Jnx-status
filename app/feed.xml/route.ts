import { getStatus } from "@/lib/status-service"
import { NextResponse } from "next/server"

export async function GET() {
  const status = await getStatus()
  const baseUrl = "https://status.jnx03.xyz"
  const now = new Date().toISOString()

  const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>JNX03 Status Updates</title>
  <link href="${baseUrl}/feed.xml" rel="self"/>
  <link href="${baseUrl}"/>
  <updated>${now}</updated>
  <id>${baseUrl}</id>
  <author>
    <name>JNX03</name>
  </author>
  ${status.projects
    .map(
      (project: any) => `
    <entry>
      <title>${project.name} Status: ${project.status.toUpperCase()}</title>
      <link href="${baseUrl}/status/${project.name.toLowerCase().replace(/ /g, "-")}"/>
      <id>${baseUrl}/status/${project.name.toLowerCase().replace(/ /g, "-")}</id>
      <updated>${project.lastChecked}</updated>
      <content type="html">
        <![CDATA[
          <p>Current Status: ${project.status}</p>
          <p>Uptime: ${project.uptime.toFixed(2)}%</p>
          ${project.note ? `<p>Note: ${project.note}</p>` : ""}
        ]]>
      </content>
    </entry>
  `,
    )
    .join("\n")}
</feed>`

  return new NextResponse(feed, {
    headers: {
      "Content-Type": "application/atom+xml",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  })
}

