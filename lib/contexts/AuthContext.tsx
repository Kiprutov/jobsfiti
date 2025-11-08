"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChange, getCurrentUser } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const { signIn: firebaseSignIn } = await import('@/lib/firebase/auth');
      const userCredential = await firebaseSignIn(email, password);
      // Update user state immediately
      setUser(userCredential.user);
      setLoading(false);
      // Redirect to portal
      router.push('/portal');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      throw err;
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      setError(null);
      const { signUp: firebaseSignUp, updateUserProfile } = await import('@/lib/firebase/auth');
      const userCredential = await firebaseSignUp(email, password);
      
      // Update Firebase Auth profile with display name if provided
      if (displayName && userCredential.user) {
        try {
          await updateUserProfile(userCredential.user, displayName);
        } catch (profileError) {
          console.warn('Failed to update auth profile:', profileError);
          // Continue even if profile update fails
        }
      }
      
      // Create user profile in Firestore
      const { createUserProfile } = await import('@/lib/services/userService');
      const profileData: {
        email: string;
        displayName: string;
        photoURL?: string;
      } = {
        email: userCredential.user.email || '',
        displayName: displayName || userCredential.user.displayName || '',
      };
      
      // Only include photoURL if it exists
      if (userCredential.user.photoURL) {
        profileData.photoURL = userCredential.user.photoURL;
      }
      
      await createUserProfile(userCredential.user.uid, profileData);
      
      // Update user state immediately
      setUser(userCredential.user);
      setLoading(false);
      // Redirect to portal
      router.push('/portal');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { signOut: firebaseSignOut } = await import('@/lib/firebase/auth');
      await firebaseSignOut();
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign out');
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      const { resetPassword: firebaseResetPassword } = await import('@/lib/firebase/auth');
      await firebaseResetPassword(email);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
      throw err;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

