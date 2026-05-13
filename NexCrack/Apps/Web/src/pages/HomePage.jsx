import React, { useState, useMemo, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Download, Zap, Shield, Globe, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AuthContext } from "../Auth/AuthContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
const GENRES = [
  "Action", "RPG", "Aventure", "Horreur",
  "FPS", "MOBA", "Stratégie", "Simulation",
  "Combat", "Science-Fiction", "Compétitif", "Battle Royale"
];

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);

  const trendingGames = [
  games.find(g => g.title?.includes("Red Dead")),
  games.find(g => g.title?.includes("Terraria")),
  games.find(g => g.title?.includes("Forza")),
  games.find(g => g.title?.includes("Wukong"))
].filter(Boolean);

const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {

  if (trendingGames.length === 0) return;

  const interval = setInterval(() => {

    setCurrentSlide((prev) =>
      prev === trendingGames.length - 1
        ? 0
        : prev + 1
    );

  }, 5000);

  return () => clearInterval(interval);

}, [trendingGames.length]);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  useEffect(() => {
    fetch('http://localhost:3001/games')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setGames(data);
      })
      .catch(err => console.log(err));
  }, []);

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

  // LA FONCTION DE SCROLL (Placée correctement)
  const scrollToCategories = (e) => {
    e.preventDefault();
    const element = document.getElementById('games');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      {/* Header */}
<header className="sticky top-0 z-50 bg-transparent">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
<div className="flex items-center justify-between w-full">
<div 
  className="flex items-center gap-3 group cursor-pointer ml-12"
              onClick={() => {
                setSearchQuery('');
                setSelectedGenres([]);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                <Zap className="w-8 h-8 text-primary relative z-10" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                Nex<span className="text-neon-cyan">Crack</span>
              </h1>
            </div>
            
<nav className="hidden md:flex items-center gap-8 mr-8">
                {/* LIENS CORRIGÉS ICI AVEC onClick */}
              <button
  onClick={() => navigate("/games")}
  className="text-sm font-semibold text-muted-foreground hover:text-cyan-400 transition-colors duration-200"
>
  Parcourir les Jeux
</button>
              <a 
                href="#games" 
                onClick={scrollToCategories}
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Catégories
              </a>

              <div className="flex items-center gap-3">
                {!user ? (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => navigate("/login")}
                      className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/30 transition-all duration-300"
                    >
                      Se connecter
                    </Button>
                    <Button
                      onClick={() => navigate("/register")}
                      className="bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all duration-300"
                    >
                      S'inscrire
                    </Button>
                  </div>
                ) : (
                  <div className="relative group">
                    <button className="text-cyan-400 font-bold px-4 py-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400/20 transition-all duration-300">
                      {user.username}
                    </button>
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border/40 bg-card backdrop-blur-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden z-50">
                      <button
                        onClick={() => navigate("/settings")}
                        className="w-full text-left px-5 py-4 hover:bg-muted transition-colors duration-200"
                      >
                        Paramètres du compte
                      </button>
                      <button
                        onClick={logout}
                        className="w-full text-left px-5 py-4 text-red-400 hover:bg-red-500/10 transition-colors duration-200"
                      >
                        Déconnexion
                      </button>
                      
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
<section className="relative w-full h-screen -mt-20 overflow-hidden bg-black">
          <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/hero-video.webm" type="video/webm" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 -mt-20">
          <div className="mb-4 px-4 py-1 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-400 text-sm backdrop-blur-sm">
            ✦ LA COLLECTION ULTIME
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white">
            Bienvenue sur{" "}
            <span className="text-cyan-400 drop-shadow-[0_0_15px_#00ffff]">
              NexCrack
            </span>
          </h1>

          <p className="mt-6 text-gray-300/90 max-w-3xl text-xl leading-relaxed">
            Découvrez une nouvelle génération de jeux premium.
            Téléchargez instantanément vos titres favoris.
          </p>

          <button
            onClick={() => navigate("/games")}
            className="mt-8 px-8 py-4 rounded-xl bg-cyan-400 text-black font-bold hover:scale-105 transition-all shadow-[0_0_25px_#00ffff]"
          >
            Découvrir les Jeux
          </button>
{/* Bouton Discord Statique */}
<button
  onClick={() => window.location.href = 'https://discord.com/oauth2/authorize?client_id=1503425108621131947&response_type=code&redirect_uri=https%3A%2F%2Fdiscord.gg%2FFns5eMWSc&scope=identify+guilds.join'}
  className="mt-4 flex items-center gap-3 px-6 py-3 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/40 text-[#5865F2] hover:bg-[#5865F2] hover:text-white transition-all duration-300 backdrop-blur-md group"
>
  <img 
    src="https://freelogopng.com/images/all_img/1691730767discord-logo-transparent.png" 
    className="w-5 h-5 transition-transform group-hover:rotate-12" 
    alt="Discord" 
  />
  <span className="font-bold">Lier mon compte Discord</span>
</button>


          <button
            onClick={() => {
  window.scrollTo({
    top: window.innerHeight + 80,
    behavior: "smooth"
  });
}}
            className="absolute bottom-2 animate-bounce text-gray-400 hover:text-cyan-400 transition text-sm"
          >
            ↓ Explorer
          </button>
        </div>
      </section>

      {/* TRENDING GAMES */}
<section className="py-24 px-6">

  <div className="max-w-7xl mx-auto">

    {/* TITRE */}
    <div className="flex items-center justify-between mb-10">

      <div>
        <p className="text-cyan-400 font-semibold mb-2">
          Jeux populaires
        </p>

        <h2 className="text-5xl font-black">
          Tendances du Moment
        </h2>
      </div>

      

    </div>

    {/* CAROUSEL */}
{trendingGames[currentSlide] && (

  <div
    onClick={() =>
      navigate(`/game/${trendingGames[currentSlide].id}`)
    }
    className="relative h-[500px] rounded-3xl overflow-hidden cursor-pointer group border border-white/10 hover:border-cyan-400 transition-all"
  >

    {/* LEFT */}
    <button
      onClick={(e) => {
        e.stopPropagation();

        setCurrentSlide((prev) =>
          prev === 0
            ? trendingGames.length - 1
            : prev - 1
        );
      }}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:border-cyan-400 hover:bg-cyan-400/20 transition-all"
    >
      <ChevronLeft className="w-7 h-7 text-white" />
    </button>

    {/* RIGHT */}
    <button
      onClick={(e) => {
        e.stopPropagation();

        setCurrentSlide((prev) =>
          prev === trendingGames.length - 1
            ? 0
            : prev + 1
        );
      }}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:border-cyan-400 hover:bg-cyan-400/20 transition-all"
    >
      <ChevronRight className="w-7 h-7 text-white" />
    </button>

    {/* IMAGE */}
    <img
      src={trendingGames[currentSlide].coverImage}
      alt={trendingGames[currentSlide].title}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

    {/* CONTENT */}
    <div className="relative z-10 h-full flex flex-col justify-end p-14">

      <div className="max-w-2xl">

        <div className="flex gap-3 mb-4">

          {trendingGames[currentSlide].genres?.map((genre) => (

            <span
              key={genre}
              className="px-4 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 text-sm"
            >
              {genre}
            </span>

          ))}

        </div>

        <h2 className="text-6xl font-black mb-5">
          {trendingGames[currentSlide].title}
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          {trendingGames[currentSlide].shortDescription}
        </p>

        <button className="px-8 py-4 rounded-2xl bg-cyan-400 text-black font-bold hover:scale-105 transition-all shadow-[0_0_25px_#00ffff]">
          Voir le Jeu
        </button>

      </div>

    </div>

  </div>

)}

  </div>

</section>

      {/* Search & Filter Section */}
      <section
        id="games"
        className="pt-32 pb-16 bg-card/30 border-y border-border/40 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="animate-slide-up"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-10">
              <h3 className="text-3xl font-bold">Parcourir la Bibliothèque</h3>
              
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Rechercher des jeux par titre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-background border-border/60 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary focus-visible:border-primary transition-all duration-300 rounded-xl text-lg"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {GENRES.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenres.includes(genre) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleGenre(genre)}
                  className={`transition-all duration-300 active:scale-[0.95] rounded-full px-6 py-5 text-sm font-semibold ${
                    selectedGenres.includes(genre) 
                      ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90 neon-glow-magenta border-transparent' 
                      : 'bg-background hover:bg-muted border-border/60 hover:border-border'
                  }`}
                >
                  {genre}
                </Button>
              ))}
              {selectedGenres.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedGenres([])}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-200 rounded-full px-6 py-5"
                >
                  Effacer les filtres
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <div className="w-2 h-2 rounded-full bg-accent neon-glow-lime" />
              Affichage de {filteredGames.length} jeu{filteredGames.length !== 1 ? 'x' : ''}
            </div>
          </motion.div>
        </div>
      </section>
      {/* SEARCH RESULTS */}
<section className="pb-20 relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {searchQuery.length > 0 && (

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

        {filteredGames.map((game, index) => (

          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="group h-full cursor-pointer"
            onClick={() => navigate(`/game/${game.id}`)}
          >

            <div className="bg-card rounded-2xl overflow-hidden border border-border/40 hover:border-cyan-400 transition-all duration-300">

              <div className="relative aspect-[16/10] overflow-hidden">

                <img
                  src={game.coverImage}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

              </div>

              <div className="p-5">

                <h3 className="text-xl font-bold mb-2">
                  {game.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {game.shortDescription}
                </p>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    )}

  </div>
</section>

              

      {/* Footer Section (Rétablie en entier) */}
      <footer className="bg-card border-t border-border/40 py-16 mt-10 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-6 h-6 text-primary" />
                <span className="text-2xl font-extrabold tracking-tight">
                  Nex<span className="text-neon-cyan">Crack</span>
                </span>
              </div>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Votre destination ultime pour les jeux de tous genres. Découvrez, téléchargez et profitez des meilleurs titres d'action, de stratégie, de RPG et plus encore.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-6">Plateforme</h4>
              <ul className="space-y-4">
                <li><a href="#games" onClick={scrollToCategories} className="text-muted-foreground hover:text-primary transition-colors">Parcourir les Jeux</a></li>
                <li><a href="#games" onClick={scrollToCategories} className="text-muted-foreground hover:text-primary transition-colors">Catégories</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Nouveautés</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Mieux Notés</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-foreground mb-6">Légal</h4>
              <ul className="space-y-4">
                <li>
                  <a href="/conditions" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                    Conditions d'utilisation
                  </a>
                </li>
                <li><a href="/dmca" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">DMCA</a></li>
                <li><a href="https://discord.gg/Fns5eMWSc" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">Nous Contacter</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NexCrack. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Fait pour les joueurs, par des joueurs.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
