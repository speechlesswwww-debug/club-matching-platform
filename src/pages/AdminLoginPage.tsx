import { useNavigate } from "react-router-dom";

export function AdminLoginPage() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-gray-200/40 dark:bg-gray-700/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-slate-200/40 dark:bg-gray-700/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/4 left-4 text-4xl opacity-10 animate-float">🏛️</div>
        <div className="absolute bottom-1/4 right-4 text-3xl opacity-10 animate-float" style={{ animationDelay: "1s" }}>📊</div>
        <div className="absolute top-16 right-1/3 text-2xl opacity-10 animate-float" style={{ animationDelay: "1.5s" }}>👥</div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <button onClick={() => nav("/")} className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 mb-6 hover:text-orange-500 transition-colors group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-sm">返回</span>
        </button>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 shadow-lg mb-4">
            <span className="text-2xl">🏛️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">管理端登录</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">社团管理者专属入口</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 space-y-4 border border-white/50 dark:border-gray-700/50">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">账号</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
              <input
                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl pl-9 pr-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400/40 focus:border-gray-400"
                placeholder="管理员账号"
                defaultValue="admin"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">密码</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
              <input
                type="password"
                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl pl-9 pr-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400/40 focus:border-gray-400"
                placeholder="密码"
                defaultValue="admin123"
              />
            </div>
          </div>
          <button
            onClick={() => nav("/admin/dashboard")}
            className="w-full bg-gradient-to-r from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 text-white rounded-xl py-4 font-bold text-base hover:from-gray-800 hover:to-gray-900 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            进入管理后台 →
          </button>
          <p className="text-center text-xs text-gray-400 dark:text-gray-500">点击按钮即可直接体验，无需真实账号</p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            { icon: "📊", text: "数据看板" },
            { icon: "📋", text: "申请管理" },
            { icon: "🏛️", text: "社团管理" },
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
