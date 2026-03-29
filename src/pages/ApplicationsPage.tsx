import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import { useApplications } from "../hooks/useApplications";
import type { Application } from "../types";

const statusColors: Record<Application["status"], string> = {
  待审核: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
  已通过: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
  已拒绝: "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400",
};
const statusEmoji: Record<Application["status"], string> = {
  待审核: "⏳",
  已通过: "✅",
  已拒绝: "❌",
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
      <div className="max-w-md mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">我的申请</h1>
            <span className="text-sm bg-orange-50 dark:bg-orange-900/20 text-orange-500 px-2 py-0.5 rounded-full">
              {applications.length} 条
            </span>
          </div>
          <button
            onClick={() => setSortDesc((d) => !d)}
            className="text-xs text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {sortDesc ? "⬇️ 最新" : "⬆️ 最早"}
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5">
          {(["全部", "待审核", "已通过", "已拒绝"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === f
                  ? "bg-orange-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">📭</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">还没有{filter !== "全部" ? filter : ""}申请记录</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">去浏览感兴趣的社团并申请加入吧！</p>
            <button
              onClick={() => nav("/student/home")}
              className="bg-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              去浏览社团
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((app) => (
              <div key={app.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">{app.clubName}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[app.status]}`}>
                    {statusEmoji[app.status]} {app.status}
                  </span>
                </div>

                {/* Status timeline */}
                <div className="flex items-center gap-1 mb-3">
                  {(["待审核", "已通过"] as const).map((s, i) => (
                    <div key={s} className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          app.status === "已拒绝" && s === "已通过"
                            ? "bg-gray-200 dark:bg-gray-700"
                            : (s === "待审核" || (s === "已通过" && app.status === "已通过"))
                            ? "bg-orange-500"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                      <span className="text-xs text-gray-400 dark:text-gray-500 mx-1">{s}</span>
                      {i === 0 && (
                        <div
                          className={`h-0.5 w-8 ${
                            app.status === "已通过" ? "bg-orange-500" : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                  {app.status === "已拒绝" && (
                    <div className="flex items-center ml-1">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-xs text-red-400 ml-1">已拒绝</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">申请时间：{app.appliedAt}</p>
                {app.note && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-3 py-2 text-xs text-gray-600 dark:text-gray-400">
                    💬 {app.note}
                  </div>
                )}
                <button
                  onClick={() => nav(`/student/club/${app.clubId}`)}
                  className="mt-3 text-orange-500 text-xs font-medium hover:underline"
                >
                  查看社团详情 →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav active="applications" />
    </div>
  );
}
