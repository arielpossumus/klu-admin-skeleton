/** SHA-256 del texto en hexadecimal minúsculas (64 caracteres), mismo formato que generadores estándar. */
export const sha256Hex = async (plain: string): Promise<string> => {
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(plain)
  );
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};
