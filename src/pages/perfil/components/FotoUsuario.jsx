


const FotoUsuario = ({handleChange}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        key={usuario.idUsuario}
        alt={usuario.nome}
        src={usuario.imagem}
        sx={{ width: 180, height: 180, marginBottom: 1 }}
      />
      {!alterarPerfil ? (
        <></>
      ) : (
        <InputImagemPerfil imagemPerfil={usuario.imagem} />
      )}
    </Box>
  );
};

export default FotoUsuario;
