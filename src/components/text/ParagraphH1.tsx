const ParagraphH1 = ({ text }: { text: string; }) => {
    return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mb-4">
            {text}
        </h1>
    );
};

export default ParagraphH1;