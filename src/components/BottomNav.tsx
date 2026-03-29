import { Link } from "react-router-dom";

interface BottomNavProps {
  active: "home" | "assessment" | "applications";
}

const NAV_ITEMS = [
  { key: "home" as const, to: "/student/home", emoji: "🏠", label: "首页" },
  { key: "assessment" as const, to: "/student/assessment", emoji: "✨", label: "AI测评" },
  { key: "applications" as const, to: "/student/applications", emoji: "📋", label: "我的申请" },
];

export function BottomNav({ active }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md glass border-t border-white/50 dark:border-gray-700/50 flex justify-around py-2 z-50">
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.key;
        return (
          <Link
            key={item.key}
            to={item.to}
            className={`relative flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-2xl transition-all duration-250 ${
              isActive
                ? "text-orange-500"
                : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            }`}
          >
            {isActive && (
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-gradient-to-r from-orange-400 to-amber-400" />
            )}
            <span className={`text-xl transition-transform duration-200 ${isActive ? "scale-110" : ""}`}>
              {item.emoji}
            </span>
            <span className={`text-xs font-medium ${isActive ? "font-semibold" : ""}`}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
