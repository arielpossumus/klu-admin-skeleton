import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { CheckIcon } from "lucide-react";

const EmptyCardLoader = ({ title, description, okIcon = false }: { title: string; description: string; okIcon?: boolean; }) => {
    return (
        <Empty className="w-full">
            <EmptyHeader>
                <EmptyMedia variant={okIcon ? "default" : "icon"}>
                    {okIcon ? (
                        <CheckIcon className="size-10 text-green-600" />
                    ) : (
                        <Spinner />
                    )}
                </EmptyMedia>
                <EmptyTitle>{title}</EmptyTitle>
                <EmptyDescription>
                    {description}
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
};

export default EmptyCardLoader;