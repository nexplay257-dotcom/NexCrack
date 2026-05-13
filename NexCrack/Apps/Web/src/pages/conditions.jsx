import React from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
export default function Conditions() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans">

      <div className="max-w-4xl mx-auto px-6 py-20">

        {/* RETOUR */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition mb-10"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour à l'accueil
        </button>

        {/* TITRE */}
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-white tracking-tight">
          Conditions d'utilisation <span className="text-cyan-400">- NexCrack</span>
        </h1>

        <div className="space-y-12">

          {/* 01 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              <span className="text-cyan-500 mr-2">01.</span>
              Acceptation des conditions
            </h2>

            <p className="leading-relaxed text-gray-400">
              En accédant au site NexCrack ou à notre serveur Discord,
              vous acceptez d'être lié par les présentes conditions
              d'utilisation et par toutes les lois et réglementations applicables.
            </p>
          </section>

          {/* 02 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              <span className="text-cyan-500 mr-2">02.</span>
              Utilisation du service
            </h2>

            <p className="mb-4">
              NexCrack est une plateforme de partage communautaire.
              Vous vous engagez à :
            </p>

            <ul className="list-disc pl-5 space-y-2 text-gray-400 font-light">
              <li>Ne pas utiliser le service à des fins illégales.</li>
              <li>Ne pas poster de contenu haineux, raciste ou offensant.</li>
              <li>Respecter les autres membres de la communauté.</li>
            </ul>
          </section>

          {/* 03 */}
          <section className="p-8 bg-white/5 rounded-2xl border border-white/10 shadow-2xl">

            <h2 className="text-xl font-semibold text-white mb-4">
              03. Propriété Intellectuelle
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Le nom NexCrack, le logo et les services associés
              sont la propriété du projet. Les jeux ou logiciels
              tiers mentionnés appartiennent à leurs développeurs respectifs.
              NexCrack ne revendique aucune propriété sur les fichiers
              tiers partagés par la communauté.
            </p>

          </section>

          {/* 04 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              <span className="text-cyan-500 mr-2">04.</span>
              Limitation de responsabilité
            </h2>

            <p className="text-gray-400 italic font-light">
              NexCrack est fourni "en l'état". Nous ne serons
              en aucun cas responsables des dommages matériels
              ou logiciels résultant de l'utilisation ou de
              l'impossibilité d'utiliser les fichiers proposés
              sur la plateforme.
            </p>
          </section>

          {/* 05 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              <span className="text-cyan-500 mr-2">05.</span>
              Confidentialité
            </h2>

            <p className="text-gray-400">
              Nous respectons votre vie privée.
              Les données collectées (via Discord ou inscription)
              sont uniquement utilisées pour le bon fonctionnement
              de votre compte et ne sont jamais revendues à des tiers.
            </p>
          </section>

          {/* 06 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              <span className="text-cyan-500 mr-2">06.</span>
              Modification des termes
            </h2>

            <p className="text-gray-400">
              Nous nous réservons le droit de modifier ces conditions
              à tout moment et sans préavis. Il est de votre responsabilité
              de consulter cette page régulièrement pour vous tenir informé
              des changements.
            </p>
          </section>

        </div>

        {/* FOOTER */}
        <div className="mt-24 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          Dernière mise à jour : Mai 2026 — NexCrack Team
        </div>

      </div>
<Footer />
    </div>
  );
}
