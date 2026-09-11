import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { envoyerCommande } from "@/lib/api/boutique";
import { prix, usePanier } from "@/lib/panier";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Votre panier — Marché Doux" },
      {
        name: "description",
        content:
          "Vérifiez vos articles, ajustez les quantités et finalisez votre commande d'objets faits main.",
      },
      { property: "og:title", content: "Votre panier — Marché Doux" },
      { property: "og:description", content: "Finalisez votre commande Marché Doux." },
    ],
  }),
  component: Panier,
});

function Panier() {
  const { lignes, modifierQuantite, retirer, sousTotal, livraison, total, vider } = usePanier();
  const [reference, setReference] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState(false);

  async function commander() {
    setEnvoi(true);
    const { data } = await envoyerCommande({
      lignes: lignes.map((l) => ({ slug: l.slug, quantite: l.quantite })),
      total,
    });
    setReference(data.reference);
    vider();
    setEnvoi(false);
  }

  if (reference) {
    return (
      <main className="py-16">
        <div className="frost mx-auto max-w-lg rounded-[2rem] p-10 text-center shadow-soft">
          <h1 className="text-3xl">Merci pour votre commande</h1>
          <p className="mt-3 text-muted-foreground">
            Référence <span className="font-semibold text-foreground">{reference}</span>. Votre
            colis est préparé à la main par l'atelier.
          </p>
          <Link
            to="/boutique"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-primary px-6 font-medium text-primary-foreground transition hover:opacity-90"
          >
            Continuer mes achats
          </Link>
        </div>
      </main>
    );
  }

  if (lignes.length === 0) {
    return (
      <main className="py-16">
        <div className="frost mx-auto max-w-lg rounded-[2rem] p-10 text-center shadow-soft">
          <h1 className="text-3xl">Votre panier est vide</h1>
          <p className="mt-3 text-muted-foreground">
            Parcourez la sélection du moment et ajoutez vos premières pièces.
          </p>
          <Link
            to="/boutique"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-primary px-6 font-medium text-primary-foreground transition hover:opacity-90"
          >
            Explorer la boutique
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pb-4">
      <h1 className="mt-2 mb-8 text-4xl">Votre panier</h1>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="frost divide-y divide-border rounded-[2rem] p-4 md:p-6">
          {lignes.map((l) => (
            <article key={l.slug} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              <img
                src={l.image}
                alt={l.nom}
                loading="lazy"
                width={800}
                height={800}
                className="size-20 shrink-0 rounded-2xl bg-sand object-cover"
              />
              <div className="min-w-0 flex-1">
                <Link
                  to="/produit/$slug"
                  params={{ slug: l.slug }}
                  className="text-display font-semibold"
                >
                  {l.nom}
                </Link>
                <p className="text-sm text-muted-foreground capitalize">{l.categorie}</p>
                <button
                  type="button"
                  onClick={() => retirer(l.slug)}
                  className="mt-1 text-xs text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
                >
                  Retirer
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="frost inline-flex h-10 items-center rounded-full">
                  <button
                    type="button"
                    aria-label={`Diminuer la quantité de ${l.nom}`}
                    onClick={() => modifierQuantite(l.slug, l.quantite - 1)}
                    className="grid size-10 place-items-center text-muted-foreground transition hover:text-foreground"
                  >
                    −
                  </button>
                  <span className="min-w-6 text-center text-sm font-medium">{l.quantite}</span>
                  <button
                    type="button"
                    aria-label={`Augmenter la quantité de ${l.nom}`}
                    onClick={() => modifierQuantite(l.slug, l.quantite + 1)}
                    className="grid size-10 place-items-center text-muted-foreground transition hover:text-foreground"
                  >
                    +
                  </button>
                </div>
                <span className="w-20 text-right font-semibold">{prix(l.prix * l.quantite)}</span>
              </div>
            </article>
          ))}
        </section>

        <aside className="frost h-fit rounded-[2rem] p-6 shadow-soft md:p-8">
          <h2 className="text-xl">Récapitulatif</h2>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Sous-total</dt>
              <dd>{prix(sousTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Livraison</dt>
              <dd>{livraison === 0 ? "Offerte" : prix(livraison)}</dd>
            </div>
          </dl>
          <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
            <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Total</span>
            <span className="text-2xl font-semibold">{prix(total)}</span>
          </div>
          <button
            type="button"
            onClick={commander}
            disabled={envoi}
            className="mt-6 h-12 w-full rounded-full bg-primary font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {envoi ? "Envoi en cours…" : "Passer la commande"}
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Paiement sécurisé · Retours 30 jours
          </p>
        </aside>
      </div>
    </main>
  );
}
