import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { MainRoutes } from "./routes/MainRoutes";
import { lightTheme } from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <RouterProvider router={MainRoutes} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </ThemeProvider>
  </StrictMode>
);
