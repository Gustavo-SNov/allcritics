import { Avatar, Box, Button, CssBaseline, Typography } from "@mui/material";
import MuiCard from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import ColorModeSelect from "../../../customizations/ColorModeSelect";
import AppTheme from "../../../customizations/AppTheme";
import { useState } from "react";
import InputImagemPerfil from "./InputImagemPerfil";
import Grid from "@mui/material/Grid2";

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2, // Limita o texto a duas linhas
  overflow: "hidden",
  textOverflow: "ellipsis", // Se o texto for muito longo, adiciona (...)
});


const StyledBox = styled("div")(({ theme }) => ({
	display: "grid",
  gridTemplateColumns: "1fr 2fr",
  width: "800px",
  height: "400px",
  margin: "10px",
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  backgroundSize: "cover",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(8),
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",

    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

const InfoUsuario = ({ usuario, handleClickAlterar, handleAlteraUsuario }) => {
  const [alterarPerfil, setAlterarPerfil] = useState(false);

  return (
    <StyledBox>
      <Avatar
        key={usuario.idUsuario}
        alt={usuario.nome}
        src={usuario.urlFotoPerfil}
        sx={{
          display: "flex",
          width: 180,
          height: 180,
          marginTop: 4,
          marginLeft: 4,
        }}
      />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h3">{usuario.nome}</Typography>
        <Typography variant="h3">@{usuario.nomeIdentificador}</Typography>
        <Typography variant="subtitle1">{usuario.login.email}</Typography>
        <StyledTypography variant="h6" color="text.secondary" gutterBottom>
          {usuario.biografia}
        </StyledTypography>
        <Typography variant="subtitle1">{usuario.dataCriacao}</Typography>
      </Box>
    </StyledBox>
  );
};

export default InfoUsuario;
