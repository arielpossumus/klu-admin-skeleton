import { API_URL_ANEX, BASE_URL } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";

export type FiidItem = { id: number; value: string };

const ENDPOINT = `${BASE_URL}${API_URL_ANEX}getAllFiid.json`;

export const fiidService = {
  getAll: async (): Promise<FiidItem[]> => {
    const { data } = await axiosClient.get<FiidItem[] | FiidItem>(ENDPOINT);
    return ensureFiidArray(data);
  },
};

function ensureFiidArray(raw: FiidItem[] | FiidItem): FiidItem[] {
  if (Array.isArray(raw)) return raw.filter(isFiidItem);
  return isFiidItem(raw) ? [raw] : [];
}

function isFiidItem(x: unknown): x is FiidItem {
  return (
    x != null &&
    typeof (x as FiidItem).id === "number" &&
    typeof (x as FiidItem).value === "string"
  );
}
