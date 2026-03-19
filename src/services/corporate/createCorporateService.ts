import { BASE_URL, API_URL_CORPORATE } from "@/config/constants";
import { axiosClient } from "@/services/axiosClient";
import type { AddCorporateFormValues } from "@/types/corporate/addCorporate";

const CREATE_ENDPOINT = `${BASE_URL}${API_URL_CORPORATE}create`;

/**
 * Crea un corporativo con los datos del formulario.
 * @throws Error o AxiosError en caso de fallo de red o respuesta de error.
 */
export async function createCorporate(data: AddCorporateFormValues): Promise<void> {
    await axiosClient.post(CREATE_ENDPOINT, data);
}
