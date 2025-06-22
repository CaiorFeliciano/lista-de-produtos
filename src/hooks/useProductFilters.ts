import { useState } from "react";

export function useProductFilters() {
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  return {
    nameFilter,
    setNameFilter,
    categoryFilter,
    setCategoryFilter,
  };
}
