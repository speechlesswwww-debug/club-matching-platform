import { BrowserRouter, Routes, Route, useNavigate, useParams, Link } from "react-router-dom";
import { useState } from "react";
import { clubs, assessmentQuestions, profileTypes, mockApplications, adminApplicants } from "./data";
import { matchClubs, getProfileFromKeywords, type ClubMatch } from "./matching";

const CONFETTI_COLORS = ["#F97316", "#FB923C", "#FCD34D", "#34D399", "#60A5FA", "#A78BFA"];
const STAT_GRADIENTS = [
  "linear-gradient(135deg, #F97316, #FB923C)",
  "linear-gradient(135deg, #FBBF24, #FDE68A)",
  "linear-gradient(135deg, #34D399, #6EE7B7)",
  "linear-gradient(135deg, #60A5FA, #BFDBFE)",
];
const CATEGORIES = ["全部", "文艺", "艺术", "文化", "运动", "公益", "学术", "技术", "创业"];

function ScoreRing({ score }: { score: number }) {
  const r = 20, c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <svg width="56" height="56" viewBox="0 0 56 56">
      <circle cx="28" cy="28" r={r} fill="none" stroke="#FFF0E8" strokeWidth="4" />
      <circle cx="28" cy="28" r={r} fill="none" stroke="#F97316" strokeWidth="4"
        strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        className="score-ring" transform="rotate(-90 28 28)" />
      <text x="28" y="32" textAnchor="middle" fontSize="13" fontWeight="700" fill="#F97316">{score}%</text>
    </svg>
  );
}

function BottomNav({ active }: { active: "home" | "assessment" | "applications" }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md glass-nav flex justify-around py-2 z-50">
      <Link to="/student/home" className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl ${active === "home" ? "text-orange-500 nav-active" : "text-gray-400"}`}>
        <span className="text-xl">🏠</span>
        <span className="text-xs font-medium">首页</span>
      </Link>
      <Link to="/student/assessment" className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl ${active === "assessment" ? "text-orange-500 nav-active" : "text-gray-400"}`}>
        <span className="text-xl">✨</span>
        <span className="text-xs font-medium">测评</span>
      </Link>
      <Link to="/student/applications" className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl ${active === "applications" ? "text-orange-500 nav-active" : "text-gray-400"}`}>
        <span className="text-xl">📋</span>
        <span className="text-xs font-medium">申请</span>
      </Link>
      <Link to="/" className="flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl text-gray-400">
        <span className="text-xl">🔄</span>
        <span className="text-xs font-medium">切换</span>
      </Link>
    </nav>
  );
}

function IdentityPage() {
  const nav = useNavigate();
  return (
    <div className="bg-warm-gradient min-h-screen flex flex-col items-center justify-center p-6 page-enter">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 rounded-full bg-orange-300 opacity-20 blur-xl scale-150" />
            <div className="relative text-6xl">🎓</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">JoinU</h1>
          <p className="text-gray-500 mt-2 text-sm">智能社团匹配平台</p>
        </div>
        <div className="space-y-4">
          <button onClick={() => nav("/student/login")} className="w-full bg-white rounded-2xl p-6 text-left card-elevated border border-orange-100">
            <div className="text-3xl mb-2">🎒</div>
            <h2 className="text-xl font-bold text-gray-900">我是新生</h2>
            <p className="text-gray-500 text-sm mt-1">发现属于你的社团，开启精彩校园生活</p>
          </button>
          <button onClick={() => nav("/admin/login")} className="w-full bg-white rounded-2xl p-6 text-left card-elevated border border-gray-100">
            <div className="text-3xl mb-2">🏛️</div>
            <h2 className="text-xl font-bold text-gray-900">我是社团管理者</h2>
            <p className="text-gray-500 text-sm mt-1">管理社团信息，查看申请，招募优秀成员</p>
          </button>
        </div>
        <p className="text-center text-xs text-gray-300 mt-10">JoinU © 2025 · 智能社团匹配</p>
      </div>
    </div>
  );
}

function StudentLoginPage() {
  const nav = useNavigate();
  return (
    <div className="bg-warm-gradient min-h-screen flex flex-col items-center justify-center p-6 page-enter">
      <div className="w-full max-w-md">
        <button onClick={() => nav("/")} className="text-gray-400 mb-6 hover:text-gray-600 transition-colors">← 返回</button>
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🎒</div>
          <h1 className="text-2xl font-bold text-gray-900">新生登录</h1>
          <p className="text-gray-500 text-sm mt-1">这是一个演示版本</p>
        </div>
        <div className="bg-white rounded-2xl card-elevated p-6 space-y-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">学号</label>
            <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all" placeholder="请输入你的学号" defaultValue="2024001234" />
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">密码</label>
            <input type="password" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all" placeholder="请输入密码" defaultValue="demo123" />
          </div>
          <button onClick={() => nav("/student/home")} className="w-full bg-orange-500 text-white rounded-xl py-4 font-bold text-base hover:bg-orange-600 btn-glow transition-colors">以新生身份体验 Demo →</button>
          <p className="text-center text-xs text-gray-400">点击按钮即可直接体验，无需真实账号</p>
        </div>
      </div>
    </div>
  );
}

function AdminLoginPage() {
  const nav = useNavigate();
  return (
    <div className="bg-warm-gradient min-h-screen flex flex-col items-center justify-center p-6 page-enter">
      <div className="w-full max-w-md">
        <button onClick={() => nav("/")} className="text-gray-400 mb-6 hover:text-gray-600 transition-colors">← 返回</button>
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🏛️</div>
          <h1 className="text-2xl font-bold text-gray-900">管理端登录</h1>
          <p className="text-gray-500 text-sm mt-1">社团管理者专属入口</p>
        </div>
        <div className="bg-white rounded-2xl card-elevated p-6 space-y-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">账号</label>
            <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all" placeholder="管理员账号" defaultValue="admin" />
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">密码</label>
            <input type="password" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all" placeholder="密码" defaultValue="admin123" />
          </div>
          <button onClick={() => nav("/admin/dashboard")} className="w-full bg-orange-500 text-white rounded-xl py-4 font-bold text-base hover:bg-orange-600 btn-glow transition-colors">以管理者身份体验 Demo →</button>
          <p className="text-center text-xs text-gray-400">点击按钮即可直接体验，无需真实账号</p>
        </div>
      </div>
    </div>
  );
}

function StudentHomePage() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");

  const filtered = clubs.filter((c) => {
    const matchCat = activeCategory === "全部" || c.category === activeCategory;
    const matchSearch = c.name.includes(search) || c.tags.some((t) => t.includes(search));
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-warm-gradient min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-500 text-sm">你好，同学 👋</p>
            <h1 className="text-2xl font-bold text-gray-900">找到属于你的<span className="text-orange-500">社团</span></h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg shadow-sm">😊</div>
        </div>

        <div className="relative mb-5">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white rounded-2xl pl-10 pr-4 py-3 text-sm border border-gray-100 shadow-sm focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all" placeholder="搜索社团名称或标签..." />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button onClick={() => nav("/student/assessment")} className="bg-orange-500 text-white rounded-2xl p-4 text-left card-orange btn-glow">
            <div className="text-2xl mb-2">✨</div>
            <div className="font-bold text-sm">AI 智能推荐</div>
            <div className="text-xs text-orange-100 mt-1">3分钟测评 · 精准匹配</div>
          </button>
          <button onClick={() => nav("/student/applications")} className="bg-white rounded-2xl p-4 text-left card-elevated border border-gray-100">
            <div className="text-2xl mb-2">📋</div>
            <div className="font-bold text-sm text-gray-900">我的申请</div>
            <div className="text-xs text-gray-400 mt-1">查看申请进度</div>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? "text-white shadow-md" : "bg-white text-gray-500 border border-gray-100 hover:border-orange-200"}`}
              style={activeCategory === cat ? { background: "linear-gradient(135deg, #F97316, #FB923C)" } : {}}>
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-400 py-16">
              <div className="text-5xl mb-3">🔍</div>
              <p>没有找到相关社团</p>
            </div>
          ) : (
            filtered.map((club, index) => (
              <button key={club.id} onClick={() => nav(`/student/club/${club.id}`)} className="w-full bg-white rounded-2xl card-elevated overflow-hidden text-left fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="img-gradient-overlay">
                  <img
                    src={club.coverImage}
                    alt={club.name}
                    className="w-full h-36 object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.style.background = club.gradientBg;
                        parent.style.height = "144px";
                      }
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{club.name}</h3>
                    {club.isRecruiting && <span className="text-xs badge-recruiting px-2 py-0.5 rounded-full font-medium">招募中</span>}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {club.tags.map((tag) => (
                      <span key={tag} className="text-xs tag-glass rounded-full px-3 py-1">{tag}</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2">{club.description}</p>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                    <span>👥 {club.memberCount} 人</span>
                    <span>⏰ 每周 {club.hoursPerWeek} 小时</span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
      <BottomNav active="home" />
    </div>
  );
}

function AssessmentPage() {
  const nav = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const question = assessmentQuestions[currentQ];
  const progress = ((currentQ + 1) / assessmentQuestions.length) * 100;

  function handleOption(keywords: string[]) {
    const newKeywords = [...selectedKeywords, ...keywords];
    if (currentQ < assessmentQuestions.length - 1) {
      setSelectedKeywords(newKeywords);
      setCurrentQ(currentQ + 1);
    } else {
      const profile = getProfileFromKeywords(newKeywords);
      nav("/student/recommendations", { state: { keywords: newKeywords, profile } });
    }
  }

  return (
    <div className="bg-warm-gradient min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => nav("/student/home")} className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:shadow-md transition-shadow">←</button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">AI 性格测评</h1>
            <p className="text-xs text-gray-400">第 {currentQ + 1} 题，共 {assessmentQuestions.length} 题</p>
          </div>
          <span className="text-sm font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">{Math.round(progress)}%</span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2 mb-8 overflow-hidden">
          <div className="progress-animated h-2 rounded-full" style={{ width: `${progress}%` }} />
        </div>

        <div className="bg-white rounded-2xl card-elevated p-6 mb-6">
          <div className="text-4xl mb-4 text-center">🤔</div>
          <h2 className="text-lg font-bold text-gray-900 text-center leading-relaxed">{question.question}</h2>
        </div>

        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <button key={idx} onClick={() => handleOption(opt.keywords)} className="w-full bg-white rounded-2xl card-elevated option-card p-4 text-left hover:bg-orange-50 border border-transparent hover:border-orange-300 transition-all">
              <span className="inline-flex w-6 h-6 rounded-full bg-orange-50 text-orange-500 text-xs font-bold items-center justify-center mr-3 flex-shrink-0">{String.fromCharCode(65 + idx)}</span>
              <span className="text-sm text-gray-800">{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
      <BottomNav active="assessment" />
    </div>
  );
}

function RecommendationsPage() {
  const nav = useNavigate();
  const state = window.history.state?.usr as { keywords: string[]; profile: string } | undefined;
  const keywords = state?.keywords || ["创意表达"];
  const profile = state?.profile || "创意表达型";
  const matches = matchClubs(keywords);
  const profileInfo = profileTypes[profile] || { emoji: "🌟", desc: "综合型人才" };

  return (
    <div className="bg-warm-gradient min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => nav("/student/assessment")} className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:shadow-md transition-shadow">←</button>
          <h1 className="text-lg font-bold text-gray-900">你的专属推荐</h1>
        </div>

        <div className="bg-hero-gradient rounded-2xl p-6 mb-6 text-white shadow-lg">
          <div className="text-4xl mb-3">{profileInfo.emoji}</div>
          <h2 className="text-xl font-bold mb-1">{profile}</h2>
          <p className="text-orange-100 text-sm leading-relaxed">{profileInfo.desc}</p>
        </div>

        <h3 className="font-bold text-gray-900 mb-4">🎯 Top 5 推荐社团</h3>

        <div className="space-y-4">
          {matches.map((match: ClubMatch, idx: number) => (
            <button key={match.club.id} onClick={() => nav(`/student/club/${match.club.id}`)} className="w-full bg-white rounded-2xl card-elevated overflow-hidden text-left fade-up" style={{ animationDelay: `${idx * 0.08}s` }}>
              <div className="img-gradient-overlay">
                <img
                  src={match.club.coverImage}
                  alt={match.club.name}
                  className="w-full h-28 object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.background = match.club.gradientBg;
                      parent.style.height = "112px";
                    }
                  }}
                />
                <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center shadow">{idx + 1}</div>
              </div>
              <div className="p-4 flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{match.club.name}</h3>
                    <span className="text-xs tag-glass rounded-full px-2 py-0.5">{match.club.category}</span>
                  </div>
                  <p className="text-xs text-gray-500">{match.reason}</p>
                </div>
                <ScoreRing score={match.score} />
              </div>
            </button>
          ))}
        </div>

        <button onClick={() => nav("/student/home")} className="w-full mt-6 border-2 border-orange-500 text-orange-500 rounded-2xl py-3 font-bold hover:bg-orange-50 transition-colors">
          浏览全部社团
        </button>
      </div>
      <BottomNav active="assessment" />
    </div>
  );
}

function ClubDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const club = clubs.find((c) => c.id === id);

  if (!club) return (
    <div className="bg-warm-gradient min-h-screen flex items-center justify-center">
      <div className="text-center"><div className="text-4xl mb-3">😢</div><p className="text-gray-500">社团不存在</p><button onClick={() => nav("/student/home")} className="mt-4 text-orange-500">返回首页</button></div>
    </div>
  );

  return (
    <div className="bg-warm-gradient min-h-screen pb-24">
      <div className="max-w-md mx-auto">
        <div className="relative img-gradient-overlay">
          <img
            src={club.coverImage}
            alt={club.name}
            className="w-full h-56 object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                parent.style.background = club.gradientBg;
                parent.style.height = "224px";
              }
            }}
          />
          <button onClick={() => nav(-1)} className="absolute top-4 left-4 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:shadow-lg transition-shadow">←</button>
          {club.isRecruiting && <span className="absolute top-4 right-4 badge-recruiting text-xs px-3 py-1 rounded-full font-medium">招募中</span>}
        </div>

        <div className="px-4 pt-5">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-gray-900">{club.name}</h1>
            <span className="text-sm tag-glass px-3 py-1 rounded-full">{club.category}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {club.tags.map((tag) => <span key={tag} className="text-sm tag-glass rounded-full px-3 py-1">{tag}</span>)}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white rounded-2xl p-3 text-center card-elevated"><div className="text-xl mb-1">👥</div><div className="font-bold text-gray-900">{club.memberCount}</div><div className="text-xs text-gray-400">成员</div></div>
            <div className="bg-white rounded-2xl p-3 text-center card-elevated"><div className="text-xl mb-1">⏰</div><div className="font-bold text-gray-900">{club.hoursPerWeek}h</div><div className="text-xs text-gray-400">每周投入</div></div>
            <div className="bg-white rounded-2xl p-3 text-center card-elevated"><div className="text-xl mb-1">⭐</div><div className="font-bold text-gray-900">{club.beginnerFriendly}/5</div><div className="text-xs text-gray-400">新生友好</div></div>
          </div>

          <div className="bg-white rounded-2xl card-elevated p-4 mb-4">
            <h3 className="font-bold text-gray-900 mb-2">关于我们</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{club.description}</p>
          </div>

          <div className="bg-white rounded-2xl card-elevated p-4 mb-4">
            <h3 className="font-bold text-gray-900 mb-3">主要活动</h3>
            {club.activities.map((act) => <div key={act} className="flex items-center gap-2 text-sm text-gray-600 mb-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />{act}</div>)}
          </div>

          <div className="bg-white rounded-2xl card-elevated p-4 mb-4">
            <h3 className="font-bold text-gray-900 mb-3">招募方向</h3>
            <div className="flex flex-wrap gap-2">
              {club.recruitmentDirections.map((dir) => <span key={dir} className="text-sm tag-glass rounded-full px-3 py-1">{dir}</span>)}
            </div>
          </div>

          <div className="bg-orange-50 rounded-2xl p-4 mb-6 border border-orange-100">
            <div className="text-sm text-orange-700"><span className="font-medium">社团氛围：</span>{club.atmosphere}</div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 glass-nav">
        {club.isRecruiting ? (
          <button onClick={() => nav(`/student/apply/${club.id}`)} className="w-full bg-hero-gradient text-white rounded-2xl py-4 font-bold text-base btn-glow shadow-lg">立即申请加入 →</button>
        ) : (
          <button disabled className="w-full bg-gray-100 text-gray-400 rounded-2xl py-4 font-bold text-base cursor-not-allowed">暂不招募</button>
        )}
      </div>
    </div>
  );
}

function ApplyPage() {
  const { clubId } = useParams();
  const nav = useNavigate();
  const club = clubs.find((c) => c.id === clubId);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [intro, setIntro] = useState("");

  if (!club) return <div className="bg-warm-gradient min-h-screen flex items-center justify-center">社团不存在</div>;

  if (submitted) {
    return (
      <div className="bg-warm-gradient min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {CONFETTI_COLORS.map((color, i) => (
          <div key={i} className="confetti-piece" style={{
            background: color,
            left: `${15 + i * 14}%`,
            top: "10%",
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${2.5 + i * 0.4}s`,
            borderRadius: i % 2 === 0 ? "50%" : "2px",
          }} />
        ))}
        <div className="max-w-md w-full text-center relative z-10">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">申请已提交！</h1>
          <p className="text-gray-500 mb-6">你已成功申请加入 <span className="text-orange-500 font-medium">{club.name}</span><br />我们将在3-5个工作日内审核你的申请</p>
          <div className="bg-orange-50 rounded-2xl p-4 mb-6 text-sm text-orange-700 border border-orange-100">💡 可以在"我的申请"中查看审核进度</div>
          <button onClick={() => nav("/student/applications")} className="w-full bg-orange-500 text-white rounded-2xl py-4 font-bold btn-glow">查看我的申请</button>
          <button onClick={() => nav("/student/home")} className="w-full mt-3 border border-gray-200 rounded-2xl py-3 text-gray-600 font-medium hover:bg-white transition-colors">返回首页</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-warm-gradient min-h-screen pb-8">
      <div className="max-w-md mx-auto px-4 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => nav(-1)} className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:shadow-md transition-shadow">←</button>
          <h1 className="text-lg font-bold text-gray-900">申请加入 {club.name}</h1>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl card-elevated p-4">
            <label className="text-sm font-medium text-gray-700 block mb-2">自我介绍 *</label>
            <textarea value={intro} onChange={(e) => setIntro(e.target.value)} rows={4} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 resize-none transition-all" placeholder="简单介绍一下自己..." />
          </div>
          {club.customQuestions.map((q, idx) => (
            <div key={idx} className="bg-white rounded-2xl card-elevated p-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">{q}</label>
              <textarea value={answers[idx] || ""} onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })} rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 resize-none transition-all" placeholder="请填写你的回答..." />
            </div>
          ))}
          <button onClick={() => setSubmitted(true)} className="w-full bg-orange-500 text-white rounded-2xl py-4 font-bold text-base hover:bg-orange-600 btn-glow transition-colors">提交申请 →</button>
        </div>
      </div>
    </div>
  );
}

const statusColors: Record<string, string> = {
  待审核: "bg-yellow-50 text-yellow-600",
  已通过: "bg-green-50 text-green-600",
  已拒绝: "bg-red-50 text-red-500",
};
const statusEmoji: Record<string, string> = { 待审核: "⏳", 已通过: "✅", 已拒绝: "❌" };

function ApplicationsPage() {
  const nav = useNavigate();
  return (
    <div className="bg-warm-gradient min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-xl font-bold text-gray-900">我的申请</h1>
          <span className="text-sm bg-orange-50 text-orange-500 px-2 py-0.5 rounded-full font-medium">{mockApplications.length} 条</span>
        </div>
        {mockApplications.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-500 font-medium mb-1">还没有申请记录</p>
            <p className="text-gray-400 text-sm mb-6">快去发现适合你的社团吧</p>
            <button onClick={() => nav("/student/home")} className="bg-orange-500 text-white px-8 py-3 rounded-2xl text-sm font-bold btn-glow">去浏览社团</button>
          </div>
        ) : (
          <div className="space-y-3">
            {mockApplications.map((app, index) => (
              <div key={app.id} className="bg-white rounded-2xl card-elevated p-4 fade-up" style={{ animationDelay: `${index * 0.08}s` }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{app.clubName}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[app.status]}`}>{statusEmoji[app.status]} {app.status}</span>
                </div>
                <p className="text-xs text-gray-400 mb-2">申请时间：{app.appliedAt}</p>
                {app.note && <div className="bg-gray-50 rounded-xl px-3 py-2 text-xs text-gray-600">💬 {app.note}</div>}
                <button onClick={() => nav(`/student/club/${app.clubId}`)} className="mt-3 text-orange-500 text-xs font-medium hover:text-orange-600 transition-colors">查看社团详情 →</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav active="applications" />
    </div>
  );
}

function AdminDashboardPage() {
  const nav = useNavigate();
  const pending = adminApplicants.filter((a) => a.status === "待审核").length;
  const approved = adminApplicants.filter((a) => a.status === "已通过").length;

  const stats = [
    { icon: "📊", value: adminApplicants.length, label: "总申请数", color: "text-orange-500" },
    { icon: "⏳", value: pending, label: "待审核", color: "text-yellow-500" },
    { icon: "✅", value: approved, label: "已通过", color: "text-green-500" },
    { icon: "🏛️", value: clubs.length, label: "社团总数", color: "text-blue-500" },
  ];

  return (
    <div className="bg-warm-gradient min-h-screen pb-8">
      <div className="max-w-md mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-500 text-sm">管理后台</p>
            <h1 className="text-xl font-bold text-gray-900">JoinU 数据看板</h1>
          </div>
          <button onClick={() => nav("/")} className="text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-full px-4 py-2 font-medium shadow-sm transition-colors btn-glow">🔄 返回入口</button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl card-elevated overflow-hidden">
              <div className="h-1.5 w-full" style={{ background: STAT_GRADIENTS[i] }} />
              <div className="p-4">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl card-elevated overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100"><h2 className="font-bold text-gray-900">最新申请</h2></div>
          <div className="divide-y divide-gray-50">
            {adminApplicants.map((a) => (
              <div key={a.id} className="px-4 py-3 hover:bg-orange-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-600">{a.name[0]}</div>
                    <div><div className="text-sm font-medium text-gray-900">{a.name}</div><div className="text-xs text-gray-400">{a.club}</div></div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[a.status]}`}>{statusEmoji[a.status]} {a.status}</span>
                </div>
                <div className="flex items-center justify-between mt-1 ml-10">
                  <span className="text-xs tag-glass rounded-full px-2 py-0.5">{a.profile}</span>
                  <span className="text-xs text-gray-300">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IdentityPage />} />
        <Route path="/student/login" element={<StudentLoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/student/home" element={<StudentHomePage />} />
        <Route path="/student/assessment" element={<AssessmentPage />} />
        <Route path="/student/recommendations" element={<RecommendationsPage />} />
        <Route path="/student/club/:id" element={<ClubDetailPage />} />
        <Route path="/student/apply/:clubId" element={<ApplyPage />} />
        <Route path="/student/applications" element={<ApplicationsPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

