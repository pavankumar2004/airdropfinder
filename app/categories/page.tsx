import { Metadata } from 'next';
import Link from 'next/link';

// Define categories with their icons and descriptions
const categories = [
  {
    name: 'Airdrops',
    slug: 'airdrops',
    description: 'Discover free token distributions from new and existing projects',
    iconName: '🪂',
  },
  {
    name: 'Faucets',
    slug: 'faucets',
    description: 'Claim small amounts of crypto for free on a regular basis',
    iconName: '🚰',
  },
  {
    name: 'Learn to Earn',
    slug: 'learn-to-earn',
    description: 'Get rewarded for learning about blockchain and crypto',
    iconName: '📚',
  },
  {
    name: 'Play to Earn',
    slug: 'play-to-earn',
    description: 'Earn rewards by playing games and participating in activities',
    iconName: '🎮',
  },
  {
    name: 'Staking',
    slug: 'staking',
    description: 'Earn passive income by staking your crypto assets',
    iconName: '💰',
  },
  {
    name: 'Mining',
    slug: 'mining',
    description: 'Earn cryptocurrency through mining activities',
    iconName: '⛏️',
  },
  {
    name: 'DeFi',
    slug: 'defi',
    description: 'Earn through decentralized finance protocols and activities',
    iconName: '🏦',
  },
  {
    name: 'NFT',
    slug: 'nft',
    description: 'Earn through non-fungible token activities and rewards',
    iconName: '🖼️',
  },
];

export const metadata: Metadata = {
  title: 'All Categories - Crypto Earning Opportunities | AirdropFinder',
  description: 'Browse all categories of crypto earning opportunities including airdrops, faucets, learn-to-earn, and more.',
  openGraph: {
    title: 'All Categories - Crypto Earning Opportunities | AirdropFinder',
    description: 'Browse all categories of crypto earning opportunities including airdrops, faucets, learn-to-earn, and more.',
    type: 'website',
    url: 'https://airdropfinder.vercel.app/categories',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Categories - Crypto Earning Opportunities | AirdropFinder',
    description: 'Browse all categories of crypto earning opportunities including airdrops, faucets, learn-to-earn, and more.',
  },
};

export default function CategoriesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Browse All Categories</h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore different ways to earn crypto rewards
          </p>
        </div>
        
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group relative isolate flex flex-col justify-between overflow-hidden rounded-2xl bg-gray-50 px-8 py-10 ring-1 ring-gray-200 hover:ring-indigo-300 hover:bg-gray-100 transition-all duration-300"
            >
              <div>
                <div className="mb-6 text-5xl">{category.iconName}</div>
                <h3 className="text-2xl font-semibold leading-7 text-gray-900 group-hover:text-indigo-600">
                  {category.name}
                </h3>
                <p className="mt-3 text-base leading-7 text-gray-600">{category.description}</p>
              </div>
              <div className="mt-8 flex items-center text-sm font-medium text-indigo-600">
                <span>View platforms</span>
                <svg
                  className="ml-1 h-4 w-4 transition group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
