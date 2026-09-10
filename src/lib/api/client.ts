import { API_BASE_URL, API_TIMEOUT_MS } from "./config";

export type SourceDonnees = "backend" | "demo";

export type Resultat<T> = {
  data: T;
  source: SourceDonnees;
};

/** Appel HTTP brut vers Django. Lève une erreur si la réponse n'est pas OK. */
export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Django a répondu ${response.status} sur ${path}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Appelle Django et, UNIQUEMENT si l'appel échoue (backend absent, erreur
 * réseau, timeout), retourne les données fictives de démonstration.
 */
export async function apiRequestAvecSecours<T>(
  path: string,
  secours: () => T,
  init?: RequestInit,
): Promise<Resultat<T>> {
  try {
    const data = await apiRequest<T>(path, init);
    return { data, source: "backend" };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.info(`[api] repli sur les données de démonstration pour ${path}`, error);
    }
    return { data: secours(), source: "demo" };
  }
}
