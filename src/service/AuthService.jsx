import { createContext, useState, useEffect } from "react";

const URL_AUTH = "http://localhost:8080/api/auth";

// Criando o contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Usuário armazenado:", storedUser);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao fazer parse do JSON:", error);
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Salvar no localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// export async function loginPost(login, handleLogin) {
//   const URL_LOGIN = `${URL_AUTH}/login`;

//   fetch(URL_LOGIN, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json", // Tipo de conteúdo que está sendo enviado
//     },
//     body: JSON.stringify(login),
//   })
//     .then((res) => {
//       if (!res.ok) {
//         console.log("problema");
//         return;
//       }
//       return res.json();
//     })
//     .then((data) => {
//       console.log("sucess:", data);
//       handleLogin(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// export async function registerPost(register, handleLogin){
//   const URL_REGISTER = `${URL_AUTH}/register`;

//   fetch(URL_REGISTER, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json", // Tipo de conteúdo que está sendo enviado
//     },
//     body: JSON.stringify(register),
//   })
//     .then((res) => {
//       if (!res.ok) {
//         console.log("problema");
//         return;
//       }
//       return res.json();
//     })
//     .then((data) => {
//       console.log("sucess:", data);
//       handleLogin(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

export async function loginPost(login, handleLogin) {
  const URL_LOGIN = `${URL_AUTH}/login`;

  fetch(URL_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(login),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status}`);
      }
      return res.text(); // Primeiro pega como texto para evitar erro de JSON inválido
    })
    .then((text) => {
      if (!text) {
        throw new Error("Resposta vazia do servidor.");
      }
      return JSON.parse(text);
    })
    .then((data) => {
      console.log("sucess:", data);
      handleLogin(data);
    })
    .catch((error) => {
      console.error("Erro no login:", error);
    });
}

export async function registerPost(register, handleLogin) {
  const URL_REGISTER = `${URL_AUTH}/register`;

  fetch(URL_REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(register),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status}`);
      }
      return res.text();
    })
    .then((text) => {
      if (!text) {
        throw new Error("Resposta vazia do servidor.");
      }
      return JSON.parse(text);
    })
    .then((data) => {
      console.log("sucess:", data);
      handleLogin(data);
    })
    .catch((error) => {
      console.error("Erro no registro:", error);
    });
}
