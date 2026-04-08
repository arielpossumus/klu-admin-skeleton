# Microfrontends (esqueleto)

## Repositorios (separación del monorepo)

La arquitectura objetivo reparte el código en **varios repositorios**:

| Repo | Contenido |
|------|-----------|
| **1 — Shell / skeleton** | `apps/host` + `packages/*` (p. ej. `ui-kit`, `auth-session`). Sin carpetas `mfe-*`. |
| **2** | `mfe-login` |
| **3** | `mfe-dashboard` |
| **4** | `mfe-pos-health` |
| **5** | `mfe-entity` (corporativo + comercios físicos; reemplaza `mfe-corporate` y `mfe-commerces`) |

En este monorepo, durante la transición, pueden convivir shell, paquetes y MFEs; al extraer un repo, copiá la carpeta del MFE (o del host) junto con los `packages` que declare como dependencias workspace y ajustá `pnpm-workspace.yaml` y URLs de Federation en el host.

## Estructura

| Paquete | Puerto | Rol |
| -------- | ------ | --- |
| `@klu/host` | 5000 | App admin + shell Federation (`**pnpm dev` en la raíz** apunta acá) |
| `@klu/mfe-login` | 5001 | Pantalla de **Login** en `/` |
| `@klu/mfe-pos-health` | 5002 | Listado **POS Health** en `/pos-health` |
| `@klu/mfe-entity` | 5003 | **Corporativo** (`/corporate/*`) y **comercios físicos** (`/commerces/*`) |
| `@klu/mfe-dashboard` | 5005 | Home **Dashboard** en `/dashboard` |
| `@klu/ui-kit` | — | Shadcn, `text`, `**commons/`** (BentoPanel, CustomCard, …), `foundation.css`, `vite-aliases` |

La aplicación admin vive en `**apps/host**`.

### Rutas shell vs locales

| Ruta host | Contenido |
| --------- | --------- |
| `/` | Remoto `mfe_login` |
| `/dashboard` | Remoto `mfe_dashboard` |
| `/pos-health` | Remoto `mfe_pos_health` |
| `/pos-health/:serialId` | Remoto `mfe_pos_health` |
| `/corporate` | Remoto `mfe_entity` |
| `/corporate/add-corporate` | Remoto `mfe_entity` — alta |
| `/corporate/:corporateId` | Remoto `mfe_entity` — detalle |
| `/commerces/physical` | Remoto `mfe_entity` |
| `/commerces/physical/:idCommerce` | Remoto `mfe_entity` |

**Corporativo** y **comercios físicos** están en `apps/mfe-entity`. **POS Health** está en `apps/mfe-pos-health`. Los mocks bajo `apps/host/public/mockups/` se usan según `VITE_BASE_URL` en cada MFE.

### `@klu/ui-kit`

- `**commons/`**: componentes compartidos; opciones del donut de `DistributionListCard` viven en `commons/distributionChartConfig.ts`.
- Alias Vite/TS: `@/components/commons` → `packages/ui-kit/src/commons` (incluido en `vite-aliases.mjs`).

## Desarrollo

1. **Terminal A** — remotos: `pnpm dev:mf:remotes` (modo **develop**; variables en `apps/mfe-*/.env.develop`). Para mocks: `pnpm dev:mf:remotes:local` (`.env.localdev` por MFE). Staging: `pnpm stg:mf:remotes`.
2. **Terminal B** — host: `pnpm dev:mf:host` (mismo criterio de modo que los remotos) o `pnpm dev`
3. **[http://localhost:5000](http://localhost:5000)** — con remotos levantados, `/`, `/dashboard`, `/corporate`, `/pos-health` y `/commerces/physical` cargan los MFE.

En Federation, `react-router`, `@tanstack/react-query` y `@tanstack/react-table` van como `**shared` + `singleton: true`** en host y en los remotos que cargan listados con tabla/query.

### Shadcn CLI

Desde `**apps/host**`: `npx shadcn@latest add …`

## Hecho recientemente

- `**commons/**` movido a `@klu/ui-kit`; alias `@/components/commons` en host y MFE.
- Rutas reales del shell: `/`, `/dashboard`, `/corporate`, `/pos-health` y `/commerces/physical` cargan remotos.
- `mfe-corporate` y `mfe-commerces` unificados en **`@klu/mfe-entity`** (`mfe_entity`, puerto **5003**).
- `CorporateDetailPage` remoto completado con tabs/forms de edición.

## Próximos pasos

- Conectar autenticación real (hoy `mfe-login` sigue con flujo mock local).
- Evaluar limpieza final de páginas legacy del host que ya no son usadas por rutas del shell.

## Explicado simple (modo junior)

Pensalo como una casa:

- El `host` es el **pasillo principal** (shell): tiene el router global, layout y carga cada microfrontend.
- Cada `mfe-`* es una **habitación**: tiene su propia UI, páginas, servicios y mocks.
- `@klu/ui-kit` es la **caja de piezas compartidas**: botones, cards, tablas, textos y utilidades visuales.

`mfe-entity` agrupa dos “habitaciones” que antes eran remotos distintos (corporativo y comercios), para un solo despliegue y un solo `remoteEntry.js`.

## Cómo crear una nueva Seccion (ejemplo: Transacciones)

### 1) Crear el nuevo MFE

- Carpeta: `apps/mfe-transactions`
- Archivos base:
  - `package.json`
  - `vite.config.ts` (federation name: `mfe_transactions`, puerto sugerido `5006` — evitar **5003** reservado a `mfe_entity`)
  - `tsconfig.json`
  - `index.html`
  - `src/main.tsx`
  - `src/exposes/RemoteApp.tsx`

### 2) Implementar la pantalla/rutas internas del remoto

- Crear página, por ejemplo: `src/pages/TransactionsPage.tsx`.
- En `src/exposes/RemoteApp.tsx` usar `<Routes>` y exponer la ruta:
  - `/transactions`
  - (opcional) `/transactions/:id`

### 3) Mover dependencias del dominio

- Pasar al MFE lo que use la feature:
  - `src/components/`* específicos
  - `src/services/transactions/*`
  - `src/types/transactions/*`
  - mocks en `public/mockups/transactions/*`
- UI común siempre desde `@klu/ui-kit`.

### 4) Registrar remoto en host

- En `apps/host/vite.config.ts` agregar `mfe_transactions` en `remotes` con entry `http://localhost:5006/remoteEntry.js`.
- En `apps/host/src/vite-env.d.ts` declarar:
  - `declare module "mfe_transactions/RemoteApp" { ... }`
- En `apps/host/src/pages/microfrontends/MfRemotePages.tsx` crear `MfTransactionsPage` con `lazy(() => import("mfe_transactions/RemoteApp"))`.
- En `apps/host/src/router/Routes.ts` enrutar:
  - `/transactions` -> `MfTransactionsPage`

### 5) Compartidos de Federation

- Si usa data tables/query, confirmar en host y remoto:
  - `@tanstack/react-query` singleton
  - `@tanstack/react-table` singleton
- Mantener siempre:
  - `react`, `react-dom`, `react-router` como singleton.

### 6) Verificación

- Levantar remotos: `pnpm dev:mf:remotes`
- Levantar host: `pnpm dev:mf:host`
- Probar ruta en host: `http://localhost:5000/transactions`
- Build mínimo:
  - `pnpm --filter @klu/mfe-transactions build`
  - `pnpm --filter @klu/host build`
