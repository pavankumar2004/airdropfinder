import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Platform, GeneratedContent } from '../types';

// Platforms
export const getPlatforms = async (): Promise<Platform[]> => {
  const platformsRef = collection(db, 'platforms');
  const q = query(platformsRef, orderBy('name', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Platform));
};

export const getPlatformsByCategory = async (category: string): Promise<Platform[]> => {
  const platformsRef = collection(db, 'platforms');
  const q = query(platformsRef, where('category', '==', category), orderBy('name', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Platform));
};

export const getPlatformBySlug = async (slug: string): Promise<Platform | null> => {
  const platformsRef = collection(db, 'platforms');
  const q = query(platformsRef, where('slug', '==', slug));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return null;
  
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Platform;
};

export const addPlatform = async (platform: Omit<Platform, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const platformData = {
    ...platform,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  
  const docRef = await addDoc(collection(db, 'platforms'), platformData);
  return docRef.id;
};

export const updatePlatform = async (id: string, platform: Partial<Omit<Platform, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  const platformData = {
    ...platform,
    updatedAt: serverTimestamp()
  };
  
  const docRef = doc(db, 'platforms', id);
  await updateDoc(docRef, platformData);
};

export const deletePlatform = async (id: string): Promise<void> => {
  const docRef = doc(db, 'platforms', id);
  await deleteDoc(docRef);
};

// Generated Content
export const getGeneratedContent = async (platformId: string): Promise<GeneratedContent | null> => {
  const contentRef = collection(db, 'generatedContent');
  const q = query(contentRef, where('platformId', '==', platformId));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return null;
  
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as GeneratedContent & { id: string };
};

export const addGeneratedContent = async (content: Omit<GeneratedContent, 'createdAt' | 'updatedAt'>): Promise<string> => {
  const contentData = {
    ...content,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  
  const docRef = await addDoc(collection(db, 'generatedContent'), contentData);
  return docRef.id;
};

export const updateGeneratedContent = async (id: string, content: Partial<Omit<GeneratedContent, 'createdAt' | 'updatedAt'>>): Promise<void> => {
  const contentData = {
    ...content,
    updatedAt: serverTimestamp()
  };
  
  const docRef = doc(db, 'generatedContent', id);
  await updateDoc(docRef, contentData);
};

// Categories
interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  [key: string]: any; // For other potential properties
}

export const getCategories = async (): Promise<Category[]> => {
  const categoriesRef = collection(db, 'categories');
  const q = query(categoriesRef, orderBy('name', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
};
