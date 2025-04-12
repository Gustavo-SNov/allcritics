import { Box, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import { useState, useReducer } from "react";

const ConteudoCard = ({ index, conteudo, handleClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  console.log("ConteudoCard: -> ", conteudo);
  return (
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
        <Rating name="read-only" value={conteudo.nota} precision={0.5} readOnly />
      </CardContent>
    </Box>
  );
};

export default ConteudoCard;
