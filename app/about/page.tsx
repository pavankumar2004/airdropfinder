import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About AirdropFinder - Crypto Earning Opportunities Directory',
  description: 'Learn about AirdropFinder, the comprehensive directory for crypto earning opportunities including airdrops, faucets, and learn-to-earn platforms.',
  openGraph: {
    title: 'About AirdropFinder - Crypto Earning Opportunities Directory',
    description: 'Learn about AirdropFinder, the comprehensive directory for crypto earning opportunities including airdrops, faucets, and learn-to-earn platforms.',
    type: 'website',
    url: 'https://airdropfinder.vercel.app/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About AirdropFinder - Crypto Earning Opportunities Directory',
    description: 'Learn about AirdropFinder, the comprehensive directory for crypto earning opportunities including airdrops, faucets, and learn-to-earn platforms.',
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About AirdropFinder</h1>
          
          <div className="mt-8 prose prose-indigo prose-lg text-gray-600">
            <p>
              AirdropFinder is a comprehensive directory of crypto earning opportunities designed to help users discover and compare various ways to earn cryptocurrency rewards.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              Our mission is to provide a clean, user-friendly platform that helps crypto enthusiasts find legitimate opportunities to earn cryptocurrency through airdrops, faucets, learn-to-earn programs, and other reward mechanisms.
            </p>
            
            <h2>What We Offer</h2>
            <p>
              AirdropFinder offers a curated directory of platforms across multiple categories:
            </p>
            <ul>
              <li><strong>Airdrops</strong> - Free token distributions from new and existing projects</li>
              <li><strong>Faucets</strong> - Platforms that provide small amounts of crypto for free on a regular basis</li>
              <li><strong>Learn to Earn</strong> - Educational platforms that reward users for learning about blockchain and crypto</li>
              <li><strong>Play to Earn</strong> - Games and activities that provide crypto rewards for participation</li>
              <li><strong>Staking</strong> - Platforms for earning passive income by staking crypto assets</li>
              <li><strong>Mining</strong> - Opportunities to earn through cryptocurrency mining</li>
              <li><strong>DeFi</strong> - Decentralized finance protocols offering various earning mechanisms</li>
              <li><strong>NFT</strong> - Non-fungible token related earning opportunities</li>
            </ul>
            
            <h2>Why Choose AirdropFinder</h2>
            <p>
              What sets AirdropFinder apart:
            </p>
            <ul>
              <li><strong>Comprehensive Information</strong> - Detailed platform profiles with descriptions, reward types, and estimated earnings</li>
              <li><strong>User-Friendly Interface</strong> - Clean, responsive design that works on all devices</li>
              <li><strong>Regular Updates</strong> - Our directory is constantly updated with new opportunities</li>
              <li><strong>No Registration Required</strong> - Browse all content without creating an account</li>
            </ul>
            
            <h2>Disclaimer</h2>
            <p>
              While we strive to list legitimate opportunities, cryptocurrency investments and activities always carry risk. AirdropFinder does not guarantee returns or vouch for the legitimacy of listed platforms. Always do your own research (DYOR) before participating in any crypto-related activity.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              Have questions, suggestions, or want to list your platform? We&apos;d love to hear from you!
            </p>
            <p>
              <Link href="/contact" className="text-indigo-600 hover:text-indigo-500">
                Contact us here →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
