const ParagraphH2 = ({ text }: { text: string; }) => {
    return (
        <h2 className="scroll-m-20 border-b pb-2 text-1xl font-semibold tracking-tight first:mt-0 mb-4">
            {text}
        </h2>
    );
};

export default ParagraphH2;