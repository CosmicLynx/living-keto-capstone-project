import { PageWrapper } from "../layout/PageWrapper.tsx";
import { useAllRecipes } from "../hooks/useAllRecipes.ts";
import { RecipeCard } from "../components/RecipeCard.tsx";

export function RecipesPage() {
  const { data: recipes } = useAllRecipes();
  return (
    <PageWrapper>
      <h1>Rezepte</h1>
      <div className="grid gap-4">
        {recipes?.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </PageWrapper>
  );
}
