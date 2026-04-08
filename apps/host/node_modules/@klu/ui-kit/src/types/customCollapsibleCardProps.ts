import type { ReactNode } from "react";

export interface CustomCollapsibleCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  cardBackgroundClassName?: string;
}
