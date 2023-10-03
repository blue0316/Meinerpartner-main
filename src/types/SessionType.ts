import { StrapiUser } from "./StrapiUser";

export interface SessionType {
  authenticated: boolean;
  session: null | StrapiUser;
}
