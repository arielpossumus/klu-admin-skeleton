import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Building2 } from "lucide-react";
import { useParams } from "react-router";
import corporateByIdJson from "@/mockups/corporates/getCorporateById.json" with { type: "json" };
import { CustomCard } from "@/components/commons/CustomCard";
import { CorporateComercialModel } from "@/components/forms/corporate/edit/CorporateComercialModel";
import { CorporateContactForm } from "@/components/forms/corporate/edit/CorporateContactForm";
import { CorporateGeneralDetailsForm } from "@/components/forms/corporate/edit/CorporateGeneralDetailsForm";
import { CorporateLegalrepresentativeForm } from "@/components/forms/corporate/edit/CorporateLegalrepresentativeForm";
import { corporateCommerceColumns } from "@/components/tables/corporate/corporateCommerceColumns";
import SectionTitle from "@/components/text/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSectionIcon } from "@/lib/getSectionIcon";
import { getCommercesByCorporate } from "@/services/commerces/getCommercesByCorporate";
import type { Corporate, CorporateByIdResponse } from "@/types/corporate/Corporate";
import { INTERNAL_CORPORATE_NAV } from "@/types/internalMenues/internalCorporate";

type CorporateTabId = (typeof INTERNAL_CORPORATE_NAV)[number]["id"];

const CorporateDetailPage = () => {
  const { corporateId } = useParams<{ corporateId: string; }>();
  const [currentTab, setCurrentTab] = useState<CorporateTabId>("general");

  const corporate = useMemo(() => {
    const detail = corporateByIdJson as CorporateByIdResponse;
    return detail.data_response as Corporate;
  }, []);

  const { data: commerces = [], isPending: isCommercesLoading } = useQuery({
    queryKey: ["corporate-commerces", corporate.fiid, corporate.name],
    queryFn: () =>
      getCommercesByCorporate({
        corporateFiid: corporate.fiid,
        corporateName: corporate.name,
      }),
  });

  const legalFiscalAddress = {
    country: corporate?.corporateData?.legalData?.fiscalAddress?.country ?? "",
    region: corporate?.corporateData?.legalData?.fiscalAddress?.region ?? "",
    city: corporate?.corporateData?.legalData?.fiscalAddress?.city ?? "",
    street: corporate?.corporateData?.legalData?.fiscalAddress?.street ?? "",
    zipCode: corporate?.corporateData?.legalData?.fiscalAddress?.zipCode ?? "",
    externalNumber:
      corporate?.corporateData?.legalData?.fiscalAddress?.externalNumber ?? "",
    internalNumber:
      corporate?.corporateData?.legalData?.fiscalAddress?.internalNumber ?? "",
    colony: corporate?.corporateData?.legalData?.fiscalAddress?.colony ?? "",
    municipality:
      corporate?.corporateData?.legalData?.fiscalAddress?.municipality ?? "",
    state: corporate?.corporateData?.legalData?.fiscalAddress?.state ?? "",
    email: corporate?.corporateData?.legalData?.fiscalAddress?.email ?? "",
    phone: corporate?.corporateData?.legalData?.fiscalAddress?.phone ?? "",
    ext: corporate?.corporateData?.legalData?.fiscalAddress?.ext ?? "",
  };

  const legalContact = {
    name: corporate?.corporateData?.legalData?.legalContact?.name ?? "",
    lastName: corporate?.corporateData?.legalData?.legalContact?.lastName ?? "",
    maternalLastName:
      corporate?.corporateData?.legalData?.legalContact?.maternalLastName ?? "",
    email: corporate?.corporateData?.legalData?.legalContact?.email ?? "",
    phone: corporate?.corporateData?.legalData?.legalContact?.phone ?? "",
    ext: corporate?.corporateData?.legalData?.legalContact?.ext ?? "",
    phone2: corporate?.corporateData?.legalData?.legalContact?.phone2 ?? "",
    ext2: corporate?.corporateData?.legalData?.legalContact?.ext2 ?? "",
    days: corporate?.corporateData?.legalData?.legalContact?.days ?? [],
    startHour:
      corporate?.corporateData?.legalData?.legalContact?.startHour ?? "",
    endHour: corporate?.corporateData?.legalData?.legalContact?.endHour ?? "",
  };

  const contactDataDefaults = {
    name: "",
    lastName: "",
    maternalLastName: "",
    email: "",
    phone: "",
    ext: "",
    phone2: "",
    ext2: "",
    days: [] as string[],
    startHour: "",
    endHour: "",
  };

  return (
    <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
      <SectionTitle
        title={corporate?.name ?? "—"}
        subtitle={`FIID: ${corporate?.fiid ?? "—"}${corporateId ? ` (id: ${corporateId})` : ""}`}
        showButton={false}
        showBadge={true}
        badgeText={corporate?.status ?? "—"}
      />

      <Tabs
        value={currentTab}
        onValueChange={(value) => setCurrentTab(value as CorporateTabId)}
      >
        <TabsList className="inline-flex h-auto w-fit items-center gap-0 rounded-full bg-[color-mix(in_srgb,var(--primary-light)_10%,transparent)] p-1.5">
          {INTERNAL_CORPORATE_NAV.map(({ id, label }) => (
            <TabsTrigger
              key={id}
              value={id}
              className="cursor-pointer rounded-full border-0 px-4 py-2 text-sm font-medium text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm after:hidden"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <CustomCard
            title={
              INTERNAL_CORPORATE_NAV.find((item) => item.id === "general")
                ?.label ?? "Datos generales"
            }
            icon={getSectionIcon(INTERNAL_CORPORATE_NAV, "general", {
              fallbackIcon: Building2,
            })}
          >
            <Card>
              <CardContent className="pt-6">
                <CorporateGeneralDetailsForm
                  defaultValues={{
                    rsa: corporate?.corporateData?.rsaKey ?? "",
                    logoIndex: corporate?.corporateData?.logoIndex ?? "",
                    logoTicket: corporate?.corporateData?.logoTicket ?? "",
                    status:
                      corporate?.status?.toUpperCase() === "ACTIVO"
                        ? "Activo"
                        : "Inactivo",
                    modeloCorporativo:
                      corporate?.corporateData?.ModeloCorporativo ?? "",
                  }}
                />
              </CardContent>
            </Card>
          </CustomCard>
        </TabsContent>

        <TabsContent value="legal" className="mt-6">
          <CustomCard
            title={
              INTERNAL_CORPORATE_NAV.find((item) => item.id === "legal")
                ?.label ?? "Datos legales"
            }
            icon={getSectionIcon(INTERNAL_CORPORATE_NAV, "legal", {
              fallbackIcon: Building2,
            })}
          >
            <Card>
              <CardContent className="pt-6">
                <CorporateLegalrepresentativeForm
                  defaultValues={{
                    name:
                      corporate?.corporateData?.legalData?.LegalRepresentative
                        ?.name ?? "",
                    lastName:
                      corporate?.corporateData?.legalData?.LegalRepresentative
                        ?.lastName ?? "",
                    maternalLastName:
                      corporate?.corporateData?.legalData?.LegalRepresentative
                        ?.maternalLastName ?? "",
                    rfc:
                      corporate?.corporateData?.legalData?.taxInformation?.rfc ??
                      "",
                    socialReason:
                      corporate?.corporateData?.legalData?.taxInformation
                        ?.socialReason ?? "",
                    taxRegime:
                      corporate?.corporateData?.legalData?.taxInformation
                        ?.taxRegime ?? "",
                    fiscalAddress: legalFiscalAddress,
                    legalContact: legalContact,
                  }}
                />
              </CardContent>
            </Card>
          </CustomCard>
        </TabsContent>

        <TabsContent value="contacts" className="mt-6">
          <CustomCard
            title={
              INTERNAL_CORPORATE_NAV.find((item) => item.id === "contacts")
                ?.label ?? "Contactos"
            }
            icon={getSectionIcon(INTERNAL_CORPORATE_NAV, "contacts", {
              fallbackIcon: Building2,
            })}
          >
            <Card>
              <CardContent className="pt-6">
                <CorporateContactForm
                  defaultValues={{
                    contactData: {
                      commercialContact:
                        corporate?.corporateData?.contactData
                          ?.commercialContact ?? contactDataDefaults,
                      technicalContact:
                        corporate?.corporateData?.contactData
                          ?.technicalContact ?? contactDataDefaults,
                      financialContact:
                        corporate?.corporateData?.contactData
                          ?.financialContact ?? contactDataDefaults,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </CustomCard>
        </TabsContent>

        <TabsContent value="commercial" className="mt-6">
          <CustomCard
            title={
              INTERNAL_CORPORATE_NAV.find((item) => item.id === "commercial")
                ?.label ?? "Modelo comercial"
            }
            icon={getSectionIcon(INTERNAL_CORPORATE_NAV, "commercial", {
              fallbackIcon: Building2,
            })}
          >
            <Card>
              <CardContent className="pt-6">
                <CorporateComercialModel
                  defaultValues={{
                    adquisition:
                      corporate?.corporateData?.modelCommercial?.adquisition,
                    adquisitionBank:
                      corporate?.corporateData?.modelCommercial
                        ?.adquisitionBank,
                    channels: corporate?.corporateData?.modelCommercial?.channels,
                    monthlyRent:
                      corporate?.corporateData?.modelCommercial?.monthlyRent,
                    cancelationDay:
                      corporate?.corporateData?.modelCommercial?.cancelationDay,
                    transactions:
                      corporate?.corporateData?.modelCommercial?.transactions,
                  }}
                />
              </CardContent>
            </Card>
          </CustomCard>
        </TabsContent>

        <TabsContent value="commerce" className="mt-6">
          <CustomCard
            title={
              INTERNAL_CORPORATE_NAV.find((item) => item.id === "commerce")
                ?.label ?? "Comercios"
            }
            icon={getSectionIcon(INTERNAL_CORPORATE_NAV, "commerce", {
              fallbackIcon: Building2,
            })}
          >
            <Card>
              <CardContent className="pt-6">
                <DataTable
                  columns={corporateCommerceColumns}
                  data={commerces}
                  getRowId={(row) => row.id}
                  pagination={true}
                />
                {isCommercesLoading ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Cargando comercios...
                  </p>
                ) : null}
              </CardContent>
            </Card>
          </CustomCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CorporateDetailPage;

