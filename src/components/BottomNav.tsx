import { Link } from "react-router-dom";

interface BottomNavProps {
  active: "home" | "assessment" | "applications";
}

export function BottomNav({ active }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-around py-2 z-50">
      <Link
        to="/student/home"
        className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors ${active === "home" ? "text-orange-500" : "text-gray-400 dark:text-gray-500"}`}
      >
        <span className="text-xl">🏠</span>
        <span className="text-xs">首页</span>
      </Link>
      <Link
        to="/student/assessment"
        className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors ${active === "assessment" ? "text-orange-500" : "text-gray-400 dark:text-gray-500"}`}
      >
        <span className="text-xl">✨</span>
        <span className="text-xs">AI测评</span>
      </Link>
      <Link
        to="/student/applications"
        className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors ${active === "applications" ? "text-orange-500" : "text-gray-400 dark:text-gray-500"}`}
      >
        <span className="text-xl">📋</span>
        <span className="text-xs">我的申请</span>
      </Link>
    </nav>
  );
}
