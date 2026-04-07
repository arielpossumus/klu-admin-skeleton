import type { ReactElement } from "react";
import type { LucideIcon } from "lucide-react";

export type MenuItemWithIcon = {
  id: string;
  icon: LucideIcon;
  label?: string;
};

type GetSectionIconOptions = {
  /** Icono a usar cuando el menú no tiene un item para sectionId */
  fallbackIcon: LucideIcon;
  iconClassName?: string;
};

/**
 * Devuelve el icono de la sección según el menú y el id.
 * Reutilizable para cualquier menú que tenga items con { id, icon }.
 */
export const getSectionIcon = <T extends MenuItemWithIcon>(
  menu: readonly T[],
  sectionId: string,
  options: GetSectionIconOptions
): ReactElement => {
  const { fallbackIcon, iconClassName = "size-3.5" } = options;
  const item = menu.find(({ id }) => id === sectionId);
  const Icon = item?.icon ?? fallbackIcon;
  return <Icon className={iconClassName} aria-hidden />;
};
