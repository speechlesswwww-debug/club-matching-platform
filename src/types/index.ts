export interface CustomQuestion {
  id: string;
  question: string;
  type: "text" | "single" | "multiple";
  options?: string[];
  required: boolean;
}

export interface ClubReview {
  id: string;
  author: string;
  avatar: string;
  content: string;
  rating: number;
  date: string;
}

export interface TimelineItem {
  date: string;
  event: string;
  description: string;
}

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
  structuredQuestions?: CustomQuestion[];
  recruitmentDeadline?: string;
  recruitmentProcess?: string[];
  logo?: string;
  matchKeywords: string[];
  memberCount: number;
  coverImage: string;
  reviews?: ClubReview[];
  timeline?: TimelineItem[];
}

export interface Application {
  id: string;
  clubId: string;
  clubName: string;
  status: "待审核" | "已查看" | "面试中" | "已通过" | "已拒绝";
  appliedAt: string;
  direction?: string;
  answers?: Record<string, string>;
  selfIntro?: string;
  name?: string;
  studentId?: string;
  major?: string;
  phone?: string;
  email?: string;
  note?: string;
}

export interface AdminApplicant {
  id: string;
  name: string;
  studentId: string;
  clubName: string;
  clubId: string;
  direction: string;
  status: "待审核" | "已查看" | "面试中" | "已通过" | "已拒绝";
  appliedAt: string;
  profileType: string;
  email: string;
  phone: string;
  selfIntro?: string;
  answers?: Record<string, string>;
  matchScore?: number;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: { text: string; keywords: string[] }[];
}

export interface ClubMatch {
  club: Club;
  score: number;
  reason: string;
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}
