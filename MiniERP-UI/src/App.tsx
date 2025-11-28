import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import LoginPanel from "./Pages/LoginPanel";
import ProductosPage from "./Pages/ProductsPage";
import ClientesPage from "./Pages/ClientsPage";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import type { User } from "./Types/User";
import Utilities from "./ClassesAndUtilities/Utilities";
import { Requester } from "./ClassesAndUtilities/Requester";

function App() {
  const location = useLocation();
  const showNavbar = location.pathname === "/productos" || location.pathname === "/clientes";
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

async function logOut(): Promise<void> {
    console.log("Logging out");

    const user = Utilities.loadData("current_user");

    // Limpiar localStorage primero
    Utilities.saveData("current_user", null);
    setCurrentUser(null);

    // Intentar logout en el backend
    try {
        await new Requester().post("/users/users/logout/", JSON.stringify(user));
    } catch (error: any) {
        if (error?.response?.status === 401) {
            console.warn("Token expirado o inválido, logout ignorado en backend");
        } else {
            console.error("Error durante logout:", error);
        }
    }

    // Redirigir al login
    navigate("/login");
}

  return (
    <div>
      {showNavbar && <Navbar currentUser={currentUser} logOut={logOut} />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPanel setCurrentUser={setCurrentUser} />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <div
        id="notification"
        className="position-fixed m-5 start-50 translate-middle-x bg-success text-white p-3 rounded shadow"
        style={{ display: "none", zIndex: 9999 }}
      ></div>

    </div>
  );
}

export default App;
