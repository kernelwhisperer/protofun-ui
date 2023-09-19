import { METRICS } from "protofun"

const SITE = "https://protocol.fun"

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${METRICS.map((metric) => {
  return `
    <url>
        <loc>${SITE}/${metric.protocol}/${metric.id}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
    </url>`
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
