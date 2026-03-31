import { useLocalStorage } from "./useLocalStorage";

export interface AssessmentResult {
  profileType: string;
  profileEmoji: string;
  profileDescription: string;
  keywords: string[];
  completedAt: string;
}

export function useAssessmentResult() {
  const [result, setResult] = useLocalStorage<AssessmentResult | null>("joinu_assessment_result", null);

  const saveResult = (data: Omit<AssessmentResult, "completedAt">) => {
    setResult({ ...data, completedAt: new Date().toISOString() });
  };

  const clearResult = () => {
    setResult(null);
  };

  const hasResult = result !== null;

  return { result, saveResult, clearResult, hasResult };
}
