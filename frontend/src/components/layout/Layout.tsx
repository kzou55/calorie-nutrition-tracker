import NavBar from "./NavBar"
import { Outlet } from "react-router-dom";



// Nav bar will be a constant thing on the screen 
const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen w-full mx-auto px-4">
            {/* Row 1 */}
            <div className="flex justify-between items-center">
                <div>NutritionTracker</div>
                <div className="flex flex-col">
                    Login
                    Register
                    Logout
                </div>
            </div>
            {/* Row 2 */}
            <div className="flex justify-start">
                <NavBar />
            </div>
            {/* Row 3 */}
            <Outlet />
        </div>
    )

}

export default Layout