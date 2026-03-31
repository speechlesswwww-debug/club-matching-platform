import { useNavigate } from "react-router-dom";
import { clubs } from "../data";
import { useFavorites } from "../hooks/useFavorites";
import { BottomNav } from "../components/BottomNav";
import { ClubCard } from "../components/ClubCard";

export function FavoritesPage() {
  const nav = useNavigate();
  const { favorites } = useFavorites();
  const favoriteClubs = clubs.filter((c) => favorites.includes(c.id));

  return (
    <div className="min-h-screen pb-20 bg-orange-50/50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-4 pt-8 pb-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <button
              onClick={() => nav(-1)}
              className="text-white/80 hover:text-white transition-colors"
            >
              ←
            </button>
            <h1 className="text-xl font-bold text-white">我的收藏</h1>
            <span className="ml-auto text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
              {favoriteClubs.length} 个
            </span>
          </div>
          <p className="text-pink-100 text-sm pl-7">你收藏的社团都在这里</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-4">
        {favoriteClubs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💝</div>
            <p className="text-gray-700 dark:text-gray-300 text-lg font-bold mb-2">还没有收藏的社团</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-8 leading-relaxed">
              浏览社团时点击 🤍 即可收藏<br />
              方便以后随时查看
            </p>
            <button
              onClick={() => nav("/student/home")}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-2xl text-sm font-bold hover:from-orange-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              去首页发现更多
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        )}
      </div>

      <BottomNav active="favorites" />
    </div>
  );
}
