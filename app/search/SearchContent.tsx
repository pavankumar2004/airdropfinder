'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { collection, query, where, orderBy, getDocs, limit, startAfter, QueryDocumentSnapshot, QueryConstraint, DocumentData } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Platform } from '../../types';

export default function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRewardType, setSelectedRewardType] = useState<string | null>(null);

  const categories = [
    'Airdrops',
    'Faucets',
    'Learn to Earn',
    'Play to Earn',
    'Staking',
    'Mining',
    'DeFi',
    'NFT',
    'Other'
  ];
  
  const rewardTypes = [
    'Crypto',
    'NFT',
    'Token',
    'Points',
    'Cash',
    'Mixed'
  ];

  // Search function wrapped in useCallback to prevent dependency changes on every render
  const searchPlatforms = useCallback(async (isNewSearch = true) => {
    try {
      setLoading(true);
      setError(null);
      
      if (isNewSearch) {
        setPlatforms([]);
        setLastDoc(null);
        setHasMore(true);
      }
      
      // Base query
      const platformsRef = collection(db, 'platforms');
      const constraints: Array<QueryConstraint> = [];
      
      // Add filters
      if (selectedCategory) {
        constraints.push(where('category', '==', selectedCategory));
      }
      
      if (selectedRewardType) {
        constraints.push(where('rewardType', '==', selectedRewardType));
      }
      
      // Add ordering
      constraints.push(orderBy('name', 'asc'));
      
      // Add pagination
      constraints.push(limit(12));
      
      if (!isNewSearch && lastDoc) {
        constraints.push(startAfter(lastDoc));
      }
      
      // Create query
      const q = query(platformsRef, ...constraints);
      
      // Execute query
      const snapshot = await getDocs(q);
      
      // Process results
      if (snapshot.empty) {
        setHasMore(false);
      } else {
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        
        const newPlatforms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Platform));
        
        setPlatforms(prev => {
          if (isNewSearch) {
            return newPlatforms;
          } else {
            return [...prev, ...newPlatforms];
          }
        });
      }
    } catch (err) {
      console.error('Error searching platforms:', err);
      setError('Failed to search platforms. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedRewardType, lastDoc, searchQuery]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchPlatforms();
  };

  // Handle category filter change
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  // Handle reward type filter change
  const handleRewardTypeChange = (rewardType: string | null) => {
    setSelectedRewardType(rewardType);
  };

  // Load more results
  const loadMore = () => {
    if (!loading && hasMore) {
      searchPlatforms(false);
    }
  };

  // Initial search on page load or when filters change
  useEffect(() => {
    searchPlatforms();
  }, [selectedCategory, selectedRewardType, searchPlatforms]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Search Platforms</h1>
          <p className="mt-4 text-lg text-gray-600">
            Find crypto earning opportunities that match your interests
          </p>
        </div>
        
        <div className="mt-12">
          <form onSubmit={handleSearch} className="flex w-full max-w-lg mx-auto">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search platforms..."
                className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <button
              type="submit"
              className="ml-4 flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Search
            </button>
          </form>
        </div>
        
        <div className="mt-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === null
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button
              onClick={() => handleRewardTypeChange(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedRewardType === null
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All Reward Types
            </button>
            {rewardTypes.map((rewardType) => (
              <button
                key={rewardType}
                onClick={() => handleRewardTypeChange(rewardType)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedRewardType === rewardType
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {rewardType}
              </button>
            ))}
          </div>
        </div>
        
        {error && (
          <div className="mt-8 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform) => (
            <Link 
              key={platform.id} 
              href={`/platform/${platform.slug}`}
              className="group relative block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {platform.logoUrl && (
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                        <Image
                          src={platform.logoUrl}
                          alt={platform.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{platform.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{platform.category}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                    {platform.rewardType}
                  </span>
                </div>
                <p className="mt-4 text-sm text-gray-600 line-clamp-3">{platform.description}</p>
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      Est. Earning: {platform.estimatedEarning}
                    </span>
                    <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {platforms.length === 0 && !loading && (
          <div className="mt-12 text-center">
            <p className="text-gray-600">No platforms found matching your criteria.</p>
          </div>
        )}
        
        {hasMore && platforms.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="inline-flex items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
