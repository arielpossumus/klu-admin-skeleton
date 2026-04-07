# @klu/mfe-dashboard

Microfrontend (MFE) del Dashboard de KLU. Expone la pantalla de resumen operativo y financiero consumida por el `host` en `/dashboard/*`.

## Objetivo

`@klu/mfe-dashboard` concentra la experiencia inicial del usuario logueado:

- Resumen de saldos y cuenta.
- Alertas y cotizaciones.
- Evolucion de transacciones.
- Incidentes POS Health.
- Top corporativos y porcentaje de aceptacion.
- Listados compactos de usuarios recientes y ultimas transacciones.

## Stack

- React 19 + TypeScript
- React Router 7
- TanStack Query
- Axios
- Recharts
- Tailwind CSS v4 + `@klu/ui-kit`
- Vite 7 + `@module-federation/vite`

## Module Federation

| Propiedad | Valor |
|---|---|
| Nombre remoto | `mfe_dashboard` |
| Puerto dev | `5005` |
| `remoteEntry` | `http://localhost:5005/remoteEntry.js` |
| Expose | `./RemoteApp` -> `src/exposes/RemoteApp.tsx` |

### Shared singleton

- `react`
- `react-dom`
- `react-router`
- `@tanstack/react-query`

## Integracion con host

El shell `@klu/host`:

- declara el remoto `mfe_dashboard` en `apps/host/vite.config.ts`,
- lo carga con `lazy(() => import("mfe_dashboard/RemoteApp"))` en `MfRemotePages`,
- y lo enruta bajo `/dashboard/*`.

## Ejecucion local

Desde la raiz del monorepo:

```bash
# solo dashboard
pnpm --filter @klu/mfe-dashboard dev

# ecosistema completo recomendado
pnpm dev:mf:remotes
pnpm dev:mf:host
```

Standalone del MFE: `http://localhost:5005`  
Integrado desde host: `http://localhost:5000/dashboard`

## Scripts del paquete

```bash
pnpm --filter @klu/mfe-dashboard dev
pnpm --filter @klu/mfe-dashboard build
pnpm --filter @klu/mfe-dashboard preview
```

## Estructura relevante

```txt
apps/mfe-dashboard/
├── package.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── index.css
│   ├── exposes/
│   │   └── RemoteApp.tsx
│   ├── pages/
│   │   └── DashboardPage.tsx
│   ├── components/
│   │   ├── bento/
│   │   ├── charts/
│   │   └── loaders/
│   ├── services/
│   │   ├── axiosClient.ts
│   │   ├── accounts/
│   │   ├── alerts/
│   │   ├── annex/
│   │   ├── transactions/
│   │   └── users/
│   ├── mockups/
│   │   ├── accounts/
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   └── users/
│   ├── types/
│   └── config/
```

## Flujo de render

1. `main.tsx` inicializa `QueryClientProvider` y `BrowserRouter`.
2. `RemoteApp` monta `DashboardPage`.
3. `DashboardPage` arma el mosaico principal (`BentoPanel` + componentes bento/charts).
4. Los componentes consultan servicios via React Query.

## Datos y servicios

La app esta preparada para consumir API con Axios, pero hoy usa mayormente endpoints de mock (`/mockups/...`) para desarrollo.

- Cliente HTTP centralizado: `src/services/axiosClient.ts`.
- Servicios por dominio: `accounts`, `alerts`, `annex`, `transactions`, `users`.
- Tipos separados en `src/types`.

## Comportamiento actual del dashboard

- Cards y graficas se construyen a partir de JSON de `src/mockups`.
- `WelcomeDashboard` consulta usuario activo y permite cerrar sesion.
- `Cerrar sesion` hace `window.location.replace("/")` para volver al login con recarga completa del shell.
- Algunos CTA de “Ver ...” en paneles hoy estan en estado placeholder (ej. `console.log`) hasta definir navegacion final.

## Estilos y UI

- `src/index.css` importa `@klu/ui-kit/foundation.css`.
- El layout usa componentes de `@klu/ui-kit` (ej. `BentoPanel`, tipografias, componentes UI base).
- Mantener consistencia visual con tokens del tema y variantes existentes.

## Variables de entorno

- `vite.config.ts` define `envDir` en la raiz del monorepo (`../..`).
- `axiosClient` usa `import.meta.env.BASE_URL` como base.
- Si se agregan endpoints reales, definir `VITE_*` en `.env.*` de la raiz.

## Accesibilidad

- Componentes con `aria-label` en regiones de contenido principales.
- Iconos decorativos con `aria-hidden`.
- Fallbacks de carga y estados vacios/error visibles en paneles.

## Build

```bash
pnpm --filter @klu/mfe-dashboard build
```

Salida principal: `remoteEntry.js` + assets hasheados para consumo por el host.

## Troubleshooting

### El dashboard no carga en host

- Verificar que `mfe-dashboard` este corriendo en `5005`.
- Confirmar acceso a `http://localhost:5005/remoteEntry.js`.

### Error de contexto React Query o Router

- Revisar que `@tanstack/react-query` y `react-router` sigan compartidos como singleton en host y remoto.

### Datos vacios o errores en paneles

- Verificar existencia de archivos en `src/mockups`.
- Confirmar que el servicio correspondiente apunte al endpoint esperado.

## Relacion con otros README

- Shell: `apps/host/README.md`
- Login: `apps/mfe-login/README.md`
- Vista general apps: `apps/README.md`
