import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { EditValuesModel } from "../models/calculator/EditValuesModel.ts";

export const useEditValues = () => {
  return useQuery({
    queryKey: ["getEditValues"],
    queryFn: () =>
      axios
        .get("/api/calculator/values")
        .then((response) => response.data as EditValuesModel)
        .catch((e) => console.error(e)),
  });
};
