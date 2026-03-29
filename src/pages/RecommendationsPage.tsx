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

const RANK_GRADIENTS = [
  "from-orange-500 to-amber-500",
  "from-orange-400 to-amber-400",
  "from-orange-300 to-amber-300",
  "from-orange-200 to-amber-200",
  "from-orange-100 to-amber-100",
];

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
      {/* Hero gradient header */}
      <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 px-4 pt-8 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-20 bg-white/5 rounded-full blur-2xl" />
        </div>
        <div className="max-w-md mx-auto relative">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => nav("/student/assessment")} className="text-white/80 hover:text-white transition-colors">
              ←
            </button>
            <h1 className="text-lg font-bold text-white">你的专属推荐</h1>
          </div>

          {/* Profile display */}
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="text-sm text-orange-100 mb-1 font-medium">你的性格类型</div>
              <div className="text-4xl mb-2">{profileInfo.emoji}</div>
              <h2 className="text-2xl font-extrabold text-white mb-1">{profile}</h2>
              <p className="text-orange-100 text-sm leading-relaxed">{profileInfo.desc}</p>
            </div>
            <div className="flex-shrink-0 bg-white/15 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
              <RadarChart data={radarData} size={120} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-8">
        {/* Action buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => nav("/student/assessment")}
            className="flex-1 glass rounded-xl py-2.5 text-sm font-medium text-orange-500 hover:bg-orange-50/50 transition-colors border border-orange-200/50"
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
            className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl py-2.5 text-sm font-medium hover:from-orange-600 hover:to-amber-600 transition-all shadow-md"
          >
            📤 分享结果
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white">🎯 Top 5 推荐社团</h3>
          <div className="flex-1 h-px bg-orange-100 dark:bg-gray-700" />
        </div>

        <div className="space-y-4">
          {matches.map((match: ClubMatch, idx: number) => (
            <button
              key={match.club.id}
              onClick={() => nav(`/student/club/${match.club.id}`)}
              className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden text-left hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-gray-100/50 dark:border-gray-700/50"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="relative">
                <img src={match.club.coverImage} alt={match.club.name} className="w-full h-28 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className={`absolute top-2 left-2 w-8 h-8 rounded-full bg-gradient-to-br ${RANK_GRADIENTS[idx] || RANK_GRADIENTS[4]} ${idx < 3 ? "text-white" : "text-orange-600"} text-sm font-bold flex items-center justify-center shadow`}>
                  {idx + 1}
                </div>
              </div>
              <div className="p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{match.club.name}</h3>
                    <span className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-500 px-2 py-0.5 rounded-full font-medium">
                      {match.club.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{match.reason}</p>
                </div>
                <CircularProgress score={match.score} size={56} strokeWidth={5} />
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => nav("/student/home")}
          className="w-full mt-6 border-2 border-orange-400 text-orange-500 rounded-2xl py-3 font-bold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
        >
          浏览全部社团
        </button>
      </div>
      <BottomNav active="assessment" />
    </div>
  );
}
