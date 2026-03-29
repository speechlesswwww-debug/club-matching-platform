import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clubs } from "../data";
import { useFavorites } from "../hooks/useFavorites";

export function ClubDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const club = clubs.find((c) => c.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();
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

  return (
    <div className="min-h-screen pb-24 bg-orange-50/50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        {/* Image gallery */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${galleryIdx * 100}%)` }}
          >
            {galleryImages.map((img, i) => (
              <img key={i} src={img} alt={`${club.name} ${i + 1}`} className="w-full h-56 object-cover flex-shrink-0" />
            ))}
          </div>
          <button
            onClick={() => nav(-1)}
            className="absolute top-4 left-4 w-9 h-9 bg-white dark:bg-gray-800 rounded-full shadow flex items-center justify-center text-gray-600 dark:text-gray-300"
          >
            ←
          </button>
          <button
            onClick={() => toggleFavorite(club.id)}
            className="absolute top-4 right-12 w-9 h-9 bg-white dark:bg-gray-800 rounded-full shadow flex items-center justify-center text-lg hover:scale-110 transition-transform"
          >
            {fav ? "❤️" : "🤍"}
          </button>
          {club.isRecruiting && (
            <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
              招募中
            </span>
          )}
          {/* Gallery dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setGalleryIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === galleryIdx ? "bg-white w-4" : "bg-white/50"}`}
              />
            ))}
          </div>
          {/* Gallery arrows */}
          {galleryIdx > 0 && (
            <button
              onClick={() => setGalleryIdx((i) => i - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 text-white rounded-full flex items-center justify-center"
            >
              ‹
            </button>
          )}
          {galleryIdx < galleryImages.length - 1 && (
            <button
              onClick={() => setGalleryIdx((i) => i + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 text-white rounded-full flex items-center justify-center"
            >
              ›
            </button>
          )}
        </div>

        <div className="px-4 pt-5">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{club.name}</h1>
            <span className="text-sm bg-orange-50 dark:bg-orange-900/20 text-orange-500 px-3 py-1 rounded-full">
              {club.category}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {club.tags.map((tag) => (
              <span key={tag} className="text-sm bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-full px-3 py-1">
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 text-center shadow-sm">
              <div className="text-xl mb-1">👥</div>
              <div className="font-bold text-gray-900 dark:text-white">{club.memberCount}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">成员</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 text-center shadow-sm">
              <div className="text-xl mb-1">⏰</div>
              <div className="font-bold text-gray-900 dark:text-white">{club.hoursPerWeek}h</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">每周投入</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 text-center shadow-sm">
              <div className="text-xl mb-1">⭐</div>
              <div className="font-bold text-gray-900 dark:text-white">{club.beginnerFriendly}/5</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">新生友好</div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">关于我们</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{club.description}</p>
          </div>

          {/* Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">主要活动</h3>
            {club.activities.map((act) => (
              <div key={act} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                {act}
              </div>
            ))}
          </div>

          {/* Recruitment timeline */}
          {club.timeline && club.timeline.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">招募时间线</h3>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-orange-100 dark:bg-orange-900/30" />
                {club.timeline.map((item, i) => (
                  <div key={i} className="relative pl-8 pb-4 last:pb-0">
                    <div className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-orange-500 border-2 border-white dark:border-gray-800" />
                    <p className="text-xs text-orange-500 font-medium mb-0.5">{item.date}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{item.event}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recruitment directions */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">招募方向</h3>
            <div className="flex flex-wrap gap-2">
              {club.recruitmentDirections.map((dir) => (
                <span key={dir} className="text-sm bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-full px-3 py-1">
                  {dir}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews */}
          {club.reviews && club.reviews.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">精选评价</h3>
              <div className="space-y-4">
                {club.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-50 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{review.avatar}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{review.author}</span>
                      <div className="flex gap-0.5 ml-auto">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={`text-xs ${s <= review.rating ? "text-orange-400" : "text-gray-200 dark:text-gray-700"}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{review.content}</p>
                    <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Atmosphere */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-4 mb-6">
            <div className="text-sm text-orange-700 dark:text-orange-300">
              <span className="font-medium">社团氛围：</span>
              {club.atmosphere}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom apply button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        {club.isRecruiting ? (
          <button
            onClick={() => setShowApplyModal(true)}
            className="w-full bg-orange-500 text-white rounded-2xl py-4 font-bold text-base hover:bg-orange-600 transition-colors"
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
            className="w-full max-w-md bg-white dark:bg-gray-800 rounded-t-3xl p-6 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-5">
              <div className="text-4xl mb-3">🎯</div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">申请加入 {club.name}？</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                你将填写申请表单，社团将在 3-5 个工作日内审核你的申请。
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowApplyModal(false)}
                className="flex-1 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-xl py-3 font-medium"
              >
                取消
              </button>
              <button
                onClick={() => { setShowApplyModal(false); nav(`/student/apply/${club.id}`); }}
                className="flex-1 bg-orange-500 text-white rounded-xl py-3 font-bold hover:bg-orange-600 transition-colors"
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
