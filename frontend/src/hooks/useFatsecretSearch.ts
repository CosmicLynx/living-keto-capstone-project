import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { FatsecretFoodsModel } from "../models/recipe/fatsecret/FatsecretFoodsModel.ts";

export const useFatsecretSearch = (search: string | undefined) => {
  return useQuery({
    queryKey: ["getFatsecretSearch", search],
    queryFn: () =>
      axios
        .get(`/api/ingredient/new/${search}`)
        .then((response) => response.data as FatsecretFoodsModel),
    enabled: !!search,
  });
};
