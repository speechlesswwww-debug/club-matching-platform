import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assessmentQuestions, profileTypes } from "../data";
import { getProfileFromKeywords } from "../matching";
import { BottomNav } from "../components/BottomNav";
import { useAssessmentResult } from "../hooks/useAssessmentResult";

type Phase = "intro" | "quiz" | "done";

export function AssessmentPage() {
  const nav = useNavigate();
  const { saveResult } = useAssessmentResult();
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const question = assessmentQuestions[currentQ];
  const progress = ((currentQ + 1) / assessmentQuestions.length) * 100;

  function handleOption(keywords: string[], idx: number) {
    setSelectedOption(idx);
    setTimeout(() => {
      const newKeywords = [...selectedKeywords, ...keywords];
      if (currentQ < assessmentQuestions.length - 1) {
        setSelectedKeywords(newKeywords);
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
      } else {
        const profileType = getProfileFromKeywords(newKeywords);
        const profileInfo = profileTypes[profileType] || { emoji: "🌟", desc: "综合型人才" };
        saveResult({
          profileType,
          profileEmoji: profileInfo.emoji,
          profileDescription: profileInfo.desc,
          keywords: newKeywords,
        });
        nav("/student/recommendations", { state: { keywords: newKeywords, profile: profileType } });
      }
    }, 350);
  }

  if (phase === "intro") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-200/40 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-200/40 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="w-full max-w-md text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 to-amber-400 shadow-lg mb-6 animate-bounce-slow">
            <span className="text-4xl">🧩</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">AI 性格测评</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            通过 {assessmentQuestions.length} 道精心设计的问题，<br />
            我们将为你分析个人特质，推荐最适合你的社团。
          </p>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-5 mb-8 space-y-4 text-left shadow-sm border border-white/50 dark:border-gray-700/50">
            {[
              { icon: "⏱️", label: "预计用时", value: "3-5 分钟" },
              { icon: "📝", label: "共", value: `${assessmentQuestions.length} 道问题` },
              { icon: "🎯", label: "个性化推荐", value: "Top 5 社团" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <span className="text-xl w-8 text-center">{icon}</span>
                <span>{label}</span>
                <strong className="text-gray-900 dark:text-white ml-auto">{value}</strong>
              </div>
            ))}
          </div>
          <button
            onClick={() => setPhase("quiz")}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl py-4 font-bold text-base hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 animate-pulse-glow"
          >
            开始测评 ✨
          </button>
          <button
            onClick={() => nav("/student/home")}
            className="mt-3 text-gray-400 dark:text-gray-500 text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            稍后再说
          </button>
        </div>
        <BottomNav active="assessment" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-orange-50/50 dark:bg-gray-900">
      {/* Gradient header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 pt-8 pb-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => nav("/student/home")} className="text-white/80 hover:text-white transition-colors">
              ←
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-white">AI 性格测评</h1>
              <p className="text-xs text-orange-100">
                第 {currentQ + 1} 题，共 {assessmentQuestions.length} 题
              </p>
            </div>
            <span className="text-sm font-bold text-white bg-white/20 px-3 py-1 rounded-full">{Math.round(progress)}%</span>
          </div>

          {/* Gradient progress bar */}
          <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 rounded-full bg-white transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step dots */}
          <div className="flex gap-1 mt-3 overflow-x-auto pb-1">
            {assessmentQuestions.map((_, i) => (
              <div
                key={i}
                className={`flex-shrink-0 h-1 rounded-full transition-all duration-300 ${
                  i < currentQ
                    ? "bg-white w-4"
                    : i === currentQ
                    ? "bg-white w-6"
                    : "bg-white/30 w-3"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pt-5">
        {/* Question card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-6 mb-5 border border-orange-50 dark:border-gray-700">
          <div className="text-4xl mb-4 text-center">🤔</div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white text-center leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOption(opt.keywords, idx)}
              disabled={selectedOption !== null}
              className={`w-full rounded-2xl p-4 text-left transition-all duration-200 border-2 ${
                selectedOption === idx
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 border-transparent shadow-md scale-[0.98]"
                  : selectedOption !== null
                  ? "bg-white dark:bg-gray-800 opacity-50 border-transparent"
                  : "bg-white dark:bg-gray-800 border-transparent hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-md hover:scale-[1.01]"
              }`}
              style={selectedOption === null ? { boxShadow: "0 2px 8px rgba(0,0,0,0.06)" } : undefined}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex w-8 h-8 rounded-full text-xs font-bold items-center justify-center flex-shrink-0 transition-all ${
                    selectedOption === idx
                      ? "bg-white text-orange-500 scale-110"
                      : "bg-orange-50 dark:bg-orange-900/20 text-orange-500"
                  }`}
                >
                  {selectedOption === idx ? "✓" : String.fromCharCode(65 + idx)}
                </span>
                <span
                  className={`text-sm font-medium ${
                    selectedOption === idx
                      ? "text-white"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {opt.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <BottomNav active="assessment" />
    </div>
  );
}
