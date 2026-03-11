import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import corporatesJson from "../../../public/mockups/corporates/getAllCorporates.json" with { type: "json" };
import { corporateColumns } from "@/components/tables/corporateColumns";
import type { CorporateGrid } from "@/types/corporate/CorporateGrid";
import { TablesLoader } from "@/components/loaders/TablesLoader";
import ParagraphH1 from "@/components/text/ParagraphH1";
const CorporateIndex = () => {

  const data = corporatesJson?.rows as CorporateGrid[];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <ParagraphH1 text="Grilla de corporativos" />
      {isLoading ? <TablesLoader columnCount={5} rowCount={5} loadingText="Cargando datos de corporativos" /> : (
        <DataTable columns={corporateColumns} data={data} />
      )}
    </>
  );
};

export default CorporateIndex;
