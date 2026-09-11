import { Link } from "@tanstack/react-router";

import type { Produit } from "@/lib/api/types";
import { prix, usePanier } from "@/lib/panier";

export function CarteProduit({ produit }: { produit: Produit }) {
  const { ajouter } = usePanier();

  return (
    <article className="frost rounded-3xl p-4 shadow-sm transition-shadow hover:shadow-lg">
      <Link
        to="/produit/$slug"
        params={{ slug: produit.slug }}
        className="block overflow-hidden rounded-2xl bg-sand"
      >
        <img
          src={produit.image}
          alt={produit.nom}
          loading="lazy"
          width={800}
          height={800}
          className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
      </Link>
      <div className="px-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-display font-semibold">
              <Link to="/produit/$slug" params={{ slug: produit.slug }}>
                {produit.nom}
              </Link>
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {produit.artisan} · <span className="capitalize">{produit.categorie}</span>
            </p>
          </div>
          <span className="text-base font-semibold whitespace-nowrap">{prix(produit.prix)}</span>
        </div>
        <button
          type="button"
          onClick={() => ajouter(produit)}
          className="mt-4 h-11 w-full rounded-full border border-clay/30 bg-clay/20 text-sm font-medium transition hover:bg-clay/30"
        >
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}
