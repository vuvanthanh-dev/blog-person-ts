import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/core/layout";
import NotFoundPage from "@/core/pages/not-found";
import ROUTES_PATH from "@/core/routes";
import LoginPage from "@/modules/auth/pages/login";
import PrivateRoute from "./private-route";
import { PATHS } from "./paths";

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
      <Route path={ROUTES_PATH.auth.login} element={<LoginPage />} />
      <Route path={ROUTES_PATH.notFound.index} element={<NotFoundPage />} />
      <Route
        path="*"
        element={<Navigate to={ROUTES_PATH.notFound.index} replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
