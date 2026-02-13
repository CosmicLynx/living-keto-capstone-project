import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AllergenModel } from "../models/recipe/AllergenModel.ts";

export const useAllAllergens = () => {
  return useQuery({
    queryKey: ["getAllAllergens"],
    queryFn: () =>
      axios
        .get(`/api/allergen`)
        .then((response) => (response.data as AllergenModel[]) || [])
        .catch((e) => console.error(e)),
  });
};
