import { UserProfile } from "@/components/UserProfile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "Opening user settings panel...",
    });
    console.log('Navigate to settings');
  };

  const handleSignOut = () => {
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    console.log('Sign out user');
    // In a real app, this would clear auth state and redirect to login
    setTimeout(() => {
      setLocation("/login");
    }, 1500);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-4"
          data-testid="button-back-to-dashboard"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <UserProfile
        onSettingsClick={handleSettingsClick}
        onSignOut={handleSignOut}
      />
    </div>
  );
}