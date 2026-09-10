import type { SourceDonnees } from "@/lib/api/client";

/** Affiché uniquement quand le backend Django n'a pas répondu. */
export function BandeauSource({ source }: { source: SourceDonnees }) {
  if (source === "backend") return null;

  return (
    <p className="frost mb-6 rounded-2xl px-4 py-3 text-xs text-muted-foreground">
      Aperçu avec des articles de démonstration — le catalogue Django n'a pas répondu.
    </p>
  );
}
