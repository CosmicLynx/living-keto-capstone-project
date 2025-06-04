import { useParams } from "react-router-dom";
import { useRecipeById } from "../hooks/useRecipeById.ts";
import { PageWrapper } from "../layout/PageWrapper.tsx";
import { translatedUnits } from "../models/recipe/Units.ts";

export function RecipeDetailPage() {
  const { id } = useParams();
  const { data: recipe, isLoading } = useRecipeById(id);

  return (
    <PageWrapper>
      {isLoading ? (
        <>Loading</>
      ) : recipe ? (
        <div className="grid gap-4">
          <h2>{recipe.title}</h2>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="max-w-[300px]"
          />
          <div className="flex gap-4">
            <p>Vorbereitung: {recipe.preparationTime} Min.</p>
            <p>Zubereitung: {recipe.cookingTime} Min.</p>
            <p>Gesamtzeit: {recipe.totalTime} Min.</p>
          </div>
          <div className="flex gap-4">
            <p>Mahlzeit: {recipe.tags.join(", ")}</p>
            <p>
              Allergene:{" "}
              {recipe.allergens
                ? recipe.allergens.join(", ")
                : "Keine Allergene"}
            </p>
            <p>Portionen: {recipe.defaultPortions}</p>
          </div>
          <h3>Zutaten</h3>
          {recipe.ingredients.map((group) => (
            <div key={group.name}>
              {group.name !== "main" && <p>{group.name}</p>}
              <ul>
                {group.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.unit !== "NONE" && ingredient.amount}{" "}
                    {translatedUnits[ingredient.unit]} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <h3>Zubereitung</h3>
          {recipe.steps.map((group) => (
            <div key={group.name}>
              {group.name !== "main" && <p>{group.name}</p>}
              <ol className="list-decimal mx-5">
                {group.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
          <h3>Nährwerte Pro Portion</h3>
          <div className="flex gap-4">
            <p>Fett: {recipe.nutritionValues.fat} g</p>
            <p>Eiweiß: {recipe.nutritionValues.protein} g</p>
            <p>Kohlenhydrate: {recipe.nutritionValues.carbs} g</p>
            <p>Kalorien: {recipe.nutritionValues.calories} kcal</p>
            <p>Skaldeman: {recipe.nutritionValues.skaldeman}</p>
          </div>
        </div>
      ) : (
        <div>No Recipe</div>
      )}
    </PageWrapper>
  );
}
