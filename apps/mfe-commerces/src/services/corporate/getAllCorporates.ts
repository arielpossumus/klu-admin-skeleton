import { BASE_URL } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type { CorporateGrid } from "@/types/corporate/CorporateGrid";

export type GetAllCorporatesResponse = {
  status?: boolean;
  message?: string;
  total?: number;
  rows?: CorporateGrid[];
  objectList?: unknown;
};

const ENDPOINT = `${BASE_URL}corporates/getAllCorporates.json`;

export const getAllCorporates = async (): Promise<CorporateGrid[]> => {
  const { data } = await axiosClient.get<GetAllCorporatesResponse>(ENDPOINT);
  return Array.isArray(data?.rows) ? data.rows : [];
};
