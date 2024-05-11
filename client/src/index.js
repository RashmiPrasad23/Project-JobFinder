import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./style.css";
import App from "./App";
import ContextProvider from "./context/GlobalContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <Router>
      <App />
      <ToastContainer />
    </Router>
  </ContextProvider>
);
