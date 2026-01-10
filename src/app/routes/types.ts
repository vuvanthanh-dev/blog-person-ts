import type { LazyExoticComponent, ComponentType } from "react";
import type { Role } from "@/core/types/role.type";

export type RouteMeta = {
  key: string;
  path: string;
  pathOriginal: string;
  label?: string;
  roles: Role[];
  icon?: React.ReactNode | string;
  hidden?: boolean;
  requiresAuth?: boolean;
  component: LazyExoticComponent<ComponentType<any>>;
};
