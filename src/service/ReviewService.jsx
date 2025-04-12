const URL_REVIEW = "http://localhost:8080/api/review";

export const getReviews = async ({tipoOrdenacao}) => {
  const params = new URLSearchParams();

  if (tipoOrdenacao !== undefined){
    params.append("tipoOrdenacao", tipoOrdenacao);
  }

  const URL_REVIEWS = `${URL_REVIEW}?${params.toString()}`;

  try {
    const response = await fetch(URL_REVIEWS);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    return [];
  }
};

export async function postReview(review, handleReview) {

  fetch(URL_REVIEW, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Tipo de conteúdo que está sendo enviado
    },
    body: JSON.stringify(review),
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
      handleReview(review);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function deleteReview(idReview) {
  const URL_REVIEW_DELETE = `${URL_REVIEW}/${idReview}`;
    fetch(URL_REVIEW_DELETE, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // Tipo de conteúdo que está sendo enviado
    }
  })
    .then((res) => {
      if (!res.ok) {
        console.log("problema");
        return;
      }
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
  
}