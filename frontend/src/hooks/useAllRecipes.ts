import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { RecipeModel } from "../models/recipe/RecipeModel.ts";

export const useAllRecipes = () => {
  return useQuery({
    queryKey: ["getAllRecipes"],
    queryFn: () =>
      axios
        .get("/api/recipe")
        .then((response) => (response.data as RecipeModel[]) || [])
        .catch((e) => console.error(e)),
  });
};
