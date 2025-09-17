import { DataEntryForm } from "@/components/DataEntryForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function DataEntry() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    toast({
      title: "Success!",
      description: "Your data entry has been submitted successfully.",
    });
    
    // Redirect to records page after submission
    setTimeout(() => {
      setLocation("/records");
    }, 2000);
  };

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
        
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Create New Entry</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Fill out the form below to create a new data entry for review.
          </p>
        </div>
      </div>

      <DataEntryForm
        onSubmit={handleSubmit}
        initialData={{
          priority: "medium",
          status: "draft",
        }}
      />
    </div>
  );
}