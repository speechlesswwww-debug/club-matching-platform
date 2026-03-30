import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export function IdentityPage() {
  const nav = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-200/50 dark:bg-orange-900/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-200/50 dark:bg-amber-900/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-100/40 dark:bg-orange-900/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-16 left-8 text-3xl opacity-20 animate-float" style={{ animationDelay: "0.5s" }}>🎵</div>
      <div className="absolute top-32 right-10 text-2xl opacity-20 animate-float" style={{ animationDelay: "1.2s" }}>🏆</div>
      <div className="absolute bottom-32 left-6 text-2xl opacity-20 animate-float" style={{ animationDelay: "0.8s" }}>🎨</div>
      <div className="absolute bottom-16 right-8 text-3xl opacity-20 animate-float" style={{ animationDelay: "1.8s" }}>⚽</div>
      <div className="absolute top-1/2 left-4 text-xl opacity-15 animate-float" style={{ animationDelay: "2.2s" }}>📚</div>

      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 w-10 h-10 rounded-full glass shadow flex items-center justify-center text-xl hover:scale-110 transition-transform z-10"
        aria-label="切换深色模式"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-400 to-amber-400 shadow-lg mb-5 animate-bounce-slow">
            <span className="text-4xl">🎓</span>
          </div>
          <h1 className="text-5xl font-extrabold text-gradient mb-2">JoinU</h1>
          <p className="text-gray-500 dark:text-gray-400 text-base font-medium tracking-wide">智能社团匹配平台</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="w-8 h-0.5 bg-orange-200 dark:bg-orange-800 rounded" />
            <span className="text-xs text-gray-400 dark:text-gray-500">选择你的身份开始体验</span>
            <span className="w-8 h-0.5 bg-orange-200 dark:bg-orange-800 rounded" />
          </div>
        </div>

        {/* Identity cards */}
        <div className="space-y-4">
          <button
            onClick={() => nav("/student/login")}
            className="w-full bg-white dark:bg-gray-800 rounded-3xl p-6 text-left hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-orange-100 dark:border-orange-900/30 group relative overflow-hidden"
            style={{ boxShadow: "0 4px 20px rgba(249,115,22,0.08)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-2xl shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                🎒
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors mb-1">我是新生</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">发现属于你的社团，开启精彩校园生活</p>
              </div>
              <span className="text-orange-300 dark:text-orange-700 group-hover:text-orange-500 transition-colors text-xl">→</span>
            </div>
          </button>

          <button
            onClick={() => nav("/admin/login")}
            className="w-full bg-white dark:bg-gray-800 rounded-3xl p-6 text-left hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 dark:border-gray-700 group relative overflow-hidden"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center text-2xl shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                🏛️
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors mb-1">我是社团管理者</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">管理社团信息，查看申请，招募优秀成员</p>
              </div>
              <span className="text-gray-300 dark:text-gray-600 group-hover:text-orange-500 transition-colors text-xl">→</span>
            </div>
          </button>
        </div>

        {/* Features row */}
        <div className="flex justify-center gap-6 mt-8">
          {[
            { icon: "🤖", label: "AI 推荐" },
            { icon: "⚡", label: "快速匹配" },
            { icon: "🎯", label: "精准测评" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{icon}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{label}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-8">
          JoinU <span className="text-orange-300">©</span> 2025 · 智能社团匹配平台
        </p>
      </div>
    </div>
  );
}
