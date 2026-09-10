/**
 * Point d'entrée unique des lectures/écritures boutique.
 * Les pages n'appellent jamais fetch directement : elles passent par ici.
 */
import { queryOptions } from "@tanstack/react-query";

import { apiRequestAvecSecours, type Resultat } from "./client";
import { endpoints } from "./config";
import type { Categorie, Produit } from "./types";
import { categoriesDemo, produitDemoParSlug, produitsDemo } from "@/data/demo";

export function listerProduits(): Promise<Resultat<Produit[]>> {
  return apiRequestAvecSecours<Produit[]>(endpoints.produits(), () => produitsDemo);
}

export function recupererProduit(slug: string): Promise<Resultat<Produit>> {
  return apiRequestAvecSecours<Produit>(endpoints.produit(slug), () => produitDemoParSlug(slug));
}

export function listerCategories(): Promise<Resultat<Categorie[]>> {
  return apiRequestAvecSecours<Categorie[]>(endpoints.categories(), () => categoriesDemo);
}

export function envoyerCommande(payload: unknown): Promise<Resultat<{ reference: string }>> {
  return apiRequestAvecSecours<{ reference: string }>(
    endpoints.commande(),
    () => ({ reference: `DEMO-${Math.floor(Math.random() * 90000 + 10000)}` }),
    { method: "POST", body: JSON.stringify(payload) },
  );
}

export const produitsQuery = queryOptions({
  queryKey: ["produits"],
  queryFn: listerProduits,
  staleTime: 60_000,
});

export const categoriesQuery = queryOptions({
  queryKey: ["categories"],
  queryFn: listerCategories,
  staleTime: 5 * 60_000,
});

export const produitQuery = (slug: string) =>
  queryOptions({
    queryKey: ["produit", slug],
    queryFn: () => recupererProduit(slug),
    staleTime: 60_000,
  });
