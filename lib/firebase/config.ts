import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Warn if required env vars are missing to help diagnose 400 Listen issues
const missingKeys: string[] = [];
if (!firebaseConfig.apiKey) missingKeys.push('NEXT_PUBLIC_FIREBASE_API_KEY');
if (!firebaseConfig.authDomain) missingKeys.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
if (!firebaseConfig.projectId) missingKeys.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
if (!firebaseConfig.appId) missingKeys.push('NEXT_PUBLIC_FIREBASE_APP_ID');
if (missingKeys.length > 0) {
  // eslint-disable-next-line no-console
  console.warn('Missing Firebase env vars:', missingKeys.join(', '));
}

// Initialize Firestore
let db: Firestore;

// Optional: allow forcing long polling via env to work around network/proxy issues
const forceLongPolling = String(process.env.NEXT_PUBLIC_FIRESTORE_FORCE_LONG_POLLING || '').toLowerCase() === 'true';
if (forceLongPolling) {
  db = initializeFirestore(app, { experimentalForceLongPolling: true });
} else {
  db = getFirestore(app);
}

export { db };

export default app;
