import { getServerSideSitemap } from 'next-sitemap';
import type { ISitemapField } from 'next-sitemap';
import { getPlatforms } from '../../lib/firestore';

export async function GET() {
  // Fetch all platforms from Firestore
  const platforms = await getPlatforms();

  // Generate platform URLs
  const platformUrls: ISitemapField[] = platforms.map((platform) => ({
    loc: `https://airdropfinders.vercel.app/platform/${platform.slug}`,
    lastmod: new Date(platform.updatedAt?.toDate() || new Date()).toISOString(),
    changefreq: 'weekly' as const,
    priority: 0.8,
  }));

  // Define category URLs
  const categories = [
    'airdrops',
    'faucets',
    'learn-to-earn',
    'play-to-earn',
    'staking',
    'mining',
    'defi',
    'nft',
  ];

  const categoryUrls: ISitemapField[] = categories.map((category) => ({
    loc: `https://airdropfinders.vercel.app/category/${category}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly' as const,
    priority: 0.7,
  }));

  // Combine all URLs
  const allUrls = [...platformUrls, ...categoryUrls];

  // Generate sitemap
  return getServerSideSitemap(allUrls);
}
