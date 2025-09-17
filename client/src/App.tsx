
import { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

// Pages
import Home from "@/pages/home";
import Login from "@/pages/login";
import DataEntry from "@/pages/data-entry";
import Records from "@/pages/records";
import Analytics from "@/pages/analytics";
import Profile from "@/pages/profile";
import Admin from "@/pages/admin";
import FormWizard from "@/pages/form-wizard";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setLocation('/');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setLocation('/login');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If not logged in, show login page
  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background">
          <Login onLogin={handleLogin} />
          <Toaster />
        </div>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar user={user} onLogout={handleLogout} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.username} ({user.role})
              </span>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/data-entry" component={DataEntry} />
              <Route path="/records" component={Records} />
              <Route path="/analytics" component={Analytics} />
              <Route path="/profile" component={() => <Profile user={user} />} />
              <Route path="/form-wizard" component={FormWizard} />
              {user.role === 'admin' && <Route path="/admin" component={Admin} />}
              <Route component={NotFound} />
            </Switch>
          </main>
        </SidebarInset>
        <Toaster />
      </SidebarProvider>
    </QueryClientProvider>
  );
}

export default App;
