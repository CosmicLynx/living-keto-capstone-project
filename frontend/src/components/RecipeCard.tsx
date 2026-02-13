import type { RecipeModel } from "../models/recipe/RecipeModel.ts";
import { CustomButton } from "./CustomButton.tsx";
import { useNavigate } from "react-router-dom";
import { Chip } from "./Chip.tsx";

export function RecipeCard(props: { recipe: RecipeModel }) {
  const { recipe } = props;
  const navigate = useNavigate();

  return (
    <div className="flex w-full border border-gray-200 rounded-[2px] h-[250px] overflow-hidden bg-white">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="row-span-2 min-w-[250px] max-w-[250px] object-cover border-r border-gray-200"
      />
      <div className="p-4 w-full flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <h4>{recipe.title}</h4>
          <div className="text-m">{recipe.totalTime} min</div>
          <div className="flex gap-1 flex-wrap">
            {recipe.tags?.map((t) => <Chip variant="primary" value={t} />)}
          </div>
          {recipe.allergens && recipe.allergens.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {recipe.allergens?.map((a) => (
                <Chip variant="warning" value={"Enthält " + a} />
              ))}
            </div>
          )}
        </div>
        <CustomButton
          label={"zum Rezept"}
          onClick={() => navigate(`/recipe/${recipe.id}`)}
        />
      </div>
    </div>
  );
}
