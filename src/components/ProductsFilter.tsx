import { Box, TextField, MenuItem } from "@mui/material";

interface FiltroProdutosProps {
  categories: { id: number; nome: string }[];
  nameFilter: string;
  categorieFilter: string;
  onNameFilterChange: (valor: string) => void;
  onCategorieFilterChange: (valor: string) => void;
}

const FiltroProdutos: React.FC<FiltroProdutosProps> = ({
  categories,
  nameFilter,
  categorieFilter,
  onNameFilterChange,
  onCategorieFilterChange,
}) => (
  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
    <TextField
      size="small"
      variant="outlined"
      placeholder="Buscar por nome"
      value={nameFilter}
      onChange={(e) => onNameFilterChange(e.target.value)}
      fullWidth
    />
    <TextField
      size="small"
      select
      variant="outlined"
      label="Categoria"
      value={categorieFilter}
      onChange={(e) => onCategorieFilterChange(e.target.value)}
      sx={{ minWidth: 150 }}
    >
      <MenuItem value="">Todas</MenuItem>
      {categories.map((cat) => (
        <MenuItem key={cat.id} value={cat.id}>
          {cat.nome}
        </MenuItem>
      ))}
    </TextField>
  </Box>
);

export default FiltroProdutos;
