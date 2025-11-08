"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FirestoreJob } from "@/lib/services/jobsService"
import { JobInterest, JobInterestStatus } from "@/lib/types/jobInterest"
import { 
  updateJobInterestStatus, 
  deleteJobInterest,
  addCommentToInterest 
} from "@/lib/services/portalService"
import { useAuth } from "@/lib/contexts/AuthContext"
import { AlertCircle, ExternalLink, Trash2, MessageSquare, Clock } from "lucide-react"
import Link from "next/link"
import { differenceInDays, parseISO, isAfter, format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

interface JobInterestCardProps {
  interest: JobInterest
  job: FirestoreJob | null
  onUpdate: () => void
}

export function JobInterestCard({ interest, job, onUpdate }: JobInterestCardProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isAddingComment, setIsAddingComment] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [showCommentForm, setShowCommentForm] = useState(false)
  
  if (!job || !user) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <p className="text-sm text-red-600">
            {!job ? `Job not found (ID: ${interest.jobId})` : "Please sign in to view"}
          </p>
        </CardContent>
      </Card>
    )
  }

  const handleStatusChange = async (newStatus: JobInterestStatus, comment?: string) => {
    if (!user) return
    
    setIsUpdating(true)
    try {
      await updateJobInterestStatus(user.uid, interest.jobId, newStatus, comment)
      toast({
        title: "Status updated",
        description: `Job status changed to ${newStatus}`,
      })
      onUpdate()
    } catch (error: any) {
      console.error("Error updating status:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update status",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleAddComment = async () => {
    if (!user || !commentText.trim()) return
    
    setIsAddingComment(true)
    try {
      await addCommentToInterest(user.uid, interest.jobId, commentText.trim())
      toast({
        title: "Comment added",
        description: "Your note has been saved",
      })
      setCommentText("")
      setShowCommentForm(false)
      onUpdate()
    } catch (error: any) {
      console.error("Error adding comment:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to add comment",
        variant: "destructive",
      })
    } finally {
      setIsAddingComment(false)
    }
  }

  const handleRemove = async () => {
    if (!user) return
    
    if (confirm("Are you sure you want to remove this job from your interests?")) {
      try {
        await deleteJobInterest(user.uid, interest.jobId)
        toast({
          title: "Removed",
          description: "Job has been removed from your interests",
        })
        onUpdate()
      } catch (error: any) {
        console.error("Error removing interest:", error)
        toast({
          title: "Error",
          description: error.message || "Failed to remove",
          variant: "destructive",
        })
      }
    }
  }

  // Check if deadline is approaching (within 3 days)
  const deadline = job.applicationDeadline || interest.deadline
  let daysUntilDeadline: number | null = null
  let isDeadlineApproaching = false

  if (deadline) {
    try {
      const deadlineDate = parseISO(deadline)
      if (isAfter(deadlineDate, new Date())) {
        daysUntilDeadline = differenceInDays(deadlineDate, new Date())
        const isFinalStatus = ["applied", "interviewed", "accepted", "rejected"].includes(interest.status)
        isDeadlineApproaching = daysUntilDeadline <= 3 && !isFinalStatus
      }
    } catch (error) {
      // Invalid date format
    }
  }

  const statusColors: Record<JobInterestStatus, string> = {
    interested: "bg-blue-100 text-blue-800",
    started: "bg-yellow-100 text-yellow-800",
    applied: "bg-green-100 text-green-800",
    interviewed: "bg-purple-100 text-purple-800",
    rejected: "bg-red-100 text-red-800",
    accepted: "bg-emerald-100 text-emerald-800",
  }

  const formatTimestamp = (timestamp: any): string => {
    if (!timestamp) return "Unknown"
    try {
      if (timestamp.toDate) {
        return format(timestamp.toDate(), "MMM d, yyyy 'at' h:mm a")
      }
      if (typeof timestamp === 'string') {
        return format(new Date(timestamp), "MMM d, yyyy 'at' h:mm a")
      }
      return "Unknown"
    } catch {
      return "Unknown"
    }
  }

  return (
    <Card className={`transition-all hover:shadow-md ${isDeadlineApproaching ? "border-orange-300 bg-orange-50/30" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{job.title}</CardTitle>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge className={statusColors[interest.status]}>
                {interest.status.charAt(0).toUpperCase() + interest.status.slice(1)}
              </Badge>
              <span className="text-sm text-gray-600">{job.companyName}</span>
              {job.location && (
                <span className="text-sm text-gray-500">• {job.location}</span>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-600"
            aria-label="Remove interest"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isDeadlineApproaching && daysUntilDeadline !== null && (
          <div className="flex items-center gap-2 p-3 bg-orange-100 border border-orange-300 rounded-md">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <p className="text-sm text-orange-800">
              <strong>Deadline approaching!</strong> Application deadline is in {daysUntilDeadline} day{daysUntilDeadline !== 1 ? "s" : ""}.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Application Status
            </label>
            <Select
              value={interest.status}
              onValueChange={(value) => handleStatusChange(value as JobInterestStatus)}
              disabled={isUpdating}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interested">Interested</SelectItem>
                <SelectItem value="started">Started Application</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interviewed">Interviewed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {deadline && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Deadline:</span> {deadline}
          </div>
        )}

        {/* Comments Section */}
        {interest.notes && interest.notes.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MessageSquare className="h-4 w-4" />
              Notes ({interest.notes.length})
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {interest.notes.map((note) => (
                <div key={note.id} className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
                  <p className="text-gray-800">{note.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(note.timestamp)}
                    {note.status && ` • Status: ${note.status}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Comment */}
        <div className="pt-2 border-t">
          {!showCommentForm ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCommentForm(true)}
              className="w-full"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Add Note/Comment
            </Button>
          ) : (
            <div className="space-y-2">
              <Textarea
                placeholder="Add a note or comment about this application..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                disabled={isAddingComment}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleAddComment}
                  disabled={isAddingComment || !commentText.trim()}
                  className="flex-1"
                >
                  {isAddingComment ? "Adding..." : "Save Note"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowCommentForm(false)
                    setCommentText("")
                  }}
                  disabled={isAddingComment}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Status History */}
        {interest.statusHistory && interest.statusHistory.length > 1 && (
          <div className="pt-2 border-t">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Clock className="h-4 w-4" />
              Status History
            </div>
            <div className="space-y-1 text-xs">
              {interest.statusHistory.slice(-3).reverse().map((entry, idx) => (
                <div key={idx} className="flex items-start gap-2 text-gray-600">
                  <div className="flex-1">
                    <span className="font-medium capitalize">{entry.status}</span>
                    {entry.comment && (
                      <span className="text-gray-500 ml-2">- {entry.comment}</span>
                    )}
                    <div className="text-gray-400 text-xs mt-0.5">
                      {formatTimestamp(entry.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Link href={`/jobs/${job.jobId}`} className="flex-1">
            <Button variant="outline" className="w-full" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Job Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

