import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppTheme from "./customizations/AppTheme";
import NavBar from "./pages/navbar/NavBar";
import { AuthProvider } from "./service/AuthService";

// Reuso de estruturas
import { Outlet } from "react-router-dom";
import Footer from "./pages/home/components/Footer";

function App() {
  return (
    <AppTheme>
      <AuthProvider>
        <NavBar />
        <Outlet />
        {/* <Footer /> */}
      </AuthProvider>
    </AppTheme>
  );
}

export default App;
