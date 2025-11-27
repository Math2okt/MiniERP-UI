import { useNavigate } from "react-router-dom";

function RegisterPanel() {
  const navigate = useNavigate();

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Registrando usuario...");
    navigate("/login");
  }

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Registrarse</button>
      </form>
      <button onClick={() => navigate("/login")}>Volver al login</button>
    </div>
  );
}

export default RegisterPanel;
