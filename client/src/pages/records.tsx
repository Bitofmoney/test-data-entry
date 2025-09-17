import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Records() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleEdit = (item: any) => {
    console.log('Edit clicked for:', item);
    toast({
      title: "Edit Mode",
      description: `Opening editor for "${item.title}"`,
    });
    // In a real app, this would navigate to edit form with pre-filled data
    setLocation("/entry");
  };

  const handleView = (item: any) => {
    console.log('View clicked for:', item);
    toast({
      title: "View Details", 
      description: `Viewing details for "${item.title}"`,
    });
  };

  const handleDelete = (item: any) => {
    console.log('Delete clicked for:', item);
    toast({
      title: "Delete Confirmed",
      description: `"${item.title}" has been deleted.`,
      variant: "destructive",
    });
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            data-testid="button-back-to-dashboard"
            className="text-sm sm:text-base self-start"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Data Records</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage and review all your data entries
            </p>
          </div>
        </div>

        <Button
          onClick={() => setLocation("/entry")}
          data-testid="button-new-entry"
          className="w-full sm:w-auto text-sm sm:text-base"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          New Entry
        </Button>
      </div>

      <DataTable
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />
    </div>
  );
}