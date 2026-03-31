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

  const getApplicationByClubId = (clubId: string): Application | undefined => {
    return applications.find((a) => a.clubId === clubId);
  };

  const updateApplicationStatus = (id: string, status: Application["status"]) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  return { applications, addApplication, getApplicationByClubId, updateApplicationStatus };
}
