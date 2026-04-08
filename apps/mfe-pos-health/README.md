# @klu/mfe-pos-health

Microfrontend (MFE) del módulo **POS Health** de KLU: grilla de dispositivos con filtros, filas expandibles (batería, impresora, conexión) y vista de detalle por serial. Se consume desde el `host` bajo `/pos-health/*`.

## Objetivo

- Monitorear el estado operativo de terminales POS (listado + detalle).
- Combinar datos de dispositivo con mocks/anexos (marcas POS, corporativos, etc.) según el entorno.
- Mantener servicios, tipos y tablas del dominio en este paquete.

## Stack

- React 19 + TypeScript
- React Router 7
- TanStack Query + TanStack Table
- Axios
- React Hook Form
- Tailwind CSS v4 + `@klu/ui-kit`
- Vite 7 + `@module-federation/vite`

## Module Federation

| Propiedad | Valor |
|-----------|--------|
| Nombre remoto | `mfe_pos_health` |
| Puerto dev | `5002` |
| `remoteEntry` | `http://localhost:5002/remoteEntry.js` |
| Expose | `./RemoteApp` → `src/exposes/RemoteApp.tsx` |

### Shared singleton

- `react`, `react-dom`, `react-router`
- `@tanstack/react-query`
- `@tanstack/react-table`

## Integración con el host

El shell `@klu/host`:

- declara el remoto `mfe_pos_health` en `apps/host/vite.config.ts`,
- lo carga con `lazy(() => import("mfe_pos_health/RemoteApp"))` en `MfRemotePages`,
- enruta en `/pos-health/*` con layout `AdminLayout` (sidebar + header).

## Rutas internas

En integración típica con el host:

| URL (host) | Vista |
|------------|--------|
| `/pos-health` | Listado (`PosHealthListPage`) |
| `/pos-health/:serialId` | Detalle (`PosHealthDetailPage`) |

`RemoteApp` también define rutas sin prefijo (`/`, `/:serialId`) y con prefijo `/pos-health/...` para alinear el mismo comportamiento en desarrollo **standalone** (puerto 5002).

## Ejecución local

Desde la raíz del monorepo:

```bash
pnpm --filter @klu/mfe-pos-health dev
```

Ecosistema completo (recomendado):

```bash
pnpm dev:mf:remotes
pnpm dev:mf:host
```

- Standalone: `http://localhost:5002`
- Integrado: `http://localhost:5000/pos-health`

## Scripts del paquete

```bash
pnpm --filter @klu/mfe-pos-health dev
pnpm --filter @klu/mfe-pos-health build
pnpm --filter @klu/mfe-pos-health preview
```

## Estructura relevante

```txt
apps/mfe-pos-health/
├── package.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── index.css
│   ├── exposes/
│   │   └── RemoteApp.tsx
│   ├── pages/
│   │   ├── PosHealthListPage.tsx
│   │   └── PosHealthDetailPage.tsx
│   ├── components/
│   │   ├── tables/posHealth/
│   │   ├── charts/
│   │   └── loaders/
│   ├── services/
│   │   ├── axiosClient.ts
│   │   └── posHealt/          # servicios POS (nombre de carpeta actual)
│   ├── mockups/
│   ├── types/
│   │   ├── device/
│   │   ├── corporate/
│   │   └── filters/
│   └── config/
│       └── constants.ts
```

## Datos y API

- Cliente HTTP: `src/services/axiosClient.ts` (`baseURL` = `import.meta.env.BASE_URL`).
- Constantes: `src/config/constants.ts` (`VITE_BASE_URL`, `VITE_API_URL_ANEX`, `VITE_ENVIRONMENT`). Por defecto el base apunta a `/mockups/` en desarrollo.
- El listado combina JSON de `src/mockups/` (dispositivos, batería, impresora, conexiones, corporativos) y servicios como `getAllPosBrands` para catálogos.

## UI

- Tabla principal con filas expandibles y secciones de detalle (batería, impresora, WiFi/conexión, etc.).
- Componentes reutilizables del ui-kit (`DataTable`, `CustomCollapsibleCard`, tipografías, etc.).

## Variables de entorno

`vite.config.ts` usa `envDir` apuntando a la **raíz del monorepo** (`../..`). Variables con prefijo `VITE_*` en `.env.*` de la raíz.

## Build

```bash
pnpm --filter @klu/mfe-pos-health build
```

Salida: `remoteEntry.js` + assets para el host.

## Troubleshooting

### El módulo no carga en el host

- Verificar que el remoto esté en `5002` y que `http://localhost:5002/remoteEntry.js` responda.

### Errores de contexto React Query / Table / Router

- Confirmar singletons compartidos entre host y remoto en la config de Federation.

### Datos vacíos o errores al filtrar

- Revisar `VITE_BASE_URL` y archivos bajo `src/mockups/`.

## Relación con otros README

- Shell: [`../host/README.md`](../host/README.md)
- Entity (corporativo + comercios): [`../mfe-entity/README.md`](../mfe-entity/README.md)
- Vista general apps: [`../README.md`](../README.md)
