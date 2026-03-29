import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { applicants } from '../data/applicants'

const statusConfig = {
  submitted: { label: '已提交', bg: '#E0F2FE', color: '#0284C7' },
  viewed: { label: '已查看', bg: '#FEF9C3', color: '#CA8A04' },
  interview: { label: '待面试', bg: '#FFF0E8', color: '#F97316' },
  accepted: { label: '已录取', bg: '#DCFCE7', color: '#16A34A' },
  rejected: { label: '未通过', bg: '#FEE2E2', color: '#DC2626' }
}

export default function Applications() {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="min-h-screen px-4 py-6 max-w-md mx-auto" style={{ backgroundColor: '#FFF8F5' }}>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate('/student/home')} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">我的申请</h1>
        <span className="ml-auto text-xs text-gray-400">{applicants.length} 条记录</span>
      </div>

      <div className="space-y-3">
        {applicants.map(app => {
          const s = statusConfig[app.status]
          const isExpanded = expanded === app.id
          return (
            <div key={app.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                className="w-full p-4 text-left"
                onClick={() => setExpanded(isExpanded ? null : app.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-800">{app.clubName}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{app.appliedAt}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: s.bg, color: s.color }}>{s.label}</span>
                    {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-50 pt-3">
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div><span className="text-gray-400">申请人：</span><span className="text-gray-700">{app.name}</span></div>
                    <div><span className="text-gray-400">专业：</span><span className="text-gray-700">{app.major}</span></div>
                    <div><span className="text-gray-400">年级：</span><span className="text-gray-700">{app.grade}</span></div>
                    <div><span className="text-gray-400">匹配度：</span><span style={{ color: '#F97316' }} className="font-bold">{app.matchScore}%</span></div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3 bg-gray-50 rounded-xl p-3">
                    {app.introduction}
                  </div>
                  <button
                    onClick={() => navigate(`/student/club/${app.clubId}`)}
                    className="text-xs font-medium" style={{ color: '#F97316' }}
                  >
                    查看社团详情 →
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
