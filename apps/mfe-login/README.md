# @klu/mfe-login

Microfrontend (MFE) de **inicio de sesión** para el sistema administrativo **KLU**. Se integra en el shell [`apps/host`](../host) vía **Module Federation** y muestra la pantalla de login en la ruta raíz `/`.

## Rol en el producto

- Punto de entrada visual del admin: marca KLU, formulario email/contraseña y flujo post-envío (loader y redirección).
- En modo integrado, el **host** carga este remoto de forma diferida (`lazy`) y lo monta sin layout lateral (a diferencia de módulos como dashboard o corporate).

## Stack

| Área | Tecnología |
|------|------------|
| UI | React 19, **@klu/ui-kit** (Shadcn / Radix / Tailwind v4) |
| Formularios | React Hook Form |
| Enrutado | React Router 7 (`react-router`) |
| Build | Vite 7, `@module-federation/vite` |
| Tipado | TypeScript |

Los componentes bajo `@/components/ui` se resuelven al **ui-kit** del monorepo mediante el alias configurado en `vite.config.ts` (`withAppRootAlias`).

## Module Federation

| Propiedad | Valor |
|-----------|--------|
| Nombre del remoto | `mfe_login` |
| Archivo expuesto | `remoteEntry.js` |
| Módulo público | `./RemoteApp` → `src/exposes/RemoteApp.tsx` |
| Puerto dev | `5001` |
| Origen dev | `http://localhost:5001` (CORS habilitado) |

**Dependencias compartidas (singleton)** con el host: `react`, `react-dom`, `react-router`. Evita múltiples instancias de React y mantiene el contexto de enrutado unificado.

## Integración con el host

El host declara el remoto en `apps/host/vite.config.ts` con entrada `http://localhost:5001/remoteEntry.js` en desarrollo.

- Carga: `lazy(() => import("mfe_login/RemoteApp"))` en `apps/host/src/pages/microfrontends/MfRemotePages.tsx` (`MfLoginPage`).
- Ruta: `/` en `apps/host/src/router/Routes.ts` → `MfLoginPage`.

Para desarrollo local del ecosistema completo, conviene levantar el host y los remotos; desde la raíz del monorepo:

```bash
pnpm dev:mf:host
```

En otra terminal (remotos en paralelo):

```bash
pnpm dev:mf:remotes
```

O solo este MFE:

```bash
pnpm --filter @klu/mfe-login dev
```

## Rutas internas

`RemoteApp` define rutas relativas al prefijo donde monte el host:

| Ruta interna | Vista |
|--------------|--------|
| `/` | Página de login (`pages/login/Index.tsx`) |

El contenedor raíz expone `data-mfe="login"` para identificación en DOM/tests.

## Estructura del código

```
apps/mfe-login/
├── index.html
├── vite.config.ts
├── src/
│   ├── main.tsx                 # Standalone: BrowserRouter + RemoteApp
│   ├── index.css                # foundation + Tailwind (@source ui-kit + local)
│   ├── exposes/
│   │   └── RemoteApp.tsx        # Entrada federada + Routes
│   ├── pages/
│   │   └── login/
│   │       └── Index.tsx        # Layout dos columnas (formulario + imagen)
│   ├── components/
│   │   ├── forms/
│   │   │   └── LoginForm.tsx    # Formulario y flujo de submit
│   │   └── loaders/
│   │       └── EmptyCardLoader.tsx
│   ├── types/
│   │   └── auth/
│   │       └── LoginFormValues.ts
│   ├── assets/                  # Logo e imagen splash
│   └── lib/                     # Utilidades (p. ej. cn)
```

No hay carpeta `services/` en este MFE todavía: el envío del login no llama a una API real en el código actual.

## Pantalla de login

- **Columna principal**: logo KLU, formulario en card (email, contraseña, enlace “¿Olvidaste tu contraseña?” — placeholder `href="#"`).
- **Columna lateral** (≥ `lg`): imagen de fondo con ajuste en modo oscuro.
- **Accesibilidad**: etiquetas asociadas a inputs, `aria-invalid` según errores de validación.

## Formulario (`LoginForm`)

- **Campos** (`LoginFormValues`): `email`, `password`.
- **Validación** (React Hook Form + `register`):
  - Email obligatorio y patrón de email.
  - Contraseña obligatoria, mínimo 6 caracteres.
- **Errores**: mostrados con `FieldError` del ui-kit.

### Comportamiento actual del submit

Tras validación, el flujo es **simulado** (sin llamada HTTP):

1. Se muestra `EmptyCardLoader` (“Iniciando sesión…”).
2. Tras ~3 s cambia el mensaje a éxito y se muestra ícono de check.
3. Tras ~5 s en total navega a `/dashboard` con `useNavigate`.

Para autenticación real habrá que sustituir esta lógica por un servicio en `src/services/` (Axios según convenciones del repo), manejo de token/sesión e invalidación o redirección acordada con el host.

## Scripts (paquete)

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Servidor Vite (puerto 5001) |
| `pnpm build` | Build de producción (`remoteEntry.js` + assets) |
| `pnpm preview` | Preview del build local |

## Variables de entorno

`vite.config.ts` usa `envDir` en **esta carpeta** (`apps/mfe-login/`). Archivos típicos: `.env.localdev`, `.env.develop`, `.env.staging` (según `--mode` al arrancar Vite). Hoy **no** se consumen `import.meta.env` en el código de `mfe-login`; cuando se agreguen URLs de API u otras constantes, usar prefijo `VITE_` y los `.env.*` de este paquete.

## Build de producción

En despliegues, la URL de `remoteEntry.js` del remoto debe coincidir con la configurada en el host (no solo `localhost:5001`). Ajustar la estrategia de `remotes` del host según el entorno (variables de entorno, CDN, etc.).

## Ver también

- [README del monorepo](../../README.md) — visión general, modos `localdev` / `develop`, etc.
- Reglas de arquitectura en [`architecture.mdc`](../../.cursor/rules/architecture.mdc) — ubicación de UI compartida (`@klu/ui-kit`) y responsabilidades host vs MFE.
