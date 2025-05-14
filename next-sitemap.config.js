/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://airdropfinder.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://airdropfinder.vercel.app/sitemap.xml',
      'https://airdropfinder.vercel.app/server-sitemap.xml',
    ],
  },
  exclude: ['/admin', '/admin/*'],
  generateIndexSitemap: true,
  outDir: 'public',
}
