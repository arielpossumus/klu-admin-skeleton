# @klu/mfe-corporate

Microfrontend (MFE) del módulo **Corporativo** de KLU: listado de corporativos, alta por pasos y ficha de detalle con tabs y formularios. Se consume desde el `host` bajo `/corporate/*`.

## Objetivo

- Gestionar el ciclo de vida de corporativos en el admin.
- Exponer tablas con filtros (TanStack Table), formularios (React Hook Form) y datos auxiliares (anexos: países, modelos, canales, etc.).
- Centralizar servicios y tipos del dominio en este paquete (no en el shell).

## Stack

- React 19 + TypeScript
- React Router 7
- TanStack Query + TanStack Table
- Axios
- React Hook Form
- Sonner (toasts)
- Tailwind CSS v4 + `@klu/ui-kit`
- Vite 7 + `@module-federation/vite`

## Module Federation

| Propiedad | Valor |
|-----------|--------|
| Nombre remoto | `mfe_corporate` |
| Puerto dev | `5003` |
| `remoteEntry` | `http://localhost:5003/remoteEntry.js` |
| Expose | `./RemoteApp` → `src/exposes/RemoteApp.tsx` |

### Shared singleton

- `react`, `react-dom`, `react-router`
- `@tanstack/react-query`
- `@tanstack/react-table`

## Integración con el host

El shell `@klu/host`:
- declara el remoto `mfe_corporate` en `apps/host/vite.config.ts`,
- lo carga con `lazy(() => import("mfe_corporate/RemoteApp"))` en `MfRemotePages`,
- enruta en `/corporate/*` con layout `AdminLayout` (sidebar + header).

## Rutas internas

`RemoteApp` define rutas relativas al prefijo donde monte el host. En integración típica con el host:

| URL (host) | Vista |
|------------|--------|
| `/corporate` | Listado (`CorporateListPage`) |
| `/corporate/add-corporate` | Alta (`AddCorporate`) |
| `/corporate/:corporateId` | Detalle (`CorporateDetailPage`) |

Para desarrollo **standalone** del MFE (puerto 5003), también existen rutas equivalentes sin prefijo (`/`, `/add-corporate`, `/:corporateId`) y duplicadas con prefijo `/corporate/...` para alinear el mismo árbol que en el shell.

## Ejecución local

Desde la raíz del monorepo:

```bash
pnpm --filter @klu/mfe-corporate dev
```

Ecosistema completo (recomendado):

```bash
pnpm dev:mf:remotes
pnpm dev:mf:host
```

- Standalone: `http://localhost:5003`
- Integrado: `http://localhost:5000/corporate`

## Scripts del paquete

```bash
pnpm --filter @klu/mfe-corporate dev
pnpm --filter @klu/mfe-corporate build
pnpm --filter @klu/mfe-corporate preview
```

## Estructura relevante

```txt
apps/mfe-corporate/
├── package.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── index.css
│   ├── exposes/
│   │   └── RemoteApp.tsx
│   ├── pages/
│   │   ├── CorporateListPage.tsx
│   │   ├── CorporateDetailPage.tsx
│   │   └── corporate/
│   │       ├── AddCorporate.tsx
│   │       └── add/          # pasos del alta
│   ├── components/
│   │   ├── tables/
│   │   ├── forms/
│   │   └── loaders/
│   ├── services/
│   │   ├── axiosClient.ts
│   │   ├── corporate/
│   │   ├── commerces/
│   │   └── annex/
│   ├── mockups/
│   ├── types/
│   │   ├── corporate/
│   │   ├── commerce/
│   │   └── filters/
│   └── config/
│       └── constants.ts
```

## Datos y API

- Cliente HTTP: `src/services/axiosClient.ts` (`baseURL` = `import.meta.env.BASE_URL` en dev).
- Constantes de entorno y segmentos de API: `src/config/constants.ts` (`VITE_BASE_URL`, `VITE_API_URL_ANEX`, `VITE_API_URL_CORPORATE`, `VITE_API_URL_COMMERCES`, `VITE_ENVIRONMENT`).
- En desarrollo por defecto se apunta a mocks bajo `/mockups/` cuando no hay configuración.
- Servicios por dominio: `corporate/`, `commerces/`, `annex/` (catálogos auxiliares).

## UI y UX

- Tablas con `@tanstack/react-table` y componentes Shadcn del ui-kit (`DataTable`, `Card`, etc.).
- Formularios con React Hook Form y validación en `lib/validation.ts` donde aplique.
- Toasts con `sonner` (`AddCorporate` y flujos relacionados).

## Variables de entorno

`vite.config.ts` usa `envDir` apuntando a la **raíz del monorepo** (`../..`). Definir variables en `.env.*` de la raíz con prefijo `VITE_`.

Ver `src/config/constants.ts` para nombres y valores por defecto.

## Build

```bash
pnpm --filter @klu/mfe-corporate build
```

Salida: `remoteEntry.js` + assets para consumo por el host.

## Troubleshooting

### El módulo no carga en el host

- Comprobar que el remoto esté en marcha en `5003` y que `http://localhost:5003/remoteEntry.js` responda.

### Errores de contexto React Query o Router

- Verificar que `react`, `react-dom`, `react-router` y `@tanstack/react-query` / `@tanstack/react-table` sigan como `singleton` en host y remoto.

### 404 en mocks o datos vacíos

- Revisar `VITE_BASE_URL` y que existan `src/mockups/**` o `public/mockups/**` según cómo se resuelva la URL en el entorno.

## Relación con otros README

- Shell: [`../host/README.md`](../host/README.md)
- Dashboard: [`../mfe-dashboard/README.md`](../mfe-dashboard/README.md)
- Vista general apps: [`../README.md`](../README.md)
