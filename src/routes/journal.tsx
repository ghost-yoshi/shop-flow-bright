import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — coulisses des ateliers | Marché Doux" },
      {
        name: "description",
        content:
          "Récits d'atelier, gestes de fabrication et conseils d'entretien pour garder vos objets faits main en bon état.",
      },
      { property: "og:title", content: "Journal — Marché Doux" },
      { property: "og:description", content: "Récits d'atelier et conseils d'entretien." },
    ],
  }),
  component: Journal,
});

const articles = [
  {
    titre: "Ce que change une cuisson à 1 280 °C",
    intro:
      "Le grès devient imperméable sans émail sur toute la surface. On vous explique pourquoi vos mugs vieillissent bien.",
    date: "12 septembre",
    lecture: "4 min",
  },
  {
    titre: "Entretenir le lin lavé, saison après saison",
    intro:
      "Lavage à 30°, séchage à plat, pas d'adoucissant : trois gestes simples pour un textile qui s'améliore.",
    date: "28 août",
    lecture: "3 min",
  },
  {
    titre: "Huiler un plateau en chêne",
    intro:
      "Une couche de cire d'abeille tous les deux mois suffit à nourrir le bois et à révéler son grain.",
    date: "9 août",
    lecture: "2 min",
  },
];

function Journal() {
  return (
    <main className="pb-4">
      <header className="mt-2 mb-10 max-w-xl">
        <h1 className="text-4xl">Le journal</h1>
        <p className="mt-3 text-muted-foreground">
          Les coulisses des ateliers, les matières et les gestes d'entretien qui font durer vos
          objets.
        </p>
      </header>

      <div className="space-y-4">
        {articles.map((a) => (
          <article key={a.titre} className="frost rounded-[2rem] p-6 md:p-8">
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              {a.date} · {a.lecture} de lecture
            </p>
            <h2 className="mt-3 text-2xl">{a.titre}</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">{a.intro}</p>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Link
          to="/boutique"
          className="inline-flex h-12 items-center rounded-full bg-primary px-6 font-medium text-primary-foreground transition hover:opacity-90"
        >
          Voir les articles en boutique
        </Link>
      </div>
    </main>
  );
}
