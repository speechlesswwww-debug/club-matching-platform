import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clubs } from "../data";
import { BottomNav } from "../components/BottomNav";
import { ClubCard } from "../components/ClubCard";
import { SkeletonCard } from "../components/SkeletonCard";
import { useTheme } from "../hooks/useTheme";

const CATEGORIES = ["全部", "文艺", "艺术", "文化", "运动", "公益", "学术", "技术", "创业"];

const BANNERS = [
  { emoji: "✨", title: "AI 智能测评上线！", desc: "3分钟了解你的社团匹配度", color: "from-orange-500 to-amber-500" },
  { emoji: "🎉", title: "秋季纳新火热进行中", desc: "20+ 社团期待你的加入", color: "from-purple-500 to-pink-500" },
  { emoji: "🏆", title: "新生入团福利", desc: "首次申请享受绿色通道", color: "from-blue-500 to-cyan-500" },
];

const HOT_TAGS = ["编程", "音乐", "志愿服务", "篮球", "摄影", "创业"];

export function StudentHomePage() {
  const nav = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");
  const [bannerIdx, setBannerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx((i) => (i + 1) % BANNERS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const filtered = clubs.filter((c) => {
    const matchCat = activeCategory === "全部" || c.category === activeCategory;
    const matchSearch = c.name.includes(search) || c.tags.some((t) => t.includes(search)) || c.description.includes(search);
    return matchCat && matchSearch;
  });

  const banner = BANNERS[bannerIdx];

  return (
    <div className="min-h-screen pb-20 bg-orange-50/50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">你好，同学 👋</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              找到属于你的<span className="text-orange-500">社团</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 shadow flex items-center justify-center text-base hover:scale-110 transition-transform"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-lg">
              😊
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="mb-5 relative overflow-hidden rounded-2xl">
          <div className={`bg-gradient-to-r ${banner.color} text-white p-5 transition-all duration-500`}>
            <div className="text-3xl mb-2">{banner.emoji}</div>
            <h2 className="font-bold text-lg">{banner.title}</h2>
            <p className="text-sm text-white/80 mt-1">{banner.desc}</p>
          </div>
          <div className="absolute bottom-3 right-3 flex gap-1">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setBannerIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === bannerIdx ? "bg-white w-4" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={() => nav("/student/assessment")}
            className="bg-orange-500 text-white rounded-2xl p-4 text-left hover:bg-orange-600 transition-colors"
          >
            <div className="text-2xl mb-2">✨</div>
            <div className="font-bold text-sm">AI 智能推荐</div>
            <div className="text-xs text-orange-100 mt-1">3分钟测评 · 精准匹配</div>
          </button>
          <button
            onClick={() => nav("/student/applications")}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-left shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="font-bold text-sm text-gray-900 dark:text-white">我的申请</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">查看申请进度</div>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            className="w-full bg-white dark:bg-gray-800 rounded-2xl pl-10 pr-4 py-3 text-sm border border-gray-100 dark:border-gray-700 shadow-sm focus:outline-none focus:border-orange-300 dark:text-white"
            placeholder="搜索社团名称、标签或描述..."
          />
          {showSuggestions && search === "" && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-3 z-20">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">🔥 热门搜索</p>
              <div className="flex flex-wrap gap-2">
                {HOT_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onMouseDown={() => { setSearch(tag); setShowSuggestions(false); }}
                    className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-full text-xs hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scroll-smooth">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Club count */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            共 <span className="font-bold text-orange-500">{filtered.length}</span> 个社团
          </p>
        </div>

        {/* Club grid - responsive */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">😢</div>
            <p className="text-gray-500 dark:text-gray-400">没有找到相关社团</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("全部"); }}
              className="mt-4 text-orange-500 text-sm font-medium hover:underline"
            >
              清空搜索
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((club) => <ClubCard key={club.id} club={club} />)}
          </div>
        )}
      </div>
      <BottomNav active="home" />
    </div>
  );
}
