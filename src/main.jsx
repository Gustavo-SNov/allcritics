import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Configuração do Router(rotas/links)
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Perfil from "./pages/perfil/perfil.jsx";
import Filmes from "./pages/filmes/Filmes.jsx";
import Jogos from "./pages/jogos/Jogos.jsx";
import Series from "./pages/series/Series.jsx";
import Descricao from "./pages/descricao/Descricao.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/perfil",
        element: <Perfil/>
      },
      {
        path: "/filmes",
        element: <Filmes/>
      },
      {
        path:"/jogos",
        element: <Jogos/>
      },
      {
        path:"/series",
        element: <Series/>
      },
      {
        path:"/conteudo/:idConteudo",
        element: <Descricao/>
      }

    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
