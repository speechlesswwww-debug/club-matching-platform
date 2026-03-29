import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'

const questions = [
  {
    id: 1,
    title: '你对哪些领域最感兴趣？',
    type: 'multi',
    options: ['音乐', '舞蹈', '运动', '编程', '摄影', '辩论', '公益', '创业', '写作', '手工']
  },
  {
    id: 2,
    title: '你更偏向哪种社交风格？',
    type: 'single',
    options: ['喜欢大团体活动', '喜欢小组协作', '都可以']
  },
  {
    id: 3,
    title: '你每周能投入多少时间？',
    type: 'single',
    options: ['2小时以下', '2-5小时', '5-10小时', '10小时以上']
  },
  {
    id: 4,
    title: '加入社团的主要目标？',
    type: 'multi',
    options: ['交朋友', '学技能', '丰富简历', '探索兴趣', '找到归属感']
  },
  {
    id: 5,
    title: '你更喜欢什么活动形式？',
    type: 'multi',
    options: ['比赛竞技', '表演展示', '日常训练', '项目实践', '讲座分享']
  },
  {
    id: 6,
    title: '你是否愿意尝试完全没接触过的领域？',
    type: 'single',
    options: ['非常愿意', '可以考虑', '更倾向已有兴趣']
  },
  {
    id: 7,
    title: '你偏好什么样的社团氛围？',
    type: 'single',
    options: ['轻松有趣', '严谨专业', '热血拼搏', '温暖治愈']
  },
  {
    id: 8,
    title: '周末你最可能在做什么？',
    type: 'single',
    options: ['宅在宿舍', '户外运动', '泡图书馆', '参加活动', '和朋友聚会']
  }
]

export default function Assessment() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [loading, setLoading] = useState(false)

  const question = questions[step]
  const currentAnswer = answers[step]
  const isMulti = question.type === 'multi'

  function toggleMulti(option: string) {
    const cur = (currentAnswer as string[] | undefined) || []
    if (cur.includes(option)) {
      setAnswers({ ...answers, [step]: cur.filter(o => o !== option) })
    } else {
      setAnswers({ ...answers, [step]: [...cur, option] })
    }
  }

  function selectSingle(option: string) {
    setAnswers({ ...answers, [step]: option })
  }

  function canNext() {
    if (isMulti) return (currentAnswer as string[] | undefined)?.length
    return !!currentAnswer
  }

  function handleNext() {
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setLoading(true)
      sessionStorage.setItem('assessmentAnswers', JSON.stringify(answers))
      setTimeout(() => {
        navigate('/student/recommendations')
      }, 2000)
    }
  }

  const progress = ((step + 1) / questions.length) * 100

  return (
    <div className="min-h-screen px-4 py-6 max-w-md mx-auto" style={{ backgroundColor: '#FFF8F5' }}>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => step > 0 ? setStep(step - 1) : navigate('/student/home')} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>第 {step + 1} 题</span>
            <span>{step + 1}/{questions.length}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(to right, #F97316, #EA580C)' }}
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 leading-snug">{question.title}</h2>
        {isMulti && <p className="text-sm text-gray-400 mt-1">可多选</p>}
      </div>

      <div className="space-y-3 mb-8">
        {question.options.map(option => {
          const selected = isMulti
            ? ((currentAnswer as string[] | undefined) || []).includes(option)
            : currentAnswer === option
          return (
            <button
              key={option}
              onClick={() => isMulti ? toggleMulti(option) : selectSingle(option)}
              className={`w-full py-3 px-4 rounded-xl text-sm font-medium text-left transition-all border ${
                selected ? 'border-orange-400 text-orange-500' : 'bg-white border-gray-100 text-gray-700 hover:border-orange-200'
              }`}
              style={selected ? { backgroundColor: '#FFF0E8' } : {}}
            >
              {option}
            </button>
          )
        })}
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4 animate-spin">⚙️</div>
          <div className="font-bold text-gray-800">正在生成你的画像...</div>
          <div className="text-sm text-gray-500 mt-2">AI 分析中，请稍候</div>
        </div>
      ) : (
        <button
          onClick={handleNext}
          disabled={!canNext()}
          className={`w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 transition-all ${
            canNext() ? 'shadow-md hover:shadow-lg' : 'opacity-40 cursor-not-allowed'
          }`}
          style={canNext() ? { background: 'linear-gradient(135deg, #F97316, #EA580C)' } : { backgroundColor: '#ccc' }}
        >
          {step === questions.length - 1 ? '生成我的画像 ✨' : '下一题'}
          {step < questions.length - 1 && <ChevronRight size={18} />}
        </button>
      )}
    </div>
  )
}
