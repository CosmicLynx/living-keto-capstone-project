import type { RecipeModel } from "../models/recipe/RecipeModel.ts";

export function RecipeCard(props: { recipe: RecipeModel }) {
  const { recipe } = props;
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
    </div>
  );
}
