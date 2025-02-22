import * as React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Conteudos from "../home/components/Conteudos";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { getConteudos } from "../../service/ConteudoService";
import { useState, useEffect } from "react";

const Series = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    async function buscarDados() {
      const filtros = { serie: true, orderByUltimos: true };
      const dados = await getConteudos(filtros);
      setSeries(dados);
    }
    buscarDados();
  }, []);

  console.log("Series",series)
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
        <Conteudos conteudos={series} items={12}/>
      </Container>
    </div>
  );
};

export default Series;
