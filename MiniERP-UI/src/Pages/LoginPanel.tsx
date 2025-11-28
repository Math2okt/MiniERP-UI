import { useNavigate } from "react-router-dom";
import Utilities from "../ClassesAndUtilities/Utilities";
import { Requester } from "../ClassesAndUtilities/Requester";
import type { LoginResponse } from "../Types/LoginResponse";
import type { User } from "../Types/User";
import { useState } from "react";

type LoginPanelProps = {
  setCurrentUser: (u: User) => void
}
function LoginPanel({ setCurrentUser }: LoginPanelProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let body = { email: email, password: password }
    console.log(body)
    const requester = new Requester();
    try {
      setLoading(true)
      const response = await requester.post<LoginResponse>("/users/users/login/", JSON.stringify(body), undefined, false);
      setLoading(false)
      //mandamos el accesstoken y refreshtoken al localst
      Utilities.saveData("access_token", response.access_token)
      Utilities.saveData("refresh_token", response.refresh_token)
      Utilities.saveData("current_user", response.user)
      Utilities.throwNotification("Logeado con éxito", true)
      setCurrentUser(response.user);
      navigate("/productos");
    } catch {
      Utilities.throwNotification("Usuario o contraseña incorrectos", false)
      setLoading(false)
    }
  }
  if(loading) return <div>Iniciando Sesion... Por favor espere</div>
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPanel;
