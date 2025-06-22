import { useState, useEffect } from "react";

export function usePagination<T>(
  tab: number,
  dataTabs: T[][],
  initialRowsPerPage = 5
) {
  const [pages, setPages] = useState([0, 0]);
  const [rowsPerPages, setRowsPerPages] = useState([
    initialRowsPerPage,
    initialRowsPerPage,
  ]);

  useEffect(() => {
    setPages((prev) => {
      const newPages = [...prev];
      newPages[tab] = 0;
      return newPages;
    });
  }, [tab]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPages((prev) => {
      const newPages = [...prev];
      newPages[tab] = newPage;
      return newPages;
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPages((prev) => {
      const newRows = [...prev];
      newRows[tab] = value;
      return newRows;
    });
    setPages((prev) => {
      const newPages = [...prev];
      newPages[tab] = 0;
      return newPages;
    });
  };

  const page = pages[tab];
  const rowsPerPage = rowsPerPages[tab];
  const data = dataTabs[tab];
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return {
    page,
    rowsPerPage,
    paginatedData,
    handleChangePage,
    handleChangeRowsPerPage,
    total: data.length,
  };
}
