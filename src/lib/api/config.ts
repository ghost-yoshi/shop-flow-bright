/**
 * Configuration centralisée de l'API Django.
 *
 * Toutes les URLs backend du projet sont déclarées ICI et nulle part ailleurs.
 * Change simplement VITE_DJANGO_API_URL pour pointer vers ton serveur Django.
 */

export const API_BASE_URL: string =
  (import.meta.env['VITE_DJANGO_API_URL'] as string | undefined)?.replace(/\/$/, "") ??
  "http://localhost:8000/api";

/** Délai maximal (ms) avant de basculer sur les données de démonstration. */
export const API_TIMEOUT_MS = 4000;

/** Catalogue des routes Django consommées par l'application. */
export const endpoints = {
  produits: () => `/produits/`,
  produit: (slug: string) => `/produits/${encodeURIComponent(slug)}/`,
  categories: () => `/categories/`,
  commande: () => `/commandes/`,
} as const;
