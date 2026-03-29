import { useNavigate } from 'react-router-dom'
import { Users, Shield } from 'lucide-react'

export default function IdentitySelect() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#FFF8F5' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>J</div>
            <span className="text-2xl font-bold text-gray-800">JoinU</span>
          </div>
          <p className="text-gray-500 text-sm">找到属于你的社团</p>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/student/login')}
            className="w-full bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#FFF0E8' }}>
                <Users size={28} style={{ color: '#F97316' }} />
              </div>
              <div>
                <div className="font-bold text-gray-800 text-lg">我是新生</div>
                <div className="text-gray-500 text-sm mt-1">探索社团，找到兴趣圈子</div>
              </div>
            </div>
          </button>
          <button
            onClick={() => navigate('/admin/login')}
            className="w-full bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#FFF0E8' }}>
                <Shield size={28} style={{ color: '#F97316' }} />
              </div>
              <div>
                <div className="font-bold text-gray-800 text-lg">我是社团管理者</div>
                <div className="text-gray-500 text-sm mt-1">管理社团，筛选优秀申请人</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
