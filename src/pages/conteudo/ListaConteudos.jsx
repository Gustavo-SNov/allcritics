import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { CardMedia, CardContent, Typography, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router";
import ConteudoCard from "./ConteudoCard";

const ListaConteudos = ({ conteudos, items }) => {
  const navigate = useNavigate(); // Hook para redirecionamento
  const [page, setPage] = useState(1);
  const itemsPerPage = items;

  // Cálculo da exibição dos itens por página
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedConteudos = conteudos.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleClick = (id, conteudo) => {
    navigate(`/conteudo/${id}`, { state: conteudo.idConteudo }); // Passa `conteudo` corretamente
  };

  return (
    <div>
      <Grid container spacing={1} columns={12} sx={{ my: 2 }}>
        {paginatedConteudos.map((conteudo, index) => (
          <Grid key={index} size={{ xs: 12, sm: 2 }}>
            <ConteudoCard
              conteudo={conteudo}
              handleClick={handleClick}
              index={index}
            />
          </Grid>
        ))}
      </Grid>

      {/* Paginação */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(conteudos.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default ListaConteudos;
