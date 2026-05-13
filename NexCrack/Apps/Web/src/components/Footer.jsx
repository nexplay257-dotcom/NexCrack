import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/40 py-16 mt-10 relative overflow-hidden">
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-6 h-6 text-primary" />

              <span className="text-2xl font-extrabold tracking-tight">
                Nex<span className="text-cyan-400">Crack</span>
              </span>
            </div>

            <p className="text-muted-foreground max-w-md leading-relaxed">
              Votre destination ultime pour les jeux de tous genres.
              Découvrez, téléchargez et profitez des meilleurs titres
              d'action, de stratégie, de RPG et plus encore.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">
              Plateforme
            </h4>

            <ul className="space-y-4">
              <li>
                <a href="/games" className="text-muted-foreground hover:text-primary transition-colors">
                  Parcourir les Jeux
                </a>
              </li>

              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Catégories
                </a>
              </li>

              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Nouveautés
                </a>
              </li>

              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Mieux Notés
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">
              Légal
            </h4>

            <ul className="space-y-4">

              <li>
                <a
                  href="/conditions"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Conditions d'utilisation
                </a>
              </li>

              <li>
                <a
                  href="/dmca"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  DMCA
                </a>
              </li>

              <li>
                <a
                  href="https://discord.gg/TDGwWKRdd"
                  target="_blank"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Nous Contacter
                </a>
              </li>

            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NexCrack. Tous droits réservés.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              Fait pour les joueurs, par des joueurs.
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}