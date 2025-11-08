import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  limit,
  onSnapshot,
  Timestamp,
  serverTimestamp,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { JobInterest, JobInterestStatus, Comment, StatusHistoryEntry } from '@/lib/types/jobInterest';
import { FirestoreJob, getJobById } from './jobsService';
import { differenceInDays, parseISO, isAfter } from 'date-fns';

const jobInterestsCollection = collection(db, 'job_interest');

// Generate unique ID for comments
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Add or create a job interest
export const addJobInterest = async (
  userId: string,
  jobId: string,
  initialStatus: JobInterestStatus = 'interested',
  comment?: string,
  deadline?: string
): Promise<string> => {
  // Check if interest already exists
  const existingInterest = await getInterestByJob(userId, jobId);
  
  if (existingInterest) {
    // Update existing interest
    await updateJobInterestStatus(userId, jobId, initialStatus, comment);
    return existingInterest.id || '';
  }

  // Create new interest
  const now = Timestamp.now();
  const statusHistory: StatusHistoryEntry[] = [{
    status: initialStatus,
    timestamp: now,
    comment: comment,
    userId,
  }];

  // Build interest data, filtering out undefined values
  const interestData: any = {
    userId,
    jobId,
    status: initialStatus,
    notes: comment ? [{
      id: generateId(),
      text: comment,
      timestamp: now,
      userId,
      status: initialStatus,
    }] : [],
    statusHistory,
    priority: 'medium',
    tags: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  // Only include deadline if it's provided
  if (deadline) {
    interestData.deadline = deadline;
  }

  const interestRef = doc(jobInterestsCollection);
  await setDoc(interestRef, interestData);

  return interestRef.id;
};

// Update job interest status
export const updateJobInterestStatus = async (
  userId: string,
  jobId: string,
  newStatus: JobInterestStatus,
  comment?: string
): Promise<void> => {
  const interest = await getInterestByJob(userId, jobId);
  
  if (!interest) {
    throw new Error('Job interest not found');
  }

  const now = Timestamp.now();
  const statusHistoryEntry: StatusHistoryEntry = {
    status: newStatus,
    timestamp: now,
    comment: comment,
    userId,
  };

  const updatedNotes = comment ? [
    ...(interest.notes || []),
    {
      id: generateId(),
      text: comment,
      timestamp: now,
      userId,
      status: newStatus,
    } as Comment
  ] : (interest.notes || []);

  const interestRef = doc(jobInterestsCollection, interest.id!);
  await updateDoc(interestRef, {
    status: newStatus,
    notes: updatedNotes,
    statusHistory: [...(interest.statusHistory || []), statusHistoryEntry],
    updatedAt: serverTimestamp(),
  });
};

// Add comment to interest
export const addCommentToInterest = async (
  userId: string,
  jobId: string,
  commentText: string,
  status?: JobInterestStatus
): Promise<void> => {
  const interest = await getInterestByJob(userId, jobId);
  
  if (!interest) {
    throw new Error('Job interest not found');
  }

  const now = Timestamp.now();
  const newComment: Comment = {
    id: generateId(),
    text: commentText,
    timestamp: now,
    userId,
    status: status || interest.status,
  };

  const interestRef = doc(jobInterestsCollection, interest.id!);
  await updateDoc(interestRef, {
    notes: [...(interest.notes || []), newComment],
    updatedAt: serverTimestamp(),
  });
};

// Get user's interests
export const getUserInterests = async (userId: string): Promise<JobInterest[]> => {
  // Query without orderBy to avoid requiring an index
  // We'll sort in memory instead
  const q = query(
    jobInterestsCollection,
    where('userId', '==', userId)
  );
  
  const querySnapshot = await getDocs(q);
  const interests = querySnapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      notes: data.notes || [],
      statusHistory: data.statusHistory || [],
    } as JobInterest;
  });
  
  // Sort by updatedAt in memory (most recent first)
  return interests.sort((a, b) => {
    const aTime = a.updatedAt instanceof Date 
      ? a.updatedAt.getTime() 
      : typeof a.updatedAt === 'string' 
        ? new Date(a.updatedAt).getTime()
        : a.updatedAt?.toDate?.()?.getTime() || 0;
    const bTime = b.updatedAt instanceof Date 
      ? b.updatedAt.getTime() 
      : typeof b.updatedAt === 'string' 
        ? new Date(b.updatedAt).getTime()
        : b.updatedAt?.toDate?.()?.getTime() || 0;
    return bTime - aTime; // Descending order
  });
};

// Subscribe to user's interests (real-time)
export const subscribeToUserInterests = (
  userId: string,
  callback: (interests: JobInterest[]) => void
): Unsubscribe => {
  // Query without orderBy to avoid requiring an index
  // We'll sort in memory instead
  const q = query(
    jobInterestsCollection,
    where('userId', '==', userId)
  );

  return onSnapshot(q, (querySnapshot) => {
    const interests = querySnapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        notes: data.notes || [],
        statusHistory: data.statusHistory || [],
      } as JobInterest;
    });
    
    // Sort by updatedAt in memory (most recent first)
    const sorted = interests.sort((a, b) => {
      const aTime = a.updatedAt instanceof Date 
        ? a.updatedAt.getTime() 
        : typeof a.updatedAt === 'string' 
          ? new Date(a.updatedAt).getTime()
          : a.updatedAt?.toDate?.()?.getTime() || 0;
      const bTime = b.updatedAt instanceof Date 
        ? b.updatedAt.getTime() 
        : typeof b.updatedAt === 'string' 
          ? new Date(b.updatedAt).getTime()
          : b.updatedAt?.toDate?.()?.getTime() || 0;
      return bTime - aTime; // Descending order
    });
    
    callback(sorted);
  });
};

// Get interest by job ID
export const getInterestByJob = async (
  userId: string,
  jobId: string
): Promise<JobInterest | null> => {
  const q = query(
    jobInterestsCollection,
    where('userId', '==', userId),
    where('jobId', '==', jobId),
    limit(1)
  );
  
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }

  const docSnap = querySnapshot.docs[0];
  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...data,
    notes: data.notes || [],
    statusHistory: data.statusHistory || [],
  } as JobInterest;
};

// Check if job is bookmarked
export const isJobBookmarked = async (
  userId: string,
  jobId: string
): Promise<boolean> => {
  const interest = await getInterestByJob(userId, jobId);
  return interest !== null;
};

// Delete job interest
export const deleteJobInterest = async (
  userId: string,
  jobId: string
): Promise<void> => {
  const interest = await getInterestByJob(userId, jobId);
  
  if (!interest || !interest.id) {
    throw new Error('Job interest not found');
  }

  const interestRef = doc(jobInterestsCollection, interest.id);
  await deleteDoc(interestRef);
};

// Get jobs with approaching deadlines
export const getJobsWithApproachingDeadlines = async (
  userId: string
): Promise<{
  interest: JobInterest;
  job: FirestoreJob;
  daysUntilDeadline: number;
}[]> => {
  const interests = await getUserInterests(userId);
  const now = new Date();
  const thresholdDays = 3;
  
  const approaching: {
    interest: JobInterest;
    job: FirestoreJob;
    daysUntilDeadline: number;
  }[] = [];
  
  for (const interest of interests) {
    // Only check jobs that are not yet applied
    if (interest.status === 'applied' || interest.status === 'accepted' || interest.status === 'rejected') {
      continue;
    }
    
    // Get deadline from interest or fetch job
    let deadline: string | undefined = interest.deadline;
    
    if (!deadline) {
      try {
        const job = await getJobById(interest.jobId);
        if (job?.applicationDeadline) {
          deadline = job.applicationDeadline;
        }
      } catch (error) {
        console.error(`Error fetching job ${interest.jobId}:`, error);
        continue;
      }
    }
    
    if (!deadline) continue;
    
    try {
      const deadlineDate = parseISO(deadline);
      
      // Check if deadline is in the future and within threshold
      if (isAfter(deadlineDate, now)) {
        const daysUntil = differenceInDays(deadlineDate, now);
        
        if (daysUntil <= thresholdDays && daysUntil >= 0) {
          try {
            const job = await getJobById(interest.jobId);
            if (job) {
              approaching.push({
                interest,
                job,
                daysUntilDeadline: daysUntil,
              });
            }
          } catch (error) {
            console.error(`Error fetching job ${interest.jobId}:`, error);
          }
        }
      }
    } catch (error) {
      console.error(`Error parsing deadline ${deadline}:`, error);
    }
  }
  
  return approaching.sort((a, b) => a.daysUntilDeadline - b.daysUntilDeadline);
};

// Calculate coverage rate
export const calculateCoverageRate = async (userId: string): Promise<{
  total: number;
  applied: number;
  started: number;
  interested: number;
  coverageRate: number;
}> => {
  const interests = await getUserInterests(userId);
  const total = interests.length;
  const applied = interests.filter(i => 
    i.status === 'applied' || i.status === 'interviewed' || i.status === 'accepted'
  ).length;
  const started = interests.filter(i => i.status === 'started').length;
  const interested = interests.filter(i => i.status === 'interested').length;
  
  const coverageRate = total > 0 ? (applied / total) * 100 : 0;
  
  return {
    total,
    applied,
    started,
    interested,
    coverageRate: Math.round(coverageRate * 10) / 10,
  };
};

// Get all interests with their job data
export const getInterestsWithJobs = async (userId: string): Promise<{
  interest: JobInterest;
  job: FirestoreJob | null;
}[]> => {
  const interests = await getUserInterests(userId);
  const results: { interest: JobInterest; job: FirestoreJob | null }[] = [];
  
  for (const interest of interests) {
    try {
      const job = await getJobById(interest.jobId);
      results.push({ interest, job: job || null });
    } catch (error) {
      console.error(`Error fetching job ${interest.jobId}:`, error);
      results.push({ interest, job: null });
    }
  }
  
  return results;
};

// Update interest priority
export const updateInterestPriority = async (
  userId: string,
  jobId: string,
  priority: 'low' | 'medium' | 'high'
): Promise<void> => {
  const interest = await getInterestByJob(userId, jobId);
  
  if (!interest || !interest.id) {
    throw new Error('Job interest not found');
  }

  const interestRef = doc(jobInterestsCollection, interest.id);
  await updateDoc(interestRef, {
    priority,
    updatedAt: serverTimestamp(),
  });
};

// Update interest tags
export const updateInterestTags = async (
  userId: string,
  jobId: string,
  tags: string[]
): Promise<void> => {
  const interest = await getInterestByJob(userId, jobId);
  
  if (!interest || !interest.id) {
    throw new Error('Job interest not found');
  }

  const interestRef = doc(jobInterestsCollection, interest.id);
  await updateDoc(interestRef, {
    tags,
    updatedAt: serverTimestamp(),
  });
};
