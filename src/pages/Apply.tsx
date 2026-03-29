import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { clubs } from '../data/clubs'

export default function Apply() {
  const { clubId } = useParams()
  const navigate = useNavigate()
  const club = clubs.find(c => c.id === clubId) || clubs[0]

  const [form, setForm] = useState({
    name: '',
    grade: '',
    major: '',
    contact: '',
    hoursPerWeek: '',
    introduction: '',
    customAnswers: {} as Record<number, string>
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    if (!form.name || !form.grade || !form.contact) return
    setSubmitted(true)
    setTimeout(() => navigate('/student/applications'), 2500)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 max-w-md mx-auto" style={{ backgroundColor: '#FFF8F5' }}>
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">申请已提交！</h2>
          <p className="text-gray-500 text-sm mb-1">你的申请已成功发送给</p>
          <p className="font-bold" style={{ color: '#F97316' }}>{club.name}</p>
          <p className="text-gray-400 text-xs mt-3">正在跳转到我的申请...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-6 max-w-md mx-auto pb-20" style={{ backgroundColor: '#FFF8F5' }}>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-800">申请加入</h1>
          <p className="text-xs text-gray-400">{club.name}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-gray-800">基本信息</h3>
          <input
            placeholder="姓名 *"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none focus:border-orange-300"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="年级（如大一）"
              value={form.grade}
              onChange={e => setForm({ ...form, grade: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none focus:border-orange-300"
            />
            <input
              placeholder="专业"
              value={form.major}
              onChange={e => setForm({ ...form, major: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none focus:border-orange-300"
            />
          </div>
          <input
            placeholder="联系方式（微信/邮箱）*"
            value={form.contact}
            onChange={e => setForm({ ...form, contact: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none focus:border-orange-300"
          />
          <select
            value={form.hoursPerWeek}
            onChange={e => setForm({ ...form, hoursPerWeek: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none focus:border-orange-300 text-gray-700"
          >
            <option value="">每周可投入时间</option>
            <option>2小时以下</option>
            <option>2-5小时</option>
            <option>5-10小时</option>
            <option>10小时以上</option>
          </select>
          <textarea
            placeholder="自我介绍（请简单介绍自己，以及为什么想加入本社团）"
            value={form.introduction}
            onChange={e => setForm({ ...form, introduction: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none focus:border-orange-300 resize-none"
          />
        </div>

        {club.customQuestions.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            <h3 className="font-bold text-gray-800">社团专属问题</h3>
            {club.customQuestions.slice(0, 3).map((q, i) => (
              <div key={i}>
                <label className="text-sm text-gray-600 mb-1 block">{q}</label>
                <textarea
                  placeholder="请输入你的回答"
                  value={form.customAnswers[i] || ''}
                  onChange={e => setForm({ ...form, customAnswers: { ...form.customAnswers, [i]: e.target.value } })}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none focus:border-orange-300 resize-none"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-4 py-3">
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-2xl text-white font-bold shadow-md hover:shadow-lg transition-all"
          style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}
        >
          提交申请
        </button>
      </div>
    </div>
  )
}
