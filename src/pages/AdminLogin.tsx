import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#FFF8F5' }}>
      <div className="w-full max-w-sm">
        <button onClick={() => navigate('/')} className="flex items-center gap-1 text-gray-500 mb-6 hover:text-gray-700">
          <ArrowLeft size={16} /> 返回
        </button>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>J</div>
            <span className="text-xl font-bold text-gray-800">JoinU</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">管理者登录</h1>
          <p className="text-gray-500 text-sm mt-1">管理你的社团，发现优秀社员</p>
        </div>

        <button
          onClick={() => navigate('/admin/dashboard')}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg mb-6 shadow-md hover:shadow-lg transition-all"
          style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}
        >
          🎯 以管理者身份体验 Demo
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-400 text-sm">或使用账号登录</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <div className="space-y-3">
          <input
            type="email"
            placeholder="邮箱"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-orange-400 text-sm"
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-orange-400 text-sm"
          />
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="w-full py-3 rounded-xl text-white font-medium text-sm hover:opacity-90 transition-all"
            style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}
          >
            登录
          </button>
        </div>
      </div>
    </div>
  )
}
