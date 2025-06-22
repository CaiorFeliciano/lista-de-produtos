import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";

interface HeaderProps {
  favoritosCount: number;
  categories: { id: number; nome: string }[];
  nameFilter: string;
  categorieFilter: string;
  onNameFilterChange: (value: string) => void;
  onCategorieFilterChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  favoritosCount,
  categories,
  nameFilter,
  categorieFilter,
  onNameFilterChange,
  onCategorieFilterChange,
}) => (
  <AppBar position="fixed">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1, color: "#fff" }}>
        Smartbreeder Produtos
      </Typography>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          id="standart"
          size="small"
          variant="standard"
          placeholder="Buscar por nome"
          value={nameFilter}
          onChange={(e) => onNameFilterChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#fff" }} />
              </InputAdornment>
            ),
            disableUnderline: false,
            sx: { color: "#fff" },
          }}
          InputLabelProps={{
            sx: { color: "#fff" },
          }}
          sx={{
            input: { color: "#fff" },
            "& .MuiInput-underline:before": { borderBottomColor: "#fff" },
            "& .MuiInput-underline:after": { borderBottomColor: "#fff" },
          }}
        />
        <TextField
          size="small"
          select
          variant="outlined"
          label="Categoria"
          value={categorieFilter}
          onChange={(e) => onCategorieFilterChange(e.target.value)}
          sx={{
            minWidth: 120,
            "& .MuiInputBase-input": { color: "#fff" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
            "& .MuiSvgIcon-root": { color: "#fff" },
            "& .MuiInputLabel-root": { color: "#fff" },
          }}
          InputLabelProps={{
            sx: { color: "#fff" },
          }}
        >
          <MenuItem value="">Todas</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.nome}
            </MenuItem>
          ))}
        </TextField>
        <Badge badgeContent={favoritosCount} color="error">
          <FavoriteIcon sx={{ color: "#fff" }} />
        </Badge>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
