import type { Game } from "../types/game";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  return (
    <div className="w-56 bg-base-200 rounded-xl shadow hover:scale-105 transition">
      <img
        src={game.headerImage}
        alt={game.name}
        className="rounded-t-xl h-32 w-full object-cover"
      />
      <div className="p-3">
        <h3 className="font-bold text-lg truncate">{game.name}</h3>
        <div className="text-xs text-gray-400 mb-1">{game.developer}</div>
        <div className="flex flex-wrap gap-1 mb-2">
          {game.genres.slice(0, 2).map((genre) => (
            <span key={genre} className="badge badge-outline badge-xs">
              {genre}
            </span>
          ))}
        </div>
        <div className="text-sm font-semibold">{game.price}</div>
      </div>
    </div>
  );
}
