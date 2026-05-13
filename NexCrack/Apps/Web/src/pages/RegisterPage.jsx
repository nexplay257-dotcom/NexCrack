import { useState, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
export default function RegisterPage() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    const res = await fetch(
      "http://localhost:3001/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
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
        onSubmit={handleRegister}
        className="bg-black p-10 rounded-xl w-[400px]"
      >

        <h1 className="text-3xl font-bold mb-6">
          Inscription
        </h1>

        <input
          type="text"
          placeholder="Pseudo"
          className="w-full p-3 mb-4 bg-zinc-900"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
          Créer le compte
        </button>

      </form>
    </div>
  );
}
