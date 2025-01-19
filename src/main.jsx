import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./bulma-scoped.scss";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
