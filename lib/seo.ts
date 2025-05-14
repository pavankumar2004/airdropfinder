import { Platform, GeneratedContent } from '../types';

export function generateStructuredData(platform: Platform, content?: GeneratedContent) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: platform.name,
    description: platform.seoDescription || platform.description,
    image: platform.logoUrl,
    category: platform.category,
    offers: {
      '@type': 'Offer',
      description: `Earn ${platform.rewardType} rewards`,
      availability: 'https://schema.org/InStock',
    }
  };

  // Add FAQ if available
  if (content?.faq && content.faq.length > 0) {
    const faqStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: content.faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    };
    
    return [structuredData, faqStructuredData];
  }

  return [structuredData];
}

export function generateMetaTags(platform: Platform) {
  return {
    title: platform.seoTitle || `${platform.name} - Earn ${platform.rewardType} | AirdropFinder`,
    description: platform.seoDescription || `Learn how to earn ${platform.estimatedEarning} with ${platform.name}, a ${platform.category} platform offering ${platform.rewardType} rewards.`,
    keywords: `${platform.name}, ${platform.category}, earn ${platform.rewardType}, crypto airdrops, ${platform.rewardType.toLowerCase()} rewards`,
    openGraph: {
      title: platform.seoTitle || `${platform.name} - Earn ${platform.rewardType} | AirdropFinder`,
      description: platform.seoDescription || `Learn how to earn ${platform.estimatedEarning} with ${platform.name}, a ${platform.category} platform offering ${platform.rewardType} rewards.`,
      type: 'website',
      url: `https://airdropfinders.vercel.app/platform/${platform.slug}`,
      images: [
        {
          url: platform.logoUrl,
          width: 800,
          height: 600,
          alt: platform.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: platform.seoTitle || `${platform.name} - Earn ${platform.rewardType} | AirdropFinder`,
      description: platform.seoDescription || `Learn how to earn ${platform.estimatedEarning} with ${platform.name}, a ${platform.category} platform offering ${platform.rewardType} rewards.`,
      images: [platform.logoUrl],
    },
  };
}
