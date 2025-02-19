"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { champions, championClasses } from "@/data/champions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface ChampionGridProps {
  onChampionSelect: (championId: string) => void
}

export function ChampionGrid({ onChampionSelect }: ChampionGridProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredChampions = useMemo(() => {
    return champions.filter(
      (champion) =>
        (selectedClass ? champion.class.includes(selectedClass) : true) &&
        champion.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [selectedClass, searchTerm])

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search champions..."
            className="w-full pl-10 bg-gray-900 border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-1">
          {championClasses.map((classType) => (
            <Button
              key={classType.name}
              onClick={() => setSelectedClass(classType.name === selectedClass ? null : classType.name)}
              variant={classType.name === selectedClass ? "default" : "outline"}
              className="px-2 py-1 text-xs"
            >
              <Image
                src={classType.icon || "/placeholder.svg"}
                alt={classType.name}
                width={16}
                height={16}
                className="mr-1"
              />
              {classType.name[0]}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-6 gap-2 h-[400px] overflow-y-auto">
        {filteredChampions.map((champion) => (
          <div
            key={champion.id}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-zinc-900 transition-transform hover:scale-105"
            onClick={() => onChampionSelect(champion.id)}
          >
            <Image
              src={champion.image || "/placeholder.svg"}
              alt={champion.name}
              width={120}
              height={120}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-center text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              {champion.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

