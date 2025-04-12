import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppTheme from "./customizations/AppTheme";
import NavBar from "./pages/navbar/NavBar";
import store from "./redux/store";

// Reuso de estruturas
import { Outlet } from "react-router-dom";
import Footer from "./pages/home/components/Footer";
import { Provider } from "react-redux";

function App(props) {
  return (
    <AppTheme {...props}>
      <Provider store={store}>
        <NavBar />
        <Outlet />
        {/* <Footer /> */}
      </Provider>
    </AppTheme>
  );
}

export default App;
