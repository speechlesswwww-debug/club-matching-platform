import { useLocalStorage } from "./useLocalStorage";

export function useOnboarding() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useLocalStorage("joinu_onboarding_seen", false);
  const markOnboardingSeen = () => setHasSeenOnboarding(true);
  const resetOnboarding = () => setHasSeenOnboarding(false);
  return { hasSeenOnboarding, markOnboardingSeen, resetOnboarding };
}
