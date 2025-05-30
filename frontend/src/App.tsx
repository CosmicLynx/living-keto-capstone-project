import axios from "axios";
import { useEffect, useState } from "react";
import type { UserModel } from "./models/UserModel.ts";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext.ts";
import { LoginPage } from "./pages/LoginPage.tsx";
import { ProtectedRoute } from "./pages/ProtectedRoute.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";

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
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute authorizedRole="ADMIN" />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}
