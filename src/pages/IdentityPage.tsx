import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export function IdentityPage() {
  const nav = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-200/40 dark:bg-orange-900/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-200/40 dark:bg-amber-900/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-100/30 dark:bg-orange-900/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow flex items-center justify-center text-xl hover:scale-110 transition-transform z-10"
        aria-label="切换深色模式"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce-slow">🎓</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">JoinU</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-base">智能社团匹配平台</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => nav("/student/login")}
            className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 text-left hover:shadow-xl hover:scale-[1.02] transition-all duration-200 border border-orange-100 dark:border-orange-900/30 group"
          >
            <div className="text-3xl mb-2">🎒</div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">我是新生</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">发现属于你的社团，开启精彩校园生活</p>
          </button>

          <button
            onClick={() => nav("/admin/login")}
            className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 text-left hover:shadow-xl hover:scale-[1.02] transition-all duration-200 border border-gray-100 dark:border-gray-700 group"
          >
            <div className="text-3xl mb-2">🏛️</div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">我是社团管理者</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">管理社团信息，查看申请，招募优秀成员</p>
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-10">JoinU © 2024 · 智能社团匹配平台</p>
      </div>
    </div>
  );
}
