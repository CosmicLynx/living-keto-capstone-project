import { createContext } from "react";
import type { UserModel } from "../models/user/UserModel.ts";

export const UserContext = createContext<{
  user: UserModel | undefined;
  setUser: (user: UserModel | undefined) => void;
}>({
  user: undefined,
  setUser: () => {},
});
