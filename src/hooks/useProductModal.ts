import { useState } from "react";
import { type Product } from "../components/ProductsTable";

export function useProductModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return {
    modalOpen,
    selectedProduct,
    openModal,
    closeModal,
  };
}
