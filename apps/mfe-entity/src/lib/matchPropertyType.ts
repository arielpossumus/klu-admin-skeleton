import type { PropertyTypeItem } from "@/services/annex/PropertiesTypeService";

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

/** Si `raw` ya es un id numérico, se devuelve tal cual; si no, se busca por nombre. */
export const resolvePropertyTypeIdForForm = (
  raw: string | undefined,
  items: PropertyTypeItem[]
): string => {
  const t = raw?.trim() ?? "";
  if (!t) return "";
  if (/^\d+$/.test(t)) return t;
  const found = items.find((r) => namesMatch(r.propertyTypeName, t));
  return found ? String(found.propertyTypeId) : "";
};
