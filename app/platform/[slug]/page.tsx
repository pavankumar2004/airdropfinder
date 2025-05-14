import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlatformBySlug, getGeneratedContent } from '../../../lib/firestore';
import { generateStructuredData, generateMetaTags } from '../../../lib/seo';

// Generate metadata for the platform page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const platform = await getPlatformBySlug(params.slug);
  
  if (!platform) {
    return {
      title: 'Platform Not Found',
      description: 'The requested platform could not be found.',
    };
  }
  
  return generateMetaTags(platform);
}

export default async function PlatformPage({ params }: { params: { slug: string } }) {
  const platform = await getPlatformBySlug(params.slug);
  
  if (!platform) {
    notFound();
  }
  
  const content = await getGeneratedContent(platform.id);
  const structuredData = generateStructuredData(platform, content || undefined);
  
  return (
    <div className="bg-white">
      {/* Add structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Platform header */}
      <div className="bg-gradient-to-b from-indigo-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-24 w-24 overflow-hidden rounded-lg bg-white shadow">
              {platform.logoUrl ? (
                <Image
                  src={platform.logoUrl}
                  alt={platform.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-3xl font-bold text-indigo-600">
                  {platform.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{platform.name}</h1>
                <Link 
                  href={`/category/${platform.category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="ml-4 inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800"
                >
                  {platform.category}
                </Link>
              </div>
              <p className="mt-2 text-lg text-gray-600">{platform.description}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  <span className="mr-1">💰</span> {platform.rewardType}
                </div>
                <div className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                  <span className="mr-1">💵</span> Est. {platform.estimatedEarning}
                </div>
              </div>
            </div>
            <div className="ml-auto mt-6 md:mt-0">
              {platform.referralLink && (
                <a
                  href={platform.referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Join Now
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Platform content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="prose prose-indigo max-w-none">
              {/* Introduction */}
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Introduction</h2>
              <div className="mt-4 text-gray-600">
                {content?.intro || platform.description}
              </div>
              
              {/* How it works */}
              <h2 className="mt-12 text-2xl font-bold tracking-tight text-gray-900">How It Works</h2>
              <div className="mt-4 text-gray-600">
                {content?.howItWorks || 'Information about how this platform works will be available soon.'}
              </div>
              
              {/* Pros and Cons */}
              <h2 className="mt-12 text-2xl font-bold tracking-tight text-gray-900">Pros and Cons</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-lg bg-green-50 p-6">
                  <h3 className="text-base font-semibold leading-7 text-green-900">Pros</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-green-800">
                    {content?.prosAndCons?.pros?.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    )) || (
                      <>
                        <li>Easy to use interface</li>
                        <li>Legitimate rewards</li>
                        <li>Regular payouts</li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 p-6">
                  <h3 className="text-base font-semibold leading-7 text-red-900">Cons</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-800">
                    {content?.prosAndCons?.cons?.map((con, index) => (
                      <li key={index}>{con}</li>
                    )) || (
                      <>
                        <li>May require significant time investment</li>
                        <li>Rewards can vary</li>
                        <li>Some features may be limited</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              {/* Estimated Earnings */}
              <h2 className="mt-12 text-2xl font-bold tracking-tight text-gray-900">Estimated Earnings</h2>
              <div className="mt-4 text-gray-600">
                {content?.estimatedEarnings || `Users can expect to earn approximately ${platform.estimatedEarning} depending on activity level and engagement.`}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Info */}
            <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
              <h3 className="text-base font-semibold leading-7 text-gray-900">Quick Info</h3>
              <dl className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="text-sm font-medium text-gray-900">{platform.category}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">Reward Type</dt>
                  <dd className="text-sm font-medium text-gray-900">{platform.rewardType}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500">Estimated Earning</dt>
                  <dd className="text-sm font-medium text-gray-900">{platform.estimatedEarning}</dd>
                </div>
              </dl>
              {platform.referralLink && (
                <div className="mt-6">
                  <a
                    href={platform.referralLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Join {platform.name}
                  </a>
                </div>
              )}
            </div>
            
            {/* FAQ */}
            {content?.faq && content.faq.length > 0 && (
              <div className="mt-8 rounded-lg bg-gray-50 p-6 shadow-sm">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Frequently Asked Questions</h3>
                <dl className="mt-4 space-y-6">
                  {content.faq.map((item, index) => (
                    <div key={index}>
                      <dt className="text-sm font-medium leading-6 text-gray-900">{item.question}</dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-600">{item.answer}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
