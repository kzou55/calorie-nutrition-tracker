
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../app/store";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);  

  return (
    <nav className="flex gap-4">
      {user && <Link to="/dashboard">Dashboard</Link>}
      {user && <Link to="/add-meal">Add Meal</Link>}
      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}
      {user && <LogoutButton />}
    </nav>
  );
};

export default Navbar;
