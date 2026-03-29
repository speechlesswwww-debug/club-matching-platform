import { useLocalStorage } from "./useLocalStorage";
import { mockApplications } from "../data";
import type { Application } from "../types";

export function useApplications() {
  const [applications, setApplications] = useLocalStorage<Application[]>(
    "joinu_applications",
    mockApplications
  );

  const addApplication = (app: Omit<Application, "id">) => {
    const newApp: Application = { ...app, id: `a${Date.now()}` };
    setApplications((prev) => [newApp, ...prev]);
    return newApp;
  };

  return { applications, addApplication };
}
