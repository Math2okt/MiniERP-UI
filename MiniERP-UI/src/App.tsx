import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginPanel from "./Pages/LoginPanel";
import ProductosPage from "./Pages/ProductosPage";
import VentasPage from "./Pages/VentasPage";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import type { User } from "./Types/User";

function App() {
  const location = useLocation();
  const showNavbar = location.pathname === "/productos" || location.pathname === "/ventas";
  const [currentUser,setCurrentUser] = useState<User|null>(null);
  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPanel setCurrentUser={setCurrentUser}/>} />
        <Route path="/productos" element={<ProductosPage currentUser={currentUser}/>} />
        <Route path="/ventas" element={<VentasPage currentUser={currentUser}/>} />
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
