import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import type { Produit } from "@/lib/api/types";

export type LignePanier = {
  slug: string;
  nom: string;
  prix: number;
  image: string;
  categorie: string;
  quantite: number;
};

type PanierContexte = {
  lignes: LignePanier[];
  ajouter: (produit: Produit, quantite?: number) => void;
  modifierQuantite: (slug: string, quantite: number) => void;
  retirer: (slug: string) => void;
  vider: () => void;
  nombreArticles: number;
  sousTotal: number;
  livraison: number;
  total: number;
};

const CLE = "marche-doux-panier";
const Contexte = createContext<PanierContexte | null>(null);

export function PanierProvider({ children }: { children: ReactNode }) {
  const [lignes, setLignes] = useState<LignePanier[]>([]);

  useEffect(() => {
    try {
      const brut = window.localStorage.getItem(CLE);
      if (brut) setLignes(JSON.parse(brut) as LignePanier[]);
    } catch {
      /* panier illisible : on repart d'un panier vide */
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CLE, JSON.stringify(lignes));
  }, [lignes]);

  const ajouter = useCallback((produit: Produit, quantite = 1) => {
    setLignes((prev) => {
      const existante = prev.find((l) => l.slug === produit.slug);
      if (existante) {
        return prev.map((l) =>
          l.slug === produit.slug ? { ...l, quantite: l.quantite + quantite } : l,
        );
      }
      return [
        ...prev,
        {
          slug: produit.slug,
          nom: produit.nom,
          prix: produit.prix,
          image: produit.image,
          categorie: produit.categorie,
          quantite,
        },
      ];
    });
  }, []);

  const modifierQuantite = useCallback((slug: string, quantite: number) => {
    setLignes((prev) =>
      quantite <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, quantite } : l)),
    );
  }, []);

  const retirer = useCallback((slug: string) => {
    setLignes((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const vider = useCallback(() => setLignes([]), []);

  const valeur = useMemo<PanierContexte>(() => {
    const sousTotal = lignes.reduce((s, l) => s + l.prix * l.quantite, 0);
    const livraison = sousTotal === 0 || sousTotal >= 60 ? 0 : 5.9;
    return {
      lignes,
      ajouter,
      modifierQuantite,
      retirer,
      vider,
      nombreArticles: lignes.reduce((s, l) => s + l.quantite, 0),
      sousTotal,
      livraison,
      total: sousTotal + livraison,
    };
  }, [lignes, ajouter, modifierQuantite, retirer, vider]);

  return <Contexte.Provider value={valeur}>{children}</Contexte.Provider>;
}

export function usePanier() {
  const ctx = useContext(Contexte);
  if (!ctx) throw new Error("usePanier doit être utilisé dans PanierProvider");
  return ctx;
}

export const prix = (valeur: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(valeur);
