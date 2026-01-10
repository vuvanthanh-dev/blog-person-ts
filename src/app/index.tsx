import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import LoadingPage from "@/core/pages/loading";
import AppRoutes from "./routes";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
      <LoadingPage />
    </ThemeProvider>
  );
};

export default App;
