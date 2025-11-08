import { Timestamp } from 'firebase/firestore';

export type JobInterestStatus = 
  | "interested" 
  | "started" 
  | "applied" 
  | "interviewed" 
  | "rejected" 
  | "accepted";

export type Priority = "low" | "medium" | "high";

export interface Comment {
  id: string;
  text: string;
  timestamp: Timestamp | string;
  userId: string;
  status?: JobInterestStatus;
}

export interface StatusHistoryEntry {
  status: JobInterestStatus;
  timestamp: Timestamp | string;
  comment?: string;
  userId: string;
}

export interface JobInterest {
  id?: string;
  userId: string;
  jobId: string;
  status: JobInterestStatus;
  notes: Comment[];
  statusHistory: StatusHistoryEntry[];
  deadline?: string;
  priority?: Priority;
  tags?: string[];
  createdAt: Timestamp | string;
  updatedAt: Timestamp | string;
}

export interface JobInterestWithJob extends JobInterest {
  job?: any; // FirestoreJob type
}

