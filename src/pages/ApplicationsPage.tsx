import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import { useApplications } from "../hooks/useApplications";
import type { Application } from "../types";

const statusConfig: Record<Application["status"], { bg: string; text: string; icon: string; dot: string }> = {
  待审核: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    text: "text-yellow-600 dark:text-yellow-400",
    icon: "⏳",
    dot: "bg-yellow-400",
  },
  已通过: {
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-400",
    icon: "✅",
    dot: "bg-green-500",
  },
  已拒绝: {
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-500 dark:text-red-400",
    icon: "❌",
    dot: "bg-red-400",
  },
};

export function ApplicationsPage() {
  const nav = useNavigate();
  const { applications } = useApplications();
  const [filter, setFilter] = useState<"全部" | Application["status"]>("全部");
  const [sortDesc, setSortDesc] = useState(true);

  const filtered = applications
    .filter((a) => filter === "全部" || a.status === filter)
    .sort((a, b) => {
      const diff = a.appliedAt.localeCompare(b.appliedAt);
      return sortDesc ? -diff : diff;
    });

  return (
    <div className="min-h-screen pb-20 bg-orange-50/50 dark:bg-gray-900">
      {/* Gradient header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 pt-8 pb-5">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">我的申请</h1>
              <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
                {applications.length} 条
              </span>
            </div>
            <button
              onClick={() => setSortDesc((d) => !d)}
              className="text-xs text-white/80 bg-white/20 border border-white/30 rounded-full px-3 py-1 hover:bg-white/30 transition-colors"
            >
              {sortDesc ? "⬇️ 最新" : "⬆️ 最早"}
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2">
            {(["全部", "待审核", "已通过", "已拒绝"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filter === f
                    ? "bg-white text-orange-500 shadow-sm"
                    : "bg-white/20 text-white/80 hover:bg-white/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pt-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-700 dark:text-gray-300 text-lg font-bold mb-2">还没有{filter !== "全部" ? filter : ""}申请记录</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-8 leading-relaxed">
              去浏览感兴趣的社团并申请加入吧！<br />
              你的校园生活将因此更加丰富多彩 ✨
            </p>
            <button
              onClick={() => nav("/student/home")}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-2xl text-sm font-bold hover:from-orange-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              去浏览社团
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((app) => {
              const config = statusConfig[app.status];
              return (
                <div key={app.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border border-gray-100/50 dark:border-gray-700/50 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">{app.clubName}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${config.bg} ${config.text}`}>
                      {config.icon} {app.status}
                    </span>
                  </div>

                  {/* Enhanced status timeline */}
                  <div className="flex items-center gap-1 mb-3 mt-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${app.status !== "已拒绝" ? "bg-orange-500" : "bg-orange-300"}`} />
                    <div className={`flex-1 h-0.5 rounded-full ${app.status === "已通过" ? "bg-gradient-to-r from-orange-500 to-green-500" : app.status === "已拒绝" ? "bg-gradient-to-r from-orange-300 to-red-400" : "bg-gradient-to-r from-orange-500 to-gray-200 dark:to-gray-700"}`} />
                    <div className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
                    <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">{app.status}</span>
                  </div>

                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                    📅 申请时间：{app.appliedAt}
                  </p>
                  {app.note && (
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-3 py-2 text-xs text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700 mb-2">
                      💬 {app.note}
                    </div>
                  )}
                  <button
                    onClick={() => nav(`/student/club/${app.clubId}`)}
                    className="text-orange-500 text-xs font-semibold hover:text-orange-600 transition-colors flex items-center gap-1"
                  >
                    查看社团详情 →
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <BottomNav active="applications" />
    </div>
  );
}
