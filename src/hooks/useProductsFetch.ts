import { useEffect, useState } from "react";
import type { Product } from "../components/ProductsTable";

export function useProductsFetch(url: string, delay = 1500) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsWithDelay = () =>
      new Promise<Product[]>((resolve, reject) => {
        setTimeout(() => {
          fetch(url)
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch(reject);
        }, delay);
      });

    fetchProductsWithDelay().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [url, delay]);

  return { products, loading };
}
