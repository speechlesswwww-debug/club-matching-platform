export interface Club {
  id: string;
  name: string;
  category: string;
  tags: string[];
  description: string;
  activities: string[];
  atmosphere: string;
  hoursPerWeek: number;
  beginnerFriendly: number;
  isRecruiting: boolean;
  recruitmentDirections: string[];
  customQuestions: string[];
  matchKeywords: string[];
  memberCount: number;
  coverImage: string;
  gradientBg: string;
}

export const clubs: Club[] = [
  {
    id: "1",
    name: "星韵合唱团",
    category: "文艺",
    tags: ["音乐", "表演", "合唱"],
    description: "我们是一支充满热情的校园合唱团，致力于用音乐连接心灵。每周定期排练，参加各类演出和比赛，感受集体音乐的魅力。",
    activities: ["周末排练", "校园音乐节", "社团联合演出", "外出比赛"],
    atmosphere: "温馨和谐，积极向上",
    hoursPerWeek: 4,
    beginnerFriendly: 4,
    isRecruiting: true,
    recruitmentDirections: ["女高音", "男低音", "钢琴伴奏"],
    customQuestions: ["请介绍你的音乐背景", "你最喜欢的歌曲类型是什么"],
    matchKeywords: ["创意表达", "艺术", "团队协作", "音乐", "表演"],
    memberCount: 56,
    coverImage: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=400&fit=crop&q=80",
    gradientBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "2",
    name: "光影摄影社",
    category: "艺术",
    tags: ["摄影", "创作", "视觉"],
    description: "用镜头记录校园最美的瞬间。我们探索摄影技术与艺术表达，从人像到风景，从胶片到数码，记录生活中的每一帧美好。",
    activities: ["摄影采风", "作品展览", "技术分享会", "校园纪实项目"],
    atmosphere: "自由创意，互相学习",
    hoursPerWeek: 3,
    beginnerFriendly: 5,
    isRecruiting: true,
    recruitmentDirections: ["风光摄影", "人像摄影", "后期修图"],
    customQuestions: ["你用什么相机设备", "分享一张你拍的照片"],
    matchKeywords: ["创意表达", "艺术", "视觉", "技术探索"],
    memberCount: 42,
    coverImage: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=400&fit=crop&q=80",
    gradientBg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: "3",
    name: "墨韵书法社",
    category: "文化",
    tags: ["书法", "传统文化", "艺术"],
    description: "传承中华书法艺术，在墨香中感受传统文化的魅力。从楷书到行书，从笔法到章法，带你走进书法的世界。",
    activities: ["每周练习课", "作品展览", "文化讲座", "节日书法活动"],
    atmosphere: "静心沉稳，文化氛围浓厚",
    hoursPerWeek: 3,
    beginnerFriendly: 5,
    isRecruiting: true,
    recruitmentDirections: ["楷书组", "行书组", "篆刻组"],
    customQuestions: ["你有书法基础吗", "你对哪种书体最感兴趣"],
    matchKeywords: ["学术研究", "传统文化", "艺术", "创意表达"],
    memberCount: 38,
    coverImage: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=400&fit=crop&q=80",
    gradientBg: "linear-gradient(135deg, #434343 0%, #000000 100%)",
  },
  {
    id: "4",
    name: "风行跑步社",
    category: "运动",
    tags: ["跑步", "健身", "马拉松"],
    description: "用奔跑丈量校园，用汗水诠释青春。我们组织各类跑步活动，从晨跑到马拉松，让每一步都充满力量。",
    activities: ["每日晨跑", "路跑比赛", "健身讲座", "马拉松培训"],
    atmosphere: "积极阳光，充满活力",
    hoursPerWeek: 5,
    beginnerFriendly: 4,
    isRecruiting: true,
    recruitmentDirections: ["长跑组", "短跑组", "训练助教"],
    customQuestions: ["你目前的跑步水平如何", "你的运动目标是什么"],
    matchKeywords: ["运动健将", "健康生活", "挑战自我"],
    memberCount: 89,
    coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop&q=80",
    gradientBg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "5",
    name: "篮球俱乐部",
    category: "运动",
    tags: ["篮球", "竞技", "团队"],
    description: "激情篮球，燃烧青春！我们是校园最活跃的篮球团体，组织训练、比赛和交流活动，欢迎所有热爱篮球的同学加入。",
    activities: ["每周训练", "校际联赛", "三对三赛事", "篮球夏令营"],
    atmosphere: "热血竞技，团队精神",
    hoursPerWeek: 6,
    beginnerFriendly: 3,
    isRecruiting: true,
    recruitmentDirections: ["控卫", "前锋", "中锋", "拉拉队"],
    customQuestions: ["你打篮球几年了", "你在球队中擅长什么位置"],
    matchKeywords: ["运动健将", "团队协作", "社交活力", "竞技"],
    memberCount: 75,
    coverImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop&q=80",
    gradientBg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    id: "6",
    name: "羽毛球协会",
    category: "运动",
    tags: ["羽毛球", "休闲", "竞技"],
    description: "羽毛球是老少皆宜的运动，我们欢迎所有水平的同学。无论是休闲娱乐还是专业竞技，都能在这里找到属于你的位置。",
    activities: ["日常打球", "协会内赛", "校际比赛", "技术培训"],
    atmosphere: "友好包容，老少皆宜",
    hoursPerWeek: 4,
    beginnerFriendly: 5,
    isRecruiting: true,
    recruitmentDirections: ["技术组", "竞技组", "教学志愿者"],
    customQuestions: ["你的羽毛球技术水平如何", "你偏好单打还是双打"],
    matchKeywords: ["运动健将", "社交活力", "休闲"],
    memberCount: 63,
    coverImage: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=400&fit=crop&q=80",
    gradientBg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    id: "7",
    name: "青年志愿者协会",
    category: "公益",
    tags: ["志愿服务", "公益", "社会责任"],
    description: "传递爱心，服务社会。我们组织各类志愿服务活动，从支教到社区服务，让青年的力量为社会带来温暖和改变。",
    activities: ["周末支教", "社区服务", "公益宣传", "扶贫助困"],
    atmosphere: "温暖有爱，服务精神",
    hoursPerWeek: 4,
    beginnerFriendly: 5,
    isRecruiting: true,
    recruitmentDirections: ["活动策划", "教育支援", "宣传设计", "外联联络"],
    customQuestions: ["你做过哪些志愿服务", "你为什么想加入志愿者协会"],
    matchKeywords: ["公益服务", "社交活力", "团队协作", "社会责任"],
    memberCount: 112,
    coverImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=400&fit=crop&q=80",
    gradientBg: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  },
  {
    id: "8",
    name: "绿色环保社",
    category: "公益",
    tags: ["环保", "可持续", "公益"],
    description: "守护绿色地球，从校园开始。我们通过宣传教育和实践活动，培养环保意识，推动可持续发展理念在校园落地。",
    activities: ["校园清洁活动", "环保主题讲座", "绿化种植", "废物回收"],
    atmosphere: "务实行动，绿色理念",
    hoursPerWeek: 3,
    beginnerFriendly: 5,
    isRecruiting: true,
    recruitmentDirections: ["活动组织", "宣传策划", "科研调研"],
    customQuestions: ["你对哪个环保议题最关注", "你有什么环保实践经验"],
    matchKeywords: ["公益服务", "学术研究", "社会责任"],
    memberCount: 47,
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop&q=80",
    gradientBg: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  },
  {
    id: "9",
    name: "模拟联合国协会",
    category: "学术",
    tags: ["国际关系", "辩论", "外交"],
    description: "模拟联合国是锻炼国际视野和辩论能力的绝佳平台。我们组织模拟联合国大会，让同学们扮演各国代表，讨论全球议题。",
    activities: ["模拟联大", "辩论培训", "国际时事讨论", "校际MUN比赛"],
    atmosphere: "严谨学术，国际视野",
    hoursPerWeek: 5,
    beginnerFriendly: 3,
    isRecruiting: true,
    recruitmentDirections: ["代表团成员", "学术委员会", "新闻组"],
    customQuestions: ["你对哪个国际议题最感兴趣", "你有MUN经历吗"],
    matchKeywords: ["学术研究", "社交活力", "技术探索", "国际视野"],
    memberCount: 58,
    coverImage: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=400&fit=crop&q=80",
    gradientBg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    id: "10",
    name: "英语演讲社",
    category: "学术",
    tags: ["英语", "演讲", "辩论"],
    description: "用英语表达自我，展示思想的力量。我们提供专业的英语演讲和辩论训练，帮助同学们提升英语能力和公众表达技巧。",
    activities: ["演讲训练课", "英语辩论赛", "TED风格演讲", "口语角"],
    atmosphere: "开放自信，国际化氛围",
    hoursPerWeek: 4,
    beginnerFriendly: 4,
    isRecruiting: true,
    recruitmentDirections: ["演讲组", "辩论组", "口语训练志愿者"],
    customQuestions: ["你的英语水平如何（四六级/托福）", "你有公开演讲经验吗"],
    matchKeywords: ["学术研究", "社交活力", "创意表达"],
    memberCount: 44,
    coverImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=400&fit=crop&q=80",
    gradientBg: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  },
  {
    id: "11",
    name: "编程极客社",
    category: "技术",
    tags: ["编程", "技术", "开发"],
    description: "探索代码的世界，用技术改变生活。我们涵盖Web开发、算法竞赛、人工智能等多个技术方向，为技术爱好者提供学习和实践的平台。",
    activities: ["技术分享会", "黑客马拉松", "算法竞赛培训", "开源项目"],
    atmosphere: "极客精神，技术驱动",
    hoursPerWeek: 6,
    beginnerFriendly: 3,
    isRecruiting: true,
    recruitmentDirections: ["前端开发", "后端开发", "算法竞赛", "AI方向"],
    customQuestions: ["你掌握哪些编程语言", "介绍你做过的一个项目"],
    matchKeywords: ["技术探索", "创新创业", "学术研究"],
    memberCount: 83,
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop&q=80",
    gradientBg: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
  },
  {
    id: "12",
    name: "创新创业协会",
    category: "创业",
    tags: ["创业", "创新", "商业"],
    description: "激发创业热情，实现创业梦想。我们为有创业想法的同学提供资源、导师和平台，从商业计划书到实际项目落地，全程支持你的创业之旅。",
    activities: ["创业分享会", "商业计划大赛", "导师面对面", "创业实战项目"],
    atmosphere: "充满激情，勇于创新",
    hoursPerWeek: 5,
    beginnerFriendly: 4,
    isRecruiting: true,
    recruitmentDirections: ["产品策划", "商业运营", "技术开发", "市场推广"],
    customQuestions: ["你有什么创业想法", "你认为自己的核心优势是什么"],
    matchKeywords: ["创新创业", "技术探索", "社交活力"],
    memberCount: 69,
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&q=80",
    gradientBg: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
  },
];

export const assessmentQuestions = [
  {
    id: 1,
    question: "你最享受的课余活动是什么？",
    options: [
      { text: "绘画、音乐、写作等艺术创作", keywords: ["创意表达"] },
      { text: "编程、研究技术问题", keywords: ["技术探索"] },
      { text: "和朋友聚会、参加活动", keywords: ["社交活力"] },
      { text: "参加公益活动、帮助他人", keywords: ["公益服务"] },
    ],
  },
  {
    id: 2,
    question: "你理想的社团氛围是？",
    options: [
      { text: "轻松自由，大家可以自由发挥", keywords: ["创意表达"] },
      { text: "严谨有序，有明确的目标和规划", keywords: ["学术研究"] },
      { text: "活力四射，充满激情和能量", keywords: ["社交活力", "运动健将"] },
      { text: "温馨友爱，像一个大家庭", keywords: ["公益服务"] },
    ],
  },
  {
    id: 3,
    question: "你更希望在社团中获得什么？",
    options: [
      { text: "专业技能的提升", keywords: ["技术探索", "学术研究"] },
      { text: "丰富的人际关系", keywords: ["社交活力"] },
      { text: "实现自我价值，帮助他人", keywords: ["公益服务"] },
      { text: "展示自我才艺的舞台", keywords: ["创意表达"] },
    ],
  },
  {
    id: 4,
    question: "你每周愿意投入多少时间在社团活动上？",
    options: [
      { text: "1-2小时，轻度参与", keywords: ["社交活力"] },
      { text: "3-4小时，适度投入", keywords: ["创意表达", "公益服务"] },
      { text: "5-6小时，积极参与", keywords: ["技术探索", "运动健将"] },
      { text: "7小时以上，深度投入", keywords: ["学术研究"] },
    ],
  },
  {
    id: 5,
    question: "在团队项目中，你通常扮演什么角色？",
    options: [
      { text: "创意策划者，提供创新想法", keywords: ["创意表达"] },
      { text: "技术执行者，解决技术问题", keywords: ["技术探索"] },
      { text: "组织协调者，推动项目进展", keywords: ["社交活力", "公益服务"] },
      { text: "研究分析者，深入挖掘信息", keywords: ["学术研究"] },
    ],
  },
  {
    id: 6,
    question: "你对哪类活动最感兴趣？",
    options: [
      { text: "音乐会、展览、表演等艺术活动", keywords: ["创意表达"] },
      { text: "竞赛、挑战、运动赛事", keywords: ["运动健将", "技术探索"] },
      { text: "公益服务、社区活动", keywords: ["公益服务"] },
      { text: "讲座、研讨会、学术交流", keywords: ["学术研究"] },
    ],
  },
  {
    id: 7,
    question: "你的个人特质更接近哪个描述？",
    options: [
      { text: "富有创造力，喜欢独特的表达方式", keywords: ["创意表达"] },
      { text: "逻辑清晰，喜欢解决复杂问题", keywords: ["技术探索"] },
      { text: "开朗活泼，容易与人打成一片", keywords: ["社交活力"] },
      { text: "有责任感，关注社会公平", keywords: ["公益服务"] },
    ],
  },
  {
    id: 8,
    question: "你最希望毕业后回想起的社团经历是？",
    options: [
      { text: "站在舞台上展示才艺的瞬间", keywords: ["创意表达"] },
      { text: "解决了某个技术难题的成就感", keywords: ["技术探索"] },
      { text: "与来自各地的朋友建立深厚友谊", keywords: ["社交活力"] },
      { text: "为他人或社会带来了实质改变", keywords: ["公益服务"] },
    ],
  },
];

export const profileTypes: Record<string, { emoji: string; desc: string }> = {
  创意表达型: { emoji: "🎨", desc: "富有创造力，喜欢艺术和表达，适合文艺类社团" },
  技术探索型: { emoji: "💻", desc: "热爱技术，逻辑思维强，适合技术和学术类社团" },
  社交活力型: { emoji: "🌟", desc: "开朗外向，善于交际，适合各类活动类社团" },
  公益服务型: { emoji: "💝", desc: "有爱心，责任感强，适合公益和服务类社团" },
  学术研究型: { emoji: "📚", desc: "严谨踏实，求知欲强，适合学术和研究类社团" },
  运动健将型: { emoji: "🏃", desc: "热爱运动，充满活力，适合体育运动类社团" },
};

export interface Application {
  id: string;
  clubId: string;
  clubName: string;
  status: "待审核" | "已通过" | "已拒绝";
  appliedAt: string;
  note?: string;
}

export const mockApplications: Application[] = [
  { id: "a1", clubId: "1", clubName: "星韵合唱团", status: "已通过", appliedAt: "2024-03-10", note: "欢迎加入！" },
  { id: "a2", clubId: "11", clubName: "编程极客社", status: "待审核", appliedAt: "2024-03-15" },
  { id: "a3", clubId: "7", clubName: "青年志愿者协会", status: "已拒绝", appliedAt: "2024-03-08", note: "名额已满，下次优先考虑" },
];

export const adminApplicants = [
  { id: "u1", name: "李明", club: "编程极客社", status: "待审核", time: "2024-03-15 14:23", profile: "技术探索型" },
  { id: "u2", name: "王小红", club: "星韵合唱团", status: "已通过", time: "2024-03-14 09:12", profile: "创意表达型" },
  { id: "u3", name: "张伟", club: "青年志愿者协会", status: "待审核", time: "2024-03-16 16:45", profile: "公益服务型" },
  { id: "u4", name: "刘洋", club: "篮球俱乐部", status: "已通过", time: "2024-03-13 11:30", profile: "运动健将型" },
  { id: "u5", name: "陈美琳", club: "模拟联合国协会", status: "待审核", time: "2024-03-17 08:55", profile: "学术研究型" },
  { id: "u6", name: "赵子豪", club: "创新创业协会", status: "已拒绝", time: "2024-03-12 15:20", profile: "社交活力型" },
];
