
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Shield, Calendar } from "lucide-react";

interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Username</label>
              <p className="text-lg font-medium">{user.username}</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Role</label>
              <div>
                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                  <Shield className="w-3 h-3 mr-1" />
                  {user.role === 'admin' ? 'Administrator' : 'User'}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">User ID</label>
              <p className="text-sm font-mono bg-muted p-2 rounded">{user.id}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <Badge variant="secondary" className="text-green-700 border-green-300">
                Active
              </Badge>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Login Status</label>
              <Badge variant="secondary" className="text-blue-700 border-blue-300">
                Currently Signed In
              </Badge>
            </div>

            {user.role === 'admin' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Permissions</label>
                <div className="space-y-1">
                  <Badge variant="outline" className="mr-2">Admin Panel Access</Badge>
                  <Badge variant="outline" className="mr-2">User Management</Badge>
                  <Badge variant="outline">System Settings</Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
