import { Link } from "react-router-dom";
import type { User } from "../Types/User";
import Utilities from "../ClassesAndUtilities/Utilities";


type NavbarProps = {
  currentUser: User | null
  logOut: () => void
}
function Navbar({ currentUser, logOut }: NavbarProps) {
  return (
    <nav>
      <h2>Bienvenido al sistema {currentUser ? currentUser.full_name : ""} !</h2>
      <Link to="/productos">Productos</Link> |
      <Link to="/clientes">Clientes</Link>
      <button onClick={() => { logOut(); Utilities.throwNotification("Sesión Cerrada", false, 4000) }}>Cerrar Sesion</button>
    </nav>
  );
}

export default Navbar;
