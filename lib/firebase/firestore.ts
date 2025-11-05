import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  QueryConstraint,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './config';

// Helper to convert Firestore timestamp to Date
export const convertTimestamp = (timestamp: Timestamp | null | undefined): string => {
  if (!timestamp) return new Date().toISOString().split('T')[0];
  return timestamp.toDate().toISOString().split('T')[0];
};

// Helper to convert Date string to Firestore timestamp
export const convertToTimestamp = (dateString: string): Timestamp | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return Timestamp.fromDate(date);
};

// Collection references
export const jobsCollection = collection(db, 'jobs');

// Generic Firestore helpers
export const createDocument = async <T extends Record<string, any>>(
  collectionRef: any,
  data: T
): Promise<string> => {
  const docRef = await addDoc(collectionRef, {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateDocument = async <T extends Record<string, any>>(
  collectionRef: any,
  docId: string,
  data: Partial<T>
): Promise<void> => {
  const docRef = doc(collectionRef, docId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

export const deleteDocument = async (
  collectionRef: any,
  docId: string
): Promise<void> => {
  const docRef = doc(collectionRef, docId);
  await deleteDoc(docRef);
};

export const getDocument = async <T>(
  collectionRef: any,
  docId: string
): Promise<T | null> => {
  const docRef = doc(collectionRef, docId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as T;
  }
  return null;
};

export const getDocuments = async <T extends Record<string, any>>(
  collectionRef: any,
  constraints: QueryConstraint[] = []
): Promise<(T & { id: string })[]> => {
  const q = query(collectionRef, ...constraints);
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      ...data as T,
      id: docSnap.id,
    };
  });
};

