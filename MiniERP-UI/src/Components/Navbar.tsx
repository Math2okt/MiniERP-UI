import { Link } from "react-router-dom";
import type { User } from "../Types/User";
import Utilities from "../ClassesAndUtilities/Utilities";


type NavbarProps = {
  currentUser: User | null
  logOut: () => void
}
function Navbar({ currentUser, logOut }: NavbarProps) {
  return (
    <nav className="w-full bg-lila shadow-md px-6 py-3 flex items-center justify-between">
      <h2 className="font-arimo font-bold text slate-800">Bienvenido al sistema {currentUser ? currentUser.full_name : ""} !</h2>
      <div className="flex items-center gap-7 text-slate-800">
        <Link className="hover:underline" to="/productos">Productos</Link> 
        <Link className="hover:underline" to="/clientes">Clientes</Link>
        <button onClick={() => { logOut(); Utilities.throwNotification("Sesión Cerrada", false, 4000) }} className="py-2 px-4 rounded-md bg-celeste hover:bg-lavanda text-slate-800 font-semibold transition shadow-md mr-4">Cerrar Sesion</button>
      </div>
    </nav>
  );
}

export default Navbar;
