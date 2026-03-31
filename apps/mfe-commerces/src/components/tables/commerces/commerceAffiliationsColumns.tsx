import type { ColumnDef } from "@tanstack/react-table";

import type { CommerceAffiliationRow } from "@/types/commerce/CommerceList";

const dash = (v: string | undefined): string => {
  const t = v?.trim() ?? "";
  return t !== "" ? t : "—";
};

const formatAffiliation = (row: CommerceAffiliationRow): string => {
  const num = dash(row.membershipNumber);
  const id = dash(row.idMembership);
  if (num !== "—") return num;
  if (id !== "—") return id;
  return "—";
};

export const commerceAffiliationsColumns: ColumnDef<CommerceAffiliationRow>[] =
  [
    {
      id: "affiliation",
      header: "Afiliación",
      accessorFn: (row) => formatAffiliation(row),
      cell: ({ row }) => formatAffiliation(row.original),
    },
    {
      accessorKey: "processor",
      header: "Procesador",
      cell: ({ getValue }) => dash(getValue<string>()),
    },
    {
      accessorKey: "creditRate",
      header: "Crédito",
      cell: ({ getValue }) => dash(getValue<string>()),
    },
    {
      accessorKey: "debitRate",
      header: "Débito",
      cell: ({ getValue }) => dash(getValue<string>()),
    },
    {
      accessorKey: "creditIntRate",
      header: "Crédito Int",
      cell: ({ getValue }) => dash(getValue<string>()),
    },
    {
      accessorKey: "debitIntRate",
      header: "Débito Int",
      cell: ({ getValue }) => dash(getValue<string>()),
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
      cell: ({ getValue }) => dash(getValue<string>()),
    },
    {
      accessorKey: "regla",
      header: "Regla",
      cell: ({ getValue }) => dash(getValue<string>()),
    },
  ];
