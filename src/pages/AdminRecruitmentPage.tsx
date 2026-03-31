import { useNavigate } from "react-router-dom";
import { clubs, adminApplicants } from "../data";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ToastContainer";

const club = clubs[0];

const directions = [
  { name: "女高音声部", target: 8, applied: 5 },
  { name: "男低音声部", target: 6, applied: 4 },
  { name: "钢琴伴奏组", target: 3, applied: 2 },
];

const TARGET_TRAITS = ["有音乐基础", "热爱合唱", "团队精神强", "时间充裕", "表达力好", "学习意愿强"];

export function AdminRecruitmentPage() {
  const nav = useNavigate();
  const { toasts, addToast, removeToast } = useToast();

  const totalApplicants = adminApplicants.filter((a) => a.clubId === club.id).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-4 pt-8 pb-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => nav("/admin/dashboard")}
            className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 mb-4 hover:text-orange-500 transition-colors group text-sm"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            返回仪表盘
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">招募管理</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{club.name}</p>
            </div>
            <button
              onClick={() => addToast("新一轮招募已发布（Demo模式）", "success")}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs px-4 py-2 rounded-xl font-bold hover:from-orange-600 hover:to-amber-600 transition-all shadow-md"
            >
              📢 发布新招募
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-5 space-y-4">
        {/* Current recruitment status */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-5 text-white shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse inline-block" />
            <span className="text-sm font-semibold">秋季纳新 · 进行中</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-extrabold">{totalApplicants}</p>
              <p className="text-xs text-orange-100 mt-0.5">已收到申请</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-extrabold">{directions.reduce((s, d) => s + d.target, 0)}</p>
              <p className="text-xs text-orange-100 mt-0.5">目标人数</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3 text-center">
              <p className="text-sm font-bold">{club.recruitmentDeadline || "2025-10-15"}</p>
              <p className="text-xs text-orange-100 mt-0.5">截止日期</p>
            </div>
          </div>
        </div>

        {/* Recruitment directions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 border border-gray-100/50 dark:border-gray-700/50">
          <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-400 to-amber-400 inline-block" />
            招募方向进度
          </h2>
          <div className="space-y-4">
            {directions.map((dir) => {
              const pct = Math.round((dir.applied / dir.target) * 100);
              return (
                <div key={dir.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{dir.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {dir.applied}/{dir.target} 人
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 text-right">{pct}% 完成</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recruitment process timeline */}
        {club.recruitmentProcess && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 border border-gray-100/50 dark:border-gray-700/50">
            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-400 to-amber-400 inline-block" />
              招募流程时间线
            </h2>
            <div className="relative">
              <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 to-amber-300 dark:from-orange-700 dark:to-amber-700" />
              {club.recruitmentProcess.map((step, i) => (
                <div key={i} className="relative pl-9 pb-4 last:pb-0">
                  <div className={`absolute left-1 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${
                    i === 0 ? "bg-gradient-to-br from-orange-400 to-amber-400 text-white" : "bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-700 text-orange-500"
                  }`}>
                    {i + 1}
                  </div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 pt-0.5">{step}</p>
                  {i === 0 && (
                    <span className="text-xs text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-full mt-1 inline-block">
                      当前阶段
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Target traits */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 border border-gray-100/50 dark:border-gray-700/50">
          <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-400 to-amber-400 inline-block" />
            理想候选人特征
          </h2>
          <div className="flex flex-wrap gap-2">
            {TARGET_TRAITS.map((trait) => (
              <span
                key={trait}
                className="px-3 py-1.5 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/10 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium border border-orange-100 dark:border-orange-900/30"
              >
                ✓ {trait}
              </span>
            ))}
          </div>
          <button
            onClick={() => addToast("功能开发中，敬请期待", "info")}
            className="mt-4 w-full border border-dashed border-orange-300 dark:border-orange-700 text-orange-500 rounded-xl py-2.5 text-xs font-medium hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors"
          >
            + 编辑目标画像
          </button>
        </div>
      </div>
    </div>
  );
}
