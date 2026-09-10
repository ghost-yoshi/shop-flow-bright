import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

import { produitQuery, produitsQuery } from "@/lib/api/boutique";
import { CarteProduit } from "@/components/boutique/CarteProduit";
import { prix, usePanier } from "@/lib/panier";

export const Route = createFileRoute("/produit/$slug")({
  loader: async ({ context, params }) => {
    const [produit] = await Promise.all([
      context.queryClient.ensureQueryData(produitQuery(params.slug)),
      context.queryClient.ensureQueryData(produitsQuery),
    ]);
    return { nom: produit.data.nom, description: produit.data.description };
  },
  head: ({ loaderData }) => {
    const titre = loaderData ? `${loaderData.nom} — Marché Doux` : "Article — Marché Doux";
    const desc = loaderData?.description ?? "Article artisanal de la boutique Marché Doux.";
    return {
      meta: [
        { title: titre },
        { name: "description", content: desc.slice(0, 155) },
        { property: "og:title", content: titre },
        { property: "og:description", content: desc.slice(0, 155) },
      ],
    };
  },
  component: FicheProduit,
  errorComponent: ({ error }) => <p role="alert">{error.message}</p>,
  notFoundComponent: () => <p>Article introuvable.</p>,
});

function FicheProduit() {
  const { slug } = Route.useParams();
  const { data: produit } = useSuspenseQuery(produitQuery(slug)).data;
  const tous = useSuspenseQuery(produitsQuery).data.data;
  const { ajouter } = usePanier();
  const [quantite, setQuantite] = useState(1);

  const similaires = tous.filter((p) => p.slug !== produit.slug).slice(0, 3);

  return (
    <main className="pb-4">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/boutique" className="transition hover:text-foreground">
          ← Retour à la boutique
        </Link>
      </nav>

      <section className="frost overflow-hidden rounded-[2rem] shadow-soft">
        <div className="grid md:grid-cols-[1fr_1fr]">
          <div className="p-4 md:p-6">
            <img
              src={produit.image}
              alt={produit.nom}
              width={800}
              height={800}
              className="aspect-square w-full rounded-2xl bg-sand object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10">
            <span className="w-fit rounded-full border border-clay/30 bg-clay/20 px-3 py-1.5 text-xs font-semibold tracking-[0.15em] uppercase">
              {produit.categorie}
            </span>
            <h1 className="mt-5 text-3xl md:text-4xl">{produit.nom}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{produit.artisan}</p>
            <p className="mt-4 text-2xl font-semibold">{prix(produit.prix)}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{produit.description}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="frost inline-flex h-12 items-center rounded-full">
                <button
                  type="button"
                  aria-label="Diminuer la quantité"
                  onClick={() => setQuantite((q) => Math.max(1, q - 1))}
                  className="grid size-12 place-items-center text-muted-foreground transition hover:text-foreground"
                >
                  −
                </button>
                <span className="min-w-8 text-center font-medium">{quantite}</span>
                <button
                  type="button"
                  aria-label="Augmenter la quantité"
                  onClick={() => setQuantite((q) => Math.min(produit.stock || 99, q + 1))}
                  className="grid size-12 place-items-center text-muted-foreground transition hover:text-foreground"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => ajouter(produit, quantite)}
                className="inline-flex h-12 items-center rounded-full bg-primary px-6 font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                Ajouter au panier
              </button>
            </div>

            <dl className="mt-8 divide-y divide-border border-t border-border text-sm">
              <div className="flex justify-between py-2.5">
                <dt className="text-muted-foreground">Matière</dt>
                <dd>{produit.matiere}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-muted-foreground">Disponibilité</dt>
                <dd>{produit.stock > 0 ? `${produit.stock} en stock` : "Épuisé"}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-muted-foreground">Livraison</dt>
                <dd>3 à 5 jours, offerte dès 60 €</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <h2 className="mt-10 mb-5 text-2xl">Dans le même esprit</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {similaires.map((p) => (
          <CarteProduit key={p.slug} produit={p} />
        ))}
      </div>
    </main>
  );
}
