import axios from "axios";
import { useEffect, useState } from "react";
import type { UserModel } from "./models/UserModel.ts";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext.ts";

export default function App() {
  const [user, setUser] = useState<UserModel | undefined>(undefined);

  const loadUser = () => {
    axios.get("/api/auth").then((response) => setUser(response.data));
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/admin" element={<></>} />
      </Routes>
    </UserContext.Provider>
  );
}
