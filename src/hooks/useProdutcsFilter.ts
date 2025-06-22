import type { Product } from "../components/ProductsTable";

export function useFiltroProdutos(
  products: Product[],
  nameFilter: string,
  categorieFilter: string
) {
  return products.filter((product) => {
    const busca = nameFilter.trim().toLowerCase();
    const nomeMatch =
      !busca ||
      (product.nome && product.nome.toLowerCase().includes(busca)) ||
      product.id.toString().includes(busca); // <-- permite buscar por ID
    const categoriaMatch =
      !categorieFilter || product.categorias.includes(Number(categorieFilter));
    return nomeMatch && categoriaMatch;
  });
}
