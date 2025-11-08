import { 
  getAuth, 
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  UserCredential,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import app from './config';

// Initialize Firebase Auth
export const auth: Auth = getAuth(app);

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Create new user account
export const signUp = async (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign out current user
export const signOut = async (): Promise<void> => {
  return firebaseSignOut(auth);
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

// Update user profile
export const updateUserProfile = async (
  user: User,
  displayName?: string,
  photoURL?: string
): Promise<void> => {
  return updateProfile(user, {
    displayName,
    photoURL,
  });
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

