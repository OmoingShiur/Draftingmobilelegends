import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface RoleFilterProps {
  isActive?: boolean
  onClick?: () => void
  children: React.ReactNode
}

function RoleFilter({ isActive, onClick, children }: RoleFilterProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        "relative w-8 h-8 rounded-full bg-gray-800 border border-gray-700 p-1.5",
        "hover:bg-gray-700 hover:border-gray-600",
        "transition-all duration-200",
        isActive && "border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]",
      )}
    >
      {children}
    </Button>
  )
}

export function SearchBar() {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input type="search" placeholder="Search champions..." className="w-full pl-10 bg-gray-900 border-gray-700" />
      </div>
      <div className="flex items-center gap-2">
        {["T", "F", "A", "M", "S"].map((role) => (
          <RoleFilter key={role}>
            <span className="text-white">{role}</span>
          </RoleFilter>
        ))}
      </div>
    </div>
  )
}

