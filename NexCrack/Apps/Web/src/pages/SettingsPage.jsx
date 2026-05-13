import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
const SettingsPage = () => {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-background text-white p-10">

      <div className="max-w-3xl mx-auto">

        {/* RETOUR */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour à l'accueil
        </button>

        {/* TITRE */}
        <h1 className="text-4xl font-black mb-10">
          Paramètres du Compte
        </h1>

        {/* PROFIL */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Informations du compte
          </h2>

          <div className="space-y-4">

            <div>
              <p className="text-muted-foreground text-sm">
                Nom d'utilisateur
              </p>

              <p className="text-xl font-bold text-cyan-400">
                {user?.username}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                Email
              </p>

              <p className="text-lg">
                {user?.email}
              </p>
            </div>

          </div>

        </div>

        {/* ACTIONS */}
        <div className="bg-card border border-border rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-5">
            Actions
          </h2>

          {/* ANCIEN MOT DE PASSE */}
          <div className="mb-4">

            <p className="text-sm text-muted-foreground mb-2">
              Ancien mot de passe
            </p>

            <input
              type="password"
              placeholder="Ancien mot de passe"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-4 py-3"
            />

          </div>

          {/* NOUVEAU MOT DE PASSE */}
          <div className="mb-6">

            <p className="text-sm text-muted-foreground mb-2">
              Nouveau mot de passe
            </p>

            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-4 py-3"
            />

          </div>

          {/* BOUTON MODIFIER */}
          <button
            onClick={async () => {

              const res = await fetch(
                "http://localhost:3001/change-password",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    userId: user.id,
                    oldPassword: oldPassword,
                    password: newPassword
                  })
                }
              );

              const data = await res.json();

              setMessage(data.message || data.error);

              setOldPassword("");
              setNewPassword("");

            }}
            className="px-6 py-3 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all"
          >
            Modifier le mot de passe
          </button>

          {/* MESSAGE */}
          {message && (
            <p className="mt-4 text-sm text-cyan-400">
              {message}
            </p>
          )}

          {/* DÉCONNEXION */}
          <div className="mt-6">

            <Button
              variant="destructive"
              className="w-full"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Déconnexion
            </Button>

          </div>

        </div>

      </div>
<Footer />
    </div>
  );
};

export default SettingsPage;
