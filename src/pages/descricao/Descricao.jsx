import * as React from "react";
import Box from "@mui/material/Box";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  FormControl,
  Rating,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Reviews from "../home/components/Reviews";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { getReview, postReview } from "../../service/ReviewService";
import { getConteudo } from "../../service/ConteudoService";
import { AuthContext } from "../../service/AuthService";

const Descricao = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const idConteudo = location.state; // Recupera os dados passados



  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({ idConteudo: "", conteudo: {} });
  const [conteudo, setConteudo] = useState({ nota: 0 });

  // Função para buscar conteúdo
  const buscarConteudo = async () => {
    const conteudoRetornado = await getConteudo(idConteudo);

    console.log("Conteúdo: ", conteudoRetornado);
    setConteudo(conteudoRetornado);
    setReview((prevState) => ({
      ...prevState,
      idConteudo: conteudoRetornado.idConteudo,
      idUsuario: user ? user.idUsuario : "",
      conteudo: conteudoRetornado,
      usuario: user || {},
      dataCriacao: new Date().toISOString().split("T")[0], // Formato 'YYYY-MM-DD'
    }));
  };

  // Função para buscar reviews
  const buscarReviews = async () => {
    const ListaReviews = await getReview();
    const reviewsFiltrados = ListaReviews.filter(
      (review) => review.conteudo.idConteudo === idConteudo
    );
    console.log("reviews: ", reviewsFiltrados);
    setReviews(reviewsFiltrados);
  };

  useEffect(() => {
    buscarConteudo();
    buscarReviews();
  }, [idConteudo, user?.idUsuario]); // Dependendo do user ou idConteudo, o useEffect será chamado novamente

  const handleChange = (novoReview) => {
    setReview(novoReview);
  };

  const validateInputs = () => {
    console.log("REVIEW: ", review);
    console.log(conteudo);
  };

  const limpaComentario = () => {
    setReview({});
  };

  const handleReview = (reviewNovo) => {
    console.log("NOVA REVIEW CRIADA: ", reviewNovo);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    validateInputs();
    console.log("REVIEW: ", review);

    postReview(review, (novoReview) => {
      handleReview(novoReview);

      // Após criar a review, recarregar a lista de reviews e o conteúdo
      buscarConteudo();
      buscarReviews();
    });

    limpaComentario();
  };

  return (
    <div>
      <CssBaseline enableColorScheme />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 5, gap: 1 }}
      ></Container>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {/* Coluna da imagem */}
          <Grid size={{ xs: 12, sm: 4 }} spacing={{ xs: 2, md: 3 }}>
            <Box
              sx={{
                width: "100%",
                height: "500px",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
                height="300px"
                image={conteudo.urlImagem}
                alt="Imagem"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            {user && (<Box
              sx={{
                marginTop: "10px",
              }}
            >
              <Card>
                <FormControl>
                  <Rating
                    id="avaliacao"
                    name="simple-uncontrolled"
                    onChange={(event) =>
                      handleChange((prevState) => ({
                        ...prevState,
                        nota: event.target.value,
                      }))
                    }
                    precision={0.5}
                    value={review.nota || 0}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    id="comentario"
                    label="Insira seu Comentário  "
                    multiline
                    rows={4}
                    variant="filled"
                    sx={{
                      marginTop: "20px",
                      width: "300px",
                      textAlign: "center",
                    }}
                    value={review.comentario || ""}
                    onChange={(event) =>
                      handleChange((prevState) => ({
                        ...prevState,
                        comentario: event.target.value,
                      }))
                    }
                  />
                </FormControl>

                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    marginTop: "20px",
                    width: "300px",
                  }}
                  onClick={handleSubmit}
                >
                  Success
                </Button>
              </Card>
            </Box>
            )}
          </Grid>

          {/* Coluna das caixas de texto */}
          <Grid size={{ xs: 12, sm: 8 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h2"
                    color="text.primary"
                    textAlign={"center"}
                  >
                    {conteudo.titulo}
                  </Typography>
                  <Rating
                    id="notaConteudo"
                    name="read-only"
                    value={conteudo.nota || 0} // Se conteudo.nota for undefined, usa 0
                    precision={0.5}
                    readOnly
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h8" component="div"></Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign={"justify"}
                  >
                    {conteudo.descricao}
                  </Typography>
                </CardContent>
              </Card>
              <Reviews reviews={reviews} items={6} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Descricao;
