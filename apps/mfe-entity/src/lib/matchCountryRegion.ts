import type { CountryItem } from "@/services/annex/countriesService";

const normalizeKey = (s: string): string =>
  s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, " ");

const namesMatch = (a: string, b: string): boolean => {
  const na = normalizeKey(a);
  const nb = normalizeKey(b);
  if (na === nb) return true;
  if (na.includes(nb) || nb.includes(na)) return true;
  return false;
};

/** Si `raw` ya es un id numérico, se devuelve tal cual; si no, se busca por nombre de país. */
export const resolveCountryIdForForm = (
  raw: string,
  countries: CountryItem[]
): string => {
  const t = raw?.trim() ?? "";
  if (!t) return "";
  if (/^\d+$/.test(t)) return t;
  const found = countries.find((c) => namesMatch(c.countryName, t));
  return found ? String(found.countryId) : "";
};

/** Resuelve región por id o por nombre dentro del país indicado (`countryId`). */
export const resolveRegionIdForForm = (
  raw: string,
  countryId: string,
  countries: CountryItem[]
): string => {
  const t = raw?.trim() ?? "";
  if (!t) return "";
  if (/^\d+$/.test(t)) return t;
  const country = countries.find((c) => String(c.countryId) === countryId);
  if (!country?.regions?.length) return "";
  const stripped = t.replace(/^estado\s+de\s+/i, "").trim();
  const candidates = [t, stripped].filter((x, i, arr) => arr.indexOf(x) === i);
  for (const candidate of candidates) {
    const found = country.regions.find((r) =>
      namesMatch(r.regionName, candidate)
    );
    if (found) return String(found.regionId);
  }
  return "";
};
