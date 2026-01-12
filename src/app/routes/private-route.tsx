import { useLocation, Navigate } from "react-router-dom";
import type { Role } from "@/core/types/role.type";
import AccessDeniedPage from "@/core/pages/access-denied";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/config-store/store";
import { TokenService } from "@/core/interceptor/token.service";
import { PATHS } from "./paths";
import { matchRoute } from "./helpers";
import ROUTES_PATH from "@/core/routes";

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
  const location = useLocation();
  const route = matchRoute(PATHS, location.pathname);

  // Get user roles from Redux state (populated during login)
  // TODO: If backend doesn't return roles yet, this will be empty array
  // In that case, you may need to decode JWT token to extract roles
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const userRole: Role[] = ["ADMIN", "USER", "GUEST"]; //roles.length > 0 ? (roles as Role[]) : [];

  const isAccessToken = Boolean(TokenService.getAccessToken());

  if (!route) return children;

  if (!route.requiresAuth) return children;

  if (!isAuthenticated || !isAccessToken) {
    return (
      <Navigate
        to={ROUTES_PATH.auth.login}
        replace
        state={{ from: location }}
      />
    );
  }

  const isAccessRole = route.roles?.some((role) => userRole.includes(role));

  if (!isAccessRole) {
    return <AccessDeniedPage />;
  }

  return children;
};

export default PrivateRoute;
