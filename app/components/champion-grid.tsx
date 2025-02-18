import Image from "next/image"

// Sample champion data - you would typically fetch this from an API
const champions = [
  { id: "aatrox", name: "Aatrox" },
  { id: "ahri", name: "Ahri" },
  { id: "akali", name: "Akali" },
  { id: "akshan", name: "Akshan" },
  { id: "alistar", name: "Alistar" },
  { id: "ambessa", name: "Ambessa" },
  // Add more champions as needed
]

export function ChampionGrid() {
  return (
    <div className="grid grid-cols-6 gap-2">
      {champions.map((champion) => (
        <div
          key={champion.id}
          className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-zinc-900 transition-transform hover:scale-105"
        >
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/14.2.1/img/champion/${champion.id}.png`}
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
  )
}

