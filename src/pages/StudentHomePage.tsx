import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clubs } from "../data";
import { BottomNav } from "../components/BottomNav";
import { ClubCard } from "../components/ClubCard";
import { SkeletonCard } from "../components/SkeletonCard";
import { FilterPanel } from "../components/FilterPanel";
import { DEFAULT_FILTERS } from "../components/filterTypes";
import { OnboardingGuide } from "../components/OnboardingGuide";
import { useTheme } from "../hooks/useTheme";
import { useOnboarding } from "../hooks/useOnboarding";
import type { FilterState } from "../components/filterTypes";

const CATEGORIES = ["全部", "文艺", "艺术", "文化", "运动", "公益", "学术", "技术", "创业"];

const CATEGORY_ICONS: Record<string, string> = {
  全部: "🌟",
  文艺: "🎭",
  艺术: "🎨",
  文化: "📚",
  运动: "⚽",
  公益: "💛",
  学术: "🔬",
  技术: "💻",
  创业: "🚀",
};

const BANNERS = [
  { emoji: "✨", title: "AI 智能测评上线！", desc: "3分钟了解你的社团匹配度", color: "from-orange-500 to-amber-500" },
  { emoji: "🎉", title: "秋季纳新火热进行中", desc: "20+ 社团期待你的加入", color: "from-purple-500 to-pink-500" },
  { emoji: "🏆", title: "新生入团福利", desc: "首次申请享受绿色通道", color: "from-blue-500 to-cyan-500" },
];

const HOT_TAGS = ["编程", "音乐", "志愿服务", "篮球", "摄影", "创业"];

const SUGGESTIONS_HIDE_DELAY = 150;

function applyFilters(inputClubs: typeof clubs, filters: FilterState) {
  let result = [...inputClubs];
  if (filters.recruiting === "招募中") result = result.filter((c) => c.isRecruiting);
  if (filters.recruiting === "未招募") result = result.filter((c) => !c.isRecruiting);
  if (filters.hours === "1-3小时") result = result.filter((c) => c.hoursPerWeek <= 3);
  if (filters.hours === "4-5小时") result = result.filter((c) => c.hoursPerWeek >= 4 && c.hoursPerWeek <= 5);
  if (filters.hours === "6小时+") result = result.filter((c) => c.hoursPerWeek >= 6);
  if (filters.friendly === "4-5星") result = result.filter((c) => c.beginnerFriendly >= 4);
  if (filters.friendly === "3星以上") result = result.filter((c) => c.beginnerFriendly >= 3);
  if (filters.sort === "人数最多") result = result.sort((a, b) => b.memberCount - a.memberCount);
  if (filters.sort === "人数最少") result = result.sort((a, b) => a.memberCount - b.memberCount);
  if (filters.sort === "时间最少") result = result.sort((a, b) => a.hoursPerWeek - b.hoursPerWeek);
  return result;
}

export function StudentHomePage() {
  const nav = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const { hasSeenOnboarding, markOnboardingSeen } = useOnboarding();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");
  const [bannerIdx, setBannerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx((i) => (i + 1) % BANNERS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const baseFiltered = clubs.filter((c) => {
    const matchCat = activeCategory === "全部" || c.category === activeCategory;
    const matchSearch = c.name.includes(search) || c.tags.some((t) => t.includes(search)) || c.description.includes(search);
    return matchCat && matchSearch;
  });

  const filtered = applyFilters(baseFiltered, filters);
  const banner = BANNERS[bannerIdx];

  return (
    <div className="min-h-screen pb-20 bg-orange-50/50 dark:bg-gray-900">
      {/* Onboarding guide */}
      {!hasSeenOnboarding && (
        <OnboardingGuide onComplete={markOnboardingSeen} />
      )}

      {/* Header with gradient background */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 px-4 pt-10 pb-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-20 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-2xl mx-auto relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-orange-100 text-sm font-medium">你好，同学 👋</p>
              <h1 className="text-2xl font-bold text-white mt-0.5">
                找到属于你的社团
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-base hover:scale-110 transition-transform"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg border-2 border-white/30">
                😊
              </div>
            </div>
          </div>

          {/* Search + filter row */}
          <div className="flex gap-2 items-start">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70">🔍</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), SUGGESTIONS_HIDE_DELAY)}
                className="w-full glass-orange text-white placeholder-orange-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="搜索社团名称、标签或描述..."
              />
              {showSuggestions && search === "" && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-3 z-20 animate-scale-in">
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">🔥 热门搜索</p>
                  <div className="flex flex-wrap gap-2">
                    {HOT_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onMouseDown={() => { setSearch(tag); setShowSuggestions(false); }}
                        className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-full text-xs hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors font-medium"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              isOpen={filterOpen}
              onToggle={() => setFilterOpen((o) => !o)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-2">
        {/* Filter panel (below header, above banner) */}
        {filterOpen && (
          <div className="mt-3">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              isOpen={filterOpen}
              onToggle={() => setFilterOpen((o) => !o)}
            />
          </div>
        )}

        {/* Banner */}
        <div className="mb-5 relative overflow-hidden rounded-2xl shadow-md mt-4">
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
                className={`h-1.5 rounded-full transition-all duration-300 ${i === bannerIdx ? "bg-white w-5" : "bg-white/50 w-2"}`}
              />
            ))}
          </div>
        </div>

        {/* Quick actions - 3 columns */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <button
            onClick={() => nav("/student/assessment")}
            className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl p-4 text-left hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="text-2xl mb-2">✨</div>
            <div className="font-bold text-xs">AI 智能推荐</div>
            <div className="text-xs text-orange-100 mt-1">精准匹配</div>
          </button>
          <button
            onClick={() => nav("/student/applications")}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-left shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="font-bold text-xs text-gray-900 dark:text-white">我的申请</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">查看进度</div>
          </button>
          <button
            onClick={() => nav("/student/favorites")}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-left shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="text-2xl mb-2">❤️</div>
            <div className="font-bold text-xs text-gray-900 dark:text-white">我的收藏</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">查看收藏</div>
          </button>
        </div>

        {/* Category tabs with icons */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scroll-smooth">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm"
                  : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700 hover:border-orange-200"
              }`}
            >
              <span className="text-base">{CATEGORY_ICONS[cat]}</span>
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

        {/* Club grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">😢</div>
            <p className="text-gray-500 dark:text-gray-400">没有找到相关社团</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("全部"); setFilters(DEFAULT_FILTERS); }}
              className="mt-4 text-orange-500 text-sm font-medium hover:underline"
            >
              清空筛选
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
