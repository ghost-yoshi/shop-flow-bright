import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";

import { usePanier } from "@/lib/panier";
import { useTheme } from "@/lib/theme";

const liens = [
  { to: "/boutique", label: "Boutique" },
  { to: "/artisans", label: "Nos artisans" },
  { to: "/journal", label: "Journal" },
] as const;

export function EnTete() {
  const { nombreArticles } = usePanier();
  const { theme, basculer } = useTheme();

  return (
    <nav className="flex items-center justify-between py-6">
      <Link to="/" className="flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-xl border border-clay/30 bg-clay/20">
          <span className="text-display font-semibold text-accent-foreground">M</span>
        </span>
        <span className="text-display text-lg font-semibold tracking-tight">Marché Doux</span>
      </Link>

      <div className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
        {liens.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeProps={{ className: "text-foreground" }}
            className="transition-colors hover:text-foreground"
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={basculer}
          aria-label="Basculer entre thème clair et sombre"
          className="frost grid size-10 place-items-center rounded-full text-muted-foreground shadow-sm transition-colors hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
        <Link
          to="/panier"
          className="relative inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          Panier
          {nombreArticles > 0 && (
            <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-clay text-[11px] font-semibold text-accent-foreground">
              {nombreArticles}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
