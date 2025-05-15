'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addPlatform } from '../../../lib/firestore';
import { Platform } from '../../../types';

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

export default function AddPlatformPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    logoUrl: '',
    description: '',
    rewardType: '',
    estimatedEarning: '',
    referralLink: '',
    seoTitle: '',
    seoDescription: '',
    projectInfo: '',
    airdropDetails: '',
    participationGuide: [''],
    earningMethods: {
      contentScouting: '',
      contentCreation: '',
      selfScouting: ''
    },
    projectMission: '',
    faqs: [{ question: '', answer: '' }],
    socialRequirements: ['']
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      setFormData({
        ...formData,
        name: value,
        slug
      });
    } else if (name.includes('.')) {
      // Handle nested objects like earningMethods.contentScouting
      const [parent, child] = name.split('.');
      
      if (parent === 'earningMethods') {
        setFormData({
          ...formData,
          earningMethods: {
            ...formData.earningMethods,
            [child]: value
          }
        });
      } else {
        // Generic fallback for other potential nested objects
        const updatedFormData = { ...formData };
        const parentObj = updatedFormData[parent as keyof typeof formData];
        if (typeof parentObj === 'object' && parentObj !== null) {
          (updatedFormData[parent as keyof typeof formData] as any)[child] = value;
          setFormData(updatedFormData);
        }
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle array fields
  const handleArrayChange = (index: number, field: string, value: string) => {
    if (field === 'participationGuide' || field === 'socialRequirements') {
      const newArray = [...formData[field as 'participationGuide' | 'socialRequirements']];
      newArray[index] = value;
      setFormData({
        ...formData,
        [field]: newArray
      });
    }
  };
  
  // Handle FAQ changes
  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index][field] = value;
    setFormData({
      ...formData,
      faqs: newFaqs
    });
  };
  
  // Add new item to array fields
  const addArrayItem = (field: 'participationGuide' | 'socialRequirements' | 'faqs') => {
    if (field === 'faqs') {
      setFormData({
        ...formData,
        faqs: [...formData.faqs, { question: '', answer: '' }]
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...formData[field], '']
      });
    }
  };
  
  // Remove item from array fields
  const removeArrayItem = (field: 'participationGuide' | 'socialRequirements' | 'faqs', index: number) => {
    if (field === 'faqs') {
      const newFaqs = [...formData.faqs];
      newFaqs.splice(index, 1);
      setFormData({
        ...formData,
        faqs: newFaqs.length ? newFaqs : [{ question: '', answer: '' }]
      });
    } else {
      const newArray = [...formData[field]];
      newArray.splice(index, 1);
      setFormData({
        ...formData,
        [field]: newArray.length ? newArray : ['']
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validate required fields
      const requiredFields = ['name', 'slug', 'category', 'description', 'rewardType', 'estimatedEarning', 'projectInfo', 'airdropDetails'];
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`);
        }
      }
      
      // Validate array fields have at least one non-empty item
      const participationGuide = formData.participationGuide as string[];
      if (!participationGuide.some(item => item.trim() !== '')) {
        throw new Error('At least one participation guide step is required');
      }
      
      const faqs = formData.faqs as {question: string, answer: string}[];
      if (!faqs.some(faq => faq.question.trim() !== '' && faq.answer.trim() !== '')) {
        throw new Error('At least one FAQ is required');
      }
      
      // Add platform to Firestore
      // Explicitly cast formData to the expected type to avoid spread type errors
      const platformData: Omit<Platform, 'id' | 'createdAt' | 'updatedAt'> = {
        name: formData.name,
        slug: formData.slug,
        category: formData.category,
        logoUrl: formData.logoUrl,
        description: formData.description,
        rewardType: formData.rewardType,
        estimatedEarning: formData.estimatedEarning,
        referralLink: formData.referralLink,
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
        projectInfo: formData.projectInfo,
        airdropDetails: formData.airdropDetails,
        participationGuide: formData.participationGuide,
        earningMethods: formData.earningMethods,
        projectMission: formData.projectMission,
        faqs: formData.faqs,
        socialRequirements: formData.socialRequirements
      };
      const platformId = await addPlatform(platformData);
      
      setSuccess('Platform added successfully!');
      
      // Redirect to admin page after a delay
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
      
    } catch (err) {
      console.error('Error adding platform:', err);
      setError(err instanceof Error ? err.message : 'Failed to add platform. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">Add New Platform</h1>
            <p className="mt-2 text-sm text-gray-700">
              Create a new platform listing in the directory
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
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              {/* Slug */}
              <div className="sm:col-span-2">
                <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">
                  Slug * (auto-generated from name)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    value={formData.slug}
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
                    value={formData.category}
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
                    value={formData.rewardType}
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
                    value={formData.logoUrl}
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
                    value={formData.description}
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
                    value={formData.estimatedEarning}
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
                    value={formData.referralLink}
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
                    value={formData.seoTitle}
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
                    value={formData.seoDescription}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Project Info */}
              <div className="sm:col-span-2">
                <label htmlFor="projectInfo" className="block text-sm font-medium leading-6 text-gray-900">
                  What is {formData.name || 'the project'}? *
                </label>
                <div className="mt-2">
                  <textarea
                    id="projectInfo"
                    name="projectInfo"
                    rows={4}
                    value={formData.projectInfo}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    placeholder="Describe what the project is about..."
                  />
                </div>
              </div>
              
              {/* Airdrop Details */}
              <div className="sm:col-span-2">
                <label htmlFor="airdropDetails" className="block text-sm font-medium leading-6 text-gray-900">
                  Airdrop Details *
                </label>
                <div className="mt-2">
                  <textarea
                    id="airdropDetails"
                    name="airdropDetails"
                    rows={4}
                    value={formData.airdropDetails}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    placeholder="Provide details about the airdrop..."
                  />
                </div>
              </div>
              
              {/* Participation Guide */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Step-by-Step Guide: How to Participate *
                </label>
                <div className="mt-2 space-y-3">
                  {formData.participationGuide.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="flex-shrink-0 text-sm font-medium">{index + 1}.</span>
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => handleArrayChange(index, 'participationGuide', e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder={`Step ${index + 1}`}
                      />
                      {formData.participationGuide.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('participationGuide', index)}
                          className="rounded-md bg-white p-1 text-gray-400 hover:text-red-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('participationGuide')}
                    className="mt-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-indigo-50"
                  >
                    Add Step
                  </button>
                </div>
              </div>
              
              {/* Earning Methods */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-4">
                  Earning Methods
                </label>
                
                {/* Content Scouting */}
                <div className="mb-4">
                  <label htmlFor="earningMethods.contentScouting" className="block text-sm font-medium leading-6 text-gray-900">
                    Content Scouting
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="earningMethods.contentScouting"
                      name="earningMethods.contentScouting"
                      rows={3}
                      value={formData.earningMethods.contentScouting}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Describe how users can earn through content scouting..."
                    />
                  </div>
                </div>
                
                {/* Content Creation */}
                <div className="mb-4">
                  <label htmlFor="earningMethods.contentCreation" className="block text-sm font-medium leading-6 text-gray-900">
                    Content Creation
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="earningMethods.contentCreation"
                      name="earningMethods.contentCreation"
                      rows={3}
                      value={formData.earningMethods.contentCreation}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Describe how users can earn through content creation..."
                    />
                  </div>
                </div>
                
                {/* Self Scouting */}
                <div>
                  <label htmlFor="earningMethods.selfScouting" className="block text-sm font-medium leading-6 text-gray-900">
                    Self Scouting
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="earningMethods.selfScouting"
                      name="earningMethods.selfScouting"
                      rows={3}
                      value={formData.earningMethods.selfScouting}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Describe how users can earn through self scouting..."
                    />
                  </div>
                </div>
              </div>
              
              {/* Project Mission */}
              <div className="sm:col-span-2">
                <label htmlFor="projectMission" className="block text-sm font-medium leading-6 text-gray-900">
                  Project Mission or Philosophy
                </label>
                <div className="mt-2">
                  <textarea
                    id="projectMission"
                    name="projectMission"
                    rows={3}
                    value={formData.projectMission}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Describe the project's mission or philosophy..."
                  />
                </div>
              </div>
              
              {/* FAQs */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900 mb-4">
                  FAQs *
                </label>
                <div className="mt-2 space-y-4">
                  {formData.faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">FAQ #{index + 1}</h4>
                        {formData.faqs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem('faqs', index)}
                            className="rounded-md bg-white p-1 text-gray-400 hover:text-red-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor={`faq-question-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                          Question
                        </label>
                        <input
                          type="text"
                          id={`faq-question-${index}`}
                          value={faq.question}
                          onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Enter question"
                        />
                      </div>
                      <div>
                        <label htmlFor={`faq-answer-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                          Answer
                        </label>
                        <textarea
                          id={`faq-answer-${index}`}
                          value={faq.answer}
                          onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                          rows={3}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Enter answer"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('faqs')}
                    className="mt-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-indigo-50"
                  >
                    Add FAQ
                  </button>
                </div>
              </div>
              
              {/* Social Requirements */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Social Requirements
                </label>
                <div className="mt-2 space-y-3">
                  {formData.socialRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => handleArrayChange(index, 'socialRequirements', e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="E.g., Twitter follow, Telegram join, etc."
                      />
                      {formData.socialRequirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('socialRequirements', index)}
                          className="rounded-md bg-white p-1 text-gray-400 hover:text-red-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('socialRequirements')}
                    className="mt-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-indigo-50"
                  >
                    Add Requirement
                  </button>
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
                disabled={loading}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
              >
                {loading ? 'Adding...' : 'Add Platform'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
