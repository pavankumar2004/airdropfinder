'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { updatePlatform } from '../../../../lib/firestore';
import { Platform } from '../../../../types';

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

export default function EditPlatformPage(props: { params: { id: string } }) {
  const router = useRouter();
  const id = String(props.params.id);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Platform>>({
    name: '',
    slug: '',
    category: '',
    logoUrl: '',
    description: '',
    rewardType: '',
    estimatedEarning: '',
    referralLink: '',
    seoTitle: '',
    seoDescription: ''
  });

  useEffect(() => {
    async function loadPlatform() {
      try {
        setLoading(true);
        const docRef = doc(db, 'platforms', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const platformData = { id: docSnap.id, ...docSnap.data() } as Platform;
          setFormData(platformData);
        } else {
          setError('Platform not found');
        }
      } catch (err) {
        console.error('Error loading platform:', err);
        setError('Failed to load platform. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadPlatform();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from name if name is changed and slug was not manually edited
    if (name === 'name' && formData.slug === formData.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')) {
      const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      setFormData({
        ...formData,
        name: value,
        slug
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      // Validate required fields
      const requiredFields = ['name', 'slug', 'category', 'description', 'rewardType', 'estimatedEarning'];
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`);
        }
      }
      
      // Update platform in Firestore
      await updatePlatform(id, formData);
      
      setSuccess('Platform updated successfully!');
      
      // Redirect to admin page after a delay
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
      
    } catch (err) {
      console.error('Error updating platform:', err);
      setError(err instanceof Error ? err.message : 'Failed to update platform. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center py-10">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2 text-sm text-gray-500">Loading platform...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">Edit Platform</h1>
            <p className="mt-2 text-sm text-gray-700">
              Update platform information
            </p>
          </div>
          <Link
            href="/admin"
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Back to Admin
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
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

        {success && (
          <div className="mb-6 rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Success</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>{success}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name */}
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              {/* Slug */}
              <div className="sm:col-span-2">
                <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">
                  Slug *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    value={formData.slug || ''}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                  Category *
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    value={formData.category || ''}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reward Type */}
              <div>
                <label htmlFor="rewardType" className="block text-sm font-medium leading-6 text-gray-900">
                  Reward Type *
                </label>
                <div className="mt-2">
                  <select
                    id="rewardType"
                    name="rewardType"
                    value={formData.rewardType || ''}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  >
                    <option value="">Select a reward type</option>
                    {rewardTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Logo URL */}
              <div className="sm:col-span-2">
                <label htmlFor="logoUrl" className="block text-sm font-medium leading-6 text-gray-900">
                  Logo URL
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="logoUrl"
                    id="logoUrl"
                    value={formData.logoUrl || ''}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Description *
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description || ''}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              {/* Estimated Earning */}
              <div className="sm:col-span-2">
                <label htmlFor="estimatedEarning" className="block text-sm font-medium leading-6 text-gray-900">
                  Estimated Earning *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="estimatedEarning"
                    id="estimatedEarning"
                    value={formData.estimatedEarning || ''}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="$10-50 per month"
                    required
                  />
                </div>
              </div>

              {/* Referral Link */}
              <div className="sm:col-span-2">
                <label htmlFor="referralLink" className="block text-sm font-medium leading-6 text-gray-900">
                  Referral Link
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="referralLink"
                    id="referralLink"
                    value={formData.referralLink || ''}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="https://example.com/ref=123"
                  />
                </div>
              </div>

              {/* SEO Title */}
              <div className="sm:col-span-2">
                <label htmlFor="seoTitle" className="block text-sm font-medium leading-6 text-gray-900">
                  SEO Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="seoTitle"
                    id="seoTitle"
                    value={formData.seoTitle || ''}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* SEO Description */}
              <div className="sm:col-span-2">
                <label htmlFor="seoDescription" className="block text-sm font-medium leading-6 text-gray-900">
                  SEO Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="seoDescription"
                    name="seoDescription"
                    rows={3}
                    value={formData.seoDescription || ''}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flex justify-end gap-x-3">
              <Link
                href="/admin"
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
