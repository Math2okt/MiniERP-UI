import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginPanel from "./Pages/LoginPanel";
import RegisterPanel from "./Pages/RegisterPanel";
import ProductosPage from "./Pages/ProductosPage";
import VentasPage from "./Pages/VentasPage";
import Navbar from "./Components/Navbar";

function App() {
  const location = useLocation();
  const showNavbar = location.pathname === "/productos" || location.pathname === "/ventas";

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPanel />} />
        <Route path="/register" element={<RegisterPanel />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/ventas" element={<VentasPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
