import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Configuração do Router(rotas/links)
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Perfil from "./pages/perfil/perfil.jsx";
import Testes from "./pages/testes/Testes.jsx";
import Conteudos from "./pages/conteudo/Conteudos.jsx";
import Conteudo from "./pages/conteudo/Conteudo.jsx";

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
        element: <Conteudos />
      },
      {
        path:"/jogos",
        element: <Conteudos/>
      },
      {
        path:"/series",
        element: <Conteudos />
      },
      {
        path:"/conteudo/:idConteudo",
        element: <Conteudo />
      },
      {
        path:"/testes",
        element: <Testes />
      }

    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
