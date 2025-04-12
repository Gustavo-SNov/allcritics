import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../redux/usuarioSlice";
import {
  redirecionarParaInicio,
  redirecionarParaPerfil,
  redirecionarParaFilmes,
  redirecionarParaSeries,
  redirecionarParaJogos,
  resetRedirecionamento,
} from "../../redux/navbarSlice";
import {
  AppBar,
  Button,
  Container,
  Box,
  Typography,
  CardMedia
} from "@mui/material";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
import ColorModeIconDropdown from "../../customizations/ColorModeIconDropdown";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

import PesquisaInput from "./components/PesquisaInput";
import StyledToolbar from "./components/StyledToolbar";
import "@fontsource/roboto/300.css";
import { loginPost } from "../../service/AuthService";


const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook para redirecionamento

  const usuario = useSelector((state) => state.usuario);
  const navbar = useSelector((state) => state.navbar);

  const [openLogin, setLogin] = useState(false);
  const [openRegister, setRegister] = useState(false);

  const handleOpen = () => setLogin(true);
  const handleClose = () => setLogin(false);
  const handleOpenRegister = () => setRegister(true);
  const handleCloseRegister = () => setRegister(false);


  // Verifica se há um redirecionamento pendente e executa
  useEffect(() => {
    console.log("navbar redirecionarPara:", navbar?.redirecionarPara); // Log para ver o valor de redirecionarPara
    if (navbar?.redirecionarPara) {
      // Verifica se navbar e redirecionarPara existem
      navigate(navbar.redirecionarPara, { state: navbar});
      dispatch(resetRedirecionamento());
    }
  }, [navbar?.redirecionarPara, navigate, dispatch]);

  return (
    
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters >
          <Box
            sx={ { flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <CardMedia
              component="img"
              height="100px"
              image={"/imagens/logo.png"}
              alt="logo"
              sx={{
                width: "auto", // Ocupa toda a largura do card
                height: "40px", // Define a altura fixa
              }}
            />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => dispatch(redirecionarParaInicio())}
              >
                Inicio
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => {
                  dispatch(redirecionarParaFilmes());
                  console.log("Ação de redirecionamento disparada");
                }}
              >
                Filmes
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => dispatch(redirecionarParaSeries())}
              >
                Séries
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => dispatch(redirecionarParaJogos())}
              >
                Jogos
              </Button>
              <Button variant="text" color="info" size="small" href="/testes">
                Testes
              </Button>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
                marginLeft: "auto", // Adicione esta linha para empurrar os botões para a direita
              }}
            >
              <PesquisaInput />
              {!usuario.isLogged ? (
                <>
                  <Login
                    open={openLogin}
                    handleClose={handleClose}
                    handleLogin={loginPost}
                  />
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    onClick={handleOpen}
                  >
                    Login
                  </Button>
                  <Register
                    open={openRegister}
                    handleClose={handleCloseRegister}
                    handleLogin={loginPost}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={handleOpenRegister}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="text"
                    color="info"
                    size="small"
                    sx={{ minWidth: 0, display: "flex", alignItems: "center" }}
                    onClick={() => dispatch(redirecionarParaPerfil())}
                  >
                    <PersonOutlineRounded />
                    <Typography
                      variant="caption"
                      gutterBottom
                      sx={{ marginTop: 0.8, marginLeft: 0.5 }}
                    >
                      Perfil
                    </Typography>
                  </Button>
                  <Button
                    color="secondary"
                    variant="text"
                    size="small"
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                </>
              )}

              <ColorModeIconDropdown />
            </Box>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
