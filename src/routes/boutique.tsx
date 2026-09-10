import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

import { BandeauSource } from "@/components/boutique/BandeauSource";
import { CarteProduit } from "@/components/boutique/CarteProduit";
import { categoriesQuery, produitsQuery } from "@/lib/api/boutique";

export const Route = createFileRoute("/boutique")({
  head: () => ({
    meta: [
      { title: "Boutique — céramique, textile, bois | Marché Doux" },
      {
        name: "description",
        content:
          "Parcourez tous les articles Marché Doux : céramique tournée main, textiles en lin lavé, bois massif et luminaires d'atelier.",
      },
      { property: "og:title", content: "Boutique — Marché Doux" },
      {
        property: "og:description",
        content: "Tous les articles faits main de nos ateliers partenaires.",
      },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(produitsQuery),
      context.queryClient.ensureQueryData(categoriesQuery),
    ]),
  component: Boutique,
  errorComponent: ({ error }) => <p role="alert">{error.message}</p>,
  notFoundComponent: () => <p>Page introuvable.</p>,
});

function Boutique() {
  const produits = useSuspenseQuery(produitsQuery).data;
  const categories = useSuspenseQuery(categoriesQuery).data;
  const [filtre, setFiltre] = useState("tout");
  const [tri, setTri] = useState<"nouveautes" | "prix-asc" | "prix-desc">("nouveautes");

  const liste = produits.data
    .filter((p) => filtre === "tout" || p.categorie === filtre)
    .sort((a, b) =>
      tri === "prix-asc" ? a.prix - b.prix : tri === "prix-desc" ? b.prix - a.prix : 0,
    );

  return (
    <main className="pb-4">
      <header className="mt-2 mb-8 max-w-xl">
        <h1 className="text-4xl">La boutique</h1>
        <p className="mt-3 text-muted-foreground">
          {produits.data.length} articles en petite série, préparés et expédiés par l'atelier qui
          les a fabriqués.
        </p>
      </header>

      <BandeauSource source={produits.source} />

      <div className="mb-6 flex flex-wrap items-center gap-2.5">
        {categories.data.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setFiltre(c.slug)}
            className={
              filtre === c.slug
                ? "h-9 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground"
                : "frost h-9 rounded-full px-4 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            }
          >
            {c.nom}
          </button>
        ))}
        <select
          value={tri}
          onChange={(e) => setTri(e.target.value as typeof tri)}
          aria-label="Trier les articles"
          className="frost ml-auto h-9 rounded-full px-4 text-sm font-medium"
        >
          <option value="nouveautes">Trier — nouveautés</option>
          <option value="prix-asc">Trier — prix croissant</option>
          <option value="prix-desc">Trier — prix décroissant</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {liste.map((produit) => (
          <CarteProduit key={produit.slug} produit={produit} />
        ))}
      </div>

      {liste.length === 0 && (
        <p className="frost rounded-2xl p-8 text-center text-muted-foreground">
          Aucun article dans cette catégorie pour le moment.
        </p>
      )}
    </main>
  );
}
