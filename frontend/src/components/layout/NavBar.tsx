import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Dashboard</Link>
      <Link to="/add-meal" style={{ marginRight: "1rem" }}>Add Meal</Link>
      <Link to="/add-food">Add Food</Link>
    </nav>
  );
};

export default Navbar;
