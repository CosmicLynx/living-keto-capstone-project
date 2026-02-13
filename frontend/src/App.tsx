import axios from "axios";
import { useEffect, useState } from "react";
import type { UserModel } from "./models/user/UserModel.ts";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext.ts";
import { HomePage } from "./pages/HomePage.tsx";
import { ProtectedRoute } from "./pages/ProtectedRoute.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { RecipesPage } from "./pages/RecipesPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecipeDetailPage } from "./pages/RecipeDetailPage.tsx";

export default function App() {
  const [user, setUser] = useState<UserModel | undefined>(undefined);
  const queryClient = new QueryClient();

  const loadUser = () => {
    axios.get("/api/auth").then((response) => setUser(response.data));
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute authorizedRole="ROLE_ADMIN" />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
