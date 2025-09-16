import { Link } from "react-router-dom";
import { mockMeal } from "../mock/meals";

const AddMealPage = () => {

    return (
        <main className="flex flex-col">
            Add a Meal
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-700 text-white">
                        <th className="border border-gray-300 px-4 py-2"></th>
                        <th className="border border-gray-300 px-4 py-2">Calories kcal</th>
                        <th className="border border-gray-300 px-4 py-2">Protein g</th>
                        <th className="border border-gray-300 px-4 py-2"></th> {/* for delete icon */}
                    </tr>
                </thead>
                <tbody >
                    {mockMeal.map((meal) => (
                        <>
                            <tr className="border border-gray-300">
                                <td className="border border-gray-300">
                                    {meal.type}
                                </td>
                            </tr>
                            {meal.mealFoodEntries.map((entry) => (
                                <tr>
                                    <td className="border border-gray-300">{entry.foodItem.name}</td>
                                    <td className="border border-gray-300">{entry.foodItem.calories}</td>
                                    <td className="border border-gray-300">{entry.foodItem.protein}</td>
                                    <td className="border border-gray-300"><button>Delete</button></td>
                                </tr>

                            ))}

                        </>
                    ))}
                    <tr>
                        <td>
                            <Link to="/add-food" style={{ marginRight: "1rem" }}>Add Food</Link></td>
                    </tr>
                </tbody>
            </table>
        </main >
    );
}
export default AddMealPage;
