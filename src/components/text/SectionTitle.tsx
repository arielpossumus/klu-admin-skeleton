import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { LucideIcon } from "lucide-react";

const SectionTitle = ({
  title,
  subtitle,
  actionName = "",
  actionIcon: ActionIcon,
  showButton = false,
  showBadge = false,
  badgeText = "",
}: {
  title: string;
  subtitle: string;
  actionName?: string;
  actionIcon?: LucideIcon;
  showButton?: boolean;
  showBadge?: boolean;
  badgeText?: string;
}) => {
  const isActive = badgeText?.trim().toLowerCase() === "activo";
  const badgeBgClass = isActive
    ? "bg-[var(--success-dark)] text-white hover:bg-[var(--success-dark)]"
    : "bg-[var(--error-dark)] text-white hover:bg-[var(--error-dark)]";

  return (
    <div className="flex flex-wrap justify-between items-end gap-4 mb-4">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="scroll-m-20 text-4xl tracking-tight text-balance">
            {title}
          </h3>
          {showBadge && badgeText != null && badgeText !== "" && (
            <Badge variant="outline" className={`shrink-0 ${badgeBgClass}`}>
              {badgeText}
            </Badge>
          )}
        </div>
        {subtitle != null && subtitle !== "" && (
          <p className="scroll-m-20 text-sm tracking-tight text-balance mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {showButton && (
        <Button variant="outline" className="shrink-0 gap-2 bg-[var(--primary)] text-primary-foreground hover:bg-[var(--primary-dark)]">
          {ActionIcon != null && <ActionIcon className="size-4" aria-hidden />}
          {actionName}
        </Button>
      )}
    </div>
  );
};

export default SectionTitle;