import { API_URL_COMMERCES, BASE_URL } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type {
  AllCommercesGridApiRow,
  AllCommercesGridListResponse,
} from "@/types/commerce/CommerceList";

const ENDPOINT = `${BASE_URL}${API_URL_COMMERCES}allCommerces.json`;

export const getAllCommerces = async (): Promise<AllCommercesGridApiRow[]> => {
  const { data } = await axiosClient.get<AllCommercesGridListResponse>(ENDPOINT);
  return Array.isArray(data?.rows) ? data.rows : [];
};
