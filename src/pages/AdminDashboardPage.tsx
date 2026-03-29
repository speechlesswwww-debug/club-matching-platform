import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clubs, adminApplicants } from "../data";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ToastContainer";
import type { AdminApplicant } from "../types";

const statusColors: Record<AdminApplicant["status"], string> = {
  待审核: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
  已通过: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
  已拒绝: "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400",
};
const statusEmoji: Record<AdminApplicant["status"], string> = {
  待审核: "⏳",
  已通过: "✅",
  已拒绝: "❌",
};

export function AdminDashboardPage() {
  const nav = useNavigate();
  const { toasts, addToast, removeToast } = useToast();
  const [applicants, setApplicants] = useState(adminApplicants);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"全部" | AdminApplicant["status"]>("全部");
  const [selectedApplicant, setSelectedApplicant] = useState<AdminApplicant | null>(null);

  const pending = applicants.filter((a) => a.status === "待审核").length;
  const approved = applicants.filter((a) => a.status === "已通过").length;
  const rejected = applicants.filter((a) => a.status === "已拒绝").length;
  const total = applicants.length;

  const filtered = applicants.filter((a) => {
    const matchStatus = statusFilter === "全部" || a.status === statusFilter;
    const matchSearch = a.name.includes(search) || a.club.includes(search) || a.profile.includes(search);
    return matchStatus && matchSearch;
  });

  function updateStatus(id: string, status: AdminApplicant["status"]) {
    setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    addToast(`已${status === "已通过" ? "通过" : "拒绝"}申请`, status === "已通过" ? "success" : "error");
    setSelectedApplicant(null);
  }

  // Bar chart data
  const chartData = [
    { label: "待审核", value: pending, color: "bg-yellow-400", textColor: "text-yellow-500" },
    { label: "已通过", value: approved, color: "bg-green-400", textColor: "text-green-500" },
    { label: "已拒绝", value: rejected, color: "bg-red-400", textColor: "text-red-500" },
  ];
  const maxVal = Math.max(pending, approved, rejected, 1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Sidebar layout on desktop */}
      <div className="flex">
        {/* Sidebar - desktop only */}
        <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 p-6">
          <div className="text-xl font-bold text-gray-900 dark:text-white mb-8">🎓 JoinU Admin</div>
          <nav className="space-y-2">
            {[
              { icon: "📊", label: "数据看板", active: true },
              { icon: "📋", label: "申请管理", active: false },
              { icon: "🏛️", label: "社团管理", active: false },
              { icon: "👥", label: "成员管理", active: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium cursor-pointer ${
                  item.active
                    ? "bg-orange-50 dark:bg-orange-900/20 text-orange-500"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {item.icon} {item.label}
              </div>
            ))}
          </nav>
          <button
            onClick={() => nav("/")}
            className="mt-auto text-xs text-gray-400 dark:text-gray-500 flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-300"
          >
            🚪 退出登录
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 max-w-3xl mx-auto px-4 pt-6 lg:max-w-none lg:mx-0 lg:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">管理后台</p>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">JoinU 数据看板</h1>
            </div>
            <button
              onClick={() => nav("/")}
              className="lg:hidden text-sm text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1"
            >
              退出
            </button>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <div className="text-2xl mb-1">📊</div>
              <div className="text-2xl font-bold text-orange-500">{total}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">总申请数</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <div className="text-2xl mb-1">⏳</div>
              <div className="text-2xl font-bold text-yellow-500">{pending}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">待审核</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <div className="text-2xl mb-1">✅</div>
              <div className="text-2xl font-bold text-green-500">{approved}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">已通过</div>
              <div className="text-xs text-green-400 mt-0.5">
                {total > 0 ? Math.round((approved / total) * 100) : 0}% 通过率
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
              <div className="text-2xl mb-1">🏛️</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{clubs.length}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">社团总数</div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">申请状态分布</h3>
            <div className="flex items-end gap-4 h-24">
              {chartData.map((d) => (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                  <span className={`text-xs font-bold ${d.textColor}`}>{d.value}</span>
                  <div className="w-full flex items-end justify-center">
                    <div
                      className={`${d.color} w-full rounded-t-lg transition-all duration-500`}
                      style={{ height: `${(d.value / maxVal) * 72}px`, minHeight: d.value > 0 ? "8px" : "0px" }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Applicant list */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
              <h2 className="font-bold text-gray-900 dark:text-white">申请管理</h2>
              <div className="flex-1">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-sm bg-gray-50 dark:bg-gray-700 rounded-xl px-3 py-1.5 focus:outline-none dark:text-white dark:placeholder-gray-400"
                  placeholder="搜索姓名、社团..."
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="text-sm bg-gray-50 dark:bg-gray-700 dark:text-white rounded-xl px-2 py-1.5 focus:outline-none border-none"
              >
                {["全部", "待审核", "已通过", "已拒绝"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-700">
              {filtered.map((a) => (
                <div
                  key={a.id}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedApplicant(a)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-sm font-bold text-orange-600 dark:text-orange-400">
                        {a.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{a.name}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">{a.club}</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[a.status]}`}>
                      {statusEmoji[a.status]} {a.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1 ml-10">
                    <span className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-500 px-2 py-0.5 rounded-full">
                      {a.profile}
                    </span>
                    <span className="text-xs text-gray-300 dark:text-gray-600">{a.time}</span>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="py-8 text-center text-gray-400 dark:text-gray-500">没有找到符合条件的申请</div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Applicant detail modal */}
      {selectedApplicant && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedApplicant(null)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-xl font-bold text-orange-600 dark:text-orange-400">
                {selectedApplicant.name[0]}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{selectedApplicant.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedApplicant.club}</p>
              </div>
              <span
                className={`ml-auto text-xs px-2 py-1 rounded-full font-medium ${statusColors[selectedApplicant.status]}`}
              >
                {statusEmoji[selectedApplicant.status]} {selectedApplicant.status}
              </span>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">申请时间</span>
                <span className="text-gray-900 dark:text-white">{selectedApplicant.time}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">性格类型</span>
                <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-500 px-2 py-0.5 rounded-full text-xs">
                  {selectedApplicant.profile}
                </span>
              </div>
            </div>

            {selectedApplicant.status === "待审核" && (
              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(selectedApplicant.id, "已拒绝")}
                  className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl py-3 font-medium text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                >
                  ❌ 拒绝
                </button>
                <button
                  onClick={() => updateStatus(selectedApplicant.id, "已通过")}
                  className="flex-1 bg-green-500 text-white rounded-xl py-3 font-medium text-sm hover:bg-green-600 transition-colors"
                >
                  ✅ 通过
                </button>
              </div>
            )}
            {selectedApplicant.status !== "待审核" && (
              <button
                onClick={() => setSelectedApplicant(null)}
                className="w-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-xl py-3 text-sm font-medium"
              >
                关闭
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
