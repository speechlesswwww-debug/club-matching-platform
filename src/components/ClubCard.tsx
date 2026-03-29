import { useNavigate } from "react-router-dom";
import type { Club } from "../types";
import { useFavorites } from "../hooks/useFavorites";

interface ClubCardProps {
  club: Club;
  showScore?: number;
  rank?: number;
}

export function ClubCard({ club, showScore, rank }: ClubCardProps) {
  const nav = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(club.id);

  const categoryColors: Record<string, string> = {
    文艺: "bg-pink-50 text-pink-600",
    艺术: "bg-purple-50 text-purple-600",
    文化: "bg-indigo-50 text-indigo-600",
    运动: "bg-green-50 text-green-600",
    公益: "bg-orange-50 text-orange-600",
    学术: "bg-blue-50 text-blue-600",
    技术: "bg-cyan-50 text-cyan-600",
    创业: "bg-yellow-50 text-yellow-700",
  };

  const catClass = categoryColors[club.category] || "bg-gray-50 text-gray-600";

  return (
    <div className="relative group">
      <button
        onClick={() => nav(`/student/club/${club.id}`)}
        className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden text-left hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
      >
        <div className="relative">
          <img src={club.coverImage} alt={club.name} className="w-full h-36 object-cover" />
          {club.isRecruiting && (
            <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
              招募中
            </span>
          )}
          {showScore !== undefined && (
            <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-3 py-1 text-orange-500 font-bold text-sm shadow">
              {showScore}% 匹配
            </div>
          )}
          {rank !== undefined && (
            <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center">
              {rank}
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-lg flex-shrink-0">
              {club.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 dark:text-white truncate">{club.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catClass}`}>
                {club.category}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {club.tags.map((tag) => (
              <span key={tag} className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-full px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2">{club.description}</p>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-400 dark:text-gray-500">
            <span>👥 {club.memberCount} 人</span>
            <span>⏰ 每周 {club.hoursPerWeek} 小时</span>
          </div>
        </div>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); toggleFavorite(club.id); }}
        className="absolute top-12 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center text-lg shadow hover:scale-110 transition-transform"
        aria-label={fav ? "取消收藏" : "收藏"}
      >
        {fav ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
