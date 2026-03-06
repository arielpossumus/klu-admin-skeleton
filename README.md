# Admin Momentum

Panel de administración construido con React, TypeScript, Vite, Shadcn UI y Tailwind CSS.

## Stack

- **React** + **TypeScript**
- **Vite** (build)
- **Shadcn UI** (componentes) + **Tailwind CSS** (estilos)
- **React Hook Form** (formularios)
- **Axios** (HTTP)
- **TanStack Query** (caché y estado de datos)

## Estructura del proyecto

```
admin_momentum/
├── src/
│   ├── assets/              # Recursos estáticos (imágenes, íconos, fuentes)
│   ├── components/          # Componentes React reutilizables
│   │   ├── ui/              # Componentes Shadcn (Button, Card, DropdownMenu, etc.)
│   │   ├── layout/          # Sidebar, Header, MetricCard, CurrencyToggle, etc.
│   │   └── charts/          # Gráficos (MovementChart, etc.)
│   ├── layouts/             # Layouts de página (AdminLayout: Sidebar + Header + contenido)
│   ├── pages/               # Páginas/vistas principales
│   │   ├── dashboard/       # Inicio y KPIs
│   │   ├── users/           # Usuarios
│   │   ├── transactions/    # Transacciones
│   │   ├── monitoring/      # Monitoreo Momentum
│   │   ├── catalogs/        # Catálogos
│   │   ├── modules/         # Módulos
│   │   └── finances/        # Finanzas
│   ├── types/               # Tipos e interfaces TypeScript
│   ├── config/              # Configuraciones globales y constantes
│   ├── lib/                 # Utilidades (utils, api, auth)
│   ├── services/            # Servicios y llamadas a API por recurso
│   ├── hooks/               # Custom hooks
│   ├── context/             # Contextos React (Auth, Currency, etc.)
│   ├── router/              # Configuración de rutas (React Router)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css            # Estilos globales (Tailwind)
│
├── vite.config.ts           # Vite (alias @ → src)
├── tsconfig.json            # TypeScript (paths @/*)
└── components.json          # Shadcn
```

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview   # previsualizar el build
```

## Crear una nueva página y configurar el ruteo

### 1. Crear el componente de página

Crear una carpeta dentro de `src/pages/` con el nombre de la sección (en kebab-case si aplica) y un archivo con el componente:

- **Ruta del archivo:** `src/pages/<seccion>/<NombrePagina>.tsx`
- **Ejemplo:** `src/pages/settings/Settings.tsx`

```tsx
const Settings = () => {
  return (
    <>
      <h1>Configuración</h1>
      {/* contenido de la página */}
    </>
  );
};

export default Settings;
```

### 2. Registrar la ruta en el router

En **`src/router/AppRouter.tsx`**:

1. Importar el componente de la nueva página.
2. Agregar un objeto en el array `routes` con `path`, `Component: AdminLayout` y `children` para que la página use el layout con sidebar y header.

**Ejemplo** (página en `/settings`):

```tsx
import Settings from "@/pages/settings/Settings";

// Dentro del array routes:
{
  path: "/settings",
  Component: AdminLayout,
  children: [{ index: true, Component: Settings }],
},
```

- **`path`:** URL de la página (ej. `"/settings"`).
- **`Component: AdminLayout`:** todas las rutas con layout de admin usan este componente.
- **`children: [{ index: true, Component: Settings }]`:** el contenido en esa ruta es el componente `Settings` (ruta índice de `/settings`).

Para rutas **sin** layout (ej. login), se usa solo `path` y `Component`:

```tsx
{ path: "/", Component: Login },
```

### 3. Agregar el enlace en el sidebar (opcional)

Si la página debe aparecer en el menú lateral, en **`src/components/layout/AppSidebar.tsx`**:

1. Importar el ícono deseado desde `lucide-react`.
2. Agregar un objeto en el array `navItems` con `path`, `label` e `icon`.

**Ejemplo:**

```tsx
import { Settings } from "lucide-react";

const navItems = [
  // ... ítems existentes
  { path: "/settings", label: "Configuración", icon: Settings },
] as const;
```

El orden en `navItems` define el orden en el menú.

### Resumen de archivos a tocar

| Paso | Archivo | Acción |
|------|---------|--------|
| 1 | `src/pages/<seccion>/<NombrePagina>.tsx` | Crear el componente de la página |
| 2 | `src/router/AppRouter.tsx` | Importar el componente y agregar la ruta en `routes` |
| 3 | `src/components/layout/AppSidebar.tsx` | (Opcional) Agregar ítem en `navItems` con path, label e icon |

