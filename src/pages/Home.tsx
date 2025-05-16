import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { useEffect, useState } from "react";
import { fetchGames, searchGames } from "../features/games/gamesSlice";
import GameCard from "../components/GameCard";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector(
    (state: RootState) => state.games
  );

  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") {
      dispatch(fetchGames());
    } else {
      dispatch(searchGames(query));
    }
  };

  return (
    <div className="bg-base-100 min-h-screen">
      {/* 상단 네비게이션 */}
      <header className="flex items-center justify-between px-6 py-4 bg-base-200 shadow">
        <div className="font-bold text-2xl">Hidden Pixels</div>
        <nav className="flex gap-6">
          <a href="#" className="hover:text-primary">
            전체 게임
          </a>
          <a href="#" className="hover:text-primary">
            태그별
          </a>
          <a href="#" className="hover:text-primary">
            인기순
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="게임 검색"
              className="input input-bordered input-sm w-36 md:w-56"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-primary btn-sm ml-2" type="submit">
              검색
            </button>
          </form>
        </div>
      </header>

      {/* 게임 리스트 */}
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-xl font-bold mb-6">인디게임 추천 리스트</h2>
        {status === "loading" && <div className="text-center">로딩 중...</div>}
        {status === "failed" && (
          <div className="text-center text-red-500">{error}</div>
        )}
        {status === "succeeded" && items.length === 0 && (
          <div className="text-center text-gray-500">게임이 없습니다.</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </main>
    </div>
  );
}
