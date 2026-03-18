# Admin Momentum

Panel de administración construido con React, TypeScript, Vite, Shadcn UI y Tailwind CSS.

## Tabla de contenidos

- [Stack](#stack)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Desarrollo](#desarrollo)
- [Build](#build)
- [Lint y formato](#lint-y-formato)
- [Crear una nueva página y configurar el ruteo](#crear-una-nueva-página-y-configurar-el-ruteo)
- [Pasos para mostrar una DataGrid con datos](#pasos-para-mostrar-una-datagrid-con-datos)
- [Componentes de tipografía](#componentes-de-tipografía-srccomponentstext)
- [Dashboard](#dashboard)
- [Componentes comunes (commons)](#componentes-comunes-commons)
- [Formularios](#formularios-srccomponentsforms)

---

## Stack

- **React 19** + **TypeScript**
- **Vite** (build)
- **React Router 7** (rutas y layout)
- **Shadcn UI** (componentes sobre Radix UI) + **Tailwind CSS v4** (estilos)
- **React Hook Form** (formularios)
- **TanStack Table** (tablas) + **TanStack Query** (caché y estado de datos)
- **Recharts** (gráficos)
- **Axios** (HTTP)
- **Lucide React** (iconos)

## Estructura del proyecto

```
admin_momentum/
├── src/
│   ├── assets/              # Recursos estáticos (imágenes, íconos, fuentes)
│   ├── components/          # Componentes React reutilizables
│   │   ├── ui/              # Componentes Shadcn (Button, Card, DropdownMenu, DataTable, etc.)
│   │   ├── layout/          # AppSidebar, Header, NavUser
│   │   ├── commons/         # Componentes comunes (CustomCard, CustomCollapsibleCard, DistributionListCard, CustomAlertDialog)
│   │   ├── text/            # Tipografía (ParagraphH1, ParagraphH4, SectionTitle, etc.)
│   │   ├── charts/          # Gráficos (MovementsChart, AcceptanceChart, IncidentsBarChart, TopCorporativosChart, UsageRadial, ChargeLevelRadial)
│   │   ├── tables/          # Columnas para DataTable (corporateColumns, posHealth/, deviceColumns, corporate/transactionsLiteColumns, etc.)
│   │   ├── forms/           # Formularios (LoginForm, CustomFormButtons, corporate/edit/*)
│   │   ├── tabsContent/     # Contenido de pestañas (device/)
│   │   └── loaders/         # Loaders (TablesLoader)
│   ├── layouts/             # AdminLayout (SidebarProvider, AppSidebar, Header, Outlet)
│   ├── pages/               # Páginas/vistas principales
│   │   ├── dashboard/       # Dashboard (Index.tsx): KPIs, transacciones y gráficos
│   │   ├── login/           # Login (Index.tsx)
│   │   ├── corporate/       # Listado (index.tsx), detalle por ID (CorporateDetail.tsx)
│   │   ├── poshealt/        # POS Health listado (Index.tsx), detalle por serial (PosHealthDetail.tsx)
│   │   └── components/      # Página de ejemplos de componentes (Components.tsx)
│   ├── types/               # Tipos e interfaces TypeScript
│   ├── config/              # Configuraciones (navegación, charts, opciones)
│   ├── lib/                 # Utilidades (utils, api, auth)
│   ├── services/            # Servicios y llamadas a API por recurso
│   ├── hooks/               # Custom hooks
│   ├── context/             # Contextos React (Auth, Currency, etc.)
│   ├── router/              # Rutas: Routes.ts (export routes), AppRouter.tsx (createBrowserRouter + RouterProvider)
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
npm run dev          # desarrollo por defecto
npm run dev:local    # apunta a ambiente local
npm run dev:develop  # apunta a ambiente develop
npm run dev:staging  # apunta a ambiente staging
```

## Build

```bash
npm run build
npm run preview   # previsualizar el build
```

## Lint y formato

```bash
npm run lint        # comprobar con ESLint
npm run lint:fix    # corregir automáticamente
npm run format      # formatear con Prettier (src)
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

En **`src/router/Routes.ts`**:

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

Para **rutas anidadas** (ej. detalle por ID), se agrega un hijo con `path` con parámetro:

```tsx
{
  path: "/corporate",
  Component: AdminLayout,
  children: [
    { index: true, Component: CorporateIndex },
    { path: ":corporateId", Component: CorporateDetail },
  ],
},
```

El array `routes` se exporta en **`src/router/Routes.ts`** y se usa en **`src/router/AppRouter.tsx`** con `createBrowserRouter(routes)` y `<RouterProvider router={router} />`.

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
| 2 | `src/router/Routes.ts` | Importar el componente y agregar la ruta en `routes` |
| 3 | `src/config/navigation.ts` | (Opcional) Agregar entrada en `navMain`: ítem, ítem con `items`, o `{ type: "separator" }` |

## Pasos para mostrar una DataGrid con datos

El proyecto incluye un **DataTable** genérico en `src/components/ui/data-table.tsx` que usa **TanStack React Table** y los componentes **Table** de Shadcn. Incluye paginación (Anterior / Siguiente) y mensaje cuando no hay datos.

### Paso 1: Definir el tipo de fila

Crear una interfaz TypeScript con los campos de cada fila (en `src/types/` o en el archivo de columnas). Puede vivir en el mismo archivo de columnas o en `src/types/`.

```tsx
// Ejemplo: src/components/tables/miRecursoColumns.tsx
export interface MiRecurso {
  id: number;
  nombre: string;
  estado?: string;
}
```

### Paso 2: Definir las columnas

En `src/components/tables/<recurso>Columns.tsx` exportar un array `ColumnDef<TipoFila>[]` de `@tanstack/react-table` con `accessorKey`, `header` y opcionalmente `cell` para personalizar la celda (badges, enlaces, barras de progreso, etc.).

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

Tener un array de objetos que cumplan el tipo de fila: desde un JSON estático (mock), desde `useQuery` (React Query) o desde estado local.

```tsx
// Desde JSON estático (import con type: "json")
import datosJson from "../../../public/mockups/miRecurso.json" with { type: "json" };
const datos = (datosJson as { rows: MiRecurso[] }).rows ?? [];

// O desde React Query
const { data } = useQuery({ queryKey: ["miRecurso"], queryFn: fetchMiRecurso });
const datos = data?.rows ?? [];
```

### Paso 4: Renderizar el DataTable en la página

En la página importar `DataTable` de `@/components/ui/data-table`, las columnas y el tipo; pasar `columns` y `data`.

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

- **Corporativos:** `src/components/tables/corporateColumns.tsx` + `src/pages/corporate/index.tsx`. Detalle: `src/pages/corporate/CorporateDetail.tsx`; columnas de transacciones lite: `src/components/tables/corporate/transactionsLiteColumns.tsx`.
- **POS Health (dispositivos):** `src/components/tables/posHealth/` (posHealthColumns, PosHealthExpandedContent, secciones de detalle) + `src/pages/poshealt/Index.tsx` (listado) y `src/pages/poshealt/PosHealthDetail.tsx` (detalle por `:serialId`). Columnas de batería, impresora y conexión: `deviceBatteryColumns`, `devicePrinterColumns`, `deviceconectionsColumns`.
- **Batería:** `src/components/tables/deviceBatteryColumns.tsx` (barra de progreso por nivel de carga)
- **Impresora:** `src/components/tables/devicePrinterColumns.tsx` (badge por disponibilidad)
- **Conexión:** `src/components/tables/deviceconectionsColumns.tsx` (señal WiFi, estado SIM, etc.)

## Componentes de tipografía (`src/components/text`)

Los componentes en **`src/components/text`** unifican el estilo de títulos y párrafos.

### Párrafos y títulos (prop `text: string`)

| Componente | Uso | Ejemplo |
|------------|-----|--------|
| **ParagraphH1** | Título principal (h1) | `<ParagraphH1 text="Título de la página" />` |
| **ParagraphH2** | Subtítulo con borde inferior (h2) | `<ParagraphH2 text="Sección" />` |
| **ParagraphH3** | Subtítulo nivel 3 (h3) | `<ParagraphH3 text="Subsección" />` |
| **ParagraphH4** | Subtítulo nivel 4 (h4) | `<ParagraphH4 text="Apartado" />` |
| **Paragraph** | Párrafo de cuerpo | `<Paragraph text="Texto del párrafo." />` |
| **TypographyBlockquote** | Cita o bloque destacado (blockquote) | `<TypographyBlockquote text="Cita o nota." />` |

### SectionTitle

**SectionTitle** es el bloque de título de sección usado al inicio de cada página. Props:

| Prop | Tipo | Descripción |
|------|------|-------------|
| `title` | `string` | Título principal (h3) |
| `subtitle` | `string` (opcional) | Texto secundario debajo del título |
| `showButton` | `boolean` (opcional) | Muestra un botón a la derecha |
| `actionName` | `string` (opcional) | Texto del botón |
| `actionIcon` | `LucideIcon` (opcional) | Icono del botón |
| `showBadge` | `boolean` (opcional) | Muestra un badge junto al título |
| `badgeText` | `string` (opcional) | Texto del badge (ej. "Activo" / "Inactivo", con estilos success/error) |

**Ejemplo:**

```tsx
import SectionTitle from "@/components/text/SectionTitle";
import { List } from "lucide-react";

<SectionTitle
  title="Nombre del corporativo"
  subtitle="FIID: 12345"
  showBadge
  badgeText="Activo"
  showButton
  actionName="Agregar"
  actionIcon={List}
/>
```

**Ejemplo con párrafos:**

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

## Dashboard

La página **Dashboard** (`src/pages/dashboard/Index.tsx`) usa **SectionTitle** para el título de la página y muestra:

- **Transacciones:** bloque con `CustomCard` que contiene:
  - **DistributionListCard:** donut (Aprobadas/Rechazadas), valor central Diarias, total acumulado en $, controles de agregación y moneda.
  - **MovementsChart:** gráfico de líneas (Aprobados/Rechazados) por período (Anual, Mensual, Semanal, Diario).
- **Tres columnas** con:
  - Top corporativos (`TopCorporativosChart`).
  - Porcentaje de aceptación por marca (`AcceptanceChart`, gráfico de torta).
  - Incidentes POS Health (`IncidentsBarChart`).

Los datos provienen de mocks en `public/mockups/` (getTrxValues, getPanelInformation, getAllPosIncidents, movimientos por año/mes/semana/día, top corporativos, etc.).

## Componentes comunes (commons)

En **`src/components/commons/`** hay componentes reutilizables para cards, filtros y visualización de datos:

| Componente | Descripción | Uso |
|------------|-------------|-----|
| **CustomCard** | Card con estilo unificado (fondo gris, borde) y título. | Envolver bloques con título (ej. sección "Transacciones" en Dashboard). |
| **CustomCollapsibleCard** | Igual que CustomCard pero el contenido se muestra/oculta al hacer clic en el título. Incluye chevron que rota. | Sección de **filtros** en listados (Corporativo, POS Health). Acepta `title`, `children`, y opcionalmente `open` / `onOpenChange` para estado controlado, o `defaultOpen` para no controlado. |
| **DistributionListCard** | Card con donut chart (Aprobadas/Rechazadas), valor central (Diarias), total en $ (Acumulado), desplegable de agregación y toggle Pesos/Dólares. Tooltips en el donut y leyenda. | Resumen de transacciones en el Dashboard. Recibe `items: { label, count }[]` (ej. Aprobadas, Rechazadas, Diarias, Acumulado). |
| **CustomAlertDialog** | Diálogo de confirmación reutilizable. | Acciones destructivas o que requieren confirmación. |

**Ejemplo CustomCollapsibleCard (filtros):**

```tsx
<CustomCollapsibleCard title="Filtrar" open={filtersOpen} onOpenChange={setFiltersOpen}>
  <div className="pt-4">
    <form onSubmit={handleSubmit(onFilter)} className="flex flex-col gap-4">
      {/* campos del filtro */}
    </form>
  </div>
</CustomCollapsibleCard>
```

Usado en **`src/pages/corporate/index.tsx`** y **`src/pages/poshealt/Index.tsx`** para la sección de filtros colapsable.

---

## Formularios (`src/components/forms`)

- **LoginForm:** formulario de login.
- **CustomFormButtons:** botones estándar para formularios (Guardar, Cancelar, etc.).
- **corporate/edit/:** formularios del detalle de corporativo:
  - **CorporateGeneralDetailsForm**
  - **CorporateLegalrepresentativeForm**
  - **CorporateContactForm**
  - **CorporateComercialModel** (modelo comercial)

Se usan en **CorporateDetail** (`src/pages/corporate/CorporateDetail.tsx`) dentro de cards por sección, con navegación lateral y scroll por secciones.
