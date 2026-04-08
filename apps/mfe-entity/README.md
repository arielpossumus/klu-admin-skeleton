# @klu/mfe-entity

Microfrontend **Entity**: agrupa el dominio **corporativo** y **comercios físicos** (antes `mfe-corporate` y `mfe-commerces`) en un solo remoto de Module Federation.

## Contenido

| Área | Rutas en el shell (`apps/host`) | Páginas principales |
|------|----------------------------------|---------------------|
| Corporativo | `/corporate`, `/corporate/add-corporate`, `/corporate/:corporateId` | `CorporateListPage`, `AddCorporate`, `CorporateDetailPage` |
| Comercios físicos | `/commerces/physical`, `/commerces/physical/:idCommerce` | `CommerceListPage`, `CommerceDetailPage` |

## Puerto y Federation

| Concepto | Valor |
|----------|--------|
| Paquete | `@klu/mfe-entity` |
| Puerto dev | `5003` |
| Nombre remoto | `mfe_entity` |
| Entry | `http://localhost:5003/remoteEntry.js` |
| Expone | `./RemoteApp` → `src/exposes/RemoteApp.tsx` |

El **host** declara el remoto `mfe_entity` en `apps/host/vite.config.ts`, carga con `lazy(() => import("mfe_entity/RemoteApp"))` en `MfRemotePages` (`MfEntityPage`) y enruta `/corporate/*` y `/commerces/*` al mismo remoto.

## Variables de entorno

Archivos en esta carpeta: `.env.localdev`, `.env.develop`, `.env.staging` (`envDir` de Vite = directorio del MFE).

| Variable | Uso |
|----------|-----|
| `VITE_ENVIRONMENT` | Etiqueta de entorno |
| `VITE_BASE_URL` | Base para Axios (ej. `/mockups/` en local) |
| `VITE_API_URL_ANEX` | Segmento annex |
| `VITE_API_URL_CORPORATE` | Segmento corporates |
| `VITE_API_URL_COMMERCES` | Segmento commerces |

## Desarrollo standalone

```bash
pnpm --filter @klu/mfe-entity dev
```

Abrir [http://localhost:5003](http://localhost:5003). Rutas útiles en aislamiento: `/`, `/corporate`, `/physical` (listado comercios), etc., según `RemoteApp.tsx`.

Para **mocks** de comercios que viven bajo `apps/host/public/mockups`, levantar el host en `:5000` o usar el `proxy` `/mockups` → `http://localhost:5000` definido en `vite.config.ts`.

## Build

```bash
pnpm --filter @klu/mfe-entity build
pnpm --filter @klu/mfe-entity preview
```

## Repo propio (multi-repo)

Este paquete está pensado para vivir en un **repositorio independiente** (junto con su `package.json`, `pnpm-workspace` mínimo o consumo del `ui-kit` publicado). El **shell** vive en otro repo; en `vite.config.ts` del host la `entry` del remoto apunta a la URL desplegada de `mfe-entity` en cada entorno.

## Estructura (`src/`)

- `exposes/RemoteApp.tsx` — rutas absolutas para shell + rutas cortas para dev en puerto 5003
- `pages/` — listados y detalles corporate y commerce
- `components/forms/` — formularios corporate (`edit/`) y commerce (`commerce/`)
- `services/` — `axiosClient`, `corporate/`, `commerces/`, `annex/`
- `types/`, `config/constants.ts`
