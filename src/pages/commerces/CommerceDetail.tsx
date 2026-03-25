import SectionTitle from "@/components/text/SectionTitle";
export const CommerceDetail = () => {
    return (
        <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
            <SectionTitle title="Titulo" subtitle="Subtitulo" actionName="Agregar Corporativo " showButton={false} showBadge={false} />
        </div>
    );
};