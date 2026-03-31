export interface FilterState {
  recruiting: "全部" | "招募中" | "未招募";
  hours: "不限" | "1-3小时" | "4-5小时" | "6小时+";
  friendly: "不限" | "4-5星" | "3星以上";
  sort: "默认" | "人数最多" | "人数最少" | "时间最少";
}

export const DEFAULT_FILTERS: FilterState = {
  recruiting: "全部",
  hours: "不限",
  friendly: "不限",
  sort: "默认",
};
