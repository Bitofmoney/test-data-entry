import { Dashboard } from "@/components/Dashboard";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="p-6">
      <Dashboard
        onCreateEntry={() => setLocation("/entry")}
        onViewAllEntries={() => setLocation("/records")}
      />
    </div>
  );
}