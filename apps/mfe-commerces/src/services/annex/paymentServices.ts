import { API_URL_ANEX, BASE_URL } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";

const ENDPOINT = `${BASE_URL}${API_URL_ANEX}getAllPaymentTerms.json`;

export type PaymentTermOption = {
  value: string;
  label: string;
};

export type PaymentTermsJson = {
  terms?: Array<{ value?: string; label?: string }>;
};

const isSelectableOption = (x: unknown): x is PaymentTermOption =>
  x != null &&
  typeof x === "object" &&
  typeof (x as PaymentTermOption).value === "string" &&
  typeof (x as PaymentTermOption).label === "string" &&
  (x as PaymentTermOption).value.trim() !== "";

/** Opciones de plazo (1–10, etc.) para los desplegables de plazos de pago. */
export const getAllPaymentTerms = async (): Promise<PaymentTermOption[]> => {
  const { data } = await axiosClient.get<PaymentTermsJson>(ENDPOINT);
  const raw = data?.terms ?? [];
  return raw.filter(isSelectableOption).map((o) => ({ value: o.value, label: o.label }));
};
