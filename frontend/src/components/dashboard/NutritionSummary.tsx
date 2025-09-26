import type { JSX } from "react";
import type { Meal } from "../../types/meal";

type NutritionSummaryProps = {
  meals: Meal[];
};

const NutritionSummary = ({ meals }: NutritionSummaryProps): JSX.Element => {
  const totalCalories = 0
  meals.reduce((sum) => sum + 1, 0);

  return (
    <section className="">
      <h2>Daily Summary</h2>
      <p>Total Calories: <strong>{totalCalories}</strong> kcal</p>
    </section>
  );
};

export default NutritionSummary;
