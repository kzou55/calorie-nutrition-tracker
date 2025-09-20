import LogoutButton from "./LogoutButton";
import NavBar from "./NavBar"
import { Link, Outlet } from "react-router-dom";



// Nav bar will be a constant thing on the screen 
const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen w-full mx-auto px-4">
            {/* Row 1 */}
            <div className="flex justify-between items-center">
                <div>NutritionTracker</div>
                <div className="flex flex-col">
                    <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
                    <Link to="/register" style={{ marginRight: "1rem" }}>
                    Register</Link>
                    <LogoutButton/>
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