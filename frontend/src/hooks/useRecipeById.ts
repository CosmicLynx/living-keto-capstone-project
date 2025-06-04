import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { RecipeDetailModel } from "../models/recipe/RecipeDetailModel.ts";

export const useRecipeById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["getRecipeById", id],
    queryFn: () =>
      axios
        .get(`/api/recipe/${id}`)
        .then((response) => response.data as RecipeDetailModel)
        .catch((e) => console.error(e)),
    enabled: !!id,
  });
};
