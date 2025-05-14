import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlatformsByCategory } from '../../../lib/firestore';

// Define category metadata
const categoryInfo = {
  'airdrops': {
    title: 'Crypto Airdrops - Get Free Tokens & Coins | AirdropFinder',
    description: 'Discover the latest crypto airdrops and free token distributions. Find legitimate opportunities to earn free crypto through airdrops.',
    heading: 'Crypto Airdrops',
    subheading: 'Discover free token distributions from new and existing projects',
    icon: '🪂'
  },
  'faucets': {
    title: 'Crypto Faucets - Earn Free Crypto Regularly | AirdropFinder',
    description: 'Find the best crypto faucets to earn free cryptocurrency on a regular basis. Compare faucet rewards and claim frequencies.',
    heading: 'Crypto Faucets',
    subheading: 'Claim small amounts of crypto for free on a regular basis',
    icon: '🚰'
  },
  'learn-to-earn': {
    title: 'Learn to Earn Crypto - Educational Rewards | AirdropFinder',
    description: 'Get paid to learn about blockchain and cryptocurrency. Discover platforms that reward you for completing courses and educational content.',
    heading: 'Learn to Earn',
    subheading: 'Get rewarded for learning about blockchain and crypto',
    icon: '📚'
  },
  'play-to-earn': {
    title: 'Play to Earn Crypto Games & Activities | AirdropFinder',
    description: 'Discover the best play-to-earn crypto games and activities. Earn cryptocurrency rewards while having fun.',
    heading: 'Play to Earn',
    subheading: 'Earn rewards by playing games and participating in activities',
    icon: '🎮'
  },
  'staking': {
    title: 'Crypto Staking Platforms & Rewards | AirdropFinder',
    description: 'Compare the best crypto staking platforms and earn passive income on your cryptocurrency holdings.',
    heading: 'Staking',
    subheading: 'Earn passive income by staking your crypto assets',
    icon: '💰'
  },
  'mining': {
    title: 'Crypto Mining Platforms & Opportunities | AirdropFinder',
    description: 'Discover crypto mining opportunities and platforms that allow you to earn through mining activities.',
    heading: 'Mining',
    subheading: 'Earn cryptocurrency through mining activities',
    icon: '⛏️'
  },
  'defi': {
    title: 'DeFi Earning Opportunities & Platforms | AirdropFinder',
    description: 'Explore decentralized finance (DeFi) platforms and opportunities to earn crypto through various DeFi activities.',
    heading: 'DeFi',
    subheading: 'Earn through decentralized finance protocols and activities',
    icon: '🏦'
  },
  'nft': {
    title: 'NFT Earning Opportunities & Platforms | AirdropFinder',
    description: 'Discover ways to earn through NFTs (Non-Fungible Tokens) and platforms that offer NFT-related rewards.',
    heading: 'NFT',
    subheading: 'Earn through non-fungible token activities and rewards',
    icon: '🖼️'
  }
};

// Generate metadata for the category page
export async function generateMetadata(props: { params: { slug: string } }): Promise<Metadata> {
  // Properly handle async params
  const { slug } = props.params;
  const category = categoryInfo[slug as keyof typeof categoryInfo];
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    };
  }
  
  return {
    title: category.title,
    description: category.description,
    openGraph: {
      title: category.title,
      description: category.description,
      type: 'website',
      url: `https://airdropfinders.vercel.app/category/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: category.title,
      description: category.description,
    },
  };
}

export default async function CategoryPage(props: { params: { slug: string } }) {
  // Properly handle async params
  const { slug } = props.params;
  const category = categoryInfo[slug as keyof typeof categoryInfo];
  
  if (!category) {
    notFound();
  }
  
  // Convert slug to proper category name format (e.g., 'learn-to-earn' to 'Learn to Earn')
  const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  // Get platforms for this category
  const platforms = await getPlatformsByCategory(categoryName);
  
  return (
    <div className="bg-white">
      {/* Category header */}
      <div className="bg-gradient-to-b from-indigo-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-4xl">
              {category.icon}
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{category.heading}</h1>
            <p className="mt-4 text-lg text-gray-600">{category.subheading}</p>
          </div>
        </div>
      </div>
      
      {/* Platforms grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {platforms.length > 0 ? (
            platforms.map((platform) => (
              <Link
                key={platform.id}
                href={`/platform/${platform.slug}`}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex-shrink-0 bg-white p-6">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                      {platform.logoUrl ? (
                        <Image
                          src={platform.logoUrl}
                          alt={platform.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-xl font-bold text-indigo-600">
                          {platform.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-gray-500">{platform.category}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white p-6 pt-0">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 line-clamp-3">{platform.description}</p>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {platform.rewardType}
                      </span>
                    </div>
                    <div className="ml-auto text-sm text-gray-500">
                      <span>Est. {platform.estimatedEarning}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No platforms found in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
