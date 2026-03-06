import ParagraphH1 from "@/components/text/ParagraphH1";
import Paragraph from "@/components/text/Paragraph";
import ParagraphH2 from "@/components/text/ParagraphH2";
import ParagraphH3 from "@/components/text/ParagraphH3";
import ParagraphH4 from "@/components/text/ParagraphH4";
import TypographyBlockquote from "@/components/text/TypographyBlockquote";
const Dashboard = () => {
    return (
        <>
            <ParagraphH1 text="Dashboard" />
            <ParagraphH2 text="The People of the Kingdom" />
            <ParagraphH3 text="The Joke Tax" />
            <ParagraphH4 text="People stopped telling jokes" />
            <Paragraph text="The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax." />
            <TypographyBlockquote text="After all, he said, everyone enjoys a good joke, so it's only fair that they should pay for the privilege." />
        </>
    );
};

export default Dashboard;
