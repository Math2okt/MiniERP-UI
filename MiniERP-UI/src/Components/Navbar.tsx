import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/productos">Productos</Link> | 
      <Link to="/ventas">Ventas</Link>
    </nav>
  );
}

export default Navbar;
