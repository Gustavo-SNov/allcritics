import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  CssBaseline,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ListaReviews from "../home/components/ListaReviews";
import ReviewFormulario from "../conteudo/components/ReviewFormulario";
import { useLocation } from "react-router-dom";
import { postReview } from "../../service/ReviewService";
import { getConteudo } from "../../service/ConteudoService";
import { useSelector } from "react-redux";

const Conteudo = () => {
  const usuario = useSelector((state) => state.usuario);
  const location = useLocation();
  const idConteudo = location.state;

  const [review, setReview] = useState({ idConteudo: "", conteudo: {} });
  const [conteudo, setConteudo] = useState({ reviews: [] });

  useEffect(() => {
    async function buscarConteudo() {
      const dados = await getConteudo(idConteudo);
      console.log("Descrição -> Dados: ", dados);
      setConteudo(dados);
    }

    buscarConteudo();
  }, [idConteudo, usuario?.idUsuario]); // Dependendo do user ou idConteudo, o useEffect será chamado novamente

  const handleChange = (novoReview) => {
    setReview(novoReview);
  };
  console.log("novoReview: ", review);
  const validateInputs = () => {
    console.log("REVIEW: ", review);
    console.log(conteudo);
  };

  const limpaComentario = () => {
    setReview({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    validateInputs();
    console.log("REVIEW: ", review);

    postReview(review, (novoReview) => {
      console.log("NOVA REVIEW CRIADA: ", novoReview);

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
          columns={{ xs: 4, sm: 12, md: 12 }}
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
            {usuario.isLogged && (
              <Box
                sx={{
                  marginTop: "10px",
                }}
              >
                <ReviewFormulario
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  review={review}
                />
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
              <ListaReviews reviews={conteudo.reviews} items={6} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Conteudo;
