
import ParagraphH4 from "../text/ParagraphH4";
import { Card, CardTitle } from "../ui/card";

interface CustomCardProps {
    children: React.ReactNode;
    title: string;
    icon?: React.ReactNode;
}

export const CustomCard = ({ children, title, icon }: CustomCardProps) => {
    return (
        <Card className="px-2 pt-4 pb-2 bg-[var(--color-gray)] border-2 border-[var(--color-gray)] text-[var(--color-gray-foreground)]" >
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide"> {icon} <ParagraphH4 text={title} /></CardTitle>
            {children}
        </Card>

    );
};
