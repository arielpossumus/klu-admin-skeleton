# @klu/mfe-login

Microfrontend (MFE) de **inicio de sesión** para el sistema administrativo **KLU**. Se integra en el shell [`apps/host`](../host) vía **Module Federation** y muestra la pantalla de login en la ruta raíz `/`.

## Rol en el producto

- Punto de entrada visual del admin: marca KLU, formulario **usuario / contraseña**, llamada a API de autenticación, guardado de **JWT** y redirección al área autenticada.
- En modo integrado, el **host** carga este remoto de forma diferida (`lazy`) y lo monta sin layout lateral (a diferencia de módulos como dashboard o corporate).
- La **política de rutas protegidas** (quién puede ver `/dashboard`, `/corporate`, etc.) vive en el **host**; este MFE solo **obtiene tokens** y los deja en `sessionStorage` mediante el paquete compartido **`@klu/auth-session`**.

## Cómo funciona el flujo de login (resumen)

1. El usuario envía **usuario** y **contraseña** en `LoginForm`.
2. Se llama a **`loginService.login`** (`POST` a la API configurada; hoy **DummyJSON** para pruebas).
3. Si la respuesta incluye **`accessToken`** y **`refreshToken`** (JWT), se invoca **`setAuthSession`** de `@klu/auth-session`, que guarda en **`sessionStorage`**:
   - token de acceso y refresh,
   - un **perfil mínimo** (nombre, email, imagen) para mostrar en el header del host.
4. Se dispara el evento **`klu:auth-changed`** para que el host actualice el contexto de usuario.
5. **`useNavigate`** redirige a la ruta guardada en el estado de React Router (**`state.from`**) si el usuario había intentado entrar a una URL protegida; si no, a **`/dashboard`**.
6. El **host**:
   - **`GuestOnlyRoute`**: si ya hay JWT válido (no expirado según el `exp` del payload), redirige desde `/` hacia `/dashboard` sin mostrar el login.
   - **`ProtectedRoute`**: si no hay JWT o expiró, redirige a `/` y pasa **`state.from`** para volver tras iniciar sesión.
7. Los **axios** de los demás MFE usan **`attachAuthInterceptors`** (`@klu/auth-session`): añaden `Authorization: Bearer <accessToken>` y, ante **401**, limpian la sesión y redirigen al login.

**Nota:** La validación criptográfica del JWT la hace el **servidor** en cada API. En el cliente solo se comprueba presencia y **`exp`** para UX y rutas; los mocks estáticos del host pueden seguir respondiendo sin validar el token.

### API de prueba (DummyJSON)

- URL: `https://dummyjson.com/auth/login`
- Cuerpo: `{ "username", "password", "expiresInMins": 60 }`
- Credenciales de ejemplo en la documentación de DummyJSON: por ejemplo **`emilys`** / **`emilyspass`**.

El servicio está en `src/services/auth/loginService.ts`. Para producción, sustituir la URL y el contrato de respuesta por el backend real, manteniendo el uso de **`setAuthSession`** si el formato de tokens es compatible.

## Stack

| Área | Tecnología |
|------|------------|
| UI | React 19, **@klu/ui-kit** (Shadcn / Radix / Tailwind v4) |
| Formularios | React Hook Form |
| HTTP (login) | Axios (`loginService`) |
| Sesión compartida | **`@klu/auth-session`** (workspace del monorepo) |
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
| Estilos | `./LoginStyles` → `src/exposes/LoginStyles.ts` (importado en el host) |
| Puerto dev | `5001` |
| Origen dev | `http://localhost:5001` (CORS habilitado) |

**Dependencias compartidas (singleton)** con el host: `react`, `react-dom`, `react-router`. Evita múltiples instancias de React y mantiene el contexto de enrutado unificado.

## Integración con el host

El host declara el remoto en `apps/host/vite.config.ts` con entrada `http://localhost:5001/remoteEntry.js` en desarrollo.

- Carga: `lazy(() => import("mfe_login/RemoteApp"))` en `apps/host/src/pages/microfrontends/MfRemotePages.tsx` (`MfLoginPage`).
- Rutas: en `apps/host/src/router/Routes.ts`, la raíz `/` queda bajo **`GuestOnlyRoute`** (solo invitados); las rutas de negocio usan **`ProtectedRoute`** y **`AuthProvider`** en `RootLayout`.

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
│   │   ├── RemoteApp.tsx        # Entrada federada + Routes
│   │   └── LoginStyles.ts
│   ├── pages/
│   │   └── login/
│   │       └── Index.tsx        # Layout dos columnas (formulario + imagen)
│   ├── components/
│   │   ├── forms/
│   │   │   └── LoginForm.tsx    # Formulario, API de login, setAuthSession, navigate
│   │   └── loaders/
│   │       └── EmptyCardLoader.tsx
│   ├── services/
│   │   └── auth/
│   │       └── loginService.ts  # POST DummyJSON (o backend real)
│   ├── types/
│   │   └── auth/
│   │       └── LoginFormValues.ts
│   ├── assets/                  # Logo e imagen splash
│   └── lib/                     # Utilidades (p. ej. cn)
```

## Pantalla de login

- **Columna principal**: logo KLU, formulario en card (usuario, contraseña, enlace “¿Olvidaste tu contraseña?” — placeholder `href="#"`).
- **Columna lateral** (≥ `md`): imagen de fondo con ajuste en modo oscuro.
- **Accesibilidad**: etiquetas asociadas a inputs, `aria-invalid` según errores de validación, texto de ayuda con credenciales de prueba DummyJSON.

## Formulario (`LoginForm`)

- **Campos** (`LoginFormValues`): **`username`**, **`password`** (DummyJSON usa *username*, no email en el login).
- **Validación** (React Hook Form + `register`):
  - Usuario obligatorio, mínimo 2 caracteres.
  - Contraseña obligatoria.
- **Errores**: API (mensaje del servidor o genérico) y de campo con `FieldError` del ui-kit.

### Comportamiento del submit

1. Tras validación, se muestra **`EmptyCardLoader`** (“Iniciando sesión…”).
2. **`loginService.login`** realiza el `POST`; si falla, se oculta el loader y se muestra el error.
3. Si hay éxito, **`setAuthSession`** guarda tokens y perfil; mensaje de éxito breve y **`navigate`** a **`state.from`** o **`/dashboard`** (`replace: true`).

## Scripts (paquete)

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Servidor Vite (puerto 5001) |
| `pnpm build` | Build de producción (`remoteEntry.js` + assets) |
| `pnpm preview` | Preview del build local |

## Variables de entorno

`vite.config.ts` usa `envDir` en **esta carpeta** (`apps/mfe-login/`). Archivos típicos: `.env.localdev`, `.env.develop`, `.env.staging` (según `--mode` al arrancar Vite).

Hoy la URL de login está **fijada en código** en `loginService.ts`. Para multi-entorno, conviene moverla a **`VITE_AUTH_LOGIN_URL`** (o similar) y leerla con `import.meta.env`.

## Build de producción

En despliegues, la URL de `remoteEntry.js` del remoto debe coincidir con la configurada en el host (no solo `localhost:5001`). Ajustar la estrategia de `remotes` del host según el entorno (variables de entorno, CDN, etc.).

## Ver también

- Paquete **`packages/auth-session`** — almacenamiento, `exp` del JWT, interceptors Axios.
- [README del monorepo](../../README.md) — visión general, modos `localdev` / `develop`, etc.
- Reglas de arquitectura en [`architecture.mdc`](../../.cursor/rules/architecture.mdc) — ubicación de UI compartida (`@klu/ui-kit`) y responsabilidades host vs MFE.
