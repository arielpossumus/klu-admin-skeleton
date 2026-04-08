const ParagraphH3 = ({ text }: { text: string; }) => {
    return (
        <h3 className="scroll-m-20 text-[20px] font-semibold tracking-tight mb-4">
            {text}
        </h3>
    );
};

export default ParagraphH3;