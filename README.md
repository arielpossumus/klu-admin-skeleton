# Admin Klu

Panel de administración en arquitectura **Microfrontends** con React, TypeScript, Vite, Shadcn UI y Tailwind CSS.

## Tabla de contenidos

- [Stack](#stack)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Desarrollo](#desarrollo)
- [Build](#build)
- [Lint y formato](#lint-y-formato)
- [Arquitectura de microfrontends](#arquitectura-de-microfrontends)
- [Crear una nueva página y configurar el ruteo](#crear-una-nueva-página-y-configurar-el-ruteo)
- [Agregar un nuevo Microfrontend](#agregar-un-nuevo-microfrontend)
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

Monorepo **pnpm**: el panel usa `apps/host` como **shell** y carga dominios desde `apps/mfe-*` por Module Federation. UI compartida en `packages/ui-kit`.

```
admin_momentum/
├── apps/
│   ├── host/                # Shell Federation + router principal — puerto 5000
│   ├── mfe-login/           # Login — 5001
│   ├── mfe-pos-health/      # 5002
│   ├── mfe-corporate/       # 5003
│   ├── mfe-commerces/       # 5004
│   ├── mfe-dashboard/       # 5005
│   └── README.md
├── packages/
│   └── ui-kit/              # Shadcn (ui), text, commons/, lib/utils, use-mobile
├── pnpm-workspace.yaml
├── tsconfig.json            # Referencia a apps/host + paths @/components/ui → ui-kit
├── components.json          # Shadcn (css: apps/host/src/index.css)
│
└── apps/host/
    ├── vite.config.ts       # remotes + shared singleton + alias
    └── src/
        ├── router/Routes.ts # rutas shell -> páginas remotas
        └── pages/microfrontends/MfRemotePages.tsx
```

En este README, si no se aclara, `src/` refiere a `apps/host/src/`.

## Desarrollo

Requiere **Node 20+** y **pnpm**. Recomendado: usar Corepack.

```bash
corepack enable
pnpm install
pnpm dev              # host en http://localhost:5000
pnpm run dev:local    # modo localdev (.env en la raíz del repo)
pnpm run dev:develop
pnpm run dev:staging
```

Para levantar **todo integrado**:

```bash
# Terminal A
pnpm dev:mf:remotes

# Terminal B
pnpm dev:mf:host
```

Rutas principales del shell:

- `/` -> `mfe_login`
- `/dashboard` -> `mfe_dashboard`
- `/pos-health` -> `mfe_pos_health`
- `/corporate` -> `mfe_corporate`
- `/commerces/physical` -> `mfe_commerces`

Más detalle de puertos/rutas en `apps/README.md`.

## Build

```bash
pnpm run build        # host (typecheck + build)
pnpm run preview      # preview del host
pnpm run build:mf     # host + todos los mfe

# Builds puntuales:
pnpm --filter @momentum/mfe-login build
pnpm --filter @momentum/mfe-dashboard build
pnpm --filter @momentum/host build
```

## Lint y formato

```bash
pnpm run lint        # comprobar con ESLint
pnpm run lint:fix    # corregir automáticamente
pnpm run format      # formatear apps/host/src con Prettier
```

## Arquitectura de microfrontends

Mental model simple:

- **Host (`apps/host`)**: pasillo principal (shell).
  - Tiene el router global.
  - Carga remotos con `lazy(() => import("mfe_xxx/RemoteApp"))`.
  - Define `remotes` y `shared` en `vite.config.ts`.
- **Cada `apps/mfe-*`**: una feature/autonomía por dominio.
  - Tiene su propio `RemoteApp.tsx`, páginas, servicios, tipos y mocks.
  - Puede correr solo (dev aislado) y también dentro del host.
- **`packages/ui-kit`**: piezas UI compartidas para consistencia visual y menor duplicación.

Shared críticos en Federation (host + remotos):

- `react`
- `react-dom`
- `react-router`
- `@tanstack/react-query` (si el remoto usa queries)
- `@tanstack/react-table` (si el remoto usa tablas)

Siempre como `singleton: true`.

## Crear una nueva página y configurar el ruteo

Si la pantalla es pequeña o temporal, podés crearla local en host.  
Si es una feature de dominio, preferí crearla dentro de su MFE.

### 1) Página local en host (caso puntual)

Crear componente en `apps/host/src/pages/...` y registrar ruta en `apps/host/src/router/Routes.ts`.

Ejemplo:

```tsx
import Settings from "@/pages/settings/Settings";

{
  path: "/settings",
  Component: AdminLayout,
  children: [{ index: true, Component: Settings }],
},
```

- **`path`:** URL de la página (ej. `"/settings"`).
- **`Component: AdminLayout`:** todas las rutas con layout de admin usan este componente.
- **`children: [{ index: true, Component: Settings }]`:** el contenido en esa ruta es el componente `Settings` (ruta índice de `/settings`).

### 2) Ruta remota (recomendado para dominio)

En host se enruta a `Mf<Feature>Page`:

```tsx
{
  path: "/corporate",
  Component: AdminLayout,
  children: [
    { index: true, Component: MfCorporatePage },
    { path: "add-corporate", Component: MfCorporatePage },
    { path: ":corporateId", Component: MfCorporatePage },
  ],
},
```

La página real vive en el remoto (`apps/mfe-.../src/exposes/RemoteApp.tsx` + páginas internas).

### 3) Menú lateral (opcional)

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
| 1 | `src/router/Routes.ts` | Agregar ruta local o ruta hacia un remoto |
| 2 | `src/pages/microfrontends/MfRemotePages.tsx` | (si es remoto) agregar lazy + fallback |
| 3 | `src/config/navigation.ts` | (Opcional) reflejar entrada de menú |

## Agregar un nuevo Microfrontend

Ejemplo: `mfe-transactions`.

1. Crear carpeta `apps/mfe-transactions` con base Vite + TS:
   - `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`
   - `src/main.tsx`, `src/exposes/RemoteApp.tsx`, `src/vite-env.d.ts`
2. En `RemoteApp` definir rutas internas (`/transactions`, `/:id`, etc.).
3. Mover ahí componentes/services/types/mocks del dominio.
4. En host:
   - `apps/host/vite.config.ts` -> agregar remoto `mfe_transactions`
   - `apps/host/src/vite-env.d.ts` -> declarar módulo `mfe_transactions/RemoteApp`
   - `apps/host/src/pages/microfrontends/MfRemotePages.tsx` -> crear `MfTransactionsPage`
   - `apps/host/src/router/Routes.ts` -> ruta `/transactions`
5. Verificar shared singleton en host + remoto (router/query/table según uso).
6. Probar dev integrado y build:
   - `pnpm dev:mf:remotes` + `pnpm dev:mf:host`
   - `pnpm --filter @momentum/mfe-transactions build`
   - `pnpm --filter @momentum/host build`

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

- **Corporativos:** listado, alta y detalle en **`apps/mfe-corporate`** (`CorporateListPage`, `AddCorporate`, `CorporateDetailPage`); columnas de transacciones lite: `src/components/tables/corporate/transactionsLiteColumns.tsx`.
- **POS Health (dispositivos):** listado y detalle en **`apps/mfe-pos-health`** (`PosHealthListPage`, `PosHealthDetailPage`); columnas de detalle de dispositivo en host: `deviceBatteryColumns`, `devicePrinterColumns`, `deviceconectionsColumns`.
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

Dashboard ya está migrado a `apps/mfe-dashboard`.

Mantiene:

- **Transacciones:** bloque con `CustomCard` que contiene:
  - **DistributionListCard:** donut (Aprobadas/Rechazadas), valor central Diarias, total acumulado en $, controles de agregación y moneda.
  - **MovementsChart:** gráfico de líneas (Aprobados/Rechazados) por período (Anual, Mensual, Semanal, Diario).
- **Tres columnas** con:
  - Top corporativos (`TopCorporativosChart`).
  - Porcentaje de aceptación por marca (`AcceptanceChart`, gráfico de torta).
  - Incidentes POS Health (`IncidentsBarChart`).

Los datos mock viven en `apps/mfe-dashboard/public/mockups/`.

## Componentes comunes (commons)

Viven en **`packages/ui-kit/src/commons/`** (paquete `@momentum/ui-kit`). En **`apps/host`** y en los MFE el alias **`@/components/commons`** apunta ahí vía `vite-aliases.mjs` y los `paths` de TypeScript.

| Componente | Descripción | Uso |
|------------|-------------|-----|
| **BentoPanel** | Panel tipo bento para métricas o bloques en dashboard. | Varios widgets del dashboard en el host. |
| **CustomCard** | Card con estilo unificado (fondo gris, borde) y título. | Envolver bloques con título (ej. sección "Transacciones" en Dashboard). |
| **CustomCollapsibleCard** | Igual que CustomCard pero el contenido se muestra/oculta al hacer clic en el título. Incluye chevron que rota. | Sección de **filtros** en listados. Acepta `title`, `children`, y opcionalmente `open` / `onOpenChange` para estado controlado, o `defaultOpen` para no controlado. |
| **DistributionListCard** | Card con donut chart (Aprobadas/Rechazadas), valor central (Diarias), total en $ (Acumulado), desplegable de agregación y toggle Pesos/Dólares. Opciones del gráfico en `commons/distributionChartConfig.ts`. | Resumen de transacciones en el Dashboard. Recibe `items: { label, count }[]` (ej. Aprobadas, Rechazadas, Diarias, Acumulado). |
| **CustomAlertDialog** | Diálogo de confirmación reutilizable. | Acciones destructivas o que requieren confirmación. |
| **WeekDaysButtonGroup** | Selector de días de la semana. | Formularios corporativos en el host. |

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

Los listados de **corporativo**, **POS Health** y **comercios físicos** viven en **`apps/mfe-corporate`**, **`apps/mfe-pos-health`** y **`apps/mfe-commerces`** (ver `apps/README.md`).

---

## Formularios (`src/components/forms`)

En host quedó principalmente UI transversal.  
Formularios de negocio viven en MFEs (ej. corporate/login).

En `mfe-corporate`:

- **CustomFormButtons:** botones estándar para formularios.
- **corporate/edit/**:
  - **CorporateGeneralDetailsForm**
  - **CorporateLegalrepresentativeForm**
  - **CorporateContactForm**
  - **CorporateComercialModel** (modelo comercial)

También está migrado el flujo de alta completo (`AddCorporate` + steps).
