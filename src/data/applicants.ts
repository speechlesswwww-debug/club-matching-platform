export interface Applicant {
  id: string
  name: string
  major: string
  grade: string
  contact: string
  hoursPerWeek: string
  introduction: string
  clubId: string
  clubName: string
  appliedAt: string
  matchScore: number
  status: 'submitted' | 'viewed' | 'interview' | 'accepted' | 'rejected'
}

export const applicants: Applicant[] = [
  {
    id: '1',
    name: '李明华',
    major: '计算机科学与技术',
    grade: '大一',
    contact: 'liminghua@example.com',
    hoursPerWeek: '5-10小时',
    introduction: '我对编程充满热情，尤其喜欢算法和数据结构。大学前就自学了Python和JavaScript，做过几个小项目。希望通过加入编程极客社结识更多技术大牛，提升自己的编程实力。',
    clubId: '11',
    clubName: '编程极客社',
    appliedAt: '2024-03-15 14:30',
    matchScore: 95,
    status: 'interview'
  },
  {
    id: '2',
    name: '张雨萌',
    major: '音乐学',
    grade: '大二',
    contact: 'zhangyumeng@example.com',
    hoursPerWeek: '2-5小时',
    introduction: '我从小学习钢琴和声乐，有8年音乐经验。非常喜欢合唱，觉得多声部音乐特别有感染力。希望能在星韵合唱团找到志同道合的音乐伙伴，一起创作美好的音乐。',
    clubId: '1',
    clubName: '星韵合唱团',
    appliedAt: '2024-03-14 10:15',
    matchScore: 92,
    status: 'accepted'
  },
  {
    id: '3',
    name: '王浩然',
    major: '新闻传播学',
    grade: '大一',
    contact: 'wanghaoran@example.com',
    hoursPerWeek: '2-5小时',
    introduction: '我热爱摄影，有一台索尼微单，平时喜欢拍人文和风景。在高中就担任校报摄影记者，积累了一定的拍摄和后期经验。希望在光影摄影社系统学习摄影知识，认识更多创作者。',
    clubId: '2',
    clubName: '光影摄影社',
    appliedAt: '2024-03-16 16:45',
    matchScore: 88,
    status: 'viewed'
  },
  {
    id: '4',
    name: '陈思远',
    major: '国际关系',
    grade: '大二',
    contact: 'chensiyuan@example.com',
    hoursPerWeek: '5-10小时',
    introduction: '我对国际政治和外交非常感兴趣，英语六级成绩590分，有一定的辩论基础。希望通过模拟联合国协会锻炼自己的外交思维和英语演讲能力，并有机会参加国际MUN会议。',
    clubId: '9',
    clubName: '模拟联合国协会',
    appliedAt: '2024-03-13 09:20',
    matchScore: 91,
    status: 'submitted'
  }
]
