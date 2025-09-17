import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '../AppSidebar';

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <div className="h-96">
      <SidebarProvider style={style as React.CSSProperties}>
        <div className="flex h-full w-full">
          <AppSidebar />
          <div className="flex-1 p-4 bg-background">
            <h2 className="text-lg font-medium">Main Content Area</h2>
            <p className="text-muted-foreground">Sidebar navigation example</p>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}