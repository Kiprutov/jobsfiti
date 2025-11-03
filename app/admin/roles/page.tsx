"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Shield, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

export default function RolesPage() {
  const [roles] = useState<Role[]>([
    {
      id: "1",
      name: "Admin",
      description: "Full system access with all permissions",
      permissions: [
        "manage_jobs",
        "manage_users",
        "manage_roles",
        "view_analytics",
        "manage_settings",
      ],
      userCount: 2,
    },
    {
      id: "2",
      name: "Editor",
      description: "Can create and edit job postings",
      permissions: ["manage_jobs", "view_analytics"],
      userCount: 5,
    },
    {
      id: "3",
      name: "User",
      description: "Standard user with basic access",
      permissions: ["view_jobs"],
      userCount: 150,
    },
  ])

  const permissionLabels: Record<string, string> = {
    manage_jobs: "Manage Jobs",
    manage_users: "Manage Users",
    manage_roles: "Manage Roles",
    view_analytics: "View Analytics",
    manage_settings: "Manage Settings",
    view_jobs: "View Jobs",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Role Management</h1>
          <p className="text-gray-600 mt-1">Manage user roles and permissions</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{role.userCount} users</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardDescription className="mt-2">{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Permissions</h4>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <Badge key={permission} variant="secondary" className="text-xs">
                        {permissionLabels[permission] || permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

