import { useEffect, useState } from "react";

export interface Category {
  id: number;
  nome: string;
}

export function useFetchCategories(url: string) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .finally(() => setLoading(false));
  }, [url]);

  return { categories, loading };
}
