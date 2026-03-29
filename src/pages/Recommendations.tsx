import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight, RefreshCw } from 'lucide-react'
import { clubs } from '../data/clubs'
import { getPersonalityType, matchClubs, AssessmentAnswers } from '../utils/matching'

const DEFAULT_ANSWERS: AssessmentAnswers = {
  interests: ['音乐', '摄影'],
  socialStyle: '喜欢大团体活动',
  timeCommitment: '2-5小时',
  goals: ['交朋友', '探索兴趣'],
  activityTypes: ['表演展示', '项目实践'],
  openToNew: '非常愿意',
  atmosphere: '轻松有趣',
  weekend: '参加活动'
}

function parseAnswers(raw: Record<number, string | string[]>): AssessmentAnswers {
  return {
    interests: (raw[0] as string[]) || DEFAULT_ANSWERS.interests,
    socialStyle: (raw[1] as string) || DEFAULT_ANSWERS.socialStyle,
    timeCommitment: (raw[2] as string) || DEFAULT_ANSWERS.timeCommitment,
    goals: (raw[3] as string[]) || DEFAULT_ANSWERS.goals,
    activityTypes: (raw[4] as string[]) || DEFAULT_ANSWERS.activityTypes,
    openToNew: (raw[5] as string) || DEFAULT_ANSWERS.openToNew,
    atmosphere: (raw[6] as string) || DEFAULT_ANSWERS.atmosphere,
    weekend: (raw[7] as string) || DEFAULT_ANSWERS.weekend
  }
}

export default function Recommendations() {
  const navigate = useNavigate()

  const savedRaw = sessionStorage.getItem('assessmentAnswers')
  const answers = savedRaw ? parseAnswers(JSON.parse(savedRaw)) : DEFAULT_ANSWERS

  const personality = getPersonalityType(answers)
  const matches = matchClubs(answers, clubs)
  const recommendedClubs = matches.map(m => ({
    ...m,
    club: clubs.find(c => c.id === m.clubId)!
  })).filter(m => m.club)

  return (
    <div className="min-h-screen px-4 py-6 max-w-md mx-auto pb-10" style={{ backgroundColor: '#FFF8F5' }}>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/student/home')} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">个性化推荐结果</h1>
      </div>

      {/* Personality card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-5 border border-orange-50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: '#FFF0E8' }}>🎯</div>
          <div>
            <div className="text-xs text-gray-400">你的社团匹配画像</div>
            <div className="font-bold text-gray-800 text-lg" style={{ color: '#F97316' }}>{personality.type}</div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-3">{personality.description}</p>
        <div className="flex flex-wrap gap-2">
          {personality.tags.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: '#FFF0E8', color: '#F97316' }}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="font-bold text-gray-800 mb-3">🌟 Top 5 推荐社团</div>

      <div className="space-y-3 mb-6">
        {recommendedClubs.map((item, idx) => (
          <div key={item.clubId} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
                  {idx + 1}
                </div>
                <span className="font-bold text-gray-800">{item.club.name}</span>
              </div>
              <span className="text-sm font-bold" style={{ color: '#F97316' }}>{item.score}% 匹配</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">{item.reason}</p>
            <button
              onClick={() => navigate(`/student/club/${item.clubId}`)}
              className="flex items-center gap-1 text-xs font-medium" style={{ color: '#F97316' }}
            >
              查看详情 <ChevronRight size={12} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate('/student/assessment')}
          className="flex-1 py-3 rounded-xl border font-medium text-sm flex items-center justify-center gap-2 text-gray-600 bg-white border-gray-200 hover:border-orange-300"
        >
          <RefreshCw size={14} /> 重新测评
        </button>
        <button
          onClick={() => navigate('/student/home')}
          className="flex-1 py-3 rounded-xl text-white font-medium text-sm shadow-sm hover:shadow-md"
          style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}
        >
          浏览更多社团
        </button>
      </div>
    </div>
  )
}
