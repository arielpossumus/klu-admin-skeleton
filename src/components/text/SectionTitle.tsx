const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <>
      <h3 className="scroll-m-20 text-4xl tracking-tight text-balance mb-4">
        {title}
      </h3>
      {subtitle != null && subtitle !== "" && (
        <p className="scroll-m-20 text-sm tracking-tight text-balance mb-4">
          {subtitle}
        </p>
      )}
    </>
  );
};

export default SectionTitle;