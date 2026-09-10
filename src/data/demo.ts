/**
 * DONNÉES FICTIVES — uniquement pour la prévisualisation.
 *
 * Ce fichier est la SEULE source de données de démonstration du projet.
 * Il n'est utilisé que si l'appel au backend Django échoue (voir
 * src/lib/api/client.ts → apiRequestAvecSecours).
 */
import type { Categorie, Produit } from "@/lib/api/types";

import mug from "@/assets/p-mug.jpg";
import plaid from "@/assets/p-plaid.jpg";
import plateau from "@/assets/p-plateau.jpg";
import lampe from "@/assets/p-lampe.jpg";
import bol from "@/assets/p-bol.jpg";
import serviettes from "@/assets/p-serviettes.jpg";

export const categoriesDemo: Categorie[] = [
  { slug: "tout", nom: "Tout" },
  { slug: "ceramique", nom: "Céramique" },
  { slug: "textile", nom: "Textile" },
  { slug: "bois", nom: "Bois" },
  { slug: "lumiere", nom: "Lumière" },
];

export const produitsDemo: Produit[] = [
  {
    id: 1,
    slug: "mug-terre-brute",
    nom: "Mug Terre Brute",
    prix: 24,
    categorie: "ceramique",
    artisan: "Atelier Ligne",
    matiere: "Grès émaillé mouchetée",
    description:
      "Tourné à la main, cuit à 1 280 °C. L'émail moucheté laisse apparaître le grain de la terre : chaque mug est légèrement unique.",
    image: mug,
    stock: 12,
    nouveaute: true,
  },
  {
    id: 2,
    slug: "plaid-lin-doux",
    nom: "Plaid Lin Doux",
    prix: 58,
    categorie: "textile",
    artisan: "Maison Fil",
    matiere: "Lin lavé, 100 % naturel",
    description:
      "Tissé en petite série puis lavé à l'eau pour un tombé souple. Il s'adoucit encore au fil des lavages.",
    image: plaid,
    stock: 8,
  },
  {
    id: 3,
    slug: "plateau-chene",
    nom: "Plateau Chêne",
    prix: 42,
    categorie: "bois",
    artisan: "Bois & Sens",
    matiere: "Chêne massif, sangle en cuir",
    description:
      "Découpé dans une seule pièce de chêne et huilé à la cire d'abeille. La sangle en cuir permet de l'accrocher au mur.",
    image: plateau,
    stock: 5,
  },
  {
    id: 4,
    slug: "lampe-argile",
    nom: "Lampe Argile",
    prix: 96,
    categorie: "lumiere",
    artisan: "Studio Lumen",
    matiere: "Céramique, abat-jour en lin",
    description:
      "Un pied en céramique tourné main et un abat-jour en lin écru qui diffuse une lumière chaude et tamisée.",
    image: lampe,
    stock: 4,
    nouveaute: true,
  },
  {
    id: 5,
    slug: "bol-sauge",
    nom: "Bol Sauge",
    prix: 32,
    categorie: "ceramique",
    artisan: "Atelier Ligne",
    matiere: "Grès, émail sauge brillant",
    description:
      "Un bol généreux à l'émail vert doux, pensé pour le petit-déjeuner comme pour le service. Passe au lave-vaisselle.",
    image: bol,
    stock: 15,
  },
  {
    id: 6,
    slug: "serviettes-teinture-vegetale",
    nom: "Serviettes Teinture Végétale",
    prix: 38,
    categorie: "textile",
    artisan: "Maison Fil",
    matiere: "Lin teint à la garance et à l'indigo",
    description:
      "Un jeu de quatre serviettes teintes à la main avec des pigments végétaux. Les nuances varient d'un bain à l'autre.",
    image: serviettes,
    stock: 9,
  },
];

export function produitDemoParSlug(slug: string): Produit {
  return produitsDemo.find((p) => p.slug === slug) ?? produitsDemo[0]!;
}
