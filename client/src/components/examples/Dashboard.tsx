import { Dashboard } from '../Dashboard';

export default function DashboardExample() {
  return (
    <div className="min-h-screen bg-background p-6">
      <Dashboard
        onCreateEntry={() => console.log('Create entry clicked')}
        onViewAllEntries={() => console.log('View all entries clicked')}
      />
    </div>
  );
}