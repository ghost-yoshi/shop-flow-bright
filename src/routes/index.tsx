import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import hero from "@/assets/hero.jpg";
import { BandeauSource } from "@/components/boutique/BandeauSource";
import { CarteProduit } from "@/components/boutique/CarteProduit";
import { produitsQuery } from "@/lib/api/boutique";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marché Doux — objets artisanaux faits pour durer" },
      {
        name: "description",
        content:
          "Céramique, textile, bois et lumière : une sélection d'objets faits main par des artisans indépendants, livrés partout en France.",
      },
      { property: "og:title", content: "Marché Doux — objets artisanaux faits pour durer" },
      {
        property: "og:description",
        content: "Une sélection d'objets faits main par des artisans indépendants.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(produitsQuery),
  component: Accueil,
  errorComponent: ({ error }) => <p role="alert">{error.message}</p>,
  notFoundComponent: () => <p>Page introuvable.</p>,
});

function Accueil() {
  const { data } = useSuspenseQuery(produitsQuery);
  const selection = data.data.slice(0, 3);

  return (
    <main>
      <section className="mt-4 mb-8">
        <div className="frost relative overflow-hidden rounded-[2rem] shadow-soft">
          <div className="grid md:grid-cols-[1.05fr_1fr]">
            <div className="flex flex-col justify-center p-8 md:p-12">
              <span className="w-fit rounded-full border border-sage/30 bg-sage/20 px-3 py-1.5 text-xs font-semibold tracking-[0.15em] text-foreground/70 uppercase">
                Nouvelle collection · Automne
              </span>
              <h1 className="mt-5 text-4xl leading-[1.05] md:text-5xl">
                Des objets choisis, faits pour durer.
              </h1>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                Une sélection d'articles en céramique, textile et bois, dessinés par des artisans
                indépendants. Chaque pièce raconte une histoire.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/boutique"
                  className="inline-flex h-12 items-center rounded-full bg-primary px-6 font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
                >
                  Explorer la boutique
                </Link>
                <Link
                  to="/artisans"
                  className="frost inline-flex h-12 items-center rounded-full px-6 font-medium transition hover:bg-card"
                >
                  Rencontrer les artisans
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
                <span>✓ Livraison offerte dès 60 €</span>
                <span>✓ Retours 30 jours</span>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <img
                src={hero}
                alt="Vases en céramique faits main posés sur du lin écru"
                width={1080}
                height={1200}
                className="h-full min-h-[280px] w-full rounded-2xl bg-sand object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <BandeauSource source={data.source} />

      <h2 className="mb-5 text-2xl">Sélection du moment</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {selection.map((produit) => (
          <CarteProduit key={produit.slug} produit={produit} />
        ))}
      </div>

      <section className="frost mt-8 flex flex-col justify-between gap-6 rounded-[2rem] p-8 md:flex-row md:items-center md:p-10">
        <div>
          <h2 className="text-2xl">Fait à la main, livré chez vous</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            Chaque commande est préparée par l'artisan. Paiement sécurisé et emballage compostable
            inclus.
          </p>
        </div>
        <Link
          to="/artisans"
          className="inline-flex h-12 items-center rounded-full bg-primary px-6 font-medium whitespace-nowrap text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          Découvrir les artisans
        </Link>
      </section>
    </main>
  );
}
