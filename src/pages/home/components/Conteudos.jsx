import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import {
  CardMedia,
  CardContent,
  Typography,
  Pagination,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router";

const Conteudos = ({ conteudos, items }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
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
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
                cursor: "pointer",
                transition: "transform 0.3s ease-in-out",
                position: "relative",
                transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleClick(index, conteudo)} // Adiciona o clique para navegação
            >
              <CardMedia
                component="img"
                height="300px"
                image={conteudo.urlImagem}
                alt="Imagem"
                sx={{
                  width: "100%",
                  height: "100%",
                  flex: 1,
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                  transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                }}
              />
              <CardContent
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  textAlign: "center",
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out",
                  padding: "8px 0",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {conteudo.titulo}
                </Typography>
              </CardContent>
            </Box>
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

export default Conteudos;
