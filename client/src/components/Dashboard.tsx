import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Activity,
  Database
} from "lucide-react";

// Mock data for dashboard
const stats = [
  {
    title: "Total Entries",
    value: "2,847",
    change: "+12.5%",
    trend: "up" as const,
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Pending Review",
    value: "126",
    change: "-8.2%",
    trend: "down" as const,
    icon: Clock,
    color: "text-yellow-600",
  },
  {
    title: "Approved Today",
    value: "48",
    change: "+23.1%",
    trend: "up" as const,
    icon: CheckCircle2,
    color: "text-green-600",
  },
  {
    title: "Active Users",
    value: "124",
    change: "+5.4%", 
    trend: "up" as const,
    icon: Users,
    color: "text-purple-600",
  },
];

const recentActivity = [
  {
    id: 1,
    action: "New entry submitted",
    user: "John Doe",
    title: "Q4 Sales Report",
    time: "2 minutes ago",
    status: "pending",
  },
  {
    id: 2,
    action: "Entry approved",
    user: "Admin",
    title: "Customer Survey Analysis",
    time: "15 minutes ago",
    status: "approved",
  },
  {
    id: 3,
    action: "Entry edited",
    user: "Jane Smith",
    title: "HR Policy Update",
    time: "1 hour ago",
    status: "draft",
  },
  {
    id: 4,
    action: "Bulk approval",
    user: "Admin",
    title: "5 entries processed",
    time: "2 hours ago",
    status: "approved",
  },
];

const categoryData = [
  { name: "Project Management", count: 45, percentage: 65 },
  { name: "Financial Records", count: 32, percentage: 48 },
  { name: "Human Resources", count: 28, percentage: 38 },
  { name: "Customer Relations", count: 21, percentage: 30 },
  { name: "Inventory", count: 18, percentage: 25 },
];

interface DashboardProps {
  onCreateEntry?: () => void;
  onViewAllEntries?: () => void;
}

export function Dashboard({ onCreateEntry, onViewAllEntries }: DashboardProps) {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your data entries.
          </p>
        </div>
        <Button onClick={onCreateEntry} data-testid="button-create-entry">
          <Plus className="w-4 h-4 mr-2" />
          New Entry
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="activity" data-testid="tab-activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="analytics" data-testid="tab-analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={onCreateEntry}
                  data-testid="button-quick-new-entry"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Create New Entry
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={onViewAllEntries}
                  data-testid="button-quick-view-all"
                >
                  <Database className="w-4 h-4 mr-2" />
                  View All Entries
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => console.log('Export data clicked')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export Reports
                </Button>
              </CardContent>
            </Card>

            {/* Categories Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Entry Categories</CardTitle>
                <CardDescription>
                  Distribution by category this month
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryData.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{category.name}</span>
                      <span className="text-muted-foreground">{category.count}</span>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest actions and updates from your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg border">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.status === 'approved' ? 'bg-green-500' :
                      activity.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <Badge variant={
                          activity.status === 'approved' ? 'default' :
                          activity.status === 'pending' ? 'secondary' : 'outline'
                        }>
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">{activity.user}</span> • {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>
                  Key performance indicators for this month
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Processing Time</span>
                    <span className="font-medium">2.3 hours</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Approval Rate</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>User Satisfaction</span>
                    <span className="font-medium">4.8/5.0</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  System Health
                </CardTitle>
                <CardDescription>
                  Current system status and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium">Database</span>
                  </div>
                  <Badge variant="outline" className="text-green-700 border-green-300">
                    Operational
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium">API Services</span>
                  </div>
                  <Badge variant="outline" className="text-green-700 border-green-300">
                    Operational
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-sm font-medium">Storage</span>
                  </div>
                  <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                    High Usage
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}