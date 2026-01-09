import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import LoadingPage from "@/core/pages/loading";
import AppRoutes from "./routes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
      <LoadingPage />
    </>
  );
};

export default App;
