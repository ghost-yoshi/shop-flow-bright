import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { produitsQuery } from "@/lib/api/boutique";
import { prix } from "@/lib/panier";

export const Route = createFileRoute("/artisans")({
  head: () => ({
    meta: [
      { title: "Nos artisans — les ateliers de Marché Doux" },
      {
        name: "description",
        content:
          "Rencontrez les ateliers qui fabriquent nos objets : céramistes, tisserands et tourneurs sur bois installés à Douala et dans le Littoral.",
      },
      { property: "og:title", content: "Nos artisans — Marché Doux" },
      {
        property: "og:description",
        content: "Les ateliers indépendants derrière chaque pièce de la boutique.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(produitsQuery),
  component: Artisans,
  errorComponent: ({ error }) => <p role="alert">{error.message}</p>,
  notFoundComponent: () => <p>Page introuvable.</p>,
});

function Artisans() {
  const produits = useSuspenseQuery(produitsQuery).data.data;
  const ateliers = Array.from(new Set(produits.map((p) => p.artisan))).map((nom) => ({
    nom,
    pieces: produits.filter((p) => p.artisan === nom),
  }));

  return (
    <main className="pb-4">
      <header className="mt-2 mb-10 max-w-xl">
        <h1 className="text-4xl">Nos artisans</h1>
        <p className="mt-3 text-muted-foreground">
          Chaque atelier travaille en petite série, avec ses propres matières et son propre rythme.
          Voici ceux dont vous retrouvez les pièces en boutique.
        </p>
      </header>

      <div className="space-y-5">
        {ateliers.map((atelier, i) => (
          <section
            key={atelier.nom}
            className={`frost rounded-[2rem] p-6 md:p-8 ${i % 2 === 1 ? "md:ml-16" : "md:mr-16"}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-2xl">{atelier.nom}</h2>
              <span className="text-sm text-muted-foreground">
                {atelier.pieces.length} pièce{atelier.pieces.length > 1 ? "s" : ""} en boutique
              </span>
            </div>
            <ul className="mt-5 divide-y divide-border border-t border-border">
              {atelier.pieces.map((p) => (
                <li key={p.slug} className="flex items-center gap-4 py-3">
                  <img
                    src={p.image}
                    alt={p.nom}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="size-14 rounded-xl bg-sand object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/produit/$slug"
                      params={{ slug: p.slug }}
                      className="text-display font-semibold"
                    >
                      {p.nom}
                    </Link>
                    <p className="truncate text-sm text-muted-foreground">{p.matiere}</p>
                  </div>
                  <span className="font-semibold">{prix(p.prix)}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
