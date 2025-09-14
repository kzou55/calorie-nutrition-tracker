import type { JSX } from "react";
import type { Meal } from "../../types/meal";

type MealListProps = {
  meals: Meal[];
};

const MealList = ({ meals }: MealListProps): JSX.Element => {
  if (meals.length === 0) {
    return <p>No meals logged yet.</p>;
  }

  return (
    <section className="">
      <h2>Meals</h2>
      <ul>
        {meals.map((meal) => (
          <li key={meal.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{meal.type}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MealList;