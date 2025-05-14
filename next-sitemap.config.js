/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://airdropfinders.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://airdropfinders.vercel.app/sitemap.xml',
      'https://airdropfinders.vercel.app/server-sitemap.xml',
    ],
  },
  exclude: ['/admin', '/admin/*'],
  generateIndexSitemap: true,
  outDir: 'public',
}
