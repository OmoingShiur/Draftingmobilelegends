"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DiscIcon, Link, Clock } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { ChampionGrid } from "@/components/champion-grid"

export default function DraftingPage() {
  const [inviteLink, setInviteLink] = useState("")

  const handleDiscordClick = () => {
    window.open("https://discord.gg/your-invite-link", "_blank")
  }

  const handleGenerateInvite = () => {
    const newInviteLink = `https://yourdomain.com/invite/${Math.random().toString(36).substr(2, 9)}`
    setInviteLink(newInviteLink)
    navigator.clipboard.writeText(newInviteLink)
    alert(`Invite link generated and copied to clipboard: ${newInviteLink}`)
  }

  const handleSetTimer = () => {
    alert("Timer setting functionality to be implemented")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col">
        {/* Top Navigation */}
        <header className="flex items-center justify-between p-4 border-b border-gray-800">
          <Button variant="ghost" size="icon" className="text-white" onClick={handleDiscordClick}>
            <DiscIcon className="w-6 h-6" />
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Drafting</h1>
            <h2 className="text-xl">Mobile Legends</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white" onClick={handleSetTimer}>
              <Clock className="w-6 h-6" />
            </Button>
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
              {["B1", "B2", "B3", "B4", "B5"].map((pick) => (
                <div key={pick} className="flex items-center justify-between">
                  <span className="font-bold text-blue-400">{pick}</span>
                  <div className="w-16 h-16 bg-gray-700 rounded-lg"></div>
                </div>
              ))}
            </div>

            {/* Champion Pool */}
            <div className="w-1/2">
              <SearchBar />
              <ChampionGrid />
            </div>

            {/* Red Side */}
            <div className="w-1/4 space-y-4">
              <h3 className="text-center text-xl font-bold bg-red-600 p-2 rounded">RED SIDE</h3>
              <div className="flex justify-center space-x-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={`red-ban-${i}`} className="w-8 h-8 bg-gray-700 rounded-md"></div>
                ))}
              </div>
              {["R1", "R2", "R3", "R4", "R5"].map((pick) => (
                <div key={pick} className="flex items-center justify-between">
                  <div className="w-16 h-16 bg-gray-700 rounded-lg"></div>
                  <span className="font-bold text-red-400">{pick}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

