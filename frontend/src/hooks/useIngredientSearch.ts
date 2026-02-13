import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { IngredientModel } from "../models/recipe/IngredientModel.ts";

export const useIngredientSearch = (search: string | undefined) => {
  return useQuery({
    queryKey: ["getIngredientSearch", search],
    queryFn: () =>
      axios
        .get(`/api/ingredient/search/${search}`)
        .then((response) => (response.data as IngredientModel[]) || [])
        .catch((e) => console.error(e)),
    enabled: !!search,
  });
};
