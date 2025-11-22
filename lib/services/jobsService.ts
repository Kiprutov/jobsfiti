import {
  jobsCollection,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocument,
  getDocuments,
  convertTimestamp,
  convertToTimestamp,
} from '@/lib/firebase/firestore';
import { query, where, orderBy, limit, doc, setDoc, Timestamp } from 'firebase/firestore';
import { JobFormData } from '@/components/forms/JobForm';
import { getCompanyById } from './companiesService';

// Job type matching Firestore structure
export interface FirestoreJob extends Omit<JobFormData, 'datePosted' | 'id'> {
  jobId: string;  // Primary identifier
  id?: number;    // Legacy field
  datePosted: string;
  createdAt?: any;
  updatedAt?: any;

  // New Architecture
  companySnapshot?: {
    name: string;
    logoUrl?: string;
    website?: string;
  };
}

// Convert Firestore job to JobFormData format
const convertFirestoreJob = (firestoreJob: any): FirestoreJob => {
  return {
    ...firestoreJob,
    jobId: firestoreJob.jobId || String(firestoreJob.id || ''),
    datePosted: firestoreJob.datePosted
      ? (typeof firestoreJob.datePosted === 'string'
        ? firestoreJob.datePosted
        : convertTimestamp(firestoreJob.datePosted))
      : new Date().toISOString().split('T')[0],
    createdAt: firestoreJob.createdAt ? convertTimestamp(firestoreJob.createdAt) : undefined,
    updatedAt: firestoreJob.updatedAt ? convertTimestamp(firestoreJob.updatedAt) : undefined,
  };
};

// Create a new job
export const createJob = async (jobData: Omit<JobFormData, 'id'>): Promise<string> => {
  // Generate a safe Auto-ID
  const newJobRef = doc(jobsCollection);
  const newJobId = newJobRef.id;

  // Prepare company snapshot if companyId is present
  let companySnapshot = undefined;
  if (jobData.companyId) {
    const company = await getCompanyById(jobData.companyId);
    if (company) {
      companySnapshot = {
        name: company.name,
        logoUrl: company.logoUrl,
        website: company.website,
      };
    }
  }

  // Generate slug if not present
  let slug = jobData.slug;
  if (!slug && jobData.title) {
    slug = `${jobData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${newJobId.slice(0, 8)}`;
  }

  const jobToSave: any = {
    ...jobData,
    jobId: newJobId, // Use Firestore ID as jobId for new jobs
    id: Date.now(), // Keep legacy numeric ID for now to prevent breakages, but it's deprecated
    slug,
    companySnapshot,
    datePosted: convertToTimestamp(jobData.datePosted) || new Date(),
    audit: {
      views: 0,
      applications: 0,
      createdBy: 'system', // TODO: Replace with actual user ID
      ...jobData.audit
    }
  };

  // Use setDoc with the generated ID
  await setDoc(newJobRef, {
    ...jobToSave,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return newJobId;
};

// Update an existing job
export const updateJob = async (
  jobId: string,
  jobData: Partial<JobFormData>
): Promise<void> => {
  const jobToUpdate: any = { ...jobData };

  if (jobData.datePosted) {
    jobToUpdate.datePosted = convertToTimestamp(jobData.datePosted);
  }

  // Update company snapshot if companyId changed
  if (jobData.companyId) {
    const company = await getCompanyById(jobData.companyId);
    if (company) {
      jobToUpdate.companySnapshot = {
        name: company.name,
        logoUrl: company.logoUrl,
        website: company.website,
      };
      // Also update legacy fields for backward compatibility
      jobToUpdate.companyName = company.name;
      jobToUpdate.logo = company.logoUrl || '';
      jobToUpdate.companyWebsite = company.website || '';
    }
  }

  await updateDocument(jobsCollection, jobId, jobToUpdate);
};

// Delete a job
export const deleteJob = async (jobId: string): Promise<void> => {
  await deleteDocument(jobsCollection, jobId);
};

// Get a single job by ID
export const getJobById = async (jobId: string): Promise<FirestoreJob | null> => {
  if (!jobId) return null;

  try {
    // Try to find by jobId first (string match)
    let jobs = await getDocuments<FirestoreJob>(
      jobsCollection,
      [where('jobId', '==', jobId), limit(1)]
    );

    if (jobs.length > 0) return convertFirestoreJob(jobs[0]);

    // Try by slug
    jobs = await getDocuments<FirestoreJob>(
      jobsCollection,
      [where('slug', '==', jobId), limit(1)]
    );
    if (jobs.length > 0) return convertFirestoreJob(jobs[0]);

    // Fallback: Try with document ID directly
    const doc = await getDocument(jobsCollection, jobId);
    if (doc) return convertFirestoreJob(doc);

    return null;
  } catch (error) {
    console.error('Error in getJobById:', error);
    return null;
  }
};

// Get all jobs
export const getJobs = async (): Promise<FirestoreJob[]> => {
  const jobs = await getDocuments<FirestoreJob>(
    jobsCollection,
    [orderBy('datePosted', 'desc')]
  );
  return jobs.map(convertFirestoreJob);
};

// Get jobs by role
export const getJobsByRole = async (role: string): Promise<FirestoreJob[]> => {
  const jobs = await getDocuments<FirestoreJob>(
    jobsCollection,
    [
      where('role', '==', role),
      orderBy('datePosted', 'desc'),
    ]
  );
  return jobs.map(convertFirestoreJob);
};

// Get jobs by category
export const getJobsByCategory = async (category: string): Promise<FirestoreJob[]> => {
  const jobs = await getDocuments<FirestoreJob>(
    jobsCollection,
    [
      where('category', '==', category),
      orderBy('datePosted', 'desc'),
    ]
  );
  return jobs.map(convertFirestoreJob);
};

// Get jobs by role and category
export const getJobsByRoleAndCategory = async (
  role: string,
  category: string
): Promise<FirestoreJob[]> => {
  const jobs = await getDocuments<FirestoreJob>(
    jobsCollection,
    [
      where('role', '==', role),
      where('category', '==', category),
      orderBy('datePosted', 'desc'),
    ]
  );
  return jobs.map(convertFirestoreJob);
};

// Get jobs by status
export const getJobsByStatus = async (status: string): Promise<FirestoreJob[]> => {
  const jobs = await getDocuments<FirestoreJob>(
    jobsCollection,
    [
      where('status', '==', status),
      orderBy('datePosted', 'desc'),
    ]
  );
  return jobs.map(convertFirestoreJob);
};
