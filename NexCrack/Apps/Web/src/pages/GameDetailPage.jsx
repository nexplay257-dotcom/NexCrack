import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  ArrowLeft, Star, Calendar, Code, Shield, 
  Download, Monitor, Cpu, MemoryStick, HardDrive, 
  MonitorPlay, ExternalLink
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Footer from "@/components/Footer";
const GameDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const [game, setGame] = useState(null);
const [relatedGames, setRelatedGames] = useState([]);

useEffect(() => {
  window.scrollTo(0, 0);

  fetch(`http://localhost:3001/games/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setGame(data);

      return fetch("http://localhost:3001/games");
    })
    .then((res) => res.json())
    .then((games) => {
      const related = games
        .filter((g) => g.id !== id)
        .map((g) => {
          const score = g.genres.filter((genre) =>
            game?.genres?.includes(genre)
          ).length;

          return { game: g, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map((s) => s.game);

      setRelatedGames(related);
    })
    .catch((err) => console.error(err));

}, [id]);
  // Scroll to top when game changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
if (!game) {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Chargement...
    </div>
  );
}
  if (!game) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Helmet>
          <title>Jeu non trouvé - NexCrack</title>
        </Helmet>
        <Shield className="w-20 h-20 text-destructive mb-6" />
        <h1 className="text-3xl font-bold mb-4">Jeu introuvable</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">Le jeu que vous recherchez n'existe pas ou a été retiré de notre bibliothèque.</p>
        <Button onClick={() => navigate('/')} className="bg-primary text-primary-foreground">
          <ArrowLeft className="mr-2 w-4 h-4" /> Retour à l'accueil
        </Button>
      </div>
    );
  }

  // Formatting date nicely
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(game.releaseDate));

  return (
<div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <Helmet>
        <title>{`${game.title} - Télécharger sur NexCrack`}</title>
        <meta name="description" content={game.shortDescription} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        {/* Blur overlay for smooth blend into background */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/40 z-[5]" />
        
        <motion.img 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src={game.coverImage} 
          alt={game.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute top-0 left-0 w-full p-6 z-50">
  <button
    onClick={() => navigate('/')}
    className="flex items-center gap-2 text-white bg-black/40 hover:bg-black/60 px-5 py-2 rounded-full backdrop-blur-md transition"
  >
    <ArrowLeft className="w-5 h-5" />
    Retour
  </button>
</div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20 max-w-7xl mx-auto flex flex-col items-start justify-end h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {game.genres.map(genre => (
                <Badge key={genre} className="bg-primary/20 text-neon-cyan border border-primary/30 px-3 py-1 font-semibold text-sm backdrop-blur-md">
                  {genre}
                </Badge>
              ))}
              <Badge className="bg-secondary/20 text-neon-magenta border border-secondary/30 px-3 py-1 font-bold text-sm backdrop-blur-md flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-neon-magenta text-neon-magenta" />
                {game.rating}/10
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 tracking-tighter drop-shadow-xl text-balance">
              {game.title}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:-mt-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-10"
          >
            {/* Description */}
            <section className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                <MonitorPlay className="text-primary w-6 h-6" />
                À propos de {game.title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                {game.fullDescription}
              </p>
            </section>

            {/* System Requirements */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Configuration Requise</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Minimum */}
                <Card className="bg-background/50 border-border/50 overflow-hidden">
                  <div className="bg-muted/50 p-4 border-b border-border/50 font-bold text-foreground">
                    Minimum
                  </div>
                  <CardContent className="p-6 space-y-4 text-sm text-muted-foreground">
                    <div className="flex gap-3"><Monitor className="w-5 h-5 text-primary shrink-0" /> <div><strong className="text-foreground">OS:</strong> {game.minimumRequirements.os}</div></div>
                    <div className="flex gap-3"><Cpu className="w-5 h-5 text-primary shrink-0" /> <div><strong className="text-foreground">CPU:</strong> {game.minimumRequirements.cpu}</div></div>
                    <div className="flex gap-3"><MemoryStick className="w-5 h-5 text-primary shrink-0" /> <div><strong className="text-foreground">RAM:</strong> {game.minimumRequirements.ram}</div></div>
                    <div className="flex gap-3"><Code className="w-5 h-5 text-primary shrink-0" /> <div><strong className="text-foreground">GPU:</strong> {game.minimumRequirements.gpu}</div></div>
                    <div className="flex gap-3"><HardDrive className="w-5 h-5 text-primary shrink-0" /> <div><strong className="text-foreground">Stockage:</strong> {game.minimumRequirements.storage}</div></div>
                  </CardContent>
                </Card>

                {/* Recommended */}
                <Card className="bg-background/50 border-accent/30 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                  <div className="bg-accent/10 p-4 border-b border-accent/20 font-bold text-accent flex items-center justify-between">
                    Recommandée
                    <Star className="w-4 h-4" />
                  </div>
                  <CardContent className="p-6 space-y-4 text-sm text-muted-foreground relative z-10">
                    <div className="flex gap-3"><Monitor className="w-5 h-5 text-accent shrink-0" /> <div><strong className="text-foreground">OS:</strong> {game.recommendedRequirements.os}</div></div>
                    <div className="flex gap-3"><Cpu className="w-5 h-5 text-accent shrink-0" /> <div><strong className="text-foreground">CPU:</strong> {game.recommendedRequirements.cpu}</div></div>
                    <div className="flex gap-3"><MemoryStick className="w-5 h-5 text-accent shrink-0" /> <div><strong className="text-foreground">RAM:</strong> {game.recommendedRequirements.ram}</div></div>
                    <div className="flex gap-3"><Code className="w-5 h-5 text-accent shrink-0" /> <div><strong className="text-foreground">GPU:</strong> {game.recommendedRequirements.gpu}</div></div>
                    <div className="flex gap-3"><HardDrive className="w-5 h-5 text-accent shrink-0" /> <div><strong className="text-foreground">Stockage:</strong> {game.recommendedRequirements.storage}</div></div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Action Box */}
            <div className="bg-card/60 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[50px] pointer-events-none" />
              
              <h3 className="text-xl font-bold mb-6">Liens de Téléchargement</h3>
              <div className="space-y-4">
                {game.downloadLinks.map((link, idx) => (
                  <Button 
                    key={idx}
                    variant={idx === 0 ? "default" : "outline"}
                    className={`w-full h-14 font-bold text-base flex justify-between group ${
                      idx === 0 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-cyan transition-all active:scale-[0.98]' 
                        : 'border-border hover:bg-muted hover:border-primary/50 transition-all active:scale-[0.98]'
                    }`}
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    <span className="flex items-center gap-2">
                      <Download className={`w-5 h-5 ${idx === 0 ? '' : 'text-muted-foreground group-hover:text-primary transition-colors'}`} />
                      {link.name}
                    </span>
                    <ExternalLink className={`w-4 h-4 ${idx === 0 ? 'opacity-70' : 'text-muted-foreground'}`} />
                  </Button>
                ))}
              </div>
            </div>

            {/* Game Info Details */}
            <Card className="bg-card/40 border-border/50">
              <CardContent className="p-6 space-y-5">
                <div>
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4" /> Date de Sortie
                  </div>
                  <div className="font-semibold">{formattedDate}</div>
                </div>
                
                <div className="h-px w-full bg-border/50" />
                
                <div>
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                    <Code className="w-4 h-4" /> Développeur
                  </div>
                  <div className="font-semibold">{game.developer}</div>
                </div>

                <div className="h-px w-full bg-border/50" />
                
                <div>
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4" /> Éditeur
                  </div>
                  <div className="font-semibold">{game.publisher}</div>
                </div>

                <div className="h-px w-full bg-border/50" />
                
                <div>
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                    <Monitor className="w-4 h-4" /> Plateformes
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms.map(platform => (
                      <span key={platform} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md border border-border">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

          </motion.div>
        </div>

        {/* Related Games */}
        {relatedGames.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-24 pt-12 border-t border-border/40"
          >
            <h2 className="text-3xl font-bold mb-8 text-foreground">Jeux Similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedGames.map((rg, idx) => (
                <div 
                  key={rg.id}
                  onClick={() => navigate(`/game/${rg.id}`)}
                  className="group bg-card rounded-2xl overflow-hidden border border-border/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/40 cursor-pointer"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={rg.coverImage} 
                      alt={rg.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-card-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {rg.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Star className="w-3.5 h-3.5 text-neon-magenta" /> {rg.rating}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {rg.genres.slice(0, 2).map(genre => (
                        <span key={genre} className="text-xs font-medium bg-muted px-2 py-0.5 rounded text-muted-foreground">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GameDetailPage;