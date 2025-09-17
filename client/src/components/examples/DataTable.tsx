import { DataTable } from '../DataTable';

export default function DataTableExample() {
  return (
    <div className="min-h-screen bg-background p-4">
      <DataTable
        onEdit={(item) => console.log('Edit clicked:', item)}
        onDelete={(item) => console.log('Delete clicked:', item)}
        onView={(item) => console.log('View clicked:', item)}
      />
    </div>
  );
}