"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DiscIcon, Link } from "lucide-react"
import { ChampionGrid } from "@/components/champion-grid"
import { Timer } from "@/components/timer"
import { champions } from "@/data/champions"

type PickSlot = {
  position: string
  championId: string | null
}

export default function DraftingPage() {
  const [inviteLink, setInviteLink] = useState("")
  const [picks, setPicks] = useState<PickSlot[]>([
    { position: "B1", championId: null },
    { position: "B2", championId: null },
    { position: "B3", championId: null },
    { position: "B4", championId: null },
    { position: "B5", championId: null },
    { position: "R1", championId: null },
    { position: "R2", championId: null },
    { position: "R3", championId: null },
    { position: "R4", championId: null },
    { position: "R5", championId: null },
  ])
  const [selectedChampion, setSelectedChampion] = useState<string | null>(null)

  const handleDiscordClick = () => {
    window.open("https://discord.gg/your-invite-link", "_blank")
  }

  const handleGenerateInvite = () => {
    const newInviteLink = `https://yourdomain.com/invite/${Math.random().toString(36).substr(2, 9)}`
    setInviteLink(newInviteLink)
    navigator.clipboard.writeText(newInviteLink)
    alert(`Invite link generated and copied to clipboard: ${newInviteLink}`)
  }

  const handleChampionSelect = (championId: string) => {
    setSelectedChampion(championId)
  }

  const handleLockIn = () => {
    if (selectedChampion) {
      const nextEmptySlot = picks.find((pick) => pick.championId === null)
      if (nextEmptySlot) {
        setPicks(
          picks.map((pick) =>
            pick.position === nextEmptySlot.position ? { ...pick, championId: selectedChampion } : pick,
          ),
        )
        setSelectedChampion(null)
      }
    }
  }

  const handleResetDraft = () => {
    setPicks(picks.map((pick) => ({ ...pick, championId: null })))
    setSelectedChampion(null)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col">
        {/* Top Navigation */}
        <header className="flex items-center justify-between p-4 border-b border-gray-800">
          <Button variant="ghost" size="icon" className="text-white" onClick={handleDiscordClick}>
            <DiscIcon className="w-6 h-6" />
          </Button>
          <div className="text-center flex-grow">
            <h1 className="text-2xl font-bold">Drafting</h1>
            <h2 className="text-xl">Mobile Legends</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white" onClick={handleGenerateInvite}>
              <Link className="w-6 h-6" />
            </Button>
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              SIGN IN
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto p-4">
          {/* Timer and Reset Draft */}
          <div className="flex justify-center items-center mb-4 space-x-4">
            <Button variant="outline" size="sm" onClick={handleResetDraft}>
              Reset Draft
            </Button>
            <Timer initialTime={60} />
          </div>

          {/* Draft Area */}
          <div className="flex gap-4">
            {/* Blue Side */}
            <div className="w-1/4 space-y-4">
              <h3 className="text-center text-xl font-bold bg-blue-600 p-2 rounded">BLUE SIDE</h3>
              <div className="flex justify-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={`blue-ban-${i}`} className="w-8 h-8 bg-gray-700 rounded-md"></div>
                ))}
              </div>
              {picks.slice(0, 5).map((pick) => (
                <div key={pick.position} className="flex items-center space-x-2">
                  <span className="font-bold text-blue-400 w-8">{pick.position}</span>
                  <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden">
                    {pick.championId && (
                      <Image
                        src={champions.find((c) => c.id === pick.championId)?.image || "/placeholder.svg"}
                        alt={champions.find((c) => c.id === pick.championId)?.name || ""}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Champion Pool */}
            <div className="w-1/2 flex flex-col">
              <ChampionGrid onChampionSelect={handleChampionSelect} />
              <Button onClick={handleLockIn} disabled={!selectedChampion} className="mt-4 w-full">
                Lock In
              </Button>
            </div>

            {/* Red Side */}
            <div className="w-1/4 space-y-4">
              <h3 className="text-center text-xl font-bold bg-red-600 p-2 rounded">RED SIDE</h3>
              <div className="flex justify-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={`red-ban-${i}`} className="w-8 h-8 bg-gray-700 rounded-md"></div>
                ))}
              </div>
              {picks.slice(5).map((pick) => (
                <div key={pick.position} className="flex items-center space-x-2 justify-end">
                  <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden">
                    {pick.championId && (
                      <Image
                        src={champions.find((c) => c.id === pick.championId)?.image || "/placeholder.svg"}
                        alt={champions.find((c) => c.id === pick.championId)?.name || ""}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <span className="font-bold text-red-400 w-8">{pick.position}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

