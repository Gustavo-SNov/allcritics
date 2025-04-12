import * as React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConteudos } from "../../service/ConteudoService";
import { getUsuario, putUsuario } from "../../service/UsuarioService";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import {
  Button,
  CardMedia,
  Typography,
  Card,
  Paper,
  Menu,
} from "@mui/material";
import ListaConteudos from "../conteudo/ListaConteudos";
import InfoUsuario from "./components/InfoUsuario";
import EstatisticasUsuario from "./components/EstatisticasUsuario";
import MenuPerfil from "./components/MenuPerfil";
import ListasPerfil from "./components/ListasPerfil";

const StyledBox = styled(Box)(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  height: "100%",
  borderRadius: theme.shape.borderRadius,
  outline: "6px solid hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: theme.palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(2),
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(2),
  },
  ...theme.applyStyles?.("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: theme.palette.grey[700],
  }),
}));

const UsuarioReview = ({ usuario }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={3}>
          <Avatar
            key={usuario.idReview}
            alt={usuario.nome}
            src={usuario.foto}
            sx={{ width: 24, height: 24 }}
          />
        </AvatarGroup>
        <Typography variant="caption">{usuario.nome}</Typography>
      </Box>
    </Box>
  );
};

UsuarioReview.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Perfil = () => {
  const location = useLocation();
  const usuario = useSelector((state) => state.usuario);
  const dispatch = useDispatch();

  // const usuario = location.state.usuario; // Recupera os dados passados
  const [reviews, setReviews] = useState([]);
  const [conteudos, setConteudos] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Cálculo da exibição dos itens por página
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleAlteraUsuario = (usuarioAlterado) => {
    setUsuario(usuarioAlterado);
  };

  const handleClickAlterar = () => {
    putUsuario(usuario, (usuarioAlterado) => {
      handleAlteraUsuario(usuarioAlterado);
    });
  };

  useEffect(() => {
    async function buscaUsuario() {
      const dados = await getUsuario(usuario.idUsuario);
      console.log("Perfil -> Dados: ", dados);
    }

    buscaUsuario();
  }, [usuario]); // Apenas executa quando o usuário mudar

  return (
    <Container>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <InfoUsuario
          usuario={usuario}
          handleClickAlterar={handleClickAlterar}
          handleAlteraUsuario={handleAlteraUsuario}
        />

        <EstatisticasUsuario />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <MenuPerfil />
        <ListasPerfil />
      </Box>

    </Container>
  );
};
export default Perfil;
