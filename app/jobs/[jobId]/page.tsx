import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { MapPin, DollarSign, Calendar, CheckCircle, ArrowLeft, Briefcase, Users, Zap, Target } from "lucide-react"
import Footer from "@/components/footer"
import { getJobById, getJobs, FirestoreJob } from "@/lib/services/jobsService"

// Define a type for the job data we expect from Firestore
type JobDetails = FirestoreJob & {
  jobType?: string;
  isSponsored?: boolean;
  salaryRange?: string | { min: number; max: number; currency: string; period: string; isEstimate: boolean };
  requirements?: {
    education?: Array<{ degree: string; fieldOfStudy: string }>;
    experience?: {
      years: number;
      skills: string[];
      industryExperience: string[];
    };
    skills?: string[];
    languages?: Array<{ name: string; proficiency: string }>;
    certifications?: string[];
    technicalSkills?: string[];
    softSkills?: string[];
  };
  benefits?: {
    healthInsurance?: boolean;
    retirementPlans?: boolean;
    paidTimeOff?: boolean;
    flexibleHours?: boolean;
    remoteWorkOptions?: boolean;
    professionalDevelopment?: boolean;
    wellnessPrograms?: boolean;
    familyBenefits?: boolean;
    relocationAssistance?: boolean;
    otherBenefits?: string[];
  };
};

interface JobDetailsPageProps {
  params: { jobId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// Helper function to format date
const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default async function JobDetailsPage({ params, searchParams }: JobDetailsPageProps) {
  console.log('Job ID from URL params:', params.jobId);
  console.log('Search params:', searchParams);
  
  // Ensure jobId is a string and handle potential undefined
  const jobId = params.jobId ? String(params.jobId) : '';
  
  if (!jobId) {
    console.error('No job ID provided in URL');
    notFound();
  }
  
  // Get the job by ID from Firestore
  console.log('Attempting to fetch job with ID:', jobId, 'Type:', typeof jobId);
  let job = await getJobById(jobId);
  
  // If job not found, try with numeric ID if the provided ID is numeric
  if (!job && !isNaN(Number(jobId))) {
    console.log('Trying with numeric ID...');
    job = await getJobById(Number(jobId).toString());
  }
  
  console.log('Fetched job:', job);
  
  if (!job) {
    console.error(`Job with ID ${jobId} not found`);
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Job Not Found</h1>
            <p className="text-gray-600 mb-8">
              We couldn't find the job you're looking for. It may have been removed or the link might be incorrect.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/jobs"
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Browse All Jobs
              </Link>
              <Link 
                href="/"
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                Return Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Log the job ID for verification
  console.log('Job ID from document:', job.jobId);

  // Get similar jobs (same category, excluding current job)
  const allJobs = await getJobs()
  const similarJobs = allJobs
    .filter((j) => j.id !== job.id && j.category === job.category)
    .slice(0, 3);

  // Format requirements
  const requirements = [
    ...(job.requirements?.education?.map(edu => `${edu.degree} in ${edu.fieldOfStudy}`) || []),
    ...(job.requirements?.experience?.skills || []),
    ...(job.requirements?.languages?.map(lang => `${lang.name} (${lang.proficiency})`) || []),
    ...(job.requirements?.certifications || []),
    ...(job.requirements?.technicalSkills || []),
    ...(job.requirements?.softSkills || [])
  ];

  // Format benefits
  const benefits = [
    ...(job.benefits?.healthInsurance ? ['Health Insurance'] : []),
    ...(job.benefits?.retirementPlans ? ['Retirement Plans'] : []),
    ...(job.benefits?.paidTimeOff ? ['Paid Time Off'] : []),
    ...(job.benefits?.flexibleHours ? ['Flexible Hours'] : []),
    ...(job.benefits?.remoteWorkOptions ? ['Remote Work Options'] : []),
    ...(job.benefits?.professionalDevelopment ? ['Professional Development'] : []),
    ...(job.benefits?.wellnessPrograms ? ['Wellness Programs'] : []),
    ...(job.benefits?.familyBenefits ? ['Family Benefits'] : []),
    ...(job.benefits?.relocationAssistance ? ['Relocation Assistance'] : []),
    ...(job.benefits?.otherBenefits || [])
  ];

  // Format salary range
  const formatSalary = () => {
    if (!job.salaryRange) return 'Competitive';
    if (typeof job.salaryRange === 'string') return job.salaryRange;
    return `${job.salaryRange.currency}${job.salaryRange.min} - ${job.salaryRange.max} per ${job.salaryRange.period}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <div className="w-full px-4 py-6 md:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <Link
              href="/#job-listings"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors font-medium text-sm"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Jobs
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                {/* Job Header */}
                <div className="bg-white rounded-md shadow-sm p-6 border-l-4 border-blue-600">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                    <div className="relative w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-md flex-shrink-0 overflow-hidden shadow-sm">
                      <Image
                        src={job.logo || "/placeholder.svg"}
                        alt={job.title}
                        width={96}
                        height={96}
                        className="object-contain p-3"
                      />
                    </div>

                    <div className="flex-grow">
                      <h1 className="text-3xl font-bold mb-1 text-gray-900">{job.title}</h1>
                      <p className="text-gray-600 text-base mb-4">{job.companyName}</p>

                      <div className="flex flex-wrap gap-3 text-sm">
                        {job.location && (
                          <div className="flex items-center text-gray-700 bg-gray-50 px-3 py-1.5 rounded-md">
                            <MapPin size={16} className="mr-1.5 text-blue-600 flex-shrink-0" />
                            <span className="font-medium">{job.location}</span>
                          </div>
                        )}

                        {job.employmentType && (
                          <div className="flex items-center text-gray-700 bg-gray-50 px-3 py-1.5 rounded-md">
                            <Briefcase size={16} className="mr-1.5 text-blue-600 flex-shrink-0" />
                            <span className="font-medium">{job.employmentType}</span>
                          </div>
                        )}

                        <div className="flex items-center text-green-700 bg-green-50 px-3 py-1.5 rounded-md font-semibold">
                          <DollarSign size={16} className="mr-1.5 flex-shrink-0" />
                          <span>{formatSalary()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {job.isSponsored && (
                    <div className="bg-blue-50 border-l-4 border-blue-600 rounded-md p-3 text-sm text-blue-900 font-medium">
                      ⭐ Sponsored Job
                    </div>
                  )}
                </div>

                {/* Important Info - Deadline */}
                {job.applicationDeadline && (
                  <div className="bg-white rounded-md shadow-sm p-6 border-l-4 border-red-600">
                    <div className="flex items-center mb-2">
                      <Calendar size={24} className="text-red-600 mr-2 flex-shrink-0" />
                      <h2 className="text-xl font-bold text-gray-900">Application Deadline</h2>
                    </div>
                    <p className="text-lg text-gray-700 font-semibold ml-8">
                      {formatDate(job.applicationDeadline)}
                    </p>
                  </div>
                )}

                {/* Job Description */}
                <div className="bg-white rounded-md shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">Job Description</h2>
                  <div className="prose max-w-none text-gray-700">
                    <p>{job.description}</p>
                    {job.detailedDescription && (
                      <div dangerouslySetInnerHTML={{ __html: job.detailedDescription }} />
                    )}
                  </div>
                </div>

                {/* Requirements & Responsibilities */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Requirements */}
                  <div className="bg-white rounded-md shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Requirements</h3>
                    <ul className="space-y-2">
                      {requirements.length > 0 ? (
                        requirements.map((req, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))
                      ) : (
                        <p className="text-gray-500">No specific requirements listed.</p>
                      )}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="bg-white rounded-md shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Benefits</h3>
                    <ul className="space-y-2">
                      {benefits.length > 0 ? (
                        benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))
                      ) : (
                        <p className="text-gray-500">No benefits listed.</p>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Application Process */}
                <div className="bg-white rounded-md shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">How to Apply</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      To apply for this position, please click the "Apply Now" button below. 
                      You'll be redirected to our application form where you can submit your 
                      resume and cover letter.
                    </p>
                    <div className="pt-4">
                      <a
                        href={job.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Company Info */}
                <div className="bg-white rounded-md shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Company</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                      <Image
                        src={job.logo || "/placeholder.svg"}
                        alt={job.companyName || 'Company'}
                        width={64}
                        height={64}
                        className="object-contain p-2"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{job.companyName || 'Company Name'}</h4>
                      {job.companyWebsite && (
                        <a 
                          href={job.companyWebsite} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm hover:underline"
                        >
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                  {job.companyDescription && (
                    <p className="text-gray-600 text-sm mt-2">
                      {job.companyDescription}
                    </p>
                  )}
                </div>

                {/* Job Overview */}
                <div className="bg-white rounded-md shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Job Overview</h3>
                  <ul className="space-y-3">
                    {job.employmentType && (
                      <li className="flex items-start">
                        <Briefcase className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-gray-500 text-sm">Job Type</span>
                          <p className="font-medium">{job.employmentType}</p>
                        </div>
                      </li>
                    )}
                    {job.experienceLevel && (
                      <li className="flex items-start">
                        <Users className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-gray-500 text-sm">Experience</span>
                          <p className="font-medium">
                            {job.requirements?.experience?.years || 'N/A'} years
                          </p>
                        </div>
                      </li>
                    )}
                    {job.location && (
                      <li className="flex items-start">
                        <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-gray-500 text-sm">Location</span>
                          <p className="font-medium">{job.location}</p>
                        </div>
                      </li>
                    )}
                    <li className="flex items-start">
                      <DollarSign className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-gray-500 text-sm">Salary</span>
                        <p className="font-medium">{formatSalary()}</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Share Job */}
                <div className="bg-white rounded-md shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Share This Job</h3>
                  <div className="flex space-x-3">
                    <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-blue-100 text-blue-400 hover:bg-blue-200 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.05 4.91a9.816 9.816 0 00-7.01-2.86c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l4.34-1.14c1.42.75 3.04 1.16 4.66 1.16 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.28c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 012.42 5.83c.02 4.54-3.68 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.42c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.42 1.41.54.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.1-.23-.16-.48-.27z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.5 2h-15A2.5 2.5 0 002 4.5v15A2.5 2.5 0 004.5 22h15a2.5 2.5 0 002.5-2.5v-15A2.5 2.5 0 0019.5 2zM8.5 18.5h-3v-9h3v9zM7 7.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.33 9 8.5 9 7 8.33 7 7.5zm11.5 11h-3v-4.75c0-1.24-1.01-2.25-2.25-2.25s-2.25 1.01-2.25 2.25v4.75h-3v-9h2.9v1.25c.5-.72 1.36-1.2 2.35-1.2 1.52 0 2.75 1.23 2.75 2.75v6.2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Jobs */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Jobs</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    id: '000002',
                    title: 'Senior Software Engineer',
                    companyName: 'Tech Solutions Inc.',
                    description: 'We are looking for an experienced software engineer to join our team and help build amazing products.',
                    location: 'Nairobi, Kenya',
                    employmentType: 'Full-time',
                    salary: 'KSh 250,000 - 350,000',
                    postedDate: '2025-10-28',
                    logo: '/placeholder.svg'
                  },
                  {
                    id: '000003',
                    title: 'DevOps Engineer',
                    companyName: 'Cloud Systems Ltd',
                    description: 'Join our DevOps team to help build and maintain our cloud infrastructure and CI/CD pipelines.',
                    location: 'Remote',
                    employmentType: 'Full-time',
                    salary: 'KSh 200,000 - 300,000',
                    postedDate: '2025-10-30',
                    logo: '/placeholder.svg'
                  },
                  {
                    id: '000004',
                    title: 'Frontend Developer (React)',
                    companyName: 'Digital Creations',
                    description: 'Looking for a skilled React developer to build beautiful and responsive user interfaces.',
                    location: 'Mombasa, Kenya',
                    employmentType: 'Contract',
                    salary: 'KSh 180,000 - 250,000',
                    postedDate: '2025-10-29',
                    logo: '/placeholder.svg'
                  }
                ].map((job) => (
                  <div key={job.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                        <Image
                          src={job.logo}
                          alt={job.title}
                          width={48}
                          height={48}
                          className="object-contain p-1.5"
                        />
                      </div>
                      <button className="text-gray-400 hover:text-red-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">
                      <Link href={`/jobs/${job.id}`} className="hover:text-blue-600">
                        {job.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{job.companyName}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mr-2 flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-3 h-3 mr-2 flex-shrink-0" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-3 h-3 mr-2 flex-shrink-0" />
                        <span>Posted {job.postedDate}</span>
                      </div>
                    </div>
                    <Link 
                      href={`/jobs/${job.id}`}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
