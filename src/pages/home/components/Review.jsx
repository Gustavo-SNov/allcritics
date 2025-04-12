import {
  Card,
  CardMedia,
  Typography,
  styled,
  Box,
  Avatar,
  Rating,
} from "@mui/material";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  transition: "color 0.3s ease",
  "&:hover": { cursor: "pointer", color: theme.palette.primary.main },
  "& .arrow": {
    visibility: "hidden",
    transition: "visibility 0.3s ease, opacity 0.3s ease",
  },
  "&:hover .arrow": {
    visibility: "visible",
    opacity: 0.7,
  },
  "&:focus-visible": {
    outline: "3px solid hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "3px",
    borderRadius: "8px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    width: 0,
    height: "2px",
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.text.primary,
    opacity: 0.3,
    transition: "width 0.3s ease, opacity 0.3s ease",
  },
  "&:hover::before": {
    width: "100%",
  },
}));

const Review = ({ handleBlur, handleFocus, rev, index }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        height: 280,
        borderRadius: 2,
        boxShadow: 2,
        overflow: "hidden",
      }}
    >
      {/* Imagem ocupando 1/3 */}
      <Box sx={{ position: "relative", width: "33.33%", height: "100%" }}>
        <CardMedia
          component="img"
          sx={{
            width: "90%",
            height: "85%",
            objectFit: "cover",
            borderRadius: "8px 0 0 8px", // Apenas arredondando o topo esquerdo e fundo esquerdo
          }}
          image={rev.conteudoDTO.urlImagem}
          alt={rev.conteudoDTO.titulo}
        />
        {/* Rating abaixo da imagem */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 10,
            right: 0,
            padding: "8px",
          }}
        >
          <Rating
            name="read-only"
            value={rev.nota}
            precision={0.5}
            readOnly
            sx={{
              display: "flex",
              justifyContent: "center", // Centraliza o Rating
            }}
          />
        </Box>
      </Box>

      {/* Informações ocupando 2/3 */}
      <Box
        sx={{
          flex: "1", // Ajusta a largura para garantir que a Box não ultrapasse o card
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 0.1,
          py: 0.5,
          overflow: "hidden", // Adiciona controle para evitar que ultrapasse
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
          }}
        >
          <Avatar src={rev.usuario.urlFotoPerfil} sx={{ width: 32, height: 32 }} />
          <Typography variant="caption" color="text.secondary">
            {rev.usuario.nome}
          </Typography>
        </Box>

        <TitleTypography
          gutterBottom
          variant="h6"
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          tabIndex={0}
        >
          {rev.conteudoDTO.titulo}
          <NavigateNextRoundedIcon
            className="arrow"
            sx={{ fontSize: "1rem" }}
          />
        </TitleTypography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: "normal",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: "4.5em",
            lineHeight: "1.5em",
          }}
        >
          {rev.comentario}
        </Typography>
        <Box
          sx={{
            position: "center",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "8px",
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
            {rev.dataCriacao}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default Review;
