import { useState } from "react";

interface OnboardingGuideProps {
  onComplete: () => void;
}

const STEPS = [
  {
    emoji: "🏠",
    title: "浏览社团",
    desc: "在首页发现各类校园社团，按分类浏览或搜索你感兴趣的方向",
    color: "from-orange-500 to-amber-500",
  },
  {
    emoji: "✨",
    title: "AI测评匹配",
    desc: "完成3分钟趣味测评，AI帮你找到最适合你个性的社团",
    color: "from-purple-500 to-pink-500",
  },
  {
    emoji: "📝",
    title: "一键申请",
    desc: "看到心仪的社团？填写简单的申请表即可加入，全程无需线下跑腿",
    color: "from-blue-500 to-cyan-500",
  },
  {
    emoji: "📋",
    title: "追踪进度",
    desc: "随时查看申请状态，掌握审核动态，第一时间获知结果",
    color: "from-green-500 to-emerald-500",
  },
];

export function OnboardingGuide({ onComplete }: OnboardingGuideProps) {
  const [step, setStep] = useState(0);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Gradient top */}
        <div className={`bg-gradient-to-br ${current.color} p-8 text-center`}>
          <div className="text-6xl mb-4 animate-bounce-slow">{current.emoji}</div>
          <h2 className="text-2xl font-extrabold text-white">{current.title}</h2>
        </div>

        {/* Content */}
        <div className="px-6 pt-6 pb-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{current.desc}</p>
        </div>

        {/* Step dots */}
        <div className="flex justify-center gap-2 pb-4">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? "bg-orange-500 w-6" : "bg-gray-200 dark:bg-gray-600 w-2"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 px-6 pb-6">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              上一步
            </button>
          )}
          <button
            onClick={() => {
              if (isLast) {
                onComplete();
              } else {
                setStep((s) => s + 1);
              }
            }}
            className={`flex-1 bg-gradient-to-r ${current.color} text-white rounded-xl py-3 text-sm font-bold hover:opacity-90 transition-all shadow-md`}
          >
            {isLast ? "🚀 开始探索" : "下一步 →"}
          </button>
        </div>

        {/* Skip */}
        <button
          onClick={onComplete}
          className="w-full text-center text-xs text-gray-400 dark:text-gray-500 pb-4 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          跳过引导
        </button>
      </div>
    </div>
  );
}
