import { Link } from "@tanstack/react-router";

export function PiedDePage() {
  return (
    <footer className="flex flex-col items-center justify-between gap-3 py-10 text-sm text-muted-foreground md:flex-row">
      <span>© 2026 Marché Doux — boutique d'objets artisanaux</span>
      <div className="flex gap-5">
        <Link to="/journal" className="transition hover:text-foreground">
          Journal
        </Link>
        <Link to="/artisans" className="transition hover:text-foreground">
          Artisans
        </Link>
        <Link to="/boutique" className="transition hover:text-foreground">
          Boutique
        </Link>
      </div>
    </footer>
  );
}
