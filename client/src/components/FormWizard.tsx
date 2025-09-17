import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, CheckCircle2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Multi-step form schemas
const step1Schema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

const step2Schema = z.object({
  priority: z.enum(["low", "medium", "high"]),
  assignee: z.string().min(1, "Please select an assignee"),
  department: z.string().min(1, "Please select a department"),
});

const step3Schema = z.object({
  budget: z.string().min(1, "Budget is required"),
  timeline: z.string().min(1, "Timeline is required"),
  resources: z.string().optional(),
});

const completeSchema = step1Schema.merge(step2Schema).merge(step3Schema);

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;
type CompleteFormData = z.infer<typeof completeSchema>;

const steps = [
  { id: 1, title: "Basic Information", description: "Project details and description" },
  { id: 2, title: "Assignment", description: "Priority and team assignment" },
  { id: 3, title: "Resources", description: "Budget and resource allocation" },
  { id: 4, title: "Review", description: "Review and submit" },
];

const categories = [
  { value: "project", label: "Project Management" },
  { value: "finance", label: "Financial Records" },
  { value: "hr", label: "Human Resources" },
  { value: "inventory", label: "Inventory Management" },
];

const assignees = [
  { value: "john", label: "John Doe" },
  { value: "jane", label: "Jane Smith" },
  { value: "mike", label: "Mike Johnson" },
  { value: "sarah", label: "Sarah Wilson" },
];

const departments = [
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "hr", label: "Human Resources" },
];

interface FormWizardProps {
  onComplete?: (data: CompleteFormData) => void;
  initialData?: Partial<CompleteFormData>;
}

export function FormWizard({ onComplete, initialData }: FormWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CompleteFormData>({
    resolver: zodResolver(completeSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      priority: "medium",
      assignee: "",
      department: "",
      budget: "",
      timeline: "",
      resources: "",
      ...initialData,
    },
  });

  const progress = (currentStep / steps.length) * 100;

  const validateCurrentStep = async () => {
    let isValid = true;
    
    switch (currentStep) {
      case 1:
        isValid = await form.trigger(["title", "category", "description"]);
        break;
      case 2:
        isValid = await form.trigger(["priority", "assignee", "department"]);
        break;
      case 3:
        isValid = await form.trigger(["budget", "timeline"]);
        break;
      default:
        isValid = true;
    }
    
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      
      // Auto-save draft when moving to next step
      console.log('Auto-saving draft at step', currentStep);
      toast({
        title: "Draft Saved",
        description: "Your progress has been automatically saved.",
        duration: 2000,
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (data: CompleteFormData) => {
    setIsLoading(true);
    
    try {
      // Mock submission delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', data);
      
      if (onComplete) {
        onComplete(data);
      }
      
      toast({
        title: "Success!",
        description: "Your form has been submitted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter project title"
                      data-testid="input-title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-category">
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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Provide detailed project description..."
                      className="min-h-[120px]"
                      data-testid="textarea-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
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
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-assignee">
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {assignees.map((assignee) => (
                        <SelectItem key={assignee.value} value={assignee.value}>
                          {assignee.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="$50,000"
                      data-testid="input-budget"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timeline *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="3 months"
                      data-testid="input-timeline"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resources"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Resources</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="List any additional resources needed..."
                      className="min-h-[100px]"
                      data-testid="textarea-resources"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 4:
        const formData = form.getValues();
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Review Your Submission</h3>
              <p className="text-muted-foreground">Please review all details before submitting</p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>Title:</strong> {formData.title}</div>
                  <div><strong>Category:</strong> {formData.category}</div>
                  <div><strong>Description:</strong> {formData.description}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Assignment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <strong>Priority:</strong> 
                    <Badge className={
                      formData.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                      formData.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    }>
                      {formData.priority}
                    </Badge>
                  </div>
                  <div><strong>Assignee:</strong> {formData.assignee}</div>
                  <div><strong>Department:</strong> {formData.department}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resource Allocation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><strong>Budget:</strong> {formData.budget}</div>
                  <div><strong>Timeline:</strong> {formData.timeline}</div>
                  {formData.resources && (
                    <div><strong>Additional Resources:</strong> {formData.resources}</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary" />
          <div>
            <CardTitle>Multi-Step Form Wizard</CardTitle>
            <CardDescription>
              Complete all steps to create a comprehensive project entry
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Step {currentStep} of {steps.length}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 mb-6" />
          
          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  step.id <= currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  step.id < currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : step.id === currentStep 
                      ? 'bg-primary/20 text-primary border-2 border-primary' 
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {step.id < currentStep ? '✓' : step.id}
                </div>
                <div className="mt-2 text-xs text-center max-w-20">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-muted-foreground">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                data-testid="button-previous"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < steps.length ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  data-testid="button-next"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={form.handleSubmit(handleSubmit)}
                  disabled={isLoading}
                  data-testid="button-submit-wizard"
                >
                  {isLoading ? "Submitting..." : "Submit Form"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}