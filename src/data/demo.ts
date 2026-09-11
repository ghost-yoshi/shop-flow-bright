/**
 * DONNÉES FICTIVES — uniquement pour la prévisualisation.
 *
 * Ce fichier est la SEULE source de données de démonstration du projet.
 * Il n'est utilisé que si l'appel au backend Django échoue (voir
 * src/lib/api/client.ts → apiRequestAvecSecours).
 *
 * Contexte : Douala (Cameroun) — ateliers, matières et quartiers locaux.
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
    slug: "mug-terre-de-logbaba",
    nom: "Mug Terre de Logbaba",
    prix: 24,
    categorie: "ceramique",
    artisan: "Atelier Ndogpassi",
    matiere: "Grès de Logbaba, émail moucheté",
    description:
      "Tourné à la main à Ndogpassi, cuit à 1 280 °C. L'émail moucheté laisse apparaître le grain de la terre rouge : chaque mug est légèrement unique.",
    image: mug,
    stock: 12,
    nouveaute: true,
  },
  {
    id: 2,
    slug: "plaid-ndole-ecru",
    nom: "Plaid Ndolè Écru",
    prix: 58,
    categorie: "textile",
    artisan: "Maison Wouri",
    matiere: "Coton tissé main, teinture végétale",
    description:
      "Tissé en petite série à Bonabéri puis lavé pour un tombé souple. Parfait pour les soirées fraîches de la saison des pluies.",
    image: plaid,
    stock: 8,
  },
  {
    id: 3,
    slug: "plateau-iroko-debassa",
    nom: "Plateau Iroko Deïdo",
    prix: 42,
    categorie: "bois",
    artisan: "Bois du Wouri",
    matiere: "Iroko massif, sangle en cuir du Nord",
    description:
      "Découpé dans une seule pièce d'iroko et huilé à la cire d'abeille. La sangle en cuir permet de l'accrocher au mur de la cuisine.",
    image: plateau,
    stock: 5,
  },
  {
    id: 4,
    slug: "lampe-bonapriso",
    nom: "Lampe Bonapriso",
    prix: 96,
    categorie: "lumiere",
    artisan: "Studio Kamer Lumen",
    matiere: "Céramique, abat-jour en raphia tressé",
    description:
      "Un pied en céramique tourné main et un abat-jour en raphia qui diffuse une lumière chaude, comme un soir d'harmattan.",
    image: lampe,
    stock: 4,
    nouveaute: true,
  },
  {
    id: 5,
    slug: "bol-mangrove",
    nom: "Bol Mangrove",
    prix: 32,
    categorie: "ceramique",
    artisan: "Atelier Ndogpassi",
    matiere: "Grès, émail vert palétuvier brillant",
    description:
      "Un bol généreux à l'émail vert profond, pensé pour l'attiéké du déjeuner comme pour le service. Passe au lave-vaisselle.",
    image: bol,
    stock: 15,
  },
  {
    id: 6,
    slug: "serviettes-indigo-kribi",
    nom: "Serviettes Indigo de Kribi",
    prix: 38,
    categorie: "textile",
    artisan: "Maison Wouri",
    matiere: "Coton teint à l'indigo et au kola",
    description:
      "Un jeu de quatre serviettes teintes à la main avec des pigments naturels. Les nuances varient d'un bain à l'autre, comme la marée.",
    image: serviettes,
    stock: 9,
  },
];

export function produitDemoParSlug(slug: string): Produit {
  return produitsDemo.find((p) => p.slug === slug) ?? produitsDemo[0]!;
}
