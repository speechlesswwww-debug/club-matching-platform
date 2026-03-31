import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ToastContainer";

type ModalType = "register" | "forgot" | null;

export function StudentLoginPage() {
  const nav = useNavigate();
  const { toasts, addToast, removeToast } = useToast();
  const [modal, setModal] = useState<ModalType>(null);
  // Register form
  const [regStudentId, setRegStudentId] = useState("");
  const [regName, setRegName] = useState("");
  const [regMajor, setRegMajor] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  // Forgot form
  const [forgotStudentId, setForgotStudentId] = useState("");
  const [forgotPhone, setForgotPhone] = useState("");

  function handleRegister() {
    if (!regStudentId || !regName || !regMajor || !regPassword || !regConfirm) {
      addToast("请填写所有必填项", "error");
      return;
    }
    if (regPassword !== regConfirm) {
      addToast("两次密码不一致", "error");
      return;
    }
    addToast("注册成功！欢迎加入 JoinU", "success");
    setModal(null);
  }

  function handleForgotPassword() {
    if (!forgotStudentId || !forgotPhone) {
      addToast("请填写学号和手机号", "error");
      return;
    }
    addToast("验证码已发送（Demo模式）", "info");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
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
          {/* Register & Forgot */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setModal("register")}
              className="text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors"
            >
              还没有账号？注册
            </button>
            <button
              onClick={() => setModal("forgot")}
              className="text-xs text-gray-400 dark:text-gray-500 hover:text-orange-500 transition-colors"
            >
              忘记密码？
            </button>
          </div>
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

      {/* Register Modal */}
      {modal === "register" && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 text-center">📋 新生注册</h2>
            <div className="space-y-3">
              {[
                { label: "学号", value: regStudentId, setter: setRegStudentId, placeholder: "输入学号" },
                { label: "姓名", value: regName, setter: setRegName, placeholder: "输入真实姓名" },
                { label: "专业", value: regMajor, setter: setRegMajor, placeholder: "输入专业名称" },
              ].map(({ label, value, setter, placeholder }) => (
                <div key={label}>
                  <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">{label}</label>
                  <input
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    placeholder={placeholder}
                    className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">密码</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="设置密码"
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">确认密码</label>
                <input
                  type="password"
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  placeholder="再次输入密码"
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setModal(null)}
                className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleRegister}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl py-3 text-sm font-bold hover:from-orange-600 hover:to-amber-600 transition-all shadow-md"
              >
                注册
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {modal === "forgot" && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">🔑 找回密码</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mb-5">验证身份后重置密码</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">学号</label>
                <input
                  value={forgotStudentId}
                  onChange={(e) => setForgotStudentId(e.target.value)}
                  placeholder="输入你的学号"
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">手机号</label>
                <input
                  value={forgotPhone}
                  onChange={(e) => setForgotPhone(e.target.value)}
                  placeholder="输入注册时的手机号"
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setModal(null)}
                className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleForgotPassword}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl py-3 text-sm font-bold hover:from-orange-600 hover:to-amber-600 transition-all shadow-md"
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
