import ParagraphH4 from "../text/ParagraphH4";
import { Card, CardTitle } from "../ui/card";

interface CustomCardProps {
    children: React.ReactNode;
    title: string;
}

export const CustomCard = ({ children, title }: CustomCardProps) => {
    return (
        <Card className="px-2 pt-4 pb-2 bg-[var(--color-gray)] border-2 border-[var(--color-gray)] text-[var(--color-gray-foreground)]" >
            <CardTitle><ParagraphH4 text={title} /></CardTitle>
            {children}
        </Card>

    );
};
