import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { LucideIcon } from "lucide-react";
import ParagraphH1 from "./ParagraphH1";
import ParagraphH3 from "./ParagraphH4";

const SectionTitle = ({
  title,
  subtitle,
  actionName = "",
  actionIcon: ActionIcon,
  showButton = false,
  showBadge = false,
  badgeText = "",
  handleAction = () => { },
}: {
  title: string;
  subtitle: string;
  actionName?: string;
  actionIcon?: LucideIcon;
  showButton?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  handleAction?: () => void;
}) => {
  const isActive = badgeText?.trim().toLowerCase() === "activo";
  const badgeBgClass = isActive
    ? "bg-[var(--success-dark)] text-white hover:bg-[var(--success-dark)]"
    : "bg-[var(--error-dark)] text-white hover:bg-[var(--error-dark)]";

  return (
    <div className="flex flex-wrap justify-between items-end gap-4 mb-4">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <ParagraphH1 text={title} />
          {showBadge && badgeText != null && badgeText !== "" && (
            <Badge variant="outline" className={`shrink-0 ${badgeBgClass}`}>
              {badgeText}
            </Badge>
          )}
        </div>
        {subtitle != null && subtitle !== "" && (
          <ParagraphH3 text={subtitle} />
        )}
      </div>
      {
        showButton && (
          <Button variant="outline" className="shrink-0 gap-2 btn-form-action btn-primary" onClick={handleAction}>
            {ActionIcon != null && <ActionIcon className="size-4" aria-hidden />}
            {actionName}
          </Button>
        )
      }

    </div >
  );
};

export default SectionTitle;