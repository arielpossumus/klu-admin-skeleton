import type { ReactNode } from "react";

export type BentoPanelProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
  showHeaderButton?: boolean;
  headerButtonLabel?: string;
  onHeaderButtonClick?: () => void;
};
