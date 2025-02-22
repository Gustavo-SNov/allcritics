import * as React from "react";
import { useState, useContext } from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import ColorModeIconDropdown from "../../../customizations/ColorModeIconDropdown";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Login from "../../login/Login";
import Register from "../../register/Register";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../service/AuthService";
import { CardMedia, FormControl, TextField } from "@mui/material";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

const NavBar = () => {
  const { user, handleLogin, logout } = useContext(AuthContext);
  const [openLogin, setLogin] = useState(false);
  const [openRegister, setRegister] = useState(false);
  const [filtro, setFiltro] = useState("");

  const navigate = useNavigate(); // Hook para redirecionamento

  const handleOpen = () => setLogin(true);
  const handleClose = () => setLogin(false);
  const handleOpenRegister = () => setRegister(true);
  const handleCloseRegister = () => setRegister(false);

  const handleClickPerfil = (usuario) => {
    navigate(`/perfil`, { state: usuario }); // Passa `conteudo` corretamente
  };

  const handleChangeFiltro = (novoFiltro) => {
    setFiltro(novoFiltro);
  };
  const limpaFiltro = () => {
    setFiltro("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(filtro);

    limpaFiltro();
  };
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
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
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
              <Button variant="text" color="info" size="small" href="/">
                Inicio
              </Button>
              <Button variant="text" color="info" size="small" href="/filmes">
                Filmes
              </Button>
              <Button variant="text" color="info" size="small" href="/series">
                Séries
              </Button>
              <Button variant="text" color="info" size="small" href="/jogos">
                Jogos
              </Button>
              {user ? (
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  sx={{ minWidth: 0 }}
                  onClick={() => handleClickPerfil(user)}
                >
                  Perfil
                </Button>
              ) : (
                ""
              )}
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
                marginLeft: "auto", // Adicione esta linha para empurrar os botões para a direita
              }}
            >
              <FormControl>
                <OutlinedInput
                  size="medium"
                  id="search"
                  placeholder="Search…"
                  sx={{ flexGrow: 1 }}
                  startAdornment={
                    <InputAdornment
                      position="start"
                      sx={{ color: "text.primary" }}
                    ></InputAdornment>
                  }
                  inputProps={{
                    "aria-label": "search",
                  }}
                  backgroundColor="black"
                  value={filtro || ""}
                  onChange={(event) => {
                    handleChangeFiltro(() => event.target.value);
                  }}
                />
              </FormControl>
              <Button onClick={handleSubmit}>
                <SearchRoundedIcon fontSize="small" />
              </Button>
              {!user ? (
                <>
                  <Login
                    open={openLogin}
                    handleClose={handleClose}
                    handleLogin={handleLogin}
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
                    handleLogin={handleLogin}
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
                  <PersonOutlineRounded />
                  <Button
                    color="secondary"
                    variant="text"
                    size="small"
                    onClick={logout}
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
