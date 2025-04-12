import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const InputImagemPerfil = ({ handleAlteraUsuario, usuario }) => {
  console.log("USUARIO NO INPUT: ", usuario);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Cria uma URL temporária para exibir a imagem
      console.log("Nova URL da imagem:", imageUrl);

      const novoUsuario = { ...usuario, urlFotoPerfil: imageUrl }; // Salva a URL no estado do usuário
      console.log(novoUsuario);

      handleAlteraUsuario(novoUsuario);
    }
  };

  return (
    <Button
      component="label"
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      size="small"
    >
      Upload files
      <VisuallyHiddenInput type="file" onChange={handleImageChange} multiple />
    </Button>
  );
};

export default InputImagemPerfil;
