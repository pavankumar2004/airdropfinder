'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { collection, query, where, orderBy, getDocs, limit, startAfter, QueryDocumentSnapshot, QueryConstraint, DocumentData } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Platform } from '../../types';

export default function SearchPage() {
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
    'Token',
    'NFT',
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
        if (isNewSearch) {
          setPlatforms([]);
        }
      } else {
        const newPlatforms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Platform));
        
        // Filter by search query if provided
        const filteredPlatforms = searchQuery
          ? newPlatforms.filter(platform => 
              platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              platform.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : newPlatforms;
        
        if (isNewSearch) {
          setPlatforms(filteredPlatforms);
        } else {
          setPlatforms(prev => [...prev, ...filteredPlatforms]);
        }
        
        // Set last document for pagination
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        
        // Check if there are more results
        setHasMore(snapshot.docs.length === 12);
      }
    } catch (err) {
      console.error('Error searching platforms:', err);
      setError('Failed to search platforms. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedRewardType]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchPlatforms();
  };

  // Handle filter changes
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

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
        
        {/* Search form */}
        <div className="mx-auto mt-8 max-w-xl">
          <form onSubmit={handleSearch} className="sm:flex sm:gap-4">
            <div className="relative mt-2 rounded-md shadow-sm flex-grow">
              <input
                type="text"
                name="search"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border-0 py-3 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search platforms..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <button
              type="submit"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto"
            >
              Search
            </button>
          </form>
        </div>
        
        {/* Filters */}
        <div className="mt-8 sm:flex sm:justify-center sm:gap-8">
          {/* Category filter */}
          <div className="mt-4 sm:mt-0">
            <label htmlFor="category-filter" className="block text-sm font-medium leading-6 text-gray-900">
              Category
            </label>
            <select
              id="category-filter"
              name="category-filter"
              value={selectedCategory || ''}
              onChange={(e) => handleCategoryChange(e.target.value || null)}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          {/* Reward type filter */}
          <div className="mt-4 sm:mt-0">
            <label htmlFor="reward-filter" className="block text-sm font-medium leading-6 text-gray-900">
              Reward Type
            </label>
            <select
              id="reward-filter"
              name="reward-filter"
              value={selectedRewardType || ''}
              onChange={(e) => handleRewardTypeChange(e.target.value || null)}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">All Reward Types</option>
              {rewardTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Error message */}
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
        
        {/* Results */}
        <div className="mt-12">
          {loading && platforms.length === 0 ? (
            <div className="text-center py-10">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-2 text-sm text-gray-500">Searching platforms...</p>
            </div>
          ) : platforms.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No platforms found matching your search criteria.</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {platforms.length} {platforms.length === 1 ? 'Result' : 'Results'} Found
              </h2>
              
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {platforms.map((platform) => (
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
              
              {/* Load more button */}
              {hasMore && (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
