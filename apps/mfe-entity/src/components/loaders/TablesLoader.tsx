import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import type { TablesLoaderProps } from "@/types/ui/TablesLoaderProps";

const DEFAULT_COLUMN_COUNT = 5;
const DEFAULT_ROW_COUNT = 5;

export const TablesLoader = ({
  columnCount = DEFAULT_COLUMN_COUNT,
  rowCount = DEFAULT_ROW_COUNT,
  loadingText = "Cargando",
}: TablesLoaderProps = {}) => {
  return (
    <div className="w-full space-y-4">
      <div className="relative w-full">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-md bg-background/30">
          <Spinner />
          <span className="text-sm text-muted-foreground">{loadingText}</span>
        </div>
        <div className="w-full rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: columnCount }).map((_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-4 min-w-[4rem] w-full bg-muted" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: columnCount }).map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton className="h-4 min-w-[3rem] w-full bg-muted" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-between px-2">
        <Skeleton className="h-4 w-24 bg-muted" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 bg-muted" />
          <Skeleton className="h-8 w-20 bg-muted" />
        </div>
      </div>
    </div>
  );
};
