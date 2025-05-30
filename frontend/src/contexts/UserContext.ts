import { createContext } from "react";
import type { UserModel } from "../models/UserModel.ts";

export const UserContext = createContext<{
  user: UserModel | undefined;
  setUser: (user: UserModel | undefined) => void;
}>({
  user: undefined,
  setUser: () => {},
});
