import { clubs, profileTypes } from "./data";
import type { Club, ClubMatch } from "./types";

export type { ClubMatch };

export type ProfileType = keyof typeof profileTypes;

export function getProfileFromKeywords(selectedKeywords: string[]): ProfileType {
  const scores: Record<string, number> = {
    创意表达型: 0,
    技术探索型: 0,
    社交活力型: 0,
    公益服务型: 0,
    学术研究型: 0,
    运动健将型: 0,
  };

  const keywordMap: Record<string, string> = {
    创意表达: "创意表达型",
    技术探索: "技术探索型",
    社交活力: "社交活力型",
    公益服务: "公益服务型",
    学术研究: "学术研究型",
    运动健将: "运动健将型",
  };

  selectedKeywords.forEach((kw) => {
    const profileType = keywordMap[kw];
    if (profileType) {
      scores[profileType] = (scores[profileType] || 0) + 1;
    }
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted[0][0] as ProfileType;
}

export function matchClubs(selectedKeywords: string[]): ClubMatch[] {
  const profileType = getProfileFromKeywords(selectedKeywords);
  const profileKeyword = profileType.replace("型", "");

  const results: ClubMatch[] = clubs.map((club) => {
    let score = 0;

    selectedKeywords.forEach((kw) => {
      if (club.matchKeywords.some((mk) => mk.includes(kw) || kw.includes(mk))) {
        score += 20;
      }
    });

    if (club.matchKeywords.some((mk) => mk.includes(profileKeyword))) {
      score += 15;
    }

    score += club.beginnerFriendly * 2;

    if (club.isRecruiting) score += 5;

    score = Math.min(score, 99);
    score = Math.max(score, 30);

    const reason = generateReason(club, selectedKeywords, profileType);
    return { club, score, reason };
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 5);
}

function generateReason(club: Club, keywords: string[], profileType: ProfileType): string {
  const overlap = keywords.filter((kw) =>
    club.matchKeywords.some((mk) => mk.includes(kw) || kw.includes(mk))
  );

  if (overlap.length > 0) {
    return `你的${profileType}特质与${club.name}的${overlap[0]}方向高度契合`;
  }
  if (club.beginnerFriendly >= 4) {
    return `${club.name}对新生非常友好，是展示自我的好舞台`;
  }
  return `${club.name}的活动氛围与你的个性相匹配`;
}
