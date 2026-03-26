import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import SectionTitle from "@/components/text/SectionTitle";
import { Card } from "@/components/ui/card";
import { CustomCard } from "@/components/commons/CustomCard";
import { DetailRow } from "@/components/text/detailRow";
import { getAllCommerces } from "@/services/commerces/getAllCommerces";

const CommerceDetailPage = () => {
  const { idCommerce } = useParams<{ idCommerce: string }>();

  const commerceId = Number(idCommerce ?? "");
  const {
    data: rows = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["commerces", "all"],
    queryFn: getAllCommerces,
    staleTime: 60_000,
  });

  const commerce = useMemo(() => {
    if (!Number.isFinite(commerceId)) return undefined;
    return rows.find((r) => r.businessId === commerceId);
  }, [rows, commerceId]);

  const affiliation = useMemo(() => {
    const main = commerce?.businessMembership?.trim() ?? "";
    const sub = commerce?.businessSubmembership?.trim() ?? "";

    const mainDash = main || "—";
    const subDash = sub || "";
    if (mainDash === "—" && !subDash) return "—";
    if (!subDash || mainDash === "—") return mainDash;
    return `${mainDash} · ${subDash}`;
  }, [commerce]);

  return (
    <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
      <SectionTitle
        title={commerce?.businessName?.trim() ? commerce.businessName : "Comercio"}
        subtitle={idCommerce ? `ID: ${idCommerce}` : "Detalle del comercio"}
        actionName="Agregar Corporativo "
        showButton={false}
        showBadge={false}
      />

      <div className="flex flex-col gap-4">
        {isPending ? (
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Cargando datos del comercio…</p>
          </Card>
        ) : isError ? (
          <Card className="p-4">
            <p className="text-sm text-destructive" role="alert">
              No se pudieron cargar los datos del comercio.
            </p>
          </Card>
        ) : commerce ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(260px,28%)_1fr] items-start">
            <div className="flex flex-col gap-4">
              <CustomCard title="Datos generales" icon={undefined}>
                <Card className="border-border/60 p-4">
                  <DetailRow label="Corporativo" value={commerce.corporate ?? "—"} />
                  <DetailRow label="Nombre" value={commerce.businessName ?? "—"} />
                  <DetailRow label="Estatus" value={commerce.businessStatus ?? "—"} />
                  <DetailRow label="Giro" value={commerce.businessLine ?? "—"} />
                </Card>
              </CustomCard>
            </div>
            <div className="flex flex-col gap-4">
              <CustomCard title="Afiliación" icon={undefined}>
                <Card className="border-border/60 p-4">
                  <DetailRow label="Afiliación" value={affiliation} />
                  <DetailRow
                    label="Teléfono"
                    value={commerce.businessPhone ?? "—"}
                  />
                  <DetailRow label="Correo" value={commerce.businessEmail ?? "—"} />
                </Card>
              </CustomCard>
            </div>
          </div>
        ) : (
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Comercio no encontrado.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CommerceDetailPage;

