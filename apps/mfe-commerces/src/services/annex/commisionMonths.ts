import { API_URL_ANEX, BASE_URL } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";

const ENDPOINT = `${BASE_URL}${API_URL_ANEX}getAllCommisionMonths.json`;

export type CommissionMonthOption = {
  value: string;
  label: string;
};

export type CommissionMonthsJson = {
  msiMonth?: Array<{ value?: string; label?: string }>;
};

const isOption = (x: unknown): x is CommissionMonthOption =>
  x != null &&
  typeof x === "object" &&
  typeof (x as CommissionMonthOption).value === "string" &&
  typeof (x as CommissionMonthOption).label === "string";

/** Opciones seleccionables (excluye placeholder con value vacío). */
export const getAllCommissionMonths = async (): Promise<CommissionMonthOption[]> => {
  const { data } = await axiosClient.get<CommissionMonthsJson>(ENDPOINT);
  const raw = data?.msiMonth ?? [];
  return raw
    .filter(isOption)
    .filter((o) => o.value.trim() !== "")
    .map((o) => ({ value: o.value, label: o.label }));
};
