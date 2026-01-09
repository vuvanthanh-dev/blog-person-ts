import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/core/layout";
import NotFoundPage from "@/core/pages/not-found";
import { PATHS } from "./paths";
import PrivateRoute from "./private-route";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        {PATHS.map((route) => {
          const Component = route.component;
          return (
            <Route
              key={route.key}
              path={route.path}
              element={
                <PrivateRoute>
                  <Component />
                </PrivateRoute>
              }
            />
          );
        })}
      </Route>
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
