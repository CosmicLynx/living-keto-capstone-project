import type { FieldArrayRenderProps } from "formik";
import { useEffect, useState } from "react";
import { useIngredientSearch } from "../../../hooks/useIngredientSearch.ts";
import { useQueryClient } from "@tanstack/react-query";
import { CustomTextField } from "../../form/CustomTextField.tsx";
import { CustomButton } from "../../CustomButton.tsx";
import { translatedUnits } from "../../../models/recipe/Units.ts";

export function FindAndAddIngredients(props: {
  arrayHelpers: FieldArrayRenderProps;
  onOpenFatsecretDialog: () => void;
}) {
  const { arrayHelpers, onOpenFatsecretDialog } = props;
  const [search, setSearch] = useState("");
  const { data: ingredientsResults } = useIngredientSearch(search);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["getIngredientSearch", search],
    });
  }, [queryClient, search]);

  return (
    <>
      <CustomTextField
        name="search"
        placeholder="Zutaten in Datenbank suchen"
        setValue={(e) => setSearch(e as string)}
      />
      {search && (
        <>
          {ingredientsResults && ingredientsResults.length > 0 ? (
            <div className="grid gap-2">
              {ingredientsResults.map((ingredient) =>
                ingredient.nutritionValuesPerUnit.map((unit) => (
                  <CustomButton
                    key={
                      ingredient.id + "_" + unit.unit + "_" + unit.defaultAmount
                    }
                    onClick={() => {
                      arrayHelpers.push({
                        name: ingredient.name,
                        amount: 1,
                        unit: unit.unit,
                        nutritionValues: unit.nutritionValues,
                        baseNutritionValues: unit.nutritionValues,
                        allergens: ingredient.allergens,
                        hint: "",
                      });
                      setSearch("");
                      arrayHelpers.form.setFieldValue("search", "");
                    }}
                    label={`${ingredient.name} (${unit.unit !== "GRAM" ? translatedUnits[unit.unit] + " - " : ""}${unit.defaultAmount}g) - ${unit.nutritionValues.fat}g Fett | ${unit.nutritionValues.protein}g EW | ${unit.nutritionValues.carbs}g KH | ${unit.nutritionValues.calories}kcal`}
                  />
                )),
              )}
            </div>
          ) : (
            <div>Keine Zutaten in Datenbank gefunden</div>
          )}
        </>
      )}
      <CustomButton
        label="Fatsecret-API durchsuchen"
        onClick={onOpenFatsecretDialog}
      />
    </>
  );
}
