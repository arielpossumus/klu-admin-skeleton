# @klu/host

Shell principal del admin de KLU. Esta app orquesta la navegacion global, el layout compartido y la carga de microfrontends via Module Federation.

## Objetivo

`@klu/host` no implementa logica de dominio por feature. Su responsabilidad es:

- Definir rutas globales del producto.
- Renderizar layouts compartidos (sidebar, header y contenedores).
- Cargar cada MFE remoto (`mfe-login`, `mfe-dashboard`, `mfe-pos-health`, `mfe-corporate`, `mfe-commerces`).
- Proveer contexto transversal (React Query, toaster, estilos base).

## Stack

- React 19 + TypeScript
- React Router 7
- Vite 7
- `@module-federation/vite`
- Tailwind CSS v4 + `@klu/ui-kit`
- TanStack Query

## Puertos y remotos (desarrollo)

| App | Puerto | Remote key |
|---|---:|---|
| `@klu/host` | `5000` | `host` |
| `@klu/mfe-login` | `5001` | `mfe_login` |
| `@klu/mfe-pos-health` | `5002` | `mfe_pos_health` |
| `@klu/mfe-corporate` | `5003` | `mfe_corporate` |
| `@klu/mfe-commerces` | `5004` | `mfe_commerces` |
| `@klu/mfe-dashboard` | `5005` | `mfe_dashboard` |

En `vite.config.ts` del host, los remotos se resuelven con `http://localhost:<puerto>/remoteEntry.js`.

## Shared singletons (Federation)

Para evitar multiples instancias de contexto, el host comparte como singleton:

- `react`
- `react-dom`
- `react-router`
- `@tanstack/react-query`
- `@tanstack/react-table`

## Rutas principales del shell

| Ruta | MFE |
|---|---|
| `/` | `mfe_login` |
| `/dashboard/*` | `mfe_dashboard` |
| `/pos-health/*` | `mfe_pos_health` |
| `/corporate/*` | `mfe_corporate` |
| `/commerces/*` | `mfe_commerces` |

> Nota: algunas subrutas especificas dependen de la configuracion interna de cada remoto.

## Layouts

- `AdminLayout`: sidebar + header.
- `AdminLayoutNoHeader`: sidebar + barra superior minima (sin header completo).
- Login entra por `/` sin layout administrativo completo.

## Fallback de carga de MFEs

Los remotos se cargan con `React.lazy` + `Suspense`.
Mientras carga una seccion, se muestra un fallback full-screen con spinner centrado.

## Estructura relevante

```txt
apps/host/
├── index.html
├── package.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── index.css
│   ├── router/
│   │   ├── AppRouter.tsx
│   │   └── Routes.ts
│   ├── pages/microfrontends/
│   │   └── MfRemotePages.tsx
│   ├── layouts/
│   │   ├── AdminLayout.tsx
│   │   └── AdminLayoutNoHeader.tsx
│   ├── components/layout/
│   │   ├── AppSidebar.tsx
│   │   ├── Header.tsx
│   │   └── NavUser.tsx
│   └── config/
│       └── navigation.ts
```

## Scripts del paquete

```bash
pnpm --filter @klu/host dev
pnpm --filter @klu/host dev -- --mode localdev
pnpm --filter @klu/host dev -- --mode develop
pnpm --filter @klu/host dev -- --mode staging
pnpm --filter @klu/host build
pnpm --filter @klu/host preview
```

## Flujo recomendado en local

En la raiz del monorepo:

```bash
# Terminal 1: remotos
pnpm dev:mf:remotes

# Terminal 2: host
pnpm dev:mf:host
```

Abrir `http://localhost:5000`.

## Variables de entorno

- El host usa `envDir` apuntando a la raiz del repo (`../..`).
- Los archivos `.env.*` viven en la raiz del monorepo.
- Usar prefijo `VITE_` para exponer variables al cliente.

## Convenciones de arquitectura

- El host no debe concentrar servicios de dominio (`services/`) ni logica de negocio de cada modulo.
- Cada feature/API vive en su MFE.
- UI base compartida se consume desde `@klu/ui-kit`.

## Troubleshooting

### Pantalla en blanco o remoto no carga

- Verificar que el remoto correspondiente este levantado en su puerto.
- Confirmar que `remoteEntry.js` responde en el navegador.

### Errores de contexto React/Query/Router

- Revisar que dependencias compartidas sigan como `singleton` en host/remotos.

### Diferencias visuales entre navegacion interna y refresh

- Revisar carga de estilos del remoto (ejemplo: `import "mfe_login/LoginStyles"` en `main.tsx` del host).

## Relacion con otros README

- Monorepo: `README.md` (raiz)
- Apps overview: `apps/README.md`
- Login: `apps/mfe-login/README.md`
