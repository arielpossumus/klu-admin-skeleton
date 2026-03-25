import { API_URL_ANEX, BASE_URL } from "@/config/constants.ts";
import { axiosClient } from "@/services/axiosClient";

export type RegionItem = { regionId: number; regionName: string };

export type CountryItem = {
    countryId: number;
    countryCode: string;
    countryName: string;
    regions: RegionItem[];
};

const ENDPOINT = `${BASE_URL}${API_URL_ANEX}getAllcountries.json`;

export const countriesService = {
    getAll: async (): Promise<CountryItem[]> => {
        const { data } = await axiosClient.get<unknown>(ENDPOINT, {
            params: { _: Date.now() },
            headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
        });
        return ensureCountriesArray(data);
    },
};

function ensureCountriesArray(raw: unknown): CountryItem[] {
    const arr = Array.isArray(raw) ? raw : [];
    return arr.map(normalize).filter(Boolean) as CountryItem[];
}

function normalize(x: unknown): CountryItem | null {
    if (x == null || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    const countryId = o.countryId ?? o.countryid;
    const countryName = o.countryName ?? o.countryname;
    if (countryName == null || String(countryName).trim() === "") return null;
    const id = typeof countryId === "number" ? countryId : Number(countryId);
    if (Number.isNaN(id)) return null;
    const regions = Array.isArray(o.regions)
        ? (o.regions as unknown[]).map(normalizeRegion).filter(Boolean)
        : [];
    return {
        countryId: id,
        countryCode: String(o.countryCode ?? o.countrycode ?? ""),
        countryName: String(countryName).trim(),
        regions: regions as RegionItem[],
    };
}

function normalizeRegion(x: unknown): RegionItem | null {
    if (x == null || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    const id = o.regionId ?? o.regionid;
    const name = o.regionName ?? o.regionname;
    if (name == null || String(name).trim() === "") return null;
    const numId = typeof id === "number" ? id : Number(id);
    if (Number.isNaN(numId)) return null;
    return { regionId: numId, regionName: String(name).trim() };
}
