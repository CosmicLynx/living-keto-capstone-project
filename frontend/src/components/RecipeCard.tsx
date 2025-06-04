import type { RecipeModel } from "../models/recipe/RecipeModel.ts";
import { CustomButton } from "./CustomButton.tsx";
import { useNavigate } from "react-router-dom";

export function RecipeCard(props: { recipe: RecipeModel }) {
  const { recipe } = props;
  const navigate = useNavigate();

  return (
    <div className="flex w-full border rounded-[5px] h-[150px] overflow-hidden">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="row-span-2 max-w-[200px] grow object-cover"
      />
      <div className="p-4 w-full">
        <div>{recipe.title}</div>
        <div>{recipe.totalTime} min</div>
      </div>
      <CustomButton
        label={"zum Rezept"}
        onClick={() => navigate(`/recipe/${recipe.id}`)}
      />
    </div>
  );
}
