export function ChampionGrid() {
  return (
    <div className="grid grid-cols-6 gap-2">
      {[...Array(30)].map((_, index) => (
        <div
          key={index}
          className="aspect-square cursor-pointer overflow-hidden rounded-lg bg-zinc-900 transition-transform hover:scale-105"
        >
          {/* Placeholder for champion image */}
          <div className="w-full h-full bg-gray-700"></div>
        </div>
      ))}
    </div>
  )
}

