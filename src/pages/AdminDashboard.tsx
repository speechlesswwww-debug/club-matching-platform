import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, X, ChevronUp, ChevronDown } from 'lucide-react'
import { applicants } from '../data/applicants'

const statusConfig = {
  submitted: { label: '已提交', bg: '#E0F2FE', color: '#0284C7' },
  viewed: { label: '已查看', bg: '#FEF9C3', color: '#CA8A04' },
  interview: { label: '待面试', bg: '#FFF0E8', color: '#F97316' },
  accepted: { label: '已录取', bg: '#DCFCE7', color: '#16A34A' },
  rejected: { label: '未通过', bg: '#FEE2E2', color: '#DC2626' }
}

type SortDir = 'asc' | 'desc'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [selectedApp, setSelectedApp] = useState<typeof applicants[0] | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sorted = [...applicants].sort((a, b) =>
    sortDir === 'desc' ? b.matchScore - a.matchScore : a.matchScore - b.matchScore
  )

  const stats = [
    { label: '总浏览量', value: '1,234', emoji: '👁' },
    { label: '申请总量', value: '89', emoji: '📝' },
    { label: '待处理', value: '23', emoji: '⏳' },
    { label: '高匹配', value: '15', emoji: '⭐' }
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF8F5' }}>
      {/* Mobile sidebar toggle */}
      <div className="max-w-5xl mx-auto flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-20 w-56 bg-white shadow-lg transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:shadow-none md:border-r md:border-gray-100`}>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>J</div>
              <span className="font-bold text-gray-800">JoinU 管理端</span>
            </div>
            <nav className="space-y-1">
              {[
                { icon: LayoutDashboard, label: 'Dashboard', active: true },
                { icon: Users, label: '申请人管理', active: false }
              ].map(item => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${item.active ? 'text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                  style={item.active ? { background: 'linear-gradient(135deg, #F97316, #EA580C)' } : {}}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={() => navigate('/')}
                className="w-full text-left text-xs text-gray-400 hover:text-gray-600 px-3 py-2"
              >
                ← 返回前台
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-6 min-h-screen">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <button
                  className="md:hidden p-2 rounded-lg bg-white shadow-sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <LayoutDashboard size={16} className="text-gray-600" />
                </button>
                <h1 className="text-xl font-bold text-gray-800">欢迎回来！👋</h1>
              </div>
              <p className="text-sm text-gray-400 mt-0.5">编程极客社 · 2024 春季招新</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {stats.map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-2xl mb-2">{s.emoji}</div>
                <div className="text-2xl font-bold text-gray-800">{s.value}</div>
                <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Applicant table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-gray-50">
              <h2 className="font-bold text-gray-800">申请人列表</h2>
              <button
                onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-500 px-2 py-1 rounded-lg border border-gray-100"
              >
                匹配度排序
                {sortDir === 'desc' ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">申请人</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">专业</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">申请时间</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">匹配度</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">状态</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map(app => {
                    const s = statusConfig[app.status]
                    return (
                      <tr key={app.id} className="border-t border-gray-50 hover:bg-gray-50/50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-800">{app.name}</div>
                          <div className="text-xs text-gray-400">{app.grade}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{app.major}</td>
                        <td className="px-4 py-3 text-gray-400 text-xs">{app.appliedAt}</td>
                        <td className="px-4 py-3">
                          <span className="font-bold text-sm" style={{ color: '#F97316' }}>{app.matchScore}%</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: s.bg, color: s.color }}>{s.label}</span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="text-xs font-medium hover:underline" style={{ color: '#F97316' }}
                          >
                            查看详情
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedApp(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">申请人详情</h3>
              <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-400">姓名</div>
                  <div className="font-medium">{selectedApp.name}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-400">匹配度</div>
                  <div className="font-bold text-lg" style={{ color: '#F97316' }}>{selectedApp.matchScore}%</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-400">年级</div>
                  <div className="font-medium">{selectedApp.grade}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-400">专业</div>
                  <div className="font-medium">{selectedApp.major}</div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-sm">
                <div className="text-xs text-gray-400 mb-1">联系方式</div>
                <div>{selectedApp.contact}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-sm">
                <div className="text-xs text-gray-400 mb-1">自我介绍</div>
                <div className="text-gray-600 text-sm">{selectedApp.introduction}</div>
              </div>
              <div className="flex gap-2 pt-1">
                <button className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-orange-300">
                  标记已查看
                </button>
                <button className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium shadow-sm" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
                  邀请面试
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-10 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
