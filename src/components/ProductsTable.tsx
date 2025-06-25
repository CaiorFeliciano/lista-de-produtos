import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Loading from "./Loading";
import { useProductModal } from "../hooks/useProductModal";

export interface Variation {
  estoque: string;
  vendedor: string;
  fabricante: string;
  cor: string;
  voltagem: string;
  tamanho: string;
  garantia: string;
  peso: string | null;
  dimensoes: string | null;
}

export interface Product {
  id: number;
  nome: string | null;
  preco: string | null;
  descricao?: string;
  variacao: Variation[];
  categorias: number[];
}

interface ProdutosTableProps {
  products: Product[];
  favoritos?: Product[];
  onFavoritar?: (product: Product) => void;
  loading?: boolean;
}

const Row: React.FC<{
  product: Product;
  favoritos: Product[];
  onFavoritar?: (produto: Product) => void;
  onClick: (product: Product) => void;
}> = ({ product, favoritos, onFavoritar, onClick }) => {
  return (
    <TableRow
      hover
      style={{ cursor: "pointer" }}
      onClick={() => onClick(product)}
    >
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.nome || "Nome desconhecido"}</TableCell>
      <TableCell>{product.preco ?? "Preço não disponível"}</TableCell>
      <TableCell>{product.descricao ?? "-Descrição não disponível"}</TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        {onFavoritar && (
          <IconButton onClick={() => onFavoritar(product)} color="primary">
            {favoritos?.some((f) => f.id === product.id) ? (
              <StarIcon color="warning" />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

const ProdutosTable: React.FC<ProdutosTableProps> = ({
  products,
  favoritos = [],
  onFavoritar,
  loading = false,
}) => {
  const { modalOpen, selectedProduct, openModal, closeModal } =
    useProductModal();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
        }}
      >
        <Loading />
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Nome
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Preço
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Descrição
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Favorito
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <Row
                key={product.id}
                product={product}
                favoritos={favoritos}
                onFavoritar={onFavoritar}
                onClick={openModal}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={modalOpen} onClose={closeModal} maxWidth="md" fullWidth>
        <DialogTitle>
          Detalhes do Produto
          {selectedProduct && onFavoritar && (
            <IconButton
              onClick={() => onFavoritar(selectedProduct)}
              color="primary"
              sx={{ ml: 2 }}
            >
              {favoritos?.some((f) => f.id === selectedProduct.id) ? (
                <StarIcon color="warning" />
              ) : (
                <StarBorderIcon />
              )}
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent dividers>
          {selectedProduct && (
            <Box>
              <Typography variant="h6">{selectedProduct.nome}</Typography>
              <Typography>ID: {selectedProduct.id}</Typography>
              <Typography>
                Preço: {selectedProduct.preco ?? "Preço não disponível"}
              </Typography>
              <Typography>
                Descrição:{" "}
                {selectedProduct.descricao ?? "-Descrição não disponível"}
              </Typography>
              <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                Variações:
              </Typography>
              <Table size="small" sx={{ mt: 1 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Estoque</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Vendedor</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Fabricante
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Cor</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Voltagem</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Tamanho</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Garantia</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Peso</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Dimensões</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProduct.variacao.map((v, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{v.estoque}</TableCell>
                      <TableCell>{v.vendedor}</TableCell>
                      <TableCell>{v.fabricante}</TableCell>
                      <TableCell>{v.cor}</TableCell>
                      <TableCell>{v.voltagem}</TableCell>
                      <TableCell>{v.tamanho}</TableCell>
                      <TableCell>{v.garantia}</TableCell>
                      <TableCell>{v.peso ?? "Peso não disponível"}</TableCell>
                      <TableCell>
                        {v.dimensoes ?? "Dimensões não disponíveis"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProdutosTable;
