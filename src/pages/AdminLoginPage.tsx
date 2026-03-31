import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ToastContainer";

export function AdminLoginPage() {
  const nav = useNavigate();
  const { toasts, addToast, removeToast } = useToast();
  const [showForgot, setShowForgot] = useState(false);
  const [forgotAccount, setForgotAccount] = useState("");
  const [forgotPhone, setForgotPhone] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
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
          <div className="text-right">
            <button
              onClick={() => setShowForgot(true)}
              className="text-xs text-gray-400 dark:text-gray-500 hover:text-orange-500 transition-colors"
            >
              忘记密码？
            </button>
          </div>
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

      {/* Forgot Password Modal */}
      {showForgot && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowForgot(false)}
        >
          <div
            className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">🔑 找回密码</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mb-5">请联系平台管理员重置密码</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">账号</label>
                <input
                  value={forgotAccount}
                  onChange={(e) => setForgotAccount(e.target.value)}
                  placeholder="输入管理员账号"
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300/40 focus:border-gray-400"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">手机号</label>
                <input
                  value={forgotPhone}
                  onChange={(e) => setForgotPhone(e.target.value)}
                  placeholder="输入注册手机号"
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300/40 focus:border-gray-400"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowForgot(false)}
                className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  addToast("验证码已发送（Demo模式）", "info");
                }}
                className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl py-3 text-sm font-bold hover:from-gray-800 hover:to-gray-900 transition-all shadow-md"
              >
                发送验证码
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
