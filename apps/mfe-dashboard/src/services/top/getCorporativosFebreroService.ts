import { BASE_URL, DASHBOARD_API, DASHBOARD_TOP_API } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import { normalizeTopCorporativosResponse } from "@/services/top/normalizeTopCorporativosResponse";
import type { TopResponse } from "@/types/dashboard/topCorporativosChart";

const ENDPOINT = `${BASE_URL}${DASHBOARD_API}${DASHBOARD_TOP_API}getlAllTopCorporativosFebrero.json`;

export const getCorporativosFebrero = async (): Promise<TopResponse> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return normalizeTopCorporativosResponse(data);
};
