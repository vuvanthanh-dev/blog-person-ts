import type { CategoryPayload } from "../types";

export const categoryPayload = (name: string): CategoryPayload => {
  return { name };
};
