import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "usuario",
  initialState: JSON.parse(localStorage.getItem("usuario")) ||{
    idUsuario: null,
    nome: "",
    nomeIdentificador: "",
    biografia: "",
    urlFotoPerfil: "",
    dataCriacao: null,
    dataModificacao: null,
    reviews: [],
    conteudos: [],
    login: {
      email: "",
      senha: ""
    },
    isLogged: false, // Adicionado para indicar se o usuário está logado
  },
  reducers: {
    handleLogin(state, { payload }) {
      const newState = { ...state, ...payload, isLogged: true };
      localStorage.setItem("usuario", JSON.stringify(newState)); // Salva no Local Storage
      return newState;
    },
    logout(state) {
      localStorage.removeItem("usuario"); // Remove do Local Storage
      return {
        idUsuario: null,
        nome: "",
        nomeIdentificador: "",
        biografia: "",
        urlFotoPerfil: "",
        dataCriacao: null,
        dataModificacao: null,
        reviews: [],
        conteudos: [],
        login: {
          email: "",
          senha: ""
        },
        isLogged: false, // Adicionado para indicar se o usuário está logado
      }; // Reseta os dados ao fazer logout
    },    
    handleUsuario(state, { payload }) {
      const newState = { ...state, ...payload };
      localStorage.setItem("usuario", JSON.stringify(newState)); // Atualiza no Local Storage
      return newState;
    },
  },
});

// Exportando as ações para serem usadas no dispatch()
export const { handleLogin, logout } = user.actions;

// Função para acessar o estado do usuário
export const selectUser = (state) => state.usuario;

export default user.reducer;

