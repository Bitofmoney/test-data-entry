import { FormWizard } from "@/components/FormWizard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function FormWizardPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleComplete = (data: any) => {
    console.log('Wizard completed with data:', data);
    toast({
      title: "Success!",
      description: "Multi-step form has been completed successfully.",
    });
    
    // Redirect to records page after completion
    setTimeout(() => {
      setLocation("/records");
    }, 2000);
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
        
        <div>
          <h1 className="text-2xl font-bold">Multi-Step Form Wizard</h1>
          <p className="text-muted-foreground">
            Create a comprehensive project entry using our step-by-step wizard.
          </p>
        </div>
      </div>

      <FormWizard
        onComplete={handleComplete}
        initialData={{
          priority: "medium",
        }}
      />
    </div>
  );
}