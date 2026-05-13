import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    const res = await fetch(
      "http://localhost:3001/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await res.json();

    if (data.token) {

      login(data);

      navigate("/");
    }
    else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-black p-10 rounded-xl w-[400px]"
      >

        <h1 className="text-3xl font-bold mb-6">
          Connexion
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-zinc-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-3 mb-4 bg-zinc-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-cyan-500 p-3 rounded-lg font-bold">
          Se connecter
        </button>

      </form>
    </div>
  );
}