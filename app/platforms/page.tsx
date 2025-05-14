import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPlatforms } from '../../lib/firestore';
import { Platform } from '../../types';

export const metadata: Metadata = {
  title: 'All Platforms - Crypto Earning Opportunities | AirdropFinder',
  description: 'Browse all crypto earning platforms including airdrops, faucets, learn-to-earn, and more. Find the best opportunities to earn cryptocurrency rewards.',
  openGraph: {
    title: 'All Platforms - Crypto Earning Opportunities | AirdropFinder',
    description: 'Browse all crypto earning platforms including airdrops, faucets, learn-to-earn, and more. Find the best opportunities to earn cryptocurrency rewards.',
    type: 'website',
    url: 'https://airdropfinders.vercel.app/platforms',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Platforms - Crypto Earning Opportunities | AirdropFinder',
    description: 'Browse all crypto earning platforms including airdrops, faucets, learn-to-earn, and more. Find the best opportunities to earn cryptocurrency rewards.',
  },
};

export default async function PlatformsPage() {
  const platforms = await getPlatforms();
  
  // Group platforms by category
  const platformsByCategory: Record<string, Platform[]> = {};
  
  platforms.forEach(platform => {
    if (!platformsByCategory[platform.category]) {
      platformsByCategory[platform.category] = [];
    }
    platformsByCategory[platform.category].push(platform);
  });
  
  // Sort categories alphabetically
  const sortedCategories = Object.keys(platformsByCategory).sort();
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">All Platforms</h1>
          <p className="mt-4 text-lg text-gray-600">
            Browse all crypto earning opportunities in our directory
          </p>
        </div>
        
        {platforms.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No platforms available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="mt-12 space-y-16">
            {sortedCategories.map(category => (
              <div key={category} className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">{category}</h2>
                  <Link 
                    href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    View all <span aria-hidden="true">→</span>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {platformsByCategory[category].map((platform) => (
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
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
