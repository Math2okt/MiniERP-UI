import { useNavigate } from "react-router-dom";
import Utilities from "../Classes & Utilites/Utilities";
import { Requester } from "../Classes & Utilites/Requester";
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


  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let body = { email: email, password: password }
    console.log(body)
    const requester = new Requester();
    try {
      console.log("Me intento loguear")
      const response = await requester.post<LoginResponse>("/users/users/login/", JSON.stringify(body), undefined, false);
      //mandamos el accesstoken y refreshtoken al localst
      Utilities.saveData("access_token", response.access_token)
      Utilities.saveData("refresh_token", response.refresh_token)
      console.log("Log exitoso")
      Utilities.throwNotification("Logeado con éxito", true)
      setCurrentUser(response.user);
      navigate("/productos");
    } catch {
      Utilities.throwNotification("Usuario o contraseña incorrectos", false)
    }
  }
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
