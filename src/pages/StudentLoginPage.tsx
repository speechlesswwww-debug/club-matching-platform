import { useNavigate } from "react-router-dom";

export function StudentLoginPage() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <button onClick={() => nav("/")} className="text-gray-400 dark:text-gray-500 mb-6 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          ← 返回
        </button>
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🎒</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">新生登录</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">这是一个演示版本</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 space-y-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">学号</label>
            <input
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400"
              placeholder="请输入你的学号"
              defaultValue="2024001234"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">密码</label>
            <input
              type="password"
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400"
              placeholder="请输入密码"
              defaultValue="demo123"
            />
          </div>
          <button
            onClick={() => nav("/student/home")}
            className="w-full bg-orange-500 text-white rounded-xl py-4 font-bold text-base hover:bg-orange-600 transition-colors"
          >
            以新生身份体验 Demo →
          </button>
          <p className="text-center text-xs text-gray-400 dark:text-gray-500">点击按钮即可直接体验，无需真实账号</p>
        </div>
      </div>
    </div>
  );
}
