import ProductsTable from "./components/ProductsTable";
import Pagination from "./components/TablePagination";
import Header from "./components/Header";
import { usePagination } from "./hooks/usePagination";
import { useFiltroProdutos } from "./hooks/useProdutcsFilter";
import { Tabs, Tab, Box } from "@mui/material";
import { useProductsFetch } from "./hooks/useProductsFetch";
import { useFavorites } from "./hooks/useFavorites";
import { useProductFilters } from "./hooks/useProductFilters";
import { useTabs } from "./hooks/useTabs";
import { useFetchCategories } from "./hooks/useFetchCategories";

function App() {
  const { tab, setTab } = useTabs();
  const { nameFilter, setNameFilter, categoryFilter, setCategoryFilter } =
    useProductFilters();
  const { categories } = useFetchCategories("/mocks/categorias.json");
  const { products, loading } = useProductsFetch(
    "/mocks/produtos_com_variacoes.json",
    1500
  );
  const { favorites, toggleFavorites } = useFavorites();

  const produtosFiltrados = useFiltroProdutos(
    products,
    nameFilter,
    categoryFilter
  );
  const dataTabs = [produtosFiltrados, favorites];

  const {
    page,
    rowsPerPage,
    paginatedData,
    handleChangePage,
    handleChangeRowsPerPage,
    total,
  } = usePagination(tab, dataTabs, 5);

  return (
    <div>
      <Header
        favoritosCount={favorites.length}
        categories={categories}
        nameFilter={nameFilter}
        categorieFilter={categoryFilter}
        onNameFilterChange={setNameFilter}
        onCategorieFilterChange={setCategoryFilter}
      />
      <Box sx={{ mt: 10 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Todos os Produtos" />
          <Tab label="Favoritos" />
        </Tabs>
        <ProductsTable
          products={paginatedData}
          favoritos={favorites}
          onFavoritar={toggleFavorites}
          loading={loading}
        />
        <Pagination
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
}

export default App;
