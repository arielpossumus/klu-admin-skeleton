import { API_URL_ANEX, BASE_URL } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";

const ENDPOINT = `${BASE_URL}${API_URL_ANEX}getAllBanks.json`;

export type BankApiRow = {
  id?: number;
  name?: string;
};

export type BankOption = {
  value: string;
  label: string;
};

const isRow = (x: unknown): x is BankApiRow =>
  x != null &&
  typeof x === "object" &&
  (typeof (x as BankApiRow).id === "number" || typeof (x as BankApiRow).name === "string");

const normalizeRows = (data: unknown): BankApiRow[] => {
  if (Array.isArray(data)) return data.filter(isRow);
  if (data != null && typeof data === "object" && "banks" in data) {
    const raw = (data as { banks?: unknown }).banks;
    return Array.isArray(raw) ? raw.filter(isRow) : [];
  }
  return [];
};

/** Catálogo de bancos para depósitos (mock annex). `value` = id estable; `label` = nombre para mostrar y para alinear con `accountData.bankName`. */
export const getAllBanks = async (): Promise<BankOption[]> => {
  const { data } = await axiosClient.get<unknown>(ENDPOINT);
  return normalizeRows(data)
    .map((r) => {
      const label = (r.name ?? "").trim();
      if (!label) return null;
      const value = r.id != null && Number.isFinite(r.id) ? String(r.id) : label;
      return { value, label };
    })
    .filter((x): x is BankOption => x != null);
};
