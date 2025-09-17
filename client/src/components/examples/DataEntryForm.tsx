import { DataEntryForm } from '../DataEntryForm';

export default function DataEntryFormExample() {
  return (
    <div className="min-h-screen bg-background p-4">
      <DataEntryForm
        onSubmit={(data) => console.log('Data entry submitted:', data)}
        initialData={{
          title: "Sample Project Entry",
          category: "project",
          priority: "medium",
        }}
      />
    </div>
  );
}