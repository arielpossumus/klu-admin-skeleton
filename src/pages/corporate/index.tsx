import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import corporatesJson from "../../../public/mockups/corporates/getAllCorporates.json" with { type: "json" };
import { corporateColumns } from "@/components/tables/corporateColumns";
import type { CorporateGrid } from "@/types/corporate/CorporateGrid";
import { TablesLoader } from "@/components/loaders/TablesLoader";
import SectionTitle from "@/components/text/SectionTitle";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, FileDown, FileBraces, FileCode, FileText, FileType, Database, Sheet } from "lucide-react";

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
      <SectionTitle title="Corporativo" subtitle="Corporativo de la aplicación" />
      <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
        <Card className="p-4">
          <div className="flex flex-wrap items-center justify-end gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 text-accent-foreground justify-between bg-[var(--accent)] hover:bg-[var(--accent-dark)]">
                  <FileDown className="size-4" aria-hidden />

                  <ChevronDown className="size-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>

                  <DropdownMenuItem className="gap-2">
                    <FileBraces className="size-4" aria-hidden />
                    Json
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <FileCode className="size-4" aria-hidden />
                    XML
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <FileText className="size-4" aria-hidden />
                    CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <FileType className="size-4" aria-hidden />
                    TXT
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Database className="size-4" aria-hidden />
                    SQL
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Sheet className="size-4" aria-hidden />
                    Excel
                  </DropdownMenuItem>
                </DropdownMenuGroup>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {isLoading ? <TablesLoader columnCount={5} rowCount={5} loadingText="Cargando datos de corporativos" /> : (
            <DataTable columns={corporateColumns} data={data} />
          )}
        </Card>
      </div>
    </>
  );
};

export default CorporateIndex;
