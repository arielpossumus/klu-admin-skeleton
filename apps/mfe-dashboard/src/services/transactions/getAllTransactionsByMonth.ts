import { BASE_URL, TRANSACTIONS_API } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import { normalizeMovementsResponse } from "@/services/transactions/normalizeMovementsResponse";
import type { MovementsResponse } from "@/types/dashboard/movementsChart";

/** Nombre del mock en host: `getAllTransactionByMonth.json` (singular Transaction). */
const ENDPOINT = `${BASE_URL}${TRANSACTIONS_API}getAllTransactionByMonth.json`;

export const getAllTransactionsByMonth = async (): Promise<MovementsResponse> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return normalizeMovementsResponse(data);
};
