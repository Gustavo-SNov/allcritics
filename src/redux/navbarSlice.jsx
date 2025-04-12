import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    redirecionarPara: null,
    filtro: {},
    idConteudo: null,
  },
  reducers: {
    redirecionarParaInicio(state) {
      state.redirecionarPara = "/";
    },
    redirecionarParaPerfil(state) {
      state.redirecionarPara = "/perfil";
    },
    redirecionarParaFilmes(state) {
      state.redirecionarPara = "/filmes";
      state.filtro = { filme: true, orderByUltimos: true };
    },
    redirecionarParaSeries(state) {
      state.redirecionarPara = "/series";
      state.filtro = { serie: true, orderByUltimos: true };
    },
    redirecionarParaJogos(state) {
      state.redirecionarPara = "/jogos";
      state.filtro = { jogo: true, orderByUltimos: true };
    },
    redirecionarParaConteudo(state, { payload }) {
      state.redirecionarPara = `/conteudo/${payload.idConteudo}`;
      state.idConteudo = payload.idConteudo;
    },
    resetRedirecionamento(state) {
      state.redirecionarPara = null;
    },
  },
});

// Exportando as ações para serem usadas no dispatch()
export const {
  redirecionarParaInicio,
  redirecionarParaPerfil,
  redirecionarParaFilmes,
  redirecionarParaSeries,
  redirecionarParaJogos,
  redirecionarParaConteudo,
  resetRedirecionamento,
} = navbarSlice.actions;


// Função para acessar o estado da Navbar
export const selectNavBar = (state) => state.navbar;

export default navbarSlice.reducer;
