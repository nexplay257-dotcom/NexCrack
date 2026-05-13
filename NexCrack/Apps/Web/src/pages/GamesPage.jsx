import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Download, Star, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
const GENRES = [
  "Action",
  "RPG",
  "Aventure",
  "Horreur",
  "FPS",
  "MOBA",
  "Stratégie",
  "Simulation",
  "Combat",
  "Science-Fiction",
  "Compétitif",
  "Battle Royale"
];

export default function GamesPage() {

  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then(res => res.json())
      .then(data => setGames(data));
  }, []);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const filteredGames = useMemo(() => {
    return games.filter((game) => {

      const matchesSearch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre =
        selectedGenres.length === 0 ||
        game.genres.some((g) => selectedGenres.includes(g));

      return matchesSearch && matchesGenre;

    });
  }, [games, searchQuery, selectedGenres]);

  return (
    <div className="min-h-screen bg-[#070707] text-white">

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">

          <div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour
            </button>

            <h1 className="text-5xl font-black">
              Bibliothèque <span className="text-cyan-400">NexCrack</span>
            </h1>
          </div>

        </div>

        {/* SEARCH */}
        <div className="relative mb-8">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

          <input
            type="text"
            placeholder="Rechercher un jeu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111] border border-white/10 rounded-2xl h-14 pl-12 pr-4 outline-none focus:border-cyan-400 transition"
          />

        </div>

        {/* GENRES */}
        <div className="flex flex-wrap gap-3 mb-10">

          {GENRES.map((genre) => (

            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-5 py-2 rounded-full border transition ${
                selectedGenres.includes(genre)
                  ? "bg-cyan-400 text-black border-cyan-400"
                  : "border-white/10 hover:border-cyan-400"
              }`}
            >
              {genre}
            </button>

          ))}

        </div>

        {/* GAMES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {filteredGames.map((game) => (

            <div
              key={game.id}
              onClick={() => navigate(`/game/${game.id}`)}
              className="bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400 transition-all cursor-pointer group"
            >

              <div className="relative h-[220px] overflow-hidden">

                <img
                  src={game.coverImage}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded-lg flex items-center gap-1">
                  <Star className="w-4 h-4 text-pink-400 fill-pink-400" />
                  <span className="text-sm">
                    {game.rating}
                  </span>
                </div>

              </div>

              <div className="p-5">

                <h2 className="text-xl font-bold mb-2">
                  {game.title}
                </h2>

                <p className="text-gray-400 text-sm line-clamp-3 mb-5">
                  {game.shortDescription}
                </p>

                <button className="w-full bg-cyan-400 text-black font-bold py-3 rounded-xl hover:bg-cyan-300 transition flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Télécharger
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
<Footer />
    </div>
  );
}