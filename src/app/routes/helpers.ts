import type { RouteMeta } from "./types";

export const matchRoute = (
  routes: RouteMeta[],
  pathname: string
): RouteMeta | undefined => {
  return routes.find(
    (r) => pathname === r.path || pathname.startsWith(`${r.path}/`)
  );
};
