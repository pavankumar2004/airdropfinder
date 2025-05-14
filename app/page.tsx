import Image from "next/image";
import Link from "next/link";
import { getPlatforms } from "../lib/firestore";
import { Platform } from "../types";

// Define categories with their icons and descriptions
const categories = [
  {
    name: "Airdrops",
    slug: "airdrops",
    description: "Discover free token distributions from new and existing projects",
    iconName: "🪂",
  },
  {
    name: "Faucets",
    slug: "faucets",
    description: "Claim small amounts of crypto for free on a regular basis",
    iconName: "🚰",
  },
  {
    name: "Learn to Earn",
    slug: "learn-to-earn",
    description: "Get rewarded for learning about blockchain and crypto",
    iconName: "📚",
  },
  {
    name: "Play to Earn",
    slug: "play-to-earn",
    description: "Earn rewards by playing games and participating in activities",
    iconName: "🎮",
  },
];

async function getTopPlatforms(): Promise<Platform[]> {
  try {
    const platforms = await getPlatforms();
    // Filter out any platforms with name "airdrop" (case insensitive)
    const filteredPlatforms = platforms.filter(platform => 
      !platform.name.toLowerCase().includes('airdrop')
    );
    return filteredPlatforms.slice(0, 6); // Return top 6 platforms
  } catch (error) {
    console.error("Error fetching platforms:", error);
    return []; // Return empty array if there's an error
  }
}

export default async function Home() {
  const topPlatforms = await getTopPlatforms();

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Discover the Best Crypto Earning Opportunities
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find and compare the latest airdrops, faucets, and earn platforms to maximize your crypto rewards.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/categories"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Browse Categories
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories section */}
      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Browse by Category</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Explore different ways to earn crypto rewards
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group relative isolate flex flex-col justify-between overflow-hidden rounded-2xl bg-gray-50 px-6 py-8 ring-1 ring-gray-200 hover:ring-indigo-300 hover:bg-gray-100 transition-all duration-300"
              >
                <div>
                  <div className="mb-4 text-4xl">{category.iconName}</div>
                  <h3 className="text-xl font-semibold leading-7 text-gray-900 group-hover:text-indigo-600">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{category.description}</p>
                </div>
                <div className="mt-6 flex items-center text-sm font-medium text-indigo-600">
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

      {/* Featured platforms section */}
      <div className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Platforms</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Top-rated opportunities to earn crypto rewards
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {topPlatforms.length > 0 ? (
              topPlatforms.map((platform) => (
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
                <p className="text-gray-500">No platforms available yet. Check back soon!</p>
              </div>
            )}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/platforms"
              className="text-base font-semibold leading-7 text-indigo-600 hover:text-indigo-500"
            >
              View all platforms <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Newsletter section */}
      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Stay updated</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Subscribe to our newsletter for the latest airdrops and earning opportunities
            </p>
          </div>
          <form className="mx-auto mt-10 max-w-md">
            <div className="flex gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
