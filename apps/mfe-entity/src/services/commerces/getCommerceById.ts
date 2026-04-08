import { API_URL_COMMERCES, BASE_URL } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type {
  AllCommercesGridApiRow,
  CommerceByIdResponse,
} from "@/types/commerce/CommerceList";

const ENDPOINT = `${BASE_URL}${API_URL_COMMERCES}commerceById.json`;

export const getCommerceById = async (
  businessId: number
): Promise<AllCommercesGridApiRow | undefined> => {
  const { data } = await axiosClient.get<CommerceByIdResponse>(ENDPOINT);
  const row = data?.data_response;
  if (!row || row.businessId !== businessId) {
    return undefined;
  }
  return row;
};
