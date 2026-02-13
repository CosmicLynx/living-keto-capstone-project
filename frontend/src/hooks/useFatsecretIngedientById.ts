import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { FatsecretIngredientDetailResponseModel } from "../models/recipe/fatsecret/FatsecretIngredientDetailResponseModel.ts";

export const useFatsecretIngedientById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["getFatsecretIngedientById", id],
    queryFn: () =>
      axios
        .get(`/api/ingredient/new/id?id=${id}`)
        .then(
          (response) => response.data as FatsecretIngredientDetailResponseModel,
        )
        .catch((e) => console.error(e)),
    enabled: !!id,
  });
};
