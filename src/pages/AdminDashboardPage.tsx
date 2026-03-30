import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clubs, adminApplicants } from "../data";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ToastContainer";
import type { AdminApplicant } from "../types";

const statusConfig: Record<AdminApplicant["status"], { bg: string; text: string; icon: string; gradient: string }> = {
  待审核: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    text: "text-yellow-600 dark:text-yellow-400",
    icon: "⏳",
    gradient: "from-yellow-400 to-amber-400",
  },
  已通过: {
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-400",
    icon: "✅",
    gradient: "from-green-400 to-emerald-400",
  },
  已拒绝: {
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-500 dark:text-red-400",
    icon: "❌",
    gradient: "from-red-400 to-rose-400",
  },
};

const STAT_CARDS = (total: number, pending: number, approved: number, clubCount: number) => [
  {
    icon: "📊",
    value: total,
    label: "总申请数",
    gradient: "from-orange-500 to-amber-500",
    textColor: "text-orange-500",
  },
  {
    icon: "⏳",
    value: pending,
    label: "待审核",
    gradient: "from-yellow-400 to-amber-400",
    textColor: "text-yellow-500",
  },
  {
    icon: "✅",
    value: approved,
    label: "已通过",
    gradient: "from-green-400 to-emerald-400",
    textColor: "text-green-500",
    extra: total > 0 ? `${Math.round((approved / total) * 100)}% 通过率` : "0% 通过率",
  },
  {
    icon: "🏛️",
    value: clubCount,
    label: "社团总数",
    gradient: "from-blue-400 to-cyan-400",
    textColor: "text-blue-500",
  },
];

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
    { label: "待审核", value: pending, gradient: "from-yellow-400 to-amber-400", textColor: "text-yellow-500" },
    { label: "已通过", value: approved, gradient: "from-green-400 to-emerald-400", textColor: "text-green-500" },
    { label: "已拒绝", value: rejected, gradient: "from-red-400 to-rose-400", textColor: "text-red-500" },
  ];
  const maxVal = Math.max(pending, approved, rejected, 1);

  const statCards = STAT_CARDS(total, pending, approved, clubs.length);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Sidebar layout on desktop */}
      <div className="flex">
        {/* Sidebar - desktop only */}
        <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-sm">🎓</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">JoinU Admin</div>
          </div>
          <nav className="space-y-1">
            {[
              { icon: "📊", label: "数据看板", active: true },
              { icon: "📋", label: "申请管理", active: false },
              { icon: "🏛️", label: "社团管理", active: false },
              { icon: "👥", label: "成员管理", active: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all ${
                  item.active
                    ? "bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/10 text-orange-500 border border-orange-100 dark:border-orange-900/30"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>
          <button
            onClick={() => nav("/")}
            className="mt-auto text-xs text-gray-400 dark:text-gray-500 flex items-center gap-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            🚪 退出登录
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 max-w-3xl mx-auto px-4 pt-6 lg:max-w-none lg:mx-0 lg:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-400 dark:text-gray-500 text-sm">管理后台</p>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">JoinU 数据看板</h1>
            </div>
            <button
              onClick={() => nav("/")}
              className="lg:hidden text-sm text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              退出
            </button>
          </div>

          {/* Stats cards with gradient left borders */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {statCards.map((card) => (
              <div key={card.label} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-100/50 dark:border-gray-700/50">
                <div className={`h-1 w-full bg-gradient-to-r ${card.gradient}`} />
                <div className="p-4">
                  <div className="text-2xl mb-1">{card.icon}</div>
                  <div className={`text-2xl font-bold ${card.textColor}`}>{card.value}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{card.label}</div>
                  {card.extra && (
                    <div className="text-xs text-green-500 mt-0.5 font-medium">{card.extra}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 mb-6 border border-gray-100/50 dark:border-gray-700/50">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-400 to-amber-400 inline-block" />
              申请状态分布
            </h3>
            <div className="flex items-end gap-6 h-28">
              {chartData.map((d) => (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                  <span className={`text-sm font-bold ${d.textColor}`}>{d.value}</span>
                  <div className="w-full flex items-end justify-center">
                    <div
                      className={`bg-gradient-to-t ${d.gradient} w-full rounded-t-xl transition-all duration-700`}
                      style={{ height: `${(d.value / maxVal) * 80}px`, minHeight: d.value > 0 ? "8px" : "0px" }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Applicant list */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-100/50 dark:border-gray-700/50">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
              <h2 className="font-bold text-gray-900 dark:text-white">申请管理</h2>
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-sm bg-gray-50 dark:bg-gray-700 rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-300/30 dark:text-white dark:placeholder-gray-400 transition-all"
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
            <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {filtered.map((a) => {
                const config = statusConfig[a.status];
                return (
                  <div
                    key={a.id}
                    className="px-4 py-3 hover:bg-orange-50/50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors"
                    onClick={() => setSelectedApplicant(a)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-sm font-bold text-white shadow-sm`}>
                          {a.name[0]}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{a.name}</div>
                          <div className="text-xs text-gray-400 dark:text-gray-500">{a.club}</div>
                        </div>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${config.bg} ${config.text}`}>
                        {config.icon} {a.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1 ml-11">
                      <span className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-500 px-2 py-0.5 rounded-full font-medium">
                        {a.profile}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{a.time}</span>
                    </div>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div className="py-10 text-center text-gray-400 dark:text-gray-500">
                  <div className="text-3xl mb-2">🔍</div>
                  <p className="text-sm">没有找到符合条件的申请</p>
                </div>
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
            className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${statusConfig[selectedApplicant.status].gradient} flex items-center justify-center text-2xl font-bold text-white shadow-md`}>
                {selectedApplicant.name[0]}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{selectedApplicant.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedApplicant.club}</p>
              </div>
              <span className={`text-xs px-2.5 py-1.5 rounded-full font-semibold ${statusConfig[selectedApplicant.status].bg} ${statusConfig[selectedApplicant.status].text}`}>
                {statusConfig[selectedApplicant.status].icon} {selectedApplicant.status}
              </span>
            </div>

            <div className="space-y-3 mb-5 bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">申请时间</span>
                <span className="text-gray-900 dark:text-white font-medium">{selectedApplicant.time}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">性格类型</span>
                <span className="bg-orange-50 dark:bg-orange-900/20 text-orange-500 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {selectedApplicant.profile}
                </span>
              </div>
            </div>

            {selectedApplicant.status === "待审核" && (
              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(selectedApplicant.id, "已拒绝")}
                  className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl py-3 font-semibold text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                >
                  ❌ 拒绝
                </button>
                <button
                  onClick={() => updateStatus(selectedApplicant.id, "已通过")}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl py-3 font-semibold text-sm hover:from-green-600 hover:to-emerald-600 transition-all shadow-md"
                >
                  ✅ 通过
                </button>
              </div>
            )}
            {selectedApplicant.status !== "待审核" && (
              <button
                onClick={() => setSelectedApplicant(null)}
                className="w-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
