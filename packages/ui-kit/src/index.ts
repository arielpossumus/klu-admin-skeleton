/**
 * Design system: Shadcn (`components/ui`), tipografía (`components/text`), `commons/`
 * (BentoPanel, CustomCard, …), `cn`, `useIsMobile`.
 *
 * - Estilos: `import "@klu/ui-kit/foundation.css"` + `@source` del kit y del app.
 * - Vite: `import { withAppRootAlias } from "@klu/ui-kit/vite-aliases"` (`.mjs`).
 */
export const UI_KIT_VERSION = "0.0.0" as const;

export { cn } from "./lib/utils";
export { useIsMobile } from "./hooks/use-mobile";

export { BentoPanel } from "./commons/BentoPanel";
export { CustomCard } from "./commons/CustomCard";
export { CustomFormButtons } from "./commons/CustomFormButtons";
export type { CustomFormButtonsProps } from "./commons/CustomFormButtons";
export { CustomCollapsibleCard } from "./commons/CustomCollapsibleCard";
export { CustomAlertDialog } from "./commons/CustomAlertDialog";
export type { CustomAlertDialogProps } from "./commons/CustomAlertDialog";
export { WeekDaysButtonGroup, WEEKDAYS } from "./commons/WeekDaysButtonGroup";
export type { WeekDaysButtonGroupProps } from "./commons/WeekDaysButtonGroup";
export { DistributionListCard } from "./commons/DistributionListCard";
export type { DistributionItem } from "./commons/DistributionListCard";
export type { BentoPanelProps } from "./types/bentoPanelProps";
export type { CustomCollapsibleCardProps } from "./types/customCollapsibleCardProps";
