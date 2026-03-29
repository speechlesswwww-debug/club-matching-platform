import { useNavigate, useLocation } from "react-router-dom";
import { profileTypes } from "../data";
import { matchClubs } from "../matching";
import type { ClubMatch } from "../types";
import { BottomNav } from "../components/BottomNav";
import { CircularProgress } from "../components/CircularProgress";
import { RadarChart } from "../components/RadarChart";

const PROFILE_RADAR: Record<string, number[]> = {
  创意表达型: [9, 3, 6, 4, 5, 2],
  技术探索型: [3, 9, 4, 6, 7, 3],
  社交活力型: [5, 4, 9, 5, 3, 7],
  公益服务型: [4, 3, 7, 9, 5, 4],
  学术研究型: [5, 7, 4, 5, 9, 2],
  运动健将型: [3, 4, 7, 5, 3, 9],
};

const RADAR_LABELS = ["创意", "技术", "社交", "公益", "学术", "运动"];

export function RecommendationsPage() {
  const nav = useNavigate();
  const location = useLocation();
  const state = location.state as { keywords: string[]; profile: string } | null;
  const keywords = state?.keywords || ["创意表达"];
  const profile = state?.profile || "创意表达型";
  const matches = matchClubs(keywords);
  const profileInfo = profileTypes[profile] || { emoji: "🌟", desc: "综合型人才" };
  const radarValues = PROFILE_RADAR[profile] || [5, 5, 5, 5, 5, 5];

  const radarData = RADAR_LABELS.map((label, i) => ({
    label,
    value: radarValues[i],
    max: 10,
  }));

  return (
    <div className="min-h-screen pb-20 bg-orange-50/50 dark:bg-gray-900">
      <div className="max-w-md mx-auto px-4 pt-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => nav("/student/assessment")} className="text-gray-400 dark:text-gray-500">
            ←
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">你的专属推荐</h1>
        </div>

        {/* Profile card */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-start gap-4">
            <div>
              <div className="text-4xl mb-2">{profileInfo.emoji}</div>
              <h2 className="text-xl font-bold mb-1">{profile}</h2>
              <p className="text-orange-100 text-sm">{profileInfo.desc}</p>
            </div>
            <div className="ml-auto flex-shrink-0">
              <div className="bg-white/20 rounded-2xl p-2">
                <RadarChart data={radarData} size={120} />
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => nav("/student/assessment")}
            className="flex-1 bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-900/50 text-orange-500 rounded-xl py-2.5 text-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
          >
            🔄 重新测评
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: "我的JoinU测评结果", text: `我的性格类型：${profile}` });
              } else {
                navigator.clipboard.writeText(`我的JoinU测评结果：${profile} - ${profileInfo.desc}`);
              }
            }}
            className="flex-1 bg-orange-500 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            📤 分享结果
          </button>
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white mb-4">🎯 Top 5 推荐社团</h3>

        <div className="space-y-4">
          {matches.map((match: ClubMatch, idx: number) => (
            <button
              key={match.club.id}
              onClick={() => nav(`/student/club/${match.club.id}`)}
              className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="relative">
                <img src={match.club.coverImage} alt={match.club.name} className="w-full h-28 object-cover" />
                <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center shadow">
                  {idx + 1}
                </div>
              </div>
              <div className="p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{match.club.name}</h3>
                    <span className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-500 px-2 py-0.5 rounded-full">
                      {match.club.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{match.reason}</p>
                </div>
                <CircularProgress score={match.score} size={56} strokeWidth={5} />
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => nav("/student/home")}
          className="w-full mt-6 border-2 border-orange-500 text-orange-500 rounded-2xl py-3 font-bold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
        >
          浏览全部社团
        </button>
      </div>
      <BottomNav active="assessment" />
    </div>
  );
}
