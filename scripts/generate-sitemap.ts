import { METRIC_DECLARATIONS, ProtocolId } from "../app/stores/metric-declarations"

export const PROTOCOL_IDS = Object.keys(METRIC_DECLARATIONS) as [ProtocolId]

const SITE = "https://protocol.fun"

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${PROTOCOL_IDS.map((protocol) => {
  const metrics = METRIC_DECLARATIONS[protocol]

  return metrics
    .map(
      (metric) => `
    <url>
        <loc>${SITE}/${protocol}/${metric}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
    </url>`
    )
    .join("")
}).join("")}
  <url>
    <loc>https://protocol.fun/login</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://protocol.fun/sign-up</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
  </url>
</urlset>
 `
}

console.log(generateSiteMap())
