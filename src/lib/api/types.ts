export type Produit = {
  id: number;
  slug: string;
  nom: string;
  prix: number;
  categorie: string;
  artisan: string;
  matiere: string;
  description: string;
  image: string;
  stock: number;
  nouveaute?: boolean;
};

export type Categorie = {
  slug: string;
  nom: string;
};
