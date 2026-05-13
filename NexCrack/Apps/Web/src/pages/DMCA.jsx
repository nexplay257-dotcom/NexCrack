import React from 'react';
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function DMCA() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <button
  onClick={() => navigate("/")}
  className="mb-8 flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-all"
>
  <ArrowLeft className="w-5 h-5" />
  Retour
</button>
        
        {/* Titre avec le style NexCrack */}
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-white tracking-tight">
          Politique DMCA <span className="text-cyan-400">- NexCrack</span>
        </h1>

        <div className="space-y-12">
          {/* 01 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              <span className="text-cyan-500 mr-2">01.</span> Notification de violation
            </h2>
            <p className="leading-relaxed text-gray-400">
              NexCrack respecte la propriété intellectuelle d'autrui. Si vous pensez que votre œuvre a été copiée d'une manière qui constitue une violation du droit d'auteur, merci de nous contacter avec les informations requises ci-dessous.
            </p>
          </section>

          {/* 02 - Le bloc mis en avant pour le contact */}
          <section className="p-8 bg-white/5 rounded-2xl border border-white/10 shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-4">
              02. Procédure de retrait
            </h2>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Pour soumettre une plainte, vous devez nous fournir les éléments suivants :
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400 font-light">
              <li>Une signature électronique ou physique du titulaire du droit d'auteur.</li>
              <li>L'identification de l'œuvre protégée faisant l'objet de la plainte.</li>
              <li>Le lien (URL) précis du contenu à supprimer sur NexCrack.</li>
              <li>Vos coordonnées (email, adresse, téléphone).</li>
            </ul>
          </section>

          {/* 03 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              <span className="text-cyan-500 mr-2">03.</span> Hébergement du contenu
            </h2>
            <p className="text-gray-400 leading-relaxed">
              NexCrack agit en tant qu'intermédiaire technique. Nous n'hébergeons aucun fichier illégal sur nos propres serveurs. Les fichiers sont partagés par des tiers via des liens externes. Nous nous engageons cependant à supprimer tout lien pointant vers un contenu protégé dès réception d'une plainte valide.
            </p>
          </section>

          {/* 04 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              <span className="text-cyan-500 mr-2">04.</span> Contact DMCA
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Toute demande de retrait doit être adressée via notre système de tickets sur Discord ou par mail à l'adresse dédiée (si disponible). Les demandes incomplètes ne pourront pas être traitées.
            </p>
          </section>
        </div>

        {/* Footer de page */}
        <div className="mt-24 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          NexCrack Copyright Compliance — 2026
        </div>
      </div>
      <Footer />
    </div>
  );
}