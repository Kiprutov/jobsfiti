import { db } from '@/lib/firebase/config';
import { collection, doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  updatedAt?: string;
  preferences?: {
    notifications?: boolean;
    emailUpdates?: boolean;
  };
}

const usersCollection = collection(db, 'users');

export const createUserProfile = async (
  userId: string,
  profileData: {
    email: string;
    displayName: string;
    photoURL?: string;
  }
): Promise<void> => {
  const userRef = doc(usersCollection, userId);
  
  // Build user profile object, only including photoURL if it's provided
  const userProfileData: any = {
    email: profileData.email,
    displayName: profileData.displayName,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    preferences: {
      notifications: true,
      emailUpdates: true,
    },
  };

  // Only add photoURL if it's provided and not empty
  if (profileData.photoURL) {
    userProfileData.photoURL = profileData.photoURL;
  }

  await setDoc(userRef, userProfileData);
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const userRef = doc(usersCollection, userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  return {
    id: userSnap.id,
    ...userSnap.data(),
  } as UserProfile;
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<Omit<UserProfile, 'id' | 'createdAt'>>
): Promise<void> => {
  const userRef = doc(usersCollection, userId);
  
  // Filter out undefined values - Firestore doesn't allow undefined
  const cleanUpdates: any = {
    updatedAt: serverTimestamp(),
  };
  
  Object.keys(updates).forEach((key) => {
    const value = updates[key as keyof typeof updates];
    if (value !== undefined) {
      cleanUpdates[key] = value;
    }
  });
  
  await updateDoc(userRef, cleanUpdates);
};

