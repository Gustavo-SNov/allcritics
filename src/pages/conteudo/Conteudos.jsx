import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getConteudos } from "../../service/ConteudoService";
import { Container, CssBaseline, Typography } from "@mui/material";
import ListaConteudos from "./ListaConteudos";

const Conteudos = () => {
  const location = useLocation();
  const state = location.state;
  const [conteudos, setConteudos] = useState([]);

  useEffect(() => {
    async function buscarDados() {
      console.log(state.filtro);
      const dados = await getConteudos(state.filtro);
      setConteudos(dados);
    }
    buscarDados();
  }, [state]);

  return (
    <div>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <CssBaseline enableColorScheme />
        <Typography variant="h2" gutterBottom>
          Descubra
        </Typography>
        <ListaConteudos conteudos={conteudos} items={12} />
      </Container>
    </div>
  );
};

export default Conteudos;
