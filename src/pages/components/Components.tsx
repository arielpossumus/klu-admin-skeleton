import ParagraphH1 from "@/components/text/ParagraphH1";
import Paragraph from "@/components/text/Paragraph";
import ParagraphH2 from "@/components/text/ParagraphH2";
import SectionTitle from "@/components/text/SectionTitle";
import TypographyBlockquote from "@/components/text/TypographyBlockquote";

const Components = () => {
    return (
        <>
            <SectionTitle title="Componentes" subtitle="Componentes de la aplicación" />
            <ParagraphH1 text="Components" />
            <ParagraphH2 text="The People of the Kingdom" />

            <Paragraph text="The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax." />
            <TypographyBlockquote text="After all, he said, everyone enjoys a good joke, so it's only fair that they should pay for the privilege." />
        </>
    );
};

export default Components;
