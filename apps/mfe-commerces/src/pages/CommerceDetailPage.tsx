import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import SectionTitle from "@/components/text/SectionTitle";
import { getSectionIcon } from "@/lib/getSectionIcon";
import { getCommerceById } from "@/services/commerces/getCommerceById";
import { INTERNAL_COMMERCES_NAV } from "@/types/internalMenues/internalCommerces";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomCard } from "@/components/commons/CustomCard";
import { Building2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CommerceGeneralDetailsForm } from "@/components/forms/commerce/CommerceGeneralDetailsForm";
import { CommerceLegaldata } from "@/components/forms/commerce/CommerceLegaldata";

type CommerceTabId = (typeof INTERNAL_COMMERCES_NAV)[number]["id"];

const CommerceDetailPage = () => {
  const { idCommerce } = useParams<{ idCommerce: string; }>();
  const [currentTab, setCurrentTab] = useState<CommerceTabId>("general");
  const commerceId = Number(idCommerce ?? "");
  const canFetchDetail =
    Number.isFinite(commerceId) && commerceId > 0;

  const {
    data: commerce,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["commerces", "detail", commerceId],
    queryFn: () => getCommerceById(commerceId),
    enabled: canFetchDetail,
    staleTime: 60_000,
  });


  if (!canFetchDetail) {
    return (
      <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
        <Card className="border-destructive/50 bg-destructive/5" role="alert">
          <CardHeader>
            <CardTitle className="text-destructive">ID no válido</CardTitle>
            <CardDescription>
              No se pudo interpretar el identificador del comercio en la URL.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
        <Card className="border-destructive/50 bg-destructive/5" role="alert">
          <CardHeader>
            <CardTitle className="text-destructive">
              Error al cargar el comercio
            </CardTitle>
            <CardDescription>
              {error instanceof Error
                ? error.message
                : "Intentá de nuevo más tarde."}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!commerce) {
    return (
      <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
        <Card role="status">
          <CardHeader>
            <CardTitle>Comercio no encontrado</CardTitle>
            <CardDescription>
              No hay datos para el comercio con ID {idCommerce}.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
      <SectionTitle
        title={commerce.businessName ?? "—"}
        subtitle={idCommerce ? `FIID: ${commerce.corporate ?? "—"} - ID: ${idCommerce} ` : "Detalle del comercio"}
        showButton={false}
        showBadge={true}
        badgeText={commerce.businessStatus?.toUpperCase() ?? "—"}
      />

      <Tabs
        value={currentTab}
        onValueChange={(value) => setCurrentTab(value as CommerceTabId)}
      >
        <TabsList className="inline-flex h-auto w-fit items-center gap-0 rounded-full bg-[color-mix(in_srgb,var(--primary-light)_10%,transparent)] p-1.5">
          {INTERNAL_COMMERCES_NAV.map(({ id, label }) => (
            <TabsTrigger
              key={id}
              value={id}
              className="rounded-full border-0 px-4 py-2 text-sm font-medium text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm after:hidden"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <CustomCard
            title={
              INTERNAL_COMMERCES_NAV.find((item) => item.id === "general")
                ?.label ?? "Datos generales"
            }
            icon={getSectionIcon(INTERNAL_COMMERCES_NAV, "general", {
              fallbackIcon: Building2,
            })}
          >
            <Card>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <CommerceGeneralDetailsForm commerce={commerce} />
                </div>
              </CardContent>
            </Card>
          </CustomCard>
        </TabsContent>
        <TabsContent value="legal" className="mt-6">
          <CustomCard
            title={
              INTERNAL_COMMERCES_NAV.find((item) => item.id === "legal")
                ?.label ?? "Datos legales"
            }
            icon={getSectionIcon(INTERNAL_COMMERCES_NAV, "legal", {
              fallbackIcon: Building2,
            })}
          >
            <Card>
              <CardContent>
                <CommerceLegaldata
                  legalData={commerce.legalData}
                  fiscalData={commerce.fiscalData}
                  legalContact={commerce.fiscalData?.legalContact}
                />
              </CardContent>
            </Card>
          </CustomCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommerceDetailPage;

