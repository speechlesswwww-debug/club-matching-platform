import { useLocalStorage } from "./useLocalStorage";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>("joinu_favorites", []);

  const toggleFavorite = (clubId: string) => {
    setFavorites((prev) =>
      prev.includes(clubId) ? prev.filter((id) => id !== clubId) : [...prev, clubId]
    );
  };

  const isFavorite = (clubId: string) => favorites.includes(clubId);

  return { favorites, toggleFavorite, isFavorite };
}
