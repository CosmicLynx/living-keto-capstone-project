import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { TagModel } from "../models/recipe/TagModel.ts";

export const useAllTags = () => {
  return useQuery({
    queryKey: ["getAllTags"],
    queryFn: () =>
      axios
        .get(`/api/tag`)
        .then((response) => (response.data as TagModel[]) || [])
        .catch((e) => console.error(e)),
  });
};
