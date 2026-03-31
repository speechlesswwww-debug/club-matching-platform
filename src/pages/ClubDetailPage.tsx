import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clubs } from "../data";
import { useFavorites } from "../hooks/useFavorites";
import { useAssessmentResult } from "../hooks/useAssessmentResult";
import { matchClubs } from "../matching";
import { CircularProgress } from "../components/CircularProgress";

export function ClubDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const club = clubs.find((c) => c.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { result } = useAssessmentResult();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);

  if (!club)
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50/50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-4xl mb-3">😢</div>
          <p className="text-gray-500 dark:text-gray-400">社团不存在</p>
          <button onClick={() => nav("/student/home")} className="mt-4 text-orange-500">
            返回首页
          </button>
        </div>
      </div>
    );

  const fav = isFavorite(club.id);
  const galleryImages = [
    club.coverImage,
    `https://picsum.photos/seed/${club.id}a/800/400`,
    `https://picsum.photos/seed/${club.id}b/800/400`,
  ];

  // Calculate match score if user has assessment result
  let matchScore: number | null = null;
  if (result?.keywords) {
    const matches = matchClubs(result.keywords);
    const found = matches.find((m) => m.club.id === club.id);
    if (found) matchScore = found.score;
  }

  return (
    <div className="min-h-screen pb-28 bg-orange-50/50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        {/* Image gallery with gradient overlay */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${galleryIdx * 100}%)` }}
          >
            {galleryImages.map((img, i) => (
              <img key={i} src={img} alt={`${club.name} ${i + 1}`} className="w-full h-64 object-cover flex-shrink-0" />
            ))}
          </div>
          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Top buttons */}
          <button
            onClick={() => nav(-1)}
            className="absolute top-4 left-4 w-9 h-9 glass rounded-full shadow flex items-center justify-center text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform"
          >
            ←
          </button>
          <button
            onClick={() => toggleFavorite(club.id)}
            className="absolute top-4 right-14 w-9 h-9 glass rounded-full shadow flex items-center justify-center text-lg hover:scale-110 transition-transform"
          >
            {fav ? "❤️" : "🤍"}
          </button>
          {club.isRecruiting && (
            <span className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow">
              招募中
            </span>
          )}

          {/* Club name overlay */}
          <div className="absolute bottom-3 left-4 text-white">
            <h1 className="text-xl font-bold drop-shadow">{club.name}</h1>
            <span className="text-xs text-white/80">{club.category}</span>
          </div>

          {/* Gallery dots */}
          <div className="absolute bottom-3 right-4 flex gap-1">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setGalleryIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === galleryIdx ? "bg-white w-5" : "bg-white/50 w-2"}`}
              />
            ))}
          </div>

          {/* Gallery arrows */}
          {galleryIdx > 0 && (
            <button
              onClick={() => setGalleryIdx((i) => i - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 text-white rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
            >
              ‹
            </button>
          )}
          {galleryIdx < galleryImages.length - 1 && (
            <button
              onClick={() => setGalleryIdx((i) => i + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 text-white rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
            >
              ›
            </button>
          )}
        </div>

        <div className="px-4 pt-5">
          {/* Match score + deadline */}
          {(matchScore !== null || club.recruitmentDeadline) && (
            <div className="flex items-center gap-3 mb-4">
              {matchScore !== null && (
                <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 rounded-2xl px-3 py-2 border border-orange-100 dark:border-orange-900/30">
                  <CircularProgress score={matchScore} size={44} strokeWidth={4} />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">AI 匹配度</p>
                    <p className="text-sm font-bold text-orange-500">{matchScore}分</p>
                  </div>
                </div>
              )}
              {club.recruitmentDeadline && (
                <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 rounded-2xl px-3 py-2 border border-red-100 dark:border-red-900/30 flex-1">
                  <span className="text-red-400 text-lg">⏰</span>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">报名截止</p>
                    <p className="text-sm font-bold text-red-500">{club.recruitmentDeadline}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {club.tags.map((tag) => (
              <span key={tag} className="text-sm bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-full px-3 py-1 font-medium">
                #{tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { icon: "👥", value: String(club.memberCount), label: "成员" },
              { icon: "⏰", value: `${club.hoursPerWeek}h`, label: "每周投入" },
              { icon: "⭐", value: `${club.beginnerFriendly}/5`, label: "新生友好" },
            ].map(({ icon, value, label }) => (
              <div key={label} className="bg-white dark:bg-gray-800 rounded-2xl p-3 text-center shadow-sm border border-gray-100/50 dark:border-gray-700/50">
                <div className="text-xl mb-1">{icon}</div>
                <div className="font-bold text-gray-900 dark:text-white text-sm">{value}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">{label}</div>
              </div>
            ))}
          </div>

          {/* About */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-4 border border-gray-100/50 dark:border-gray-700/50">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-400 to-amber-400 inline-block" />
              关于我们
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{club.description}</p>
          </div>

          {/* Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-4 border border-gray-100/50 dark:border-gray-700/50">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-400 to-amber-400 inline-block" />
              主要活动
            </h3>
            {club.activities.map((act) => (
              <div key={act} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex-shrink-0" />
                {act}
              </div>
            ))}
          </div>

          {/* Recruitment process */}
          {club.recruitmentProcess && club.recruitmentProcess.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-4 border border-gray-100/50 dark:border-gray-700/50">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-400 to-amber-400 inline-block" />
                招募流程
              </h3>
              <div className="flex items-start gap-0 overflow-x-auto pb-2">
                {club.recruitmentProcess.map((step, i) => (
                  <div key={i} className="flex items-center flex-shrink-0">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {i + 1}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 text-center max-w-[64px]">{step}</p>
                    </div>
                    {i < club.recruitmentProcess!.length - 1 && (
                      <div className="w-8 h-0.5 bg-gradient-to-r from-orange-300 to-amber-300 mt-[-18px] flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recruitment timeline */}
          {club.timeline && club.timeline.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-4 border border-gray-100/50 dark:border-gray-700/50">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-400 to-amber-400 inline-block" />
                招募时间线
              </h3>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 to-amber-300 dark:from-orange-700 dark:to-amber-700" />
                {club.timeline.map((item, i) => (
                  <div key={i} className="relative pl-8 pb-4 last:pb-0">
                    <div className="absolute left-1 top-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 border-2 border-white dark:border-gray-800 shadow-sm" />
                    <p className="text-xs text-orange-500 font-semibold mb-0.5">{item.date}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{item.event}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recruitment directions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-4 border border-gray-100/50 dark:border-gray-700/50">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-400 to-amber-400 inline-block" />
              招募方向
            </h3>
            <div className="flex flex-wrap gap-2">
              {club.recruitmentDirections.map((dir) => (
                <span key={dir} className="text-sm bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-full px-3 py-1 font-medium">
                  {dir}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews */}
          {club.reviews && club.reviews.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-4 border border-gray-100/50 dark:border-gray-700/50">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-orange-400 to-amber-400 inline-block" />
                精选评价
              </h3>
              <div className="space-y-4">
                {club.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-50 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{review.avatar}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{review.author}</span>
                      <div className="flex gap-0.5 ml-auto">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={`text-sm ${s <= review.rating ? "text-amber-400" : "text-gray-200 dark:text-gray-700"}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{review.content}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Atmosphere */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-4 mb-6 border border-orange-100 dark:border-orange-900/30">
            <div className="text-sm text-orange-700 dark:text-orange-300 leading-relaxed">
              <span className="font-semibold">🌟 社团氛围：</span>
              {club.atmosphere}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom apply button with glassmorphism */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl p-4 glass border-t border-white/50 dark:border-gray-700/50">
        {club.isRecruiting ? (
          <button
            onClick={() => setShowApplyModal(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl py-4 font-bold text-base hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 animate-pulse-glow"
          >
            立即申请加入 →
          </button>
        ) : (
          <button disabled className="w-full bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-2xl py-4 font-bold text-base cursor-not-allowed">
            暂不招募
          </button>
        )}
      </div>

      {/* Apply confirm modal */}
      {showApplyModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
          onClick={() => setShowApplyModal(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-gray-800 rounded-t-3xl p-6 animate-slide-up border-t border-gray-100 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-5">
              <div className="text-4xl mb-3 animate-bounce">🎯</div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">申请加入 {club.name}？</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                你将填写申请表单，社团将在 3-5 个工作日内审核你的申请。
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowApplyModal(false)}
                className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-xl py-3 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => { setShowApplyModal(false); nav(`/student/apply/${club.id}`); }}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl py-3 font-bold hover:from-orange-600 hover:to-amber-600 transition-all shadow-md"
              >
                确认申请
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
