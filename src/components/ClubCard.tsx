import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Club } from "../types";
import { useFavorites } from "../hooks/useFavorites";

interface ClubCardProps {
  club: Club;
  showScore?: number;
  rank?: number;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  文艺: "from-pink-400 to-rose-400",
  艺术: "from-purple-400 to-violet-400",
  文化: "from-indigo-400 to-blue-400",
  运动: "from-green-400 to-emerald-400",
  公益: "from-orange-400 to-amber-400",
  学术: "from-blue-400 to-cyan-400",
  技术: "from-cyan-400 to-teal-400",
  创业: "from-yellow-400 to-amber-400",
};

const CATEGORY_BADGE: Record<string, string> = {
  文艺: "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
  艺术: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  文化: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
  运动: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
  公益: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
  学术: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  技术: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400",
  创业: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
};

const MAX_VISIBLE_TAGS = 3;

export function ClubCard({ club, showScore, rank }: ClubCardProps) {
  const nav = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(club.id);
  const [favAnim, setFavAnim] = useState(false);

  const gradientClass = CATEGORY_GRADIENTS[club.category] || "from-orange-400 to-amber-400";
  const badgeClass = CATEGORY_BADGE[club.category] || "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400";

  function handleFav(e: React.MouseEvent) {
    e.stopPropagation();
    toggleFavorite(club.id);
    setFavAnim(true);
    setTimeout(() => setFavAnim(false), 600);
  }

  return (
    <div className="relative group">
      <button
        onClick={() => nav(`/student/club/${club.id}`)}
        className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden text-left card-hover border border-gray-100/50 dark:border-gray-700/50"
      >
        {/* Gradient top strip */}
        <div className={`h-1 w-full bg-gradient-to-r ${gradientClass}`} />

        <div className="relative">
          <img src={club.coverImage} alt={club.name} className="w-full h-36 object-cover" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {club.isRecruiting && (
            <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-medium shadow">
              招募中
            </span>
          )}
          {showScore !== undefined && (
            <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 text-orange-500 font-bold text-xs shadow">
              ✦ {showScore}% 匹配
            </div>
          )}
          {rank !== undefined && (
            <div className={`absolute top-2 left-2 w-7 h-7 rounded-full bg-gradient-to-br ${gradientClass} text-white text-sm font-bold flex items-center justify-center shadow`}>
              {rank}
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm`}>
              {club.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white truncate text-sm">{club.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeClass}`}>
                {club.category}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {club.tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
              <span key={tag} className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400 rounded-full px-2 py-0.5 font-medium">
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2 leading-relaxed">{club.description}</p>

          {showScore !== undefined && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mb-1">
                <span>匹配度</span>
                <span className="text-orange-500 font-semibold">{showScore}%</span>
              </div>
              <div className="w-full bg-orange-100 dark:bg-orange-900/20 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-1.5 rounded-full progress-gradient transition-all duration-700"
                  style={{ width: `${showScore}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <span>👥</span> {club.memberCount} 人
            </span>
            <span className="flex items-center gap-1">
              <span>⏰</span> 每周 {club.hoursPerWeek} 小时
            </span>
          </div>
        </div>
      </button>

      {/* Favorite button */}
      <button
        onClick={handleFav}
        className={`absolute top-12 right-3 w-8 h-8 rounded-full glass flex items-center justify-center text-base shadow-sm hover:scale-110 transition-transform ${
          favAnim ? "animate-heartbeat" : ""
        }`}
        aria-label={fav ? "取消收藏" : "收藏"}
      >
        {fav ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
