import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import ListaReviews from "./components/ListaReviews";
import { useState, useEffect } from "react";
import { getConteudos } from "../../service/ConteudoService";
import { getReviews } from "../../service/ReviewService";
import Typography from "@mui/material/Typography";
import ListaConteudos from "../conteudo/ListaConteudos";

const Home = () => {
  const [conteudos, setConteudos] = useState([]);
  const [reviews, setReview] = useState([]);

  useEffect(() => {
    const tipoOrdenacao = "ORDER_BY_ULTIMOS"
    async function buscarDadosConteudo() {
      const dados = await getConteudos({tipoOrdenacao});
      setConteudos(dados);
    }
    async function buscarDadosReview() {
      const dados = await getReviews({tipoOrdenacao});
      setReview(dados);
    }
    buscarDadosConteudo();
    buscarDadosReview();
  }, []); // Atualiza sempre que os filtros mudarem

  // console.log("HOME -> REVIEWS",reviews);
  // console.log("HOME -> CONTEÚDOS",conteudos);
  return (
    <div>
      <CssBaseline enableColorScheme />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <Typography variant="h2" gutterBottom>
          Últimos Lançamentos
        </Typography>
        <ListaConteudos conteudos={conteudos} items={6} />
        <ListaReviews reviews={reviews} items={10}/>
      </Container>
    </div>
  );
};

export default Home;
