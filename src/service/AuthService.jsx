import { handleLogin } from "../redux/usuarioSlice";

const URL_AUTH = "http://localhost:8080/api/auth";



// Função assíncrona para realizar login e atualizar o estado global
export const loginPost = (login) => async (dispatch) => {
  const URL_LOGIN = `${URL_AUTH}/login`;

  try {
    const res = await fetch(URL_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status}`);
    }

    const text = await res.text();
    if (!text) {
      throw new Error("Resposta vazia do servidor.");
    }

    const data = JSON.parse(text);
    console.log("Login bem-sucedido:", data);

    // Dispara a action handleLogin para atualizar o estado
    dispatch(handleLogin(data));
  } catch (error) {
    console.error("Erro no login:", error);
  }
};

export const registerPost = (register) => async (dispatch) => {
  const URL_REGISTER = `${URL_AUTH}/register`;

  try {
    const res = await fetch(URL_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
    });

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status}`);
    }

    // Verifica se a resposta é JSON antes de tentar parsear
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      console.log("Registro bem-sucedido:", data);

      // Verifica se os dados retornados são válidos
      if (!data || !data.idUsuario) {
        throw new Error("Resposta do servidor não contém dados esperados.");
      }

      // Atualiza o estado do Redux
      dispatch(handleLogin(data));
    } else {
      throw new Error("Resposta do servidor não é JSON.");
    }
  } catch (error) {
    console.error("Erro no register:", error);
  }
};
