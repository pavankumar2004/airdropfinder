import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlatformBySlug } from '../../../lib/firestore';
import { generateStructuredData, generateMetaTags } from '../../../lib/seo';

// Generate metadata for the platform page
export async function generateMetadata(props: { params: { slug: string } }): Promise<Metadata> {
  const slug = String(props.params.slug);
  const platform = await getPlatformBySlug(slug);
  
  if (!platform) {
    return {
      title: 'Platform Not Found',
      description: 'The requested platform could not be found.',
    };
  }
  
  return generateMetaTags(platform);
}

export default async function PlatformPage(props: { params: { slug: string } }) {
  const slug = String(props.params.slug);
  const platform = await getPlatformBySlug(slug);
  
  if (!platform) {
    notFound();
  }
  
  // Use the platform's manually entered content instead of AI-generated content
  const structuredData = generateStructuredData(platform);
  
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
              {/* Project Info */}
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">What is {platform.name}?</h2>
              <div className="mt-4 text-gray-600">
                {platform.projectInfo || platform.description}
              </div>
              
              {/* Airdrop Details */}
              <h2 className="mt-12 text-2xl font-bold tracking-tight text-gray-900">{platform.name} Airdrop Details</h2>
              <div className="mt-4 text-gray-600">
                {platform.airdropDetails || 'Information about this airdrop will be available soon.'}
              </div>
              
              {/* Participation Guide */}
              <h2 className="mt-12 text-2xl font-bold tracking-tight text-gray-900">Step-by-Step Guide: How to Participate</h2>
              <div className="mt-4">
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  {platform.participationGuide && platform.participationGuide.length > 0 ? (
                    platform.participationGuide.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))
                  ) : (
                    <li>Visit the platform website to get started.</li>
                  )}
                </ol>
              </div>
              
              {/* Earning Methods */}
              <h2 className="mt-12 text-2xl font-bold tracking-tight text-gray-900">Earning Methods for {platform.rewardType}</h2>
              
              {/* Content Scouting */}
              {platform.earningMethods?.contentScouting && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900">Content Scouting:</h3>
                  <div className="mt-2 text-gray-600">{platform.earningMethods.contentScouting}</div>
                </div>
              )}
              
              {/* Content Creation */}
              {platform.earningMethods?.contentCreation && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900">Content Creation:</h3>
                  <div className="mt-2 text-gray-600">{platform.earningMethods.contentCreation}</div>
                </div>
              )}
              
              {/* Self Scouting */}
              {platform.earningMethods?.selfScouting && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900">Self Scouting:</h3>
                  <div className="mt-2 text-gray-600">{platform.earningMethods.selfScouting}</div>
                </div>
              )}
              
              {/* Project Mission */}
              {platform.projectMission && (
                <>
                  <h2 className="mt-12 text-2xl font-bold tracking-tight text-gray-900">Mission</h2>
                  <div className="mt-4 text-gray-600">{platform.projectMission}</div>
                </>
              )}
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
            
            {/* Social Requirements */}
            {platform.socialRequirements && platform.socialRequirements.length > 0 && (
              <div className="mt-8 rounded-lg bg-gray-50 p-6 shadow-sm">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Social Requirements</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {platform.socialRequirements.map((req, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* FAQ */}
            {platform.faqs && platform.faqs.length > 0 && (
              <div className="mt-8 rounded-lg bg-gray-50 p-6 shadow-sm">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Frequently Asked Questions</h3>
                <dl className="mt-4 space-y-6">
                  {platform.faqs.map((item, index) => (
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
