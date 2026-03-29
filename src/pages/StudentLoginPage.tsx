import { useNavigate } from "react-router-dom";

export function StudentLoginPage() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-orange-200/40 dark:bg-orange-900/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-amber-200/40 dark:bg-amber-900/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/4 left-4 text-4xl opacity-10 animate-float">🎒</div>
        <div className="absolute bottom-1/4 right-4 text-3xl opacity-10 animate-float" style={{ animationDelay: "1s" }}>🎓</div>
        <div className="absolute top-16 left-1/3 text-2xl opacity-10 animate-float" style={{ animationDelay: "2s" }}>✨</div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <button onClick={() => nav("/")} className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 mb-6 hover:text-orange-500 transition-colors group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-sm">返回</span>
        </button>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-400 shadow-lg mb-4 animate-bounce-slow">
            <span className="text-2xl">🎒</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">新生登录</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">欢迎加入 JoinU 校园社团平台</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 space-y-4 border border-white/50 dark:border-gray-700/50">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">学号</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🎫</span>
              <input
                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl pl-9 pr-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                placeholder="请输入你的学号"
                defaultValue="2024001234"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">密码</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
              <input
                type="password"
                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl pl-9 pr-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                placeholder="请输入密码"
                defaultValue="demo123"
              />
            </div>
          </div>
          <button
            onClick={() => nav("/student/home")}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl py-4 font-bold text-base hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 animate-pulse-glow"
          >
            开始体验 Demo →
          </button>
          <p className="text-center text-xs text-gray-400 dark:text-gray-500">点击按钮即可直接体验，无需真实账号</p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            { icon: "🤖", text: "AI 智能匹配" },
            { icon: "🎯", text: "精准推荐" },
            { icon: "⚡", text: "快速申请" },
          ].map(({ icon, text }) => (
            <div key={text} className="bg-white/60 dark:bg-gray-800/60 rounded-2xl py-3 px-2">
              <div className="text-xl mb-1">{icon}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
