import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BarChart3, TrendingUp, Download, Activity } from "lucide-react";
import { useLocation } from "wouter";

export default function Analytics() {
  const [, setLocation] = useLocation();

  // Mock analytics data
  const metrics = [
    { name: "Total Submissions", value: "2,847", change: "+12.5%", trend: "up" },
    { name: "Approval Rate", value: "94.2%", change: "+3.1%", trend: "up" },
    { name: "Average Processing Time", value: "2.3 hrs", change: "-15.2%", trend: "down" },
    { name: "Active Users", value: "124", change: "+8.7%", trend: "up" },
  ];

  const categoryPerformance = [
    { category: "Project Management", submissions: 456, approvalRate: 96, avgTime: "1.8 hrs" },
    { category: "Financial Records", submissions: 342, approvalRate: 94, avgTime: "2.1 hrs" },
    { category: "Human Resources", submissions: 289, approvalRate: 92, avgTime: "2.8 hrs" },
    { category: "Customer Relations", submissions: 234, approvalRate: 95, avgTime: "2.0 hrs" },
    { category: "Inventory Management", submissions: 156, approvalRate: 91, avgTime: "3.2 hrs" },
  ];

  const recentTrends = [
    { period: "This Week", submissions: 127, approved: 118, pending: 9 },
    { period: "Last Week", submissions: 134, approved: 125, pending: 9 },
    { period: "2 Weeks Ago", submissions: 142, approved: 131, pending: 11 },
    { period: "3 Weeks Ago", submissions: 156, approved: 144, pending: 12 },
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-4 text-sm sm:text-base"
          data-testid="button-back-to-dashboard"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
              Analytics & Reports
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Comprehensive insights into your data entry system performance
            </p>
          </div>
          
          <Button variant="outline" data-testid="button-export-report" className="w-full sm:w-auto text-sm sm:text-base">
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center gap-1">
                  <TrendingUp className={`h-3 w-3 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                  <p className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change} from last month
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}\n        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>
                Submissions and approval rates by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryPerformance.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">{category.category}</div>
                      <Badge variant="secondary">{category.submissions} entries</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Approval Rate: {category.approvalRate}%</span>
                      <span>Avg Time: {category.avgTime}</span>
                    </div>
                    <Progress value={category.approvalRate} className="h-2" />
                  </div>
                ))}\n              </div>
            </CardContent>
          </Card>

          {/* Recent Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Submission Trends</CardTitle>
              <CardDescription>
                Weekly submission and approval patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTrends.map((trend) => (
                  <div key={trend.period} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{trend.period}</div>
                      <div className="text-xs text-muted-foreground">
                        {trend.submissions} total submissions
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-sm">
                        <span className="text-green-600 font-medium">{trend.approved}</span>
                        <span className="text-muted-foreground"> approved</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {trend.pending} pending
                      </div>
                    </div>
                  </div>
                ))}\n              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>
              Key insights and recommendations for improving system efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="font-medium text-sm">Excellent Performance</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Project Management category showing 96% approval rate with fastest processing time.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="font-medium text-sm">Room for Improvement</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Inventory Management processing time could be optimized by 25% with workflow improvements.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="font-medium text-sm">Growth Opportunity</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  User engagement is up 12.5% this month. Consider expanding team capacity.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}