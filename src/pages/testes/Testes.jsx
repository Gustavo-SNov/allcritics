import { Container, CssBaseline } from "@mui/material";
import Review from "../home/components/Review";
import Grid from "@mui/material/Grid2";
import ImageUploader from "./ImageUploader";
import Hero from "./Hero";
const reviews = [
  {
    idReview: 1,
    idConteudo: 50,
    idUsuario: 21,
    avaliacao: 4.5,
    comentario:
      "KJLDFAJHKDSHALDNASKJFHNZ;LFYHIOAPEHAUOAHAJFNZML. FHIJAJOLHDIOJKLASLDHOPASDHJIAPOSSD HDAO;DASADAS",
    dataCriacao: new Date().toISOString().split("T")[0],
    dataModificacao: new Date().toISOString().split("T")[0],
    usuario: {
      idUsuario: 21,
      nome: "FULANO DE TAL DA SILVA",
    },
    conteudo: {
      idConteudo: 50,
      titulo: "Arcane",
      urlImagem: "/imagens/arcane.jpg",
    },
  },
  {
    idReview: 2,
    idConteudo: 50,
    idUsuario: 22,
    avaliacao: 5.0,
    comentario:
      "KJLDFAJHKDSHALDNASKJFHNZ;LFYHIOAPEHAUOAHAJFNZML. FHIJAJOLHDIOJKLASLDHOPASDHJIAPOSSD HDAO;DASADAS",
    dataCriacao: new Date().toISOString().split("T")[0],
    dataModificacao: new Date().toISOString().split("T")[0],
    usuario: {
      idUsuario: 21,
      nome: "CICLANO DE TAL DA SILVA",
    },
    conteudo: {
      idConteudo: 50,
      titulo: "Arcane",
      urlImagem: "/imagens/arcane.jpg",
    },
  },
];

const Testes = () => {
  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };
  return (
    <div>
      <CssBaseline enableColorScheme />
      
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <Hero/>
        <ImageUploader/>
        <Grid container spacing={3} columns={12} sx={{ my: 4 }}>
          {reviews.map((review, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6 }}>
              <Review rev={review} handleBlur={handleBlur} handleFocus={handleFocus} />
            </Grid>
          ))}

        </Grid>
      </Container>

      
    </div>
  );
};

export default Testes;
