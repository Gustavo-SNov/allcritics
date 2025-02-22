const URL_CONTEUDO = "http://localhost:8080/api/conteudo";


export const getConteudos = async (filtroConteudo) => {
  // Construindo os parâmetros da URL
  const params = new URLSearchParams();


  if (filtroConteudo.filme !== undefined)
    params.append("filme", filtroConteudo.filme);
  if (filtroConteudo.serie !== undefined)
    params.append("serie", filtroConteudo.serie);
  if (filtroConteudo.jogo !== undefined)
    params.append("jogo", filtroConteudo.jogo);
  if (filtroConteudo.orderByUltimos !== undefined)
    params.append("orderByUltimos", filtroConteudo.orderByUltimos);
  if (filtroConteudo.orderByAvaliacao !== undefined)
    params.append("orderByAvaliacao", filtroConteudo.orderByAvaliacao);
  const URL_CONTEUDOS = `${URL_CONTEUDO}?${params.toString()}`;

  try {
    const response = await fetch(URL_CONTEUDOS);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return [];
  }
};

export const getConteudo = async(idConteudo) => {
  const URL_ID_CONTEUDO = `${URL_CONTEUDO}/${idConteudo}`;

  try {
    const response = await fetch(URL_ID_CONTEUDO);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return {};
  }
}
