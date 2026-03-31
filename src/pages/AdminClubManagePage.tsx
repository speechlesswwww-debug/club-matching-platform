import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clubs } from "../data";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ToastContainer";

export function AdminClubManagePage() {
  const nav = useNavigate();
  const { toasts, addToast, removeToast } = useToast();
  const club = clubs[0]; // Use 星韵合唱团 as demo
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(club.name);
  const [tags, setTags] = useState(club.tags.join("、"));
  const [desc, setDesc] = useState(club.description);

  function handleSave() {
    setEditMode(false);
    addToast("保存成功（Demo模式）", "success");
  }

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
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-2xl shadow-md">
              {club.logo || "🏛️"}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">社团管理</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{club.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-5 space-y-4">
        {/* Basic info card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 border border-gray-100/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-400 to-amber-400 inline-block" />
              基本信息
            </h2>
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="text-xs text-orange-500 border border-orange-200 dark:border-orange-800/50 px-3 py-1 rounded-full hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors font-medium"
              >
                ✏️ 编辑
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditMode(false); setName(club.name); setTags(club.tags.join("、")); }}
                  className="text-xs text-gray-500 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSave}
                  className="text-xs text-white bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 rounded-full hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm font-medium"
                >
                  保存
                </button>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">社团名称</label>
              {editMode ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400 transition-all"
                />
              ) : (
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{name}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">分类</label>
              <p className="text-sm text-gray-900 dark:text-white">{club.category}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1.5">标签</label>
              {editMode ? (
                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400 transition-all"
                  placeholder="用、分隔多个标签"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {club.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-full px-2.5 py-1 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 border border-gray-100/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-400 to-amber-400 inline-block" />
              社团介绍
            </h2>
            <button
              onClick={() => addToast("保存成功（Demo模式）", "success")}
              className="text-xs text-orange-500 border border-orange-200 dark:border-orange-800/50 px-3 py-1 rounded-full hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors font-medium"
            >
              保存
            </button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1.5">社团描述</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400 transition-all resize-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1.5">社团氛围</label>
              <p className="text-sm text-gray-600 dark:text-gray-400 bg-orange-50/50 dark:bg-orange-900/10 rounded-xl p-3">{club.atmosphere}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1.5">主要活动</label>
              <div className="space-y-1">
                {club.activities.map((act, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                    {act}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recruitment settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 border border-gray-100/50 dark:border-gray-700/50">
          <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-400 to-amber-400 inline-block" />
            招募设置
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1.5">招募方向</label>
              <div className="flex flex-wrap gap-2">
                {club.recruitmentDirections.map((dir) => (
                  <span key={dir} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full px-2.5 py-1 font-medium">
                    {dir}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1.5">目标人数</label>
                <input
                  type="number"
                  defaultValue={20}
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1.5">截止日期</label>
                <input
                  type="date"
                  defaultValue={club.recruitmentDeadline || "2025-10-15"}
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400"
                />
              </div>
            </div>
            {club.recruitmentProcess && (
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1.5">招募流程</label>
                <div className="space-y-1">
                  {club.recruitmentProcess.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-500 text-xs flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => addToast("保存成功（Demo模式）", "success")}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl py-3 text-sm font-bold hover:from-orange-600 hover:to-amber-600 transition-all shadow-md mt-2"
            >
              保存招募设置
            </button>
          </div>
        </div>

        {/* Custom questions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 border border-gray-100/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-400 to-amber-400 inline-block" />
              自定义问题管理
            </h2>
            <button
              onClick={() => addToast("功能开发中，敬请期待", "info")}
              className="text-xs text-white bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 rounded-full hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm font-medium"
            >
              + 添加问题
            </button>
          </div>
          <div className="space-y-2">
            {(club.structuredQuestions || []).map((q) => (
              <div key={q.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      q.type === "text" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-500" :
                      q.type === "single" ? "bg-green-100 dark:bg-green-900/30 text-green-500" :
                      "bg-purple-100 dark:bg-purple-900/30 text-purple-500"
                    }`}>
                      {q.type === "text" ? "文本" : q.type === "single" ? "单选" : "多选"}
                    </span>
                    {q.required && (
                      <span className="text-xs text-red-400 font-medium">必填</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{q.question}</p>
                  {q.options && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      选项：{q.options.join("、")}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => addToast("功能开发中，敬请期待", "info")}
                  className="text-xs text-gray-400 hover:text-red-400 transition-colors mt-1 flex-shrink-0"
                >
                  删除
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
