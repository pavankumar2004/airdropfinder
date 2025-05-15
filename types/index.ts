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
  // New manual content fields
  projectInfo: string;
  airdropDetails: string;
  participationGuide: string[];
  earningMethods: {
    contentScouting: string;
    contentCreation: string;
    selfScouting: string;
  };
  projectMission: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  socialRequirements: string[];
}

// Removed GeneratedContent interface as it's no longer needed

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
}

export type RewardType = 'Crypto' | 'Token' | 'NFT' | 'Points' | 'Cash' | 'Mixed';
