const URL_USUARIO = "http://localhost:8080/api/usuario";

export const getUsuario = async (filtroUsuario) => {
  // Construindo os parâmetros da URL
  console.log(filtroUsuario)
  const params = new URLSearchParams();
  if (filtroUsuario.email !== undefined)
    params.append("email", filtroUsuario.email);
  if (filtroUsuario.senha !== undefined)
    params.append("senha", filtroUsuario.senha);

  const URL_BUSCA_USUARIO = `${URL_USUARIO}?${params.toString()}`;

  try {
    const response = await fetch(URL_BUSCA_USUARIO);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return {};
  }
};
