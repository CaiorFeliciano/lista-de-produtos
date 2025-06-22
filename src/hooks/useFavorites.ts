import { useState } from "react";
import type { Product } from "../components/ProductsTable";

export type Favorites = Product & { favoritadoEm: number };

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorites[]>([]);

  const toggleFavorites = (product: Product) => {
    const onFavorites = favorites.some((f) => f.id === product.id);
    if (onFavorites) {
      setFavorites((prev) => prev.filter((f) => f.id !== product.id));
      return;
    }

    let newFavorites = [...favorites];
    for (const categorie of product.categorias) {
      const favoritosDaCategoria = newFavorites.filter((f) =>
        f.categorias.includes(categorie)
      );
      if (favoritosDaCategoria.length >= 2) {
        const maisAntigo = favoritosDaCategoria.reduce((a, b) =>
          a.favoritadoEm < b.favoritadoEm ? a : b
        );
        newFavorites = newFavorites.filter((f) => f.id !== maisAntigo.id);
      }
    }
    setFavorites([...newFavorites, { ...product, favoritadoEm: Date.now() }]);
  };

  return { favorites, toggleFavorites };
}
