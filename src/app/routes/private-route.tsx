import { useLocation, Navigate } from "react-router-dom";
import type { Role } from "@/core/types/role.type";
import AccessDeniedPage from "@/core/pages/access-denied";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/config-store/store";
import { TokenService } from "@/core/interceptor/token.service";
import { PATHS } from "./paths";
import { matchRoute } from "./helpers";

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
  const location = useLocation();
  const route = matchRoute(PATHS, location.pathname);
  const userRole: Role = "USER";

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const isAccessToken = Boolean(TokenService.getAccessToken());

  if (!route) return children;

  if (!route.requiresAuth) return children;

  if (!isAuthenticated || !isAccessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (route.roles && !route.roles.includes(userRole)) {
    return <AccessDeniedPage />;
  }

  return children;
};

export default PrivateRoute;
