import type { FilterState } from "./filterTypes";
import { DEFAULT_FILTERS } from "./filterTypes";

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

type FilterKey = keyof FilterState;

const FILTER_OPTIONS: { key: FilterKey; label: string; options: string[] }[] = [
  { key: "recruiting", label: "招募状态", options: ["全部", "招募中", "未招募"] },
  { key: "hours", label: "时间投入", options: ["不限", "1-3小时", "4-5小时", "6小时+"] },
  { key: "friendly", label: "新手友好", options: ["不限", "4-5星", "3星以上"] },
  { key: "sort", label: "排序方式", options: ["默认", "人数最多", "人数最少", "时间最少"] },
];

export function FilterPanel({ filters, onFilterChange, isOpen, onToggle }: FilterPanelProps) {
  const hasActiveFilters =
    filters.recruiting !== "全部" ||
    filters.hours !== "不限" ||
    filters.friendly !== "不限" ||
    filters.sort !== "默认";

  return (
    <div>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
          hasActiveFilters || isOpen
            ? "bg-orange-500 text-white shadow-sm"
            : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-orange-300"
        }`}
      >
        <span>🔽</span>
        {hasActiveFilters ? <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" /> : null}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="mt-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-4 animate-scale-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">筛选条件</h3>
            {hasActiveFilters && (
              <button
                onClick={() => onFilterChange(DEFAULT_FILTERS)}
                className="text-xs text-orange-500 hover:text-orange-600 font-medium"
              >
                清除筛选
              </button>
            )}
          </div>
          <div className="space-y-3">
            {FILTER_OPTIONS.map(({ key, label, options }) => (
              <div key={key}>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 font-medium">{label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => onFilterChange({ ...filters, [key]: opt as FilterState[typeof key] })}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        filters[key] === opt
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-500"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
