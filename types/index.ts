export interface Platform {
  id: string;
  name: string;
  slug: string;
  category: string;
  logoUrl: string;
  description: string;
  rewardType: string;
  estimatedEarning: string;
  referralLink?: string;
  seoTitle: string;
  seoDescription: string;
  createdAt: any;
  updatedAt: any;
}

export interface GeneratedContent {
  platformId: string;
  intro: string;
  howItWorks: string;
  prosAndCons: {
    pros: string[];
    cons: string[];
  };
  estimatedEarnings: string;
  faq: {
    question: string;
    answer: string;
  }[];
  createdAt: any;
  updatedAt: any;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
}

export type RewardType = 'Crypto' | 'Token' | 'NFT' | 'Points' | 'Cash' | 'Mixed';
