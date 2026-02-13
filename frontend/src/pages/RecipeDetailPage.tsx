import { useParams } from "react-router-dom";
import { useRecipeById } from "../hooks/useRecipeById.ts";
import { PageWrapper } from "../layout/PageWrapper.tsx";
import { translatedUnits } from "../models/recipe/Units.ts";
import { Chip } from "../components/Chip.tsx";

export function RecipeDetailPage() {
  const { id } = useParams();
  const { data: recipe, isLoading } = useRecipeById(id);

  return (
    <PageWrapper>
      {isLoading ? (
        <>Loading</>
      ) : recipe ? (
        <div className="grid gap-4">
          <h2 className="text-primary">{recipe.title}</h2>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="max-w-[300px]"
          />
          <div className="grid grid-cols-3 justify-items-center">
            <h4>Vorbereitung</h4>
            <h4>Zubereitung</h4>
            <h4>Gesamtzeit</h4>
            <div className="font-medium">{recipe.preparationTime} Min</div>
            <div className="font-medium">{recipe.cookingTime} Min</div>
            <div className="font-medium">{recipe.totalTime} Min</div>
          </div>
          <hr className="border-gray-400" />
          <div className="grid grid-cols-4 justify-items-center">
            <h4>Mahlzeit</h4>
            <h4>Allergene</h4>
            <h4>Portionen</h4>
            <h4>kcal pro Portion</h4>
            <div className="font-medium flex gap-1 flex-wrap items-center">
              {recipe.tags.map((tag) => (
                <Chip value={tag} key={tag} />
              ))}
            </div>
            <div className="font-medium flex gap-1 flex-wrap items-center justify-center">
              {recipe.allergens && recipe.allergens.length > 0
                ? recipe.allergens.map((a) => (
                    <Chip value={"Enthält " + a} key={a} variant="warning" />
                  ))
                : "Keine Allergene"}
            </div>
            <div className="font-medium">{recipe.defaultPortions}</div>
            <div className="font-medium">{recipe.nutritionValues.calories}</div>
          </div>
          <hr className="border-gray-400" />
          <h3>Zutaten</h3>
          {recipe.ingredients.map((group) => (
            <div key={group.name}>
              {group.name !== "main" && <p>{group.name}</p>}
              <ul>
                {group.ingredients.map((ingredient) => (
                  <li
                    key={ingredient.id}
                    className="grid grid-cols-[60px_minmax(100px,_8fr)] gap-x-2"
                  >
                    <div className="font-medium text-right">
                      {ingredient.unit !== "NONE" && ingredient.amount}{" "}
                      {!["NONE", "PIECE"].includes(ingredient.unit) &&
                        translatedUnits[ingredient.unit]}
                    </div>
                    <div>{ingredient.name}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <hr className="border-gray-400" />
          <h3>Zubereitung</h3>
          {recipe.steps.map((group) => (
            <div key={group.name}>
              {group.name !== "main" && (
                <p className="text-medium text-l">{group.name}</p>
              )}
              <ol className="list-inside list-decimal grid gap-2">
                {group.steps.map((step) => (
                  <li key={step} className="marker:font-medium">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <hr className="border-gray-400" />
          <h3>Nährwerte Pro Portion</h3>
          <div className="grid grid-cols-5">
            <h4>Fett</h4>
            <h4>Eiweiß</h4>
            <h4>Kohlenhydrate</h4>
            <h4>Kalorien</h4>
            <h4>Skaldeman</h4>
            <div className="font-medium">{recipe.nutritionValues.fat} g</div>
            <div className="font-medium">
              {recipe.nutritionValues.protein} g
            </div>
            <div className="font-medium">{recipe.nutritionValues.carbs} g</div>
            <div className="font-medium">
              {recipe.nutritionValues.calories} kcal
            </div>
            <div className="font-medium">
              {recipe.nutritionValues.skaldeman}
            </div>
          </div>
        </div>
      ) : (
        <div>No Recipe</div>
      )}
    </PageWrapper>
  );
}
