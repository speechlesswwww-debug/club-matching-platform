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
  已查看: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
    icon: "👀",
    dot: "bg-blue-400",
  },
  面试中: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-400",
    icon: "💬",
    dot: "bg-purple-500",
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

const STATUS_TIMELINE = ["待审核", "已查看", "面试中", "已通过"] as const;

const FILTER_TABS: Array<"全部" | Application["status"]> = ["全部", "待审核", "已查看", "面试中", "已通过", "已拒绝"];

export function ApplicationsPage() {
  const nav = useNavigate();
  const { applications } = useApplications();
  const [filter, setFilter] = useState<"全部" | Application["status"]>("全部");
  const [sortDesc, setSortDesc] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
          <div className="flex gap-2 overflow-x-auto pb-1">
            {FILTER_TABS.map((f) => (
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
            <p className="text-gray-700 dark:text-gray-300 text-lg font-bold mb-2">还没有申请记录</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-8 leading-relaxed">
              去浏览感兴趣的社团并申请加入吧！<br />
              你的校园生活将因此更加丰富多彩 ✨
            </p>
            <button
              onClick={() => nav("/student/home")}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-2xl text-sm font-bold hover:from-orange-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              去发现社团
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((app) => {
              const config = statusConfig[app.status];
              const isExpanded = expandedId === app.id;
              const currentTimelineIdx = STATUS_TIMELINE.indexOf(app.status as typeof STATUS_TIMELINE[number]);

              return (
                <div
                  key={app.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100/50 dark:border-gray-700/50 overflow-hidden transition-all"
                >
                  {/* Main row */}
                  <div
                    className="p-4 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : app.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">{app.clubName}</h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${config.bg} ${config.text}`}>
                        {config.icon} {app.status}
                      </span>
                    </div>

                    {/* Status timeline bar */}
                    <div className="flex items-center gap-1 mb-3 mt-2">
                      {STATUS_TIMELINE.map((s, i) => (
                        <div key={s} className="flex items-center flex-1 last:flex-none">
                          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                            app.status === "已拒绝" ? "bg-red-300" :
                            i <= currentTimelineIdx ? statusConfig[s].dot : "bg-gray-200 dark:bg-gray-700"
                          }`} />
                          {i < STATUS_TIMELINE.length - 1 && (
                            <div className={`flex-1 h-0.5 rounded-full ${
                              app.status === "已拒绝" ? "bg-red-200" :
                              i < currentTimelineIdx ? "bg-gradient-to-r from-orange-400 to-amber-400" : "bg-gray-200 dark:bg-gray-700"
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400 dark:text-gray-500">📅 {app.appliedAt}</p>
                      {app.direction && (
                        <span className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-500 px-2 py-0.5 rounded-full">
                          {app.direction}
                        </span>
                      )}
                      <span className="text-xs text-gray-400 dark:text-gray-500">{isExpanded ? "▲" : "▼"}</span>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 dark:border-gray-700 p-4 space-y-3 animate-fade-in">
                      {app.selfIntro && (
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">自我介绍</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3">
                            {app.selfIntro}
                          </p>
                        </div>
                      )}
                      {app.note && (
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">社团反馈</p>
                          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl px-3 py-2 text-xs text-orange-700 dark:text-orange-300 border border-orange-100 dark:border-orange-900/30">
                            💬 {app.note}
                          </div>
                        </div>
                      )}
                      {/* Status timeline detail */}
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">申请进度</p>
                        <div className="flex items-start gap-2 overflow-x-auto">
                          {STATUS_TIMELINE.map((s, i) => {
                            const reached = app.status !== "已拒绝" ? i <= currentTimelineIdx : false;
                            return (
                              <div key={s} className="flex flex-col items-center flex-shrink-0">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                  reached ? "bg-gradient-to-br from-orange-400 to-amber-400 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                                }`}>
                                  {reached ? "✓" : i + 1}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s}</p>
                              </div>
                            );
                          })}
                          {app.status === "已拒绝" && (
                            <div className="flex flex-col items-center flex-shrink-0">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs bg-red-100 dark:bg-red-900/20 text-red-500">
                                ✗
                              </div>
                              <p className="text-xs text-red-400 mt-1">已拒绝</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => nav(`/student/club/${app.clubId}`)}
                        className="text-orange-500 text-xs font-semibold hover:text-orange-600 transition-colors flex items-center gap-1"
                      >
                        查看社团详情 →
                      </button>
                    </div>
                  )}
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
