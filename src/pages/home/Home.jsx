import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import ListaReviews from "./components/ListaReviews";
import Conteudos from "./components/Conteudos";
import { useState, useEffect } from "react";
import { getConteudos } from "../../service/ConteudoService";
import { getReviews } from "../../service/ReviewService";
import Typography from "@mui/material/Typography";

const Home = () => {
  const [conteudos, setConteudos] = useState([]);
  const [reviews, setReview] = useState([]);

  useEffect(() => {
    async function buscarDadosConteudo() {
      const filtros = { orderByUltimos: true };
      const dados = await getConteudos(filtros);
      setConteudos(dados);
    }
    async function buscarDadosReview() {
      const dados = await getReviews();
      setReview(dados);
    }
    buscarDadosConteudo();
    buscarDadosReview();
  }, []); // Atualiza sempre que os filtros mudarem

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
        <Conteudos conteudos={conteudos} items={6} />
        <ListaReviews reviews={reviews} items={10}/>
      </Container>
    </div>
  );
};

export default Home;
