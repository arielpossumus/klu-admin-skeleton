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
│   │   ├── text/            # Tipografía (ParagraphH1, ParagraphH2, Paragraph, etc.)
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
npm run dev:local # levanta app apuntando a ambiente local
npm run dev:develop # levanta app apuntando a ambiente develop
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

### 3. Agregar ítems en el menú lateral (opcional)

El menú usa la estructura **`navMain`** en **`src/config/navigation.ts`**, que admite ítems simples, ítems con subítems colapsables y separadores. Esta misma configuración alimenta el **breadcrumb** del header de forma automática.

**Tipos:**

- **`NavMainItem`:** ítem de menú con `title`, `url`, `icon` (LucideIcon) y opcionalmente `items` (array de subítems).
- **`NavSubItem`:** subítem con `title`, `url` y opcional `isActive`.
- **`NavEntry`:** puede ser un `NavMainItem` o un separador: `{ type: "separator" }`.

**Ítem sin subítems** (enlace directo):

```tsx
import { Settings } from "lucide-react";

{
  title: "Configuración",
  url: "/settings",
  icon: Settings,
},
```

**Ítem con subítems** (menú colapsable; al hacer clic se muestran los subítems). Usar `url: "#"` para el padre:

```tsx
{
  title: "Corporativo",
  url: "#",
  icon: Building,
  items: [
    { title: "Top", url: "/corporativo/top" },
    { title: "Listado", url: "/corporativo/listado" },
  ],
},
```

**Separador** entre grupos de ítems:

```tsx
{ type: "separator" },
```

Se agrega en el array `navMain` en el orden deseado. Los ítems con `items` se abren/cierran al hacer clic; si la ruta actual coincide con un subítem, su padre se abre automáticamente. El breadcrumb del header se genera automáticamente a partir de `navMain`: los títulos y URLs definidos ahí se usan como etiquetas del breadcrumb según la ruta activa.

### Resumen de archivos a tocar

| Paso | Archivo | Acción |
|------|---------|--------|
| 1 | `src/pages/<seccion>/<NombrePagina>.tsx` | Crear el componente de la página |
| 2 | `src/router/AppRouter.tsx` | Importar el componente y agregar la ruta en `routes` |
| 3 | `src/config/navigation.ts` | (Opcional) Agregar entrada en `navMain`: ítem, ítem con `items`, o `{ type: "separator" }` |

## Componentes de tipografía (`src/components/text`)

Los componentes en **`src/components/text`** unifican el estilo de títulos y párrafos. Todos reciben la prop **`text: string`** con el contenido a mostrar.

| Componente | Uso | Ejemplo |
|------------|-----|--------|
| **ParagraphH1** | Título principal (h1) | `<ParagraphH1 text="Título de la página" />` |
| **ParagraphH2** | Subtítulo con borde inferior (h2) | `<ParagraphH2 text="Sección" />` |
| **ParagraphH3** | Subtítulo nivel 3 (h3) | `<ParagraphH3 text="Subsección" />` |
| **ParagraphH4** | Subtítulo nivel 4 (h4) | `<ParagraphH4 text="Apartado" />` |
| **Paragraph** | Párrafo de cuerpo | `<Paragraph text="Texto del párrafo." />` |
| **TypographyBlockquote** | Cita o bloque destacado (blockquote) | `<TypographyBlockquote text="Cita o nota." />` |

**Ejemplo en una página:**

```tsx
import ParagraphH1 from "@/components/text/ParagraphH1";
import ParagraphH2 from "@/components/text/ParagraphH2";
import Paragraph from "@/components/text/Paragraph";
import TypographyBlockquote from "@/components/text/TypographyBlockquote";

const MiPagina = () => {
  return (
    <>
      <ParagraphH1 text="Título principal" />
      <ParagraphH2 text="Primera sección" />
      <Paragraph text="Contenido del párrafo." />
      <TypographyBlockquote text="Una cita o nota importante." />
    </>
  );
};

export default MiPagina;
```

Para cambiar tamaño, peso o márgenes, se editan las clases Tailwind en el componente correspondiente dentro de `src/components/text/`.

## Uso del DataTable (tabla de datos)

El proyecto incluye un **DataTable** genérico en `src/components/ui/data-table.tsx` que usa **TanStack React Table** y los componentes **Table** de Shadcn. Incluye paginación (Anterior / Siguiente) y mensaje cuando no hay datos.

### Paso 1: Definir el tipo de fila

Crea una interfaz TypeScript con los campos que tendrá cada fila. Puede vivir en el mismo archivo de columnas o en `src/types/`.

```tsx
// Ejemplo: src/components/tables/miRecursoColumns.tsx
export interface MiRecurso {
  id: number;
  nombre: string;
  estado?: string;
}
```

### Paso 2: Definir las columnas

Usa `ColumnDef<TipoFila>[]` de `@tanstack/react-table`. Cada columna tiene al menos `accessorKey` (campo del objeto) y `header` (texto del encabezado). Opcionalmente usa `cell` para personalizar el contenido (badges, barras de progreso, etc.).

```tsx
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const miRecursoColumns: ColumnDef<MiRecurso>[] = [
  { accessorKey: "nombre", header: "Nombre" },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const value = row.getValue<string>("estado");
      const isOk = value === "Activo";
      return (
        <Badge className={isOk ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
          {value ?? "—"}
        </Badge>
      );
    },
  },
];
```

- **`accessorKey`:** clave del objeto que se muestra en la columna.
- **`header`:** texto del encabezado de la tabla.
- **`cell`:** función opcional `({ row }) => ReactNode` para renderizar la celda (por defecto se muestra el valor crudo).

### Paso 3: Obtener los datos

Los datos pueden venir de un JSON estático (mock), de React Query, o de estado. Deben ser un array de objetos que cumplan la interfaz de la fila.

```tsx
// Desde JSON estático (import con type: "json")
import datosJson from "../../../public/mockups/miRecurso.json" with { type: "json" };
const datos = (datosJson as { rows: MiRecurso[] }).rows ?? [];

// O desde React Query
const { data } = useQuery({ queryKey: ["miRecurso"], queryFn: fetchMiRecurso });
const datos = data?.rows ?? [];
```

### Paso 4: Usar el DataTable en la página

Importa `DataTable`, las columnas y el tipo; pasa `columns` y `data`.

```tsx
import { DataTable } from "@/components/ui/data-table";
import { miRecursoColumns, type MiRecurso } from "@/components/tables/miRecursoColumns";

const MiPagina = () => {
  const datos: MiRecurso[] = []; // o desde JSON/API

  return (
    <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
      <h2 className="text-2xl font-semibold tracking-tight">Mi recurso</h2>
      <DataTable columns={miRecursoColumns} data={datos} />
    </div>
  );
};

export default MiPagina;
```

### Resumen de archivos

| Paso | Dónde | Qué hacer |
|------|--------|-----------|
| 1 | Archivo de columnas o `src/types/` | Definir interfaz del tipo de fila (ej. `MiRecurso`) |
| 2 | `src/components/tables/<recurso>Columns.tsx` | Exportar `ColumnDef<MiRecurso>[]` con `accessorKey`, `header` y opcionalmente `cell` |
| 3 | Página o hook | Obtener datos (mock, useQuery, etc.) como array del tipo de fila |
| 4 | Página | Renderizar `<DataTable columns={columnas} data={datos} />` |

### Ejemplos en el proyecto

- **Dispositivos:** `src/components/tables/deviceColumns.tsx` + `src/pages/poshealt/PosHealth.tsx`
- **Batería:** `src/components/tables/deviceBatteryColumns.tsx` (barra de progreso por nivel de carga)
- **Impresora:** `src/components/tables/devicePrinterColumns.tsx` (badge por disponibilidad)
- **Conexión:** `src/components/tables/deviceconectionsColumns.tsx` (señal WiFi, estado SIM, etc.)

