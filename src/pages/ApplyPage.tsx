import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clubs } from "../data";
import { useApplications } from "../hooks/useApplications";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ToastContainer";

type Step = 1 | 2 | 3;

const STEP_ICONS = ["👤", "📝", "🎯"];

export function ApplyPage() {
  const { clubId } = useParams();
  const nav = useNavigate();
  const club = clubs.find((c) => c.id === clubId);
  const { addApplication } = useApplications();
  const { toasts, addToast, removeToast } = useToast();
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [intro, setIntro] = useState("");
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("大一");
  const [skills, setSkills] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  if (!club)
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50/50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
        社团不存在
      </div>
    );

  function validateStep1() {
    const e: Record<string, boolean> = {};
    if (!name.trim()) e.name = true;
    if (!major.trim()) e.major = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e: Record<string, boolean> = {};
    if (!intro.trim()) e.intro = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => (s + 1) as Step);
  }

  const handleSubmit = () => {
    if (!club) return;
    addApplication({
      clubId: club.id,
      clubName: club.name,
      status: "待审核",
      appliedAt: new Date().toISOString().split("T")[0],
    });
    addToast(`已成功申请加入 ${club.name}！`, "success");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-200/40 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-200/40 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="max-w-md w-full text-center relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-400 to-amber-400 shadow-xl mb-6 animate-bounce">
            <span className="text-5xl">🎉</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">申请已提交！</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            你已成功申请加入{" "}
            <span className="text-orange-500 font-semibold">{club.name}</span>
            <br />
            我们将在3-5个工作日内审核你的申请
          </p>
          <div className="bg-white/80 dark:bg-orange-900/20 backdrop-blur-sm rounded-2xl p-4 mb-6 text-sm text-orange-700 dark:text-orange-300 border border-orange-100 dark:border-orange-800/50">
            💡 可以在"我的申请"中查看审核进度
          </div>
          <button
            onClick={() => nav("/student/applications")}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl py-4 font-bold hover:from-orange-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            查看我的申请
          </button>
          <button
            onClick={() => nav("/student/home")}
            className="w-full mt-3 border border-gray-200 dark:border-gray-700 rounded-2xl py-3 text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const STEPS = ["基本信息", "自我介绍", "专项问题"];

  return (
    <div className="min-h-screen pb-8 bg-orange-50/50 dark:bg-gray-900">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Gradient header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 pt-8 pb-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => (step > 1 ? setStep((s) => (s - 1) as Step) : nav(-1))}
              className="text-white/80 hover:text-white transition-colors"
            >
              ←
            </button>
            <h1 className="text-lg font-bold text-white">申请加入 {club.name}</h1>
          </div>

          {/* Step indicator */}
          <div className="flex items-center">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                    i + 1 < step
                      ? "bg-white text-orange-500"
                      : i + 1 === step
                      ? "bg-white text-orange-500 ring-4 ring-white/30"
                      : "bg-white/30 text-white"
                  }`}
                >
                  {i + 1 < step ? "✓" : STEP_ICONS[i]}
                </div>
                <span className={`text-xs ml-1.5 ${i + 1 === step ? "text-white font-semibold" : "text-white/60"}`}>
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 rounded-full ${i + 1 < step ? "bg-white" : "bg-white/30"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pt-5">
        {/* Step 1: Basic info */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border border-gray-100/50 dark:border-gray-700/50">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
                姓名 <span className="text-red-400">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2.5 text-sm dark:bg-gray-900 dark:text-white transition-all duration-200 focus:outline-none focus:ring-2 ${
                  errors.name ? "border-red-400 focus:ring-red-200" : "border-gray-200 dark:border-gray-700 focus:ring-orange-300/40 focus:border-orange-400"
                }`}
                placeholder="你的真实姓名"
              />
              {errors.name && <p className="text-xs text-red-400 mt-1">请填写姓名</p>}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border border-gray-100/50 dark:border-gray-700/50">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
                专业 <span className="text-red-400">*</span>
              </label>
              <input
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2.5 text-sm dark:bg-gray-900 dark:text-white transition-all duration-200 focus:outline-none focus:ring-2 ${
                  errors.major ? "border-red-400 focus:ring-red-200" : "border-gray-200 dark:border-gray-700 focus:ring-orange-300/40 focus:border-orange-400"
                }`}
                placeholder="你的专业"
              />
              {errors.major && <p className="text-xs text-red-400 mt-1">请填写专业</p>}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border border-gray-100/50 dark:border-gray-700/50">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">年级</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400 transition-all"
              >
                {["大一", "大二", "大三", "大四", "研究生"].map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border border-gray-100/50 dark:border-gray-700/50">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">相关技能/经验</label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                rows={3}
                className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400 transition-all resize-none"
                placeholder="介绍你与该社团相关的技能或经历..."
              />
            </div>
            {/* Mock upload */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border border-gray-100/50 dark:border-gray-700/50">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">上传作品集（可选）</label>
              <div className="border-2 border-dashed border-orange-200 dark:border-orange-900/30 rounded-xl p-6 text-center text-gray-400 dark:text-gray-500 hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
                <div className="text-3xl mb-2">📎</div>
                <p className="text-sm">点击上传或拖拽文件</p>
                <p className="text-xs mt-1 text-gray-400">支持 PDF, JPG, PNG（演示模式）</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Self intro */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border border-gray-100/50 dark:border-gray-700/50">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
                自我介绍 <span className="text-red-400">*</span>
              </label>
              <textarea
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                rows={7}
                className={`w-full border rounded-xl px-3 py-2.5 text-sm dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 resize-none transition-all ${
                  errors.intro ? "border-red-400 focus:ring-red-200" : "border-gray-200 dark:border-gray-700 focus:ring-orange-300/40 focus:border-orange-400"
                }`}
                placeholder="简单介绍一下自己，你的兴趣爱好、加入该社团的动机..."
              />
              {errors.intro && <p className="text-xs text-red-400 mt-1">请填写自我介绍</p>}
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-400 dark:text-gray-500">建议 100-300 字</p>
                <p className={`text-xs font-medium ${intro.length >= 100 ? "text-green-500" : "text-gray-400"}`}>
                  {intro.length} 字
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Custom questions */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            {club.customQuestions.map((q, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 border border-gray-100/50 dark:border-gray-700/50">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 text-xs font-bold mr-1.5">{idx + 1}</span>
                  {q}
                </label>
                <textarea
                  value={answers[idx] || ""}
                  onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300/40 focus:border-orange-400 transition-all resize-none"
                  placeholder="请填写你的回答..."
                />
              </div>
            ))}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-6 flex gap-3">
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl py-4 font-bold text-base hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              下一步 →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl py-4 font-bold text-base hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 animate-pulse-glow"
            >
              提交申请 🎉
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
