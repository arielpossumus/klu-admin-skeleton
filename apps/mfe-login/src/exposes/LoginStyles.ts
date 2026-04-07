/**
 * Entrada solo para efecto lateral: mantiene los estilos del login cargados en el host.
 * Evita que Vite retire el CSS del chunk al desmontar el remoto lazy y que al volver a "/"
 * falten utilidades (p. ej. lg:grid-cols-2, columna splash).
 */
import "@/index.css";
