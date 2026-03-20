const ParagraphH1 = ({ text }: { text: string; }) => {
    return (
        <h1 className="scroll-m-20 text-[50px] font-extrabold leading-none tracking-tight text-balance mb-2">
            {text}
        </h1>
    );
};

export default ParagraphH1;