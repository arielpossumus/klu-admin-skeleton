const ParagraphH3 = ({ text }: { text: string; }) => {
    return (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4">
            {text}
        </h3>
    );
};

export default ParagraphH3;