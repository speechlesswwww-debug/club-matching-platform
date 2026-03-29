export type PersonalityType = '创意表达型' | '技术探索型' | '社交活力型' | '公益服务型' | '学术研究型' | '运动健将型'

export interface AssessmentAnswers {
  interests: string[]
  socialStyle: string
  timeCommitment: string
  goals: string[]
  activityTypes: string[]
  openToNew: string
  atmosphere: string
  weekend: string
}

export interface MatchResult {
  clubId: string
  score: number
  reason: string
}

export function getPersonalityType(answers: AssessmentAnswers): { type: PersonalityType; description: string; tags: string[] } {
  const { interests, goals, activityTypes } = answers

  const scores: Record<PersonalityType, number> = {
    '创意表达型': 0,
    '技术探索型': 0,
    '社交活力型': 0,
    '公益服务型': 0,
    '学术研究型': 0,
    '运动健将型': 0
  }

  const creativeKeywords = ['音乐', '舞蹈', '摄影', '写作', '手工']
  const techKeywords = ['编程', '创业']
  const charityKeywords = ['公益']
  const socialKeywords = ['交朋友', '找到归属感']
  const academicKeywords = ['辩论', '讲座分享']
  const sportsKeywords = ['运动', '比赛竞技', '日常训练']

  interests.forEach(i => {
    if (creativeKeywords.includes(i)) scores['创意表达型'] += 2
    if (techKeywords.includes(i)) scores['技术探索型'] += 2
    if (charityKeywords.includes(i)) scores['公益服务型'] += 2
  })

  goals.forEach(g => {
    if (socialKeywords.includes(g)) scores['社交活力型'] += 2
    if (g === '学技能') scores['技术探索型'] += 1
    if (g === '探索兴趣') scores['创意表达型'] += 1
  })

  activityTypes.forEach(a => {
    if (academicKeywords.includes(a)) scores['学术研究型'] += 2
    if (sportsKeywords.includes(a)) scores['运动健将型'] += 2
    if (a === '表演展示') scores['创意表达型'] += 2
    if (a === '项目实践') scores['技术探索型'] += 2
  })

  if (answers.atmosphere === '轻松有趣') scores['社交活力型'] += 1
  if (answers.atmosphere === '严谨专业') scores['学术研究型'] += 1
  if (answers.atmosphere === '热血拼搏') scores['运动健将型'] += 1
  if (answers.atmosphere === '温暖治愈') scores['公益服务型'] += 1

  if (answers.weekend === '户外运动') scores['运动健将型'] += 2
  if (answers.weekend === '泡图书馆') scores['学术研究型'] += 2
  if (answers.weekend === '参加活动') scores['社交活力型'] += 2

  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a)
  const topType = sorted[0][0] as PersonalityType

  const typeInfo: Record<PersonalityType, { description: string; tags: string[] }> = {
    '创意表达型': {
      description: '你充满创造力，热爱通过艺术和创作表达自我。音乐、摄影、写作都是你的舞台，你在创作中找到快乐和意义。',
      tags: ['有创意', '善表达', '热爱艺术']
    },
    '技术探索型': {
      description: '你对技术和创新充满热情，喜欢动手解决问题。编程、科技、创业都让你兴奋，你在探索未知中找到价值。',
      tags: ['爱探索', '技术控', '解决问题']
    },
    '社交活力型': {
      description: '你天生自带活力，享受与人交流和团队合作。社交场合让你如鱼得水，你的热情感染着身边每一个人。',
      tags: ['外向开朗', '善于社交', '团队协作']
    },
    '公益服务型': {
      description: '你有一颗温暖的心，愿意为他人付出。公益和志愿服务让你感受到生命的意义，你的善意改变着世界。',
      tags: ['有爱心', '乐于奉献', '社会责任感']
    },
    '学术研究型': {
      description: '你求知欲旺盛，喜欢深度思考和学术探讨。辩论、研究、分享是你的方式，你在知识中找到满足感。',
      tags: ['好奇心强', '善于思考', '追求深度']
    },
    '运动健将型': {
      description: '你充满活力和运动激情，享受竞技和挑战。体育运动让你释放能量，团队比赛让你体验热血与荣耀。',
      tags: ['活力四射', '热爱运动', '竞技精神']
    }
  }

  return {
    type: topType,
    description: typeInfo[topType].description,
    tags: typeInfo[topType].tags
  }
}

export function matchClubs(answers: AssessmentAnswers, clubs: Array<{ id: string; matchKeywords: string[]; name: string }>): MatchResult[] {
  const personality = getPersonalityType(answers)
  const allKeywords = [...answers.interests, ...answers.goals, ...answers.activityTypes]

  const personalityKeywords: Record<PersonalityType, string[]> = {
    '创意表达型': ['音乐', '摄影', '艺术', '创作', '文艺', '表演'],
    '技术探索型': ['编程', '技术', '创新', '科技', '项目', '算法'],
    '社交活力型': ['社交', '团队', '演讲', '沟通', '活动'],
    '公益服务型': ['公益', '志愿', '社区', '帮助他人'],
    '学术研究型': ['学术', '辩论', '研究', '写作', '英语'],
    '运动健将型': ['运动', '体育', '竞技', '跑步', '篮球', '羽毛球']
  }

  const typeKeywords = personalityKeywords[personality.type]

  return clubs.map(club => {
    let score = 60
    const matchedKeywords: string[] = []

    allKeywords.forEach(kw => {
      if (club.matchKeywords.some(mk => mk.includes(kw) || kw.includes(mk))) {
        score += 5
        matchedKeywords.push(kw)
      }
    })

    typeKeywords.forEach(kw => {
      if (club.matchKeywords.some(mk => mk.includes(kw) || kw.includes(mk))) {
        score += 4
      }
    })

    score = Math.min(99, score)

    const reasons = [
      `与你的${personality.type}特质高度契合`,
      matchedKeywords.length > 0 ? `匹配你对${matchedKeywords.slice(0, 2).join('、')}的兴趣` : '符合你的综合兴趣',
      score > 85 ? '非常推荐加入' : '值得了解尝试'
    ]

    return {
      clubId: club.id,
      score,
      reason: reasons.join('，')
    }
  }).sort((a, b) => b.score - a.score).slice(0, 5)
}
