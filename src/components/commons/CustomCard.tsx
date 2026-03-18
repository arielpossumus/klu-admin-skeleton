import { forwardRef } from "react";
import ParagraphH4 from "../text/ParagraphH4";
import { Card, CardTitle } from "../ui/card";

interface CustomCardProps {
    children: React.ReactNode;
    title: string;
    icon?: React.ReactNode;
    idCustom?: string;
}

export const CustomCard = forwardRef<HTMLDivElement, CustomCardProps>(
    ({ children, title, icon, idCustom = "custom-card" }, ref) => {
        return (
            <Card
                ref={ref}
                className="px-2 pt-4 pb-2 bg-[var(--color-gray)] border-2 border-[var(--color-gray)] text-[var(--color-gray-foreground)]"
            >
                <CardTitle
                    id={idCustom}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground tracking-wide"
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
