const URL_USUARIO = "http://localhost:8080/api/usuario";

export const getUsuario = async (idUsuario) => {
  const URL_BUSCA_USUARIO = `${URL_USUARIO}/${idUsuario}`;

  try {
    const response = await fetch(URL_BUSCA_USUARIO);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return {};
  }
};

export const getUsuarios = async () => {
  try {
    const response = await fetch(URL_BUSCA_USUARIO);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return [];
  }
}

export const putUsuario = async (usuario, handleAlteraUsuario) => {
  const URL_PUT_USUARIO = `${URL_USUARIO}/${usuario.idUsuario}`;

  fetch(URL_PUT_USUARIO, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Tipo de conteúdo que está sendo enviado
    },
    body: JSON.stringify(usuario),
  })
    .then((res) => {
      if (!res.ok) {
        console.log("problema");
        return;
      }
      return res.json();
    })
    .then((data) => {
      console.log("sucess:", data);
      handleAlteraUsuario(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
