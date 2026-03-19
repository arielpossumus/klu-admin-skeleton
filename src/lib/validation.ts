/** Patrón para validar formato de correo electrónico. */
export const EMAIL_PATTERN =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/** Opciones de validación para campos email en react-hook-form. */
export const emailValidation = {
    pattern: {
        value: EMAIL_PATTERN,
        message: "Ingrese un correo electrónico válido",
    },
};

/** Cantidad mínima de caracteres para validación "superior a 4". */
const MIN_LENGTH_MORE_THAN_4 = 5;

/**
 * Indica si el texto tiene más de 4 caracteres.
 * @param value - Texto a validar (se convierte a string; null/undefined se consideran vacíos).
 * @returns true si tiene más de 4 caracteres, false en caso contrario.
 */
export function isMoreThan4Characters(value: string | null | undefined): boolean {
    return String(value ?? "").trim().length > 4;
}

/** Opciones de validación para react-hook-form: mínimo 5 caracteres (más de 4). */
export const moreThan4CharactersValidation = {
    minLength: {
        value: MIN_LENGTH_MORE_THAN_4,
        message: "Debe tener más de 4 caracteres",
    },
};
