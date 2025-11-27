import { useNavigate } from "react-router-dom";

function LoginPanel() {
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Logeando usuario...");
    navigate("/productos");
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Entrar</button>
      </form>
      <button onClick={() => navigate("/register")}>Crear nueva cuenta</button>
    </div>
  );
}

export default LoginPanel;
