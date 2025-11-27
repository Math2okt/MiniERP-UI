import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginPanel from "./Pages/LoginPanel";
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
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/ventas" element={<VentasPage />} />
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
