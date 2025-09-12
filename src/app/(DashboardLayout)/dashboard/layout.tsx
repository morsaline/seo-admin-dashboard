import { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AppHeader from "@/components/app-header"

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex overflow-hidden">
      <SidebarProvider>
        {/* Sidebar stays fixed */}
        <AppSidebar />

        {/* Main content with scroll */}
        <SidebarInset className="flex flex-col flex-1">
          <AppHeader />

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-4 p-4 pt-0">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default DashboardLayout
