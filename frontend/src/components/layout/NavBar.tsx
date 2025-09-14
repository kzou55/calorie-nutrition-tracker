import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", justifyContent: "flex-end"  }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Dashboard</Link>
      <Link to="/add-meal" style={{ marginRight: "1rem" }}>Add Meal</Link>
    </nav>
  );
};

export default Navbar;
