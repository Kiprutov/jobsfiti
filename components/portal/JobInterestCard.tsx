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
import { AlertCircle, ExternalLink, Trash2, MessageSquare, Clock, ChevronDown } from "lucide-react"
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
  const [isExpanded, setIsExpanded] = useState(false)

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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
        description: `Job status changed to ${newStatus.replace(/_/g, ' ')}`,
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

    setIsDeleting(true)
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
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
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
    phone_screen: "bg-purple-100 text-purple-800",
    technical_interview: "bg-purple-100 text-purple-800",
    onsite_interview: "bg-purple-100 text-purple-800",
    final_interview: "bg-purple-100 text-purple-800",
    offer_stage: "bg-emerald-50 text-emerald-700 border-emerald-200",
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

  const formatStatusLabel = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  return (
    <>
      <Card className={`transition-all hover:shadow-sm border-slate-200 shadow-sm ${isDeadlineApproaching ? "border-orange-300 bg-orange-50/40" : "bg-white"}`}>
        {/* Compact View - Always Visible */}
        <div
          className="p-4 cursor-pointer flex items-center justify-between gap-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 text-sm truncate">{job.title}</h3>
                <p className="text-sm text-slate-600 truncate">{job.companyName}</p>
                {job.location && (
                  <p className="text-xs text-slate-500 truncate mt-0.5">{job.location}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className={`${statusColors[interest.status]} text-xs whitespace-nowrap`}>
              {formatStatusLabel(interest.status)}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Expanded View - Collapsible */}
        {isExpanded && (
          <div className="px-4 pb-4 pt-2 border-t border-slate-200 space-y-4" onClick={(e) => e.stopPropagation()}>
            {isDeadlineApproaching && daysUntilDeadline !== null && (
              <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                <p className="text-sm text-orange-900">
                  <strong>Deadline approaching!</strong> Application deadline is in {daysUntilDeadline} day{daysUntilDeadline !== 1 ? "s" : ""}.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Application Status
                </label>
                <Select
                  value={interest.status}
                  onValueChange={(value) => handleStatusChange(value as JobInterestStatus)}
                  disabled={isUpdating}
                >
                  <SelectTrigger className="border-slate-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interested">Interested</SelectItem>
                    <SelectItem value="started">Started Application</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <div className="px-2 py-1.5 text-xs font-semibold text-slate-500">Interview Stages</div>
                    <SelectItem value="phone_screen">Phone Screen</SelectItem>
                    <SelectItem value="technical_interview">Technical Interview</SelectItem>
                    <SelectItem value="onsite_interview">On-site Interview</SelectItem>
                    <SelectItem value="final_interview">Final Interview</SelectItem>
                    <SelectItem value="offer_stage">Offer Received</SelectItem>
                    <div className="px-2 py-1.5 text-xs font-semibold text-slate-500">Outcome</div>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Link href={`/jobs/${job.jobId}`} className="w-full">
                  <Button variant="outline" className="w-full" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Job Details
                  </Button>
                </Link>
              </div>
            </div>

            {deadline && (
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm text-slate-600">
                  <span className="font-medium text-slate-700">Deadline:</span> {deadline}
                </div>
                <div className="flex items-center gap-2">
                  {!showCommentForm && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCommentForm(true)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Note / Comment
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-slate-600 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            )}

            {/* Comments Section */}
            {interest.notes && interest.notes.length > 0 && (
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <MessageSquare className="h-4 w-4" />
                  Notes ({interest.notes.length})
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {interest.notes.map((note) => (
                    <div key={note.id} className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
                      <p className="text-gray-800">{note.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTimestamp(note.timestamp)}
                        {note.status && ` • Status: ${formatStatusLabel(note.status)}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Comment Form */}
            {showCommentForm && (
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

            {/* Status History */}
            {interest.statusHistory && interest.statusHistory.length > 1 && (
              <div className="pt-2 border-t">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Clock className="h-4 w-4" />
                  Status History
                </div>
                <div className="space-y-1 text-xs">
                  {interest.statusHistory.slice(-3).reverse().map((entry, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-gray-600">
                      <div className="flex-1">
                        <span className="font-medium capitalize">{formatStatusLabel(entry.status)}</span>
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

          </div>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Remove from Interests?</h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to remove <strong>{job.title}</strong> from your interests? This action cannot be undone and you will lose all notes and status history.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleRemove}
                disabled={isDeleting}
              >
                {isDeleting ? "Removing..." : "Remove Job"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
