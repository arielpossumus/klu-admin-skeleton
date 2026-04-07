import { BASE_URL, TRANSACTIONS_API } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import { normalizeMovementsResponse } from "@/services/transactions/normalizeMovementsResponse";
import type { MovementsResponse } from "@/types/dashboard/movementsChart";

const ENDPOINT = `${BASE_URL}${TRANSACTIONS_API}getAllTransactionsByYear.json`;

export const getAllTransactionsByYear = async (): Promise<MovementsResponse> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return normalizeMovementsResponse(data);
};
