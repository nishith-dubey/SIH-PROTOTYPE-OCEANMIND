import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Files,
  Search,
  GitBranch,
  Play,
  Settings,
  ChevronRight,
  ChevronDown,
  File,
  Folder
} from "lucide-react"

interface FileTreeItem {
  name: string
  type: 'file' | 'folder'
  children?: FileTreeItem[]
}

const sidebarIcons = [
  { icon: Files, label: "Explorer", panel: "explorer" },
  { icon: Search, label: "Search", panel: "search" },
  { icon: GitBranch, label: "Source Control", panel: "git" },
  { icon: Play, label: "Run", panel: "run" },
  { icon: Settings, label: "Settings", panel: "settings" }
]

const demoFiles: FileTreeItem[] = [
  {
    name: "src",
    type: "folder",
    children: [
      { name: "components", type: "folder" },
      { name: "App.tsx", type: "file" },
      { name: "main.tsx", type: "file" }
    ]
  },
  {
    name: "public",
    type: "folder",
    children: [
      { name: "index.html", type: "file" }
    ]
  }
]

export function IDESidebar() {
  const [activePanel, setActivePanel] = useState("explorer")
  const [expandedFolders, setExpandedFolders] = useState<string[]>([])

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    )
  }

  const renderFileTree = (items: FileTreeItem[], path = "") => {
    return items.map(item => {
      const fullPath = `${path}/${item.name}`
      const isExpanded = expandedFolders.includes(fullPath)

      return (
        <div key={fullPath} className="pl-4">
          <button
            onClick={() => item.type === 'folder' && toggleFolder(fullPath)}
            className={cn(
              "flex items-center gap-2 py-1 px-2 w-full text-left",
              "hover:bg-white/5 rounded-sm",
              "text-sm text-white/70 hover:text-white"
            )}
          >
            {item.type === 'folder' ? (
              <>
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <Folder className="h-4 w-4" />
              </>
            ) : (
              <File className="h-4 w-4 ml-4" />
            )}
            {item.name}
          </button>
          {item.type === 'folder' && isExpanded && item.children && (
            <div className="ml-2">
              {renderFileTree(item.children, fullPath)}
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <div className="flex h-screen">
      {/* Icon Sidebar */}
      <div className="w-12 bg-charcoal/40 border-r border-white/10">
        {sidebarIcons.map(({ icon: Icon, label, panel }) => (
          <button
            key={panel}
            onClick={() => setActivePanel(panel)}
            className={cn(
              "w-full p-3 hover:bg-white/5",
              "flex items-center justify-center",
              activePanel === panel && "bg-white/10 border-l-2 border-secondary"
            )}
            title={label}
          >
            <Icon className="h-5 w-5" />
          </button>
        ))}
      </div>

      {/* Panel Area */}
      <div className={cn(
        "w-64 bg-charcoal/30 backdrop-blur-xl",
        "border-r border-white/10"
      )}>
        {activePanel === "explorer" && (
          <div className="p-2">
            <h2 className="text-xs uppercase text-white/50 font-semibold px-4 py-2">
              Explorer
            </h2>
            {renderFileTree(demoFiles)}
          </div>
        )}
        {/* Add other panels here */}
      </div>
    </div>
  )
}