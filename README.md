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

