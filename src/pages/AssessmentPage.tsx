import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assessmentQuestions } from "../data";
import { getProfileFromKeywords } from "../matching";
import { BottomNav } from "../components/BottomNav";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Phase = "intro" | "quiz" | "done";

export function AssessmentPage() {
  const nav = useNavigate();
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [, setSavedProfile] = useLocalStorage<{ keywords: string[]; profile: string } | null>(
    "joinu_profile",
    null
  );

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
        const profile = getProfileFromKeywords(newKeywords);
        setSavedProfile({ keywords: newKeywords, profile });
        nav("/student/recommendations", { state: { keywords: newKeywords, profile } });
      }
    }, 350);
  }

  if (phase === "intro") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-orange-50/50 dark:bg-gray-900">
        <div className="w-full max-w-md text-center">
          <div className="text-6xl mb-6 animate-bounce-slow">🧩</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">AI 性格测评</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            通过 {assessmentQuestions.length} 道精心设计的问题，<br />
            我们将为你分析个人特质，推荐最适合你的社团。
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 mb-8 space-y-3 text-left shadow-sm">
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-xl">⏱️</span> 预计用时 <strong>3-5 分钟</strong>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-xl">📝</span> 共 <strong>{assessmentQuestions.length} 道</strong> 问题
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-xl">🎯</span> 个性化推荐 <strong>Top 5 社团</strong>
            </div>
          </div>
          <button
            onClick={() => setPhase("quiz")}
            className="w-full bg-orange-500 text-white rounded-2xl py-4 font-bold text-base hover:bg-orange-600 transition-colors"
          >
            开始测评 ✨
          </button>
          <button
            onClick={() => nav("/student/home")}
            className="mt-3 text-gray-400 dark:text-gray-500 text-sm hover:text-gray-600 dark:hover:text-gray-300"
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
      <div className="max-w-md mx-auto px-4 pt-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => nav("/student/home")} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            ←
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">AI 性格测评</h1>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              第 {currentQ + 1} 题，共 {assessmentQuestions.length} 题
            </p>
          </div>
          <span className="text-sm font-bold text-orange-500">{Math.round(progress)}%</span>
        </div>

        {/* Step indicator */}
        <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
          {assessmentQuestions.map((_, i) => (
            <div
              key={i}
              className={`flex-shrink-0 h-1.5 rounded-full transition-all duration-300 ${
                i < currentQ
                  ? "bg-orange-500 w-6"
                  : i === currentQ
                  ? "bg-orange-500 w-8"
                  : "bg-gray-200 dark:bg-gray-700 w-4"
              }`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-6">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">
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
              className={`w-full rounded-2xl shadow-sm p-4 text-left transition-all duration-200 ${
                selectedOption === idx
                  ? "bg-orange-500 border-orange-500 scale-[0.98]"
                  : selectedOption !== null
                  ? "bg-white dark:bg-gray-800 opacity-50 border-transparent"
                  : "bg-white dark:bg-gray-800 border-transparent hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 hover:scale-[1.01]"
              } border`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex w-7 h-7 rounded-full text-xs font-bold items-center justify-center flex-shrink-0 transition-colors ${
                    selectedOption === idx
                      ? "bg-white text-orange-500"
                      : "bg-orange-50 dark:bg-orange-900/20 text-orange-500"
                  }`}
                >
                  {selectedOption === idx ? "✓" : String.fromCharCode(65 + idx)}
                </span>
                <span
                  className={`text-sm ${
                    selectedOption === idx
                      ? "text-white font-medium"
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
