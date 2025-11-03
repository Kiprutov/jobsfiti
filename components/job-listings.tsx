"use client"

import { useState, useEffect } from "react"
import { Heart, MapPin } from "lucide-react"
import Link from "next/link"
import { getJobs } from "@/lib/services/jobsService"
import { FirestoreJob, getJobById } from "@/lib/services/jobsService"

export default function JobListings() {
  const [jobs, setJobs] = useState<FirestoreJob[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState<string[]>([])
  
  // Get job ID - always use jobId field
  const getJobId = (job: FirestoreJob): string => {
    if (!job.jobId) {
      console.warn('Job is missing jobId:', job);
    }
    return job.jobId;
  };

  // Load jobs from Firebase
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true)
        const jobsData = await getJobs()
        console.log('Raw jobs data from Firestore:', JSON.stringify(jobsData, null, 2));
        
        // Only show open jobs
        const openJobs = jobsData.filter(job => job.status === 'open')
        console.log('Open jobs:', openJobs);
        
        // Log the first job's ID and all its properties
        if (openJobs.length > 0) {
          const firstJob = openJobs[0];
          console.log('First job ID:', firstJob.id, 'Type:', typeof firstJob.id);
          console.log('First job data:', JSON.stringify(firstJob, null, 2));
          
          // Check if the job has a document ID field
          const jobKeys = Object.keys(firstJob);
          console.log('Job object keys:', jobKeys);
          
          // Check for common ID field names
          const possibleIdFields = ['id', 'documentId', '_id', 'jobId'];
          possibleIdFields.forEach(field => {
            if (field in firstJob) {
              console.log(`Found ID field '${field}':`, firstJob[field as keyof typeof firstJob]);
            }
          });
        }
        
        setJobs(openJobs.slice(0, 6)) // Show only first 6 jobs on homepage
      } catch (error) {
        console.error('Failed to load jobs:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadJobs()
  }, [])

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <section id="job-listings" className="py-12 bg-white">
      <div className="container">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Apply Your Best Job Today</h2>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-md shadow-sm border border-gray-100 p-6 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No job listings available at the moment.</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 transition-all duration-200 hover:border-blue-300 hover:shadow-sm">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                          {job.logo ? (
                            <img
                              src={job.logo}
                              alt={job.title}
                              className="w-full h-full rounded-md object-cover"
                            />
                          ) : (
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-gray-600 text-sm">{job.companyName || 'Company Name'}</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Experience: {job.experienceLevel || 'N/A'} yrs
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.type && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
                        {job.type}
                      </span>
                    )}
                    {job.location && (
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {job.location}
                      </span>
                    )}
                    {job.role && (
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded">
                        {job.role.charAt(0).toUpperCase() + job.role.slice(1)}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      ⏰ Deadline: {job.applicationDeadline || 'N/A'}
                    </span>
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleFavorite(job.jobId)}
                        className="mr-4 text-gray-400 hover:text-red-500 transition-colors duration-200"
                        aria-label="Add to favorites"
                      >
                        <Heart
                          size={18}
                          fill={favorites.includes(job.jobId) ? "currentColor" : "none"}
                          className={favorites.includes(job.jobId) ? 'text-red-500' : ''}
                        />
                      </button>
                      <Link 
                        href={`/jobs/${job.jobId}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200"
                        onClick={async (e) => {
                          console.log('Apply Now clicked - Job data:', job);
                          if (!job.jobId) {
                            console.error('No valid job ID found');
                            e.preventDefault();
                            return;
                          }
                          
                          try {
                            console.log('Fetching job with ID:', job.jobId);
                            const fullJob = await getJobById(job.jobId);
                            console.log('Full job details from Firestore:', fullJob);
                            
                            if (!fullJob) {
                              console.error('Job not found, preventing navigation');
                              e.preventDefault();
                            }
                          } catch (error) {
                            console.error('Error fetching job details:', error);
                            e.preventDefault();
                          }
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>

                {job.isSponsored && (
                  <div className="bg-gray-50 py-2 px-6 -mx-6 -mb-6 text-right text-xs text-gray-500 rounded-b-lg">
                    Sponsored By {job.sponsoredBy || 'Our Partner'}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
