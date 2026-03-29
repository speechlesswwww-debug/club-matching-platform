import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Users, Clock, Star, Heart, ChevronRight } from 'lucide-react'
import { clubs } from '../data/clubs'

export default function ClubDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const club = clubs.find(c => c.id === id) || clubs[0]

  return (
    <div className="min-h-screen max-w-md mx-auto pb-24" style={{ backgroundColor: '#FFF8F5' }}>
      {/* Cover */}
      <div className="relative">
        <img src={club.coverImage} alt={club.name} className="w-full h-52 object-cover" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow-sm"
        >
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        {club.isRecruiting && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">招新中</div>
        )}
      </div>

      <div className="px-4 py-5">
        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">
            {club.category === '文艺' ? '🎵' : club.category === '体育' ? '⚽' : club.category === '公益' ? '💛' : club.category === '学术' ? '📚' : club.category === '科技创新' ? '💻' : '🚀'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{club.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FFF0E8', color: '#F97316' }}>{club.category}</span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Users size={11} /> {club.memberCount} 社员
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-5">
          {club.tags.map(t => (
            <span key={t} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: '#FFF0E8', color: '#F97316' }}>{t}</span>
          ))}
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-1 text-xs text-gray-400 mb-1"><Clock size={12} /> 每周投入</div>
            <div className="font-bold text-gray-800">{club.hoursPerWeek} 小时</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-1 text-xs text-gray-400 mb-1"><Star size={12} /> 零基础友好</div>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} fill={i <= club.beginnerFriendly ? '#F97316' : 'none'} stroke={i <= club.beginnerFriendly ? '#F97316' : '#ddd'} />
              ))}
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          <Section title="社团简介">
            <p className="text-sm text-gray-600">{club.description}</p>
          </Section>

          <Section title="核心活动">
            <div className="space-y-1">
              {club.activities.map(a => (
                <div key={a} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#F97316' }} />
                  {a}
                </div>
              ))}
            </div>
          </Section>

          <Section title="社团氛围">
            <p className="text-sm text-gray-600">{club.atmosphere}</p>
          </Section>

          <Section title="招新流程">
            <div className="flex items-center gap-2 flex-wrap">
              {club.recruitmentProcess.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>{i + 1}</div>
                    <span className="text-sm text-gray-700">{step}</span>
                  </div>
                  {i < club.recruitmentProcess.length - 1 && <ChevronRight size={14} className="text-gray-300" />}
                </div>
              ))}
            </div>
          </Section>

          <Section title="本轮招新方向">
            <div className="flex flex-wrap gap-2">
              {club.recruitmentDirections.map(d => (
                <span key={d} className="text-sm px-3 py-1 rounded-full border font-medium" style={{ borderColor: '#F97316', color: '#F97316' }}>{d}</span>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-4 py-3 flex gap-3">
        <button className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:border-orange-300">
          <Heart size={18} className="text-gray-400" />
        </button>
        <button
          onClick={() => navigate(`/student/apply/${club.id}`)}
          className="flex-1 py-3 rounded-xl text-white font-bold shadow-md hover:shadow-lg transition-all"
          style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}
        >
          申请加入
        </button>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h3 className="font-bold text-gray-800 mb-3">{title}</h3>
      {children}
    </div>
  )
}
