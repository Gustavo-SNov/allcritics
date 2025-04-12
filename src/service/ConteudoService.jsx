const URL_CONTEUDO = "http://localhost:8080/api/conteudo";


export const getConteudos = async ({tipoConteudo,tipoOrdenacao}) => {
  // Construindo os parâmetros da URL
  const params = new URLSearchParams();

  if (tipoConteudo !== undefined){
    params.append("tipoConteudo", tipoConteudo);
  }

  if (tipoOrdenacao !== undefined){
    params.append("tipoOrdenacao", tipoOrdenacao);
  }

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
