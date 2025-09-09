import { IDESidebar } from "./IDESidebar"
import { TabBar } from "./TabBar"
import { Outlet } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface Tab {
  id: string
  title: string
  path: string
  icon?: React.ReactNode
}

export function RootLayout() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "home", title: "Dashboard", path: "/" },
    { id: "explore", title: "Map Explorer", path: "/explore" }
  ])
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="flex min-h-screen bg-primary text-white">
      <IDESidebar />
      
      <div className="flex-1 flex flex-col">
        <TabBar 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onTabClose={(id) => {
            setTabs(tabs.filter(tab => tab.id !== id))
          }}
        />
        
        <main className={cn(
          "flex-1 p-6 overflow-auto",
          "border-t border-white/10"
        )}>
          <Outlet />
        </main>
      </div>
      
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-color-primary)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-secondary/5" />
      </div>
    </div>
  )
}