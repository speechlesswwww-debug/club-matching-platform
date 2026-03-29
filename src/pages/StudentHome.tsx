import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Sparkles, FileText, Home, Heart, Users, ChevronRight } from 'lucide-react'
import { clubs } from '../data/clubs'

const categories = ['全部', '文艺', '体育', '公益', '学术', '科技创新', '创业']

export default function StudentHome() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = clubs.filter(c => {
    const matchCat = activeCategory === '全部' || c.category === activeCategory
    const matchSearch = !searchQuery || c.name.includes(searchQuery) || c.tags.some(t => t.includes(searchQuery))
    return matchCat && matchSearch
  })

  const mockScores: Record<string, number> = {
    '1': 92, '2': 88, '3': 75, '4': 85, '5': 78, '6': 82,
    '7': 90, '8': 71, '9': 86, '10': 80, '11': 95, '12': 83
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF8F5' }}>
      <div className="max-w-md mx-auto pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur px-4 py-3 flex items-center justify-between border-b border-orange-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>J</div>
            <span className="font-bold text-gray-800">JoinU</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/student/applications')} className="flex items-center gap-1 text-xs text-gray-600 hover:text-orange-500">
              <FileText size={16} /> 我的申请
            </button>
            <button className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-sm font-bold">我</button>
          </div>
        </div>

        <div className="px-4">
          {/* Hero */}
          <div className="pt-6 pb-4">
            <h1 className="text-3xl font-bold text-gray-800 leading-tight">
              找到属于你的<br />
              <span style={{ color: '#F97316' }}>社团</span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm">500+ 个社团等你加入，开启精彩校园生活</p>
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="搜索社团名称或标签..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-white border border-gray-100 text-sm outline-none focus:border-orange-300 shadow-sm"
            />
          </div>

          {/* Path Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => navigate('/student/assessment')}
              className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100 text-left hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-2">✨</div>
              <div className="font-bold text-gray-800 text-sm">AI 智能推荐</div>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FFF0E8', color: '#F97316' }}>智能匹配</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FFF0E8', color: '#F97316' }}>3分钟测评</span>
              </div>
            </button>
            <button
              className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100 text-left hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-2">🔍</div>
              <div className="font-bold text-gray-800 text-sm">浏览所有社团</div>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FFF0E8', color: '#F97316' }}>500+社团</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FFF0E8', color: '#F97316' }}>即刻浏览</span>
              </div>
            </button>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-100'
                }`}
                style={activeCategory === cat ? { background: 'linear-gradient(135deg, #F97316, #EA580C)' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Club list */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base font-bold text-gray-800">🔥 热门社团</span>
            <span className="text-xs text-gray-400">{filtered.length} 个</span>
          </div>

          <div className="space-y-4">
            {filtered.map(club => (
              <button
                key={club.id}
                onClick={() => navigate(`/student/club/${club.id}`)}
                className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-50 hover:shadow-md transition-all text-left"
              >
                <div className="relative">
                  <img src={club.coverImage} alt={club.name} className="w-full h-40 object-cover" />
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-white/90 shadow-sm" style={{ color: '#F97316' }}>
                      {mockScores[club.id]}% 匹配
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-sm">
                      {club.category === '文艺' ? '🎵' : club.category === '体育' ? '⚽' : club.category === '公益' ? '💛' : club.category === '学术' ? '📚' : club.category === '科技创新' ? '💻' : '🚀'}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-sm">{club.name}</div>
                      <div className="text-xs text-gray-400">{club.category}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {club.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FFF0E8', color: '#F97316' }}>{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users size={12} />
                      <span>{club.memberCount} 名社员</span>
                    </div>
                    <div className="flex items-center gap-1" style={{ color: '#F97316' }}>
                      <span>{club.recruitmentDirections[0]} 等 {club.recruitmentDirections.length} 个招新方向</span>
                      <ChevronRight size={12} />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 max-w-md mx-auto">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center gap-0.5 py-1" style={{ color: '#F97316' }}>
            <Home size={20} />
            <span className="text-xs">首页</span>
          </button>
          <button onClick={() => navigate('/student/assessment')} className="flex flex-col items-center gap-0.5 py-1 text-gray-400 hover:text-orange-400">
            <Sparkles size={20} />
            <span className="text-xs">AI测评</span>
          </button>
          <button onClick={() => navigate('/student/applications')} className="flex flex-col items-center gap-0.5 py-1 text-gray-400 hover:text-orange-400">
            <FileText size={20} />
            <span className="text-xs">我的申请</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 py-1 text-gray-400 hover:text-orange-400">
            <Heart size={20} />
            <span className="text-xs">我的收藏</span>
          </button>
        </div>
      </div>
    </div>
  )
}
