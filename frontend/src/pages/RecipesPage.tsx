import { PageWrapper } from "../layout/PageWrapper.tsx";
import { useAllRecipes } from "../hooks/useAllRecipes.ts";
import { RecipeCard } from "../components/RecipeCard.tsx";
import { CustomButton } from "../components/CustomButton.tsx";
import { UserContext } from "../contexts/UserContext.ts";
import { useContext, useState } from "react";
import { NewRecipeDialog } from "../components/dialogs/RecipeDialog/NewRecipeDialog.tsx";

export function RecipesPage() {
  const { data: recipes } = useAllRecipes();
  const { user } = useContext(UserContext);

  const [openNewRecipeModal, setOpenNewRecipeModal] = useState(false);

  return (
    <PageWrapper>
      <div className="flex justify-between items-center mb-4">
        <h1>Rezepte</h1>
        {user?.role === "ROLE_ADMIN" && (
          <CustomButton
            variant="primary"
            label="Neues Rezept"
            onClick={() => setOpenNewRecipeModal(true)}
          />
        )}
      </div>
      <div className="grid gap-4">
        {recipes?.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
      <NewRecipeDialog
        open={openNewRecipeModal}
        onClose={() => setOpenNewRecipeModal(false)}
      />
    </PageWrapper>
  );
}
