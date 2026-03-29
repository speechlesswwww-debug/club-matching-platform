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
  reviews?: ClubReview[];
  timeline?: TimelineItem[];
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

export interface Application {
  id: string;
  clubId: string;
  clubName: string;
  status: "待审核" | "已通过" | "已拒绝";
  appliedAt: string;
  note?: string;
}

export interface AdminApplicant {
  id: string;
  name: string;
  club: string;
  status: "待审核" | "已通过" | "已拒绝";
  time: string;
  profile: string;
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
