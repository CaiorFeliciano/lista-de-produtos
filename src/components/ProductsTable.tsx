import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Loading from "./Loading";

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
  variacao: Variation[]; // Corrija aqui para 'variacao'
  categorias: number[];
}

interface ProdutosTableProps {
  products: Product[];
  favoritos?: Product[];
  onFavoritar?: (product: Product) => void;
  loading?: boolean; // Adicione esta prop
}

const Row: React.FC<{
  product: Product;
  favoritos: Product[];
  onFavoritar?: (produto: Product) => void;
}> = ({ product, favoritos, onFavoritar }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{product.id}</TableCell>
        <TableCell>{product.nome || "Nome desconhecido"}</TableCell>
        <TableCell>{product.preco ?? "Preço não disponível"}</TableCell>
        <TableCell>
          {product.descricao ?? "-Descrição não disponível"}
        </TableCell>
        <TableCell>
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="subtitle1" gutterBottom>
                Variações
              </Typography>
              <Table size="small">
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
                  {product.variacao.map((v, idx) => (
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
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ProdutosTable: React.FC<ProdutosTableProps> = ({
  products,
  favoritos = [],
  onFavoritar,
  loading = false, // valor padrão
}) => {
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
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
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <Row
              key={product.id}
              product={product}
              favoritos={favoritos}
              onFavoritar={onFavoritar}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProdutosTable;
