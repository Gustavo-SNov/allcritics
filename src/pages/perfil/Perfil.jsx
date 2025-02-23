import * as React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Conteudos from "../home/components/Conteudos";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { getReviewsUsuario,deleteReview } from "../../service/ReviewService";
import { useState, useEffect, useContext } from "react";
import ListaReviews from "../home/components/ListaReviews";
import { getConteudos } from "../../service/ConteudoService";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2, // Limita o texto a duas linhas
  overflow: "hidden",
  textOverflow: "ellipsis", // Se o texto for muito longo, adiciona (...)
});
import { Button, Card, CardMedia, Typography } from "@mui/material";

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  textDecoration: "none",
  "&:hover": { cursor: "pointer" },
  "& .arrow": {
    visibility: "hidden",
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
  },
  "&:hover .arrow": {
    visibility: "visible",
    opacity: 0.7,
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "3px",
    borderRadius: "8px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    width: 0,
    height: "1px",
    bottom: 0,
    left: 0,
    backgroundColor: (theme.vars || theme).palette.text.primary,
    opacity: 0.3,
    transition: "width 0.3s ease, opacity 0.3s ease",
  },
  "&:hover::before": {
    width: "100%",
  },
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
  const usuario = location.state; // Recupera os dados passados
  const [reviews, setReviews] = useState([]);
  const [conteudos, setConteudos] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Cálculo da exibição dos itens por página
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReviews = reviews.slice(startIndex, endIndex);
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  useEffect(() => {
    const carregarDados = async () => {
      // Buscar reviews primeiro
      const listaReviews = await getReviewsUsuario(usuario.idUsuario);
      console.log("reviews: ", listaReviews);
      setReviews(listaReviews);

      if (listaReviews.length > 0) {
        // Só buscar os conteúdos se houver reviews
        const filtros = { orderByUltimos: true };
        const listaConteudos = await getConteudos(filtros);
        console.log("Conteúdos carregados: ", listaConteudos);

        // Criar um conjunto de IDs de conteúdos que possuem reviews
        const conteudosComReview = new Set(
          listaReviews.map((review) => review.conteudo.idConteudo)
        );

        // Filtrar apenas os conteúdos que possuem reviews
        const conteudosFiltrados = listaConteudos.filter((conteudo) =>
          conteudosComReview.has(conteudo.idConteudo)
        );

        console.log("Conteúdos filtrados: ", conteudosFiltrados);
        setConteudos(conteudosFiltrados);
      } else {
        console.log("Nenhuma review encontrada, não há conteúdos para exibir.");
        setConteudos([]); // Garantir que o estado seja atualizado
      }
    };

    carregarDados();
  }, [usuario.idUsuario]); // Apenas executa quando o usuário mudar

  console.log(conteudos);
  // Função para excluir uma review
  const handleDeleteReview = async (idReview) => {
    try {
      await deleteReview(idReview); // Chama a API para excluir a review
      console.log(`Review ${idReview} excluída com sucesso.`);

      // Atualiza o estado removendo a review excluída
      const updatedReviews = reviews.filter(
        (review) => review.idReview !== idReview
      );
      setReviews(updatedReviews);

      // Atualiza os conteúdos, removendo os que não possuem mais reviews associadas
      const conteudosComReview = new Set(
        updatedReviews.map((review) => review.conteudo.idConteudo)
      );
      const filteredConteudos = conteudos.filter((conteudo) =>
        conteudosComReview.has(conteudo.idConteudo)
      );

      setConteudos(filteredConteudos);
    } catch (error) {
      console.error("Erro ao excluir review:", error);
    }
  };

  return (
    <div>
      <CssBaseline enableColorScheme />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Avatar
            key={usuario.idUsuario}
            alt={usuario.nome}
            src={usuario.imagem}
            sx={{ width: 150, height: 150 }}
          />

          <Typography variant="h3">{usuario.nome}</Typography>
          <StyledTypography variant="h6" color="text.secondary" gutterBottom>
            {usuario.biografia}
          </StyledTypography>
        </Box>

        <Typography variant="h2" gutterBottom>
          Avaliados recentemente
        </Typography>

        <Conteudos conteudos={conteudos} items={6} />

        <div>
          <Typography variant="h2" gutterBottom>
            Últimos Reviews
          </Typography>
          <Grid container spacing={3} columns={12} sx={{ my: 4 }}>
            {paginatedReviews.map((review, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6 }}>
                <Card sx={{ display: "flex", height: "200px" }}>
                  <Box sx={{ flex: 1 }}>
                    <CardMedia
                      component="img"
                      sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "scale-down",
                      }}
                      image={review.conteudo.urlImagem}
                      alt={review.conteudo.titulo}
                    />
                  </Box>
                  {/* {/ 2/3 da largura para as informações */}
                  <Box
                    sx={{
                      flex: 2,
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 1,
                      }}
                    >
                      <Avatar
                        src={review.usuario.avatar}
                        sx={{ width: 24, height: 24, margin: 1 }}
                      />
                      <Typography variant="caption">
                        {review.usuario.nome}
                      </Typography>
                    </Box>
                    <TitleTypography
                      gutterBottom
                      variant="h6"
                      onFocus={() => handleFocus(index)}
                      onBlur={handleBlur}
                      tabIndex={0}
                      classnome={
                        focusedCardIndex === index ? "Mui-focused" : ""
                      }
                    >
                      {review.conteudo.titulo}
                      <NavigateNextRoundedIcon
                        classnome="arrow"
                        sx={{ fontSize: "1rem" }}
                      />
                    </TitleTypography>
                    <StyledTypography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      <Typography variant="body2" color="text.secondary">
                        {review.comentario}
                      </Typography>
                    </StyledTypography>
                  </Box>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteReview(review.idReview)}
                    size="small"
                  >
                    Excluir
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={Math.ceil(reviews.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </div>
      </Container>
    </div>
  );
};
export default Perfil;
