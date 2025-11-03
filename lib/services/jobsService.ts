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
import { query, where, orderBy, limit } from 'firebase/firestore';
import { JobFormData } from '@/components/forms/JobForm';

// Job type matching Firestore structure
export interface FirestoreJob extends Omit<JobFormData, 'datePosted' | 'id'> {
  jobId: string;  // Primary identifier
  id?: number;    // Legacy field, will be removed
  datePosted: string;
  createdAt?: any;
  updatedAt?: any;
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
  // Find the latest jobId and increment
  const latest = await getDocuments<FirestoreJob>(
    jobsCollection,
    [orderBy('jobId', 'desc'), limit(1)]
  );
  let nextNumeric = 1;
  if (latest.length > 0) {
    const latestId = String(latest[0].jobId || '').replace(/[^0-9]/g, '');
    const asNum = parseInt(latestId || '0', 10);
    if (!isNaN(asNum)) nextNumeric = asNum + 1;
  }
  const nextJobId = String(nextNumeric).padStart(8, '0');

  const jobToSave: any = {
    ...jobData,
    jobId: nextJobId,
    datePosted: convertToTimestamp(jobData.datePosted) || new Date(),
  };

  return await createDocument(jobsCollection, jobToSave);
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
  
  await updateDocument(jobsCollection, jobId, jobToUpdate);
};

// Delete a job
export const deleteJob = async (jobId: string): Promise<void> => {
  await deleteDocument(jobsCollection, jobId);
};

// Get a single job by ID, trying multiple fields and formats
export const getJobById = async (jobId: string): Promise<FirestoreJob | null> => {
  if (!jobId) return null;
  
  try {
    console.log('Fetching job with ID:', jobId, 'Type:', typeof jobId);
    
    // Try to find by jobId first (string match)
    let jobs = await getDocuments<FirestoreJob>(
      jobsCollection,
      [where('jobId', '==', jobId), limit(1)]
    );
    
    // If not found, try with id field (numeric or string)
    if (jobs.length === 0) {
      console.log('Job not found with jobId, trying with id field...');
      const allJobs = await getDocuments<FirestoreJob>(jobsCollection);
      
      // Try different ID formats
      const foundJob = allJobs.find(job => 
        String(job.jobId) === String(jobId) || 
        String(job.id) === String(jobId) ||
        job.id?.toString() === jobId ||
        job.jobId?.toString() === jobId
      );
      
      if (foundJob) {
        console.log('Found job with alternative ID format:', foundJob);
        return convertFirestoreJob(foundJob);
      }
      
      // If still not found, try with document ID directly
      try {
        console.log('Trying to fetch by document ID...');
        const doc = await getDocument(jobsCollection, jobId);
        if (doc) {
          console.log('Found job by document ID');
          return convertFirestoreJob(doc);
        }
      } catch (docError) {
        console.log('Error fetching by document ID:', docError);
      }
      
      return null;
    }
    
    console.log('Found job by jobId:', jobs[0]);
    return convertFirestoreJob(jobs[0]);
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
