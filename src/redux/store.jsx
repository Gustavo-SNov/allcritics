import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "./usuarioSlice";
import navBarReducer from "./navbarSlice";

export default configureStore({
  reducer: {
    usuario: usuarioReducer,
    navbar: navBarReducer,
  },
});
