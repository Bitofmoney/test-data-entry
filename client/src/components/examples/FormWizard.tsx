import { FormWizard } from '../FormWizard';

export default function FormWizardExample() {
  return (
    <div className="min-h-screen bg-background p-4">
      <FormWizard
        onComplete={(data) => console.log('Wizard completed:', data)}
        initialData={{
          title: "Sample Project",
          category: "project",
          priority: "high",
        }}
      />
    </div>
  );
}