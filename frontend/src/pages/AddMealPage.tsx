import { Link } from "react-router-dom";

const AddMealPage = () => {
    return (
        <main className="flex flex-col">
            Add a Meal
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-700 text-white">
                        <th className="border border-gray-300 px-4 py-2">Breakfast</th>
                        <th className="border border-gray-300 px-4 py-2">Calories kcal</th>
                        <th className="border border-gray-300 px-4 py-2">Protein g</th>
                        <th className="border border-gray-300 px-4 py-2"></th> {/* for delete icon */}
                    </tr>
                </thead>
                <tbody>
                    <tr className="border border-gray-300">
                        <th className="border border-gray-300 px-4 py-2">Food Name</th>
                        <td className="border border-gray-300 px-4 py-2">209</td>
                        <td className="border border-gray-300 px-4 py-2">41</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                            <button className="text-red-600">🗑️</button>
                        </td>
                    </tr>
                    <tr className="border border-gray-300">
                        
                        <th className="border border-gray-300 px-4 py-2">Food Name</th>
                        <td className="border border-gray-300 px-4 py-2">209</td>
                        <td className="border border-gray-300 px-4 py-2">41</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                            <button className="text-red-600">🗑️</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Link to="/add-food" style={{ marginRight: "1rem" }}>Add Food</Link></td>
                    </tr>
                    <tr>
                        <th>Lunch</th>
                    </tr>
                    <tr className="border border-gray-300">
                        
                        <th className="border border-gray-300 px-4 py-2">Food Name</th>
                        <td className="border border-gray-300 px-4 py-2">209</td>
                        <td className="border border-gray-300 px-4 py-2">41</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                            <button className="text-red-600">🗑️</button>
                        </td>
                    </tr>
                    <tr className="border border-gray-300">
                        
                        <th className="border border-gray-300 px-4 py-2">Food Name</th>
                        <td className="border border-gray-300 px-4 py-2">209</td>
                        <td className="border border-gray-300 px-4 py-2">41</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                            <button className="text-red-600">🗑️</button>
                        </td>
                    </tr><tr>
                        <th>Dinner</th>
                    </tr>
                    <tr className="border border-gray-300">
                        
                        <th className="border border-gray-300 px-4 py-2">Food Name</th>
                        <td className="border border-gray-300 px-4 py-2">209</td>
                        <td className="border border-gray-300 px-4 py-2">41</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                            <button className="text-red-600">🗑️</button>
                        </td>
                    </tr>
                    <tr className="border border-gray-300">
                        
                        <th className="border border-gray-300 px-4 py-2">Food Name</th>
                        <td className="border border-gray-300 px-4 py-2">209</td>
                        <td className="border border-gray-300 px-4 py-2">41</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                            <button className="text-red-600">🗑️</button>
                        </td>
                    </tr>
                    {/* More rows here */}
                </tbody>
            </table>

        </main >
    );
}
export default AddMealPage;
