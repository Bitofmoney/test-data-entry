import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Save, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const dataEntrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.date({
    required_error: "Please select a due date",
  }),
  tags: z.string().optional(),
  status: z.enum(["draft", "pending", "approved", "rejected"]),
});

type DataEntryForm = z.infer<typeof dataEntrySchema>;

interface DataEntryFormProps {
  onSubmit?: (data: DataEntryForm) => void;
  initialData?: Partial<DataEntryForm>;
}

// Mock categories for demo
const categories = [
  { value: "project", label: "Project Management" },
  { value: "finance", label: "Financial Records" },
  { value: "hr", label: "Human Resources" },
  { value: "inventory", label: "Inventory Management" },
  { value: "customer", label: "Customer Relations" },
];

export function DataEntryForm({ onSubmit, initialData }: DataEntryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const { toast } = useToast();

  const form = useForm<DataEntryForm>({
    resolver: zodResolver(dataEntrySchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      priority: "medium",
      dueDate: new Date(),
      tags: "",
      status: "draft",
      ...initialData,
    },
  });

  const handleSubmit = async (data: DataEntryForm, asDraft = false) => {
    setIsLoading(true);
    setIsDraft(asDraft);
    
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const submitData = { 
        ...data, 
        status: (asDraft ? "draft" : "pending") as const 
      };
      
      console.log('Form submitted:', submitData);
      
      if (onSubmit) {
        onSubmit(submitData);
      }
      
      toast({
        title: asDraft ? "Draft Saved" : "Form Submitted",
        description: asDraft 
          ? "Your draft has been saved successfully." 
          : "Your data entry has been submitted for review.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsDraft(false);
    }
  };

  const parseTags = (tags: string): string[] => {
    return tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Save className="w-4 h-4 sm:w-5 sm:h-5" />
          Data Entry Form
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Fill out the form below to create a new data entry. All fields marked with * are required.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-6">
        <Form {...form}>
          <form className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">Title *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter a descriptive title"
                        data-testid="input-title"
                        className="text-sm sm:text-base"
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">Category *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-category" className="text-sm sm:text-base">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Provide detailed information about this entry..."
                      className="min-h-[120px]"
                      data-testid="textarea-description"
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum 10 characters required
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-priority">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">
                          <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            Low Priority
                          </span>
                        </SelectItem>
                        <SelectItem value="medium">
                          <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                            Medium Priority
                          </span>
                        </SelectItem>
                        <SelectItem value="high">
                          <span className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            High Priority
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            data-testid="button-due-date"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-status">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="pending">Pending Review</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter tags separated by commas (e.g., urgent, review, project)"
                      data-testid="input-tags"
                    />
                  </FormControl>
                  <FormDescription>
                    Separate multiple tags with commas
                  </FormDescription>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {parseTags(field.value || "").map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button
                type="button"
                onClick={() => handleSubmit(form.getValues(), true)}
                variant="outline"
                disabled={isLoading}
                data-testid="button-save-draft"
                className="w-full sm:w-auto text-sm sm:text-base"
              >
                {isDraft && isLoading ? "Saving..." : "Save as Draft"}
              </Button>
              
              <Button
                type="submit"
                onClick={form.handleSubmit((data) => handleSubmit(data, false))}
                disabled={isLoading}
                data-testid="button-submit"
                className="w-full sm:w-auto text-sm sm:text-base"
              >
                {!isDraft && isLoading ? "Submitting..." : "Submit for Review"}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isLoading}
                data-testid="button-reset"
                className="w-full sm:w-auto text-sm sm:text-base"
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Reset Form
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}