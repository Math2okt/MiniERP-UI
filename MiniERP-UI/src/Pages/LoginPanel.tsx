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
  if(loading) return<div className="min-h-screen flex items-center justify-center bg-lilaClaro text-black font-arimo text-xl">Iniciando sesión...</div>
  return (
    <div className="min-h-screen flex items-center justify-center bg-lila">
      <div className="bg-menta px-8 py-10 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-5xl font-arimo font-bold text-gray-900 mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-4">
            <input type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-md bg-white text-gray placeholder-gray-400 focus:outline-none focus:ring-2 focus-ring-blue-500"/>
            <input type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-md bg-white text-gray placeholder-gray-400 focus:outline-none focus:ring-2 focus-ring-blue-500" />
            <button type="submit" className="w-full py-3 rounded-md bg-celeste hover:bg-lavanda  text-white font-semibold transition shadow-md">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPanel;
