import { API_URL_ANEX, BASE_URL } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";

export type PropertyTypeItem = {
  propertyTypeId: number;
  propertyTypeName: string;
};

const ENDPOINT = `${BASE_URL}${API_URL_ANEX}getAllPropertyTypes.json`;

export const propertyTypeService = {
  getAll: async (): Promise<PropertyTypeItem[]> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT, {
      params: { _: Date.now() },
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    });
    return ensurePropertyTypeArray(data);
  },
};

function ensurePropertyTypeArray(raw: unknown): PropertyTypeItem[] {
  const arr = Array.isArray(raw) ? raw : [];
  return arr.map(normalize).filter(Boolean) as PropertyTypeItem[];
}

function normalize(x: unknown): PropertyTypeItem | null {
  if (x == null || typeof x !== "object") return null;
  const o = x as Record<string, unknown>;
  const id = o.propertyTypeId ?? o.propertytypeid;
  const name = o.propertyTypeName ?? o.propertytypename;
  if (name == null || String(name).trim() === "") return null;
  const numId = typeof id === "number" ? id : Number(id);
  if (Number.isNaN(numId)) return null;
  return { propertyTypeId: numId, propertyTypeName: String(name).trim() };
}
