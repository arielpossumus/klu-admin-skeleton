import { forwardRef, type ReactNode } from "react";
import ParagraphH4 from "@/components/text/ParagraphH4";
import { Card, CardTitle } from "@/components/ui/card";

interface CustomCardProps {
  children: ReactNode;
  title: string;
  icon?: ReactNode;
  idCustom?: string;
}

export const CustomCard = forwardRef<HTMLDivElement, CustomCardProps>(
  ({ children, title, icon, idCustom = "custom-card" }, ref) => {
    return (
      <Card
        ref={ref}
        className="px-2 pt-4 pb-2 bg-[var(--color-primary)] border-2 border-[var(--color-primary-light)] text-[var(--color-primary-foreground)]"
      >
        <CardTitle
          id={idCustom}
          className="flex items-center gap-2 text-sm font-medium text-primary-foreground tracking-wide"
        >
          {icon}
          <ParagraphH4 text={title} />
        </CardTitle>
        {children}
      </Card>
    );
  }
);

CustomCard.displayName = "CustomCard";
