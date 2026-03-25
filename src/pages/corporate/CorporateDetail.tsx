import { useQuery } from "@tanstack/react-query";
import corporateByIdJson from "../../../public/mockups/corporates/getCorporateById.json" with { type: "json" };
import type { CorporateByIdResponse } from "@/types/corporate/Corporate";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionTitle from "@/components/text/SectionTitle";
import { CorporateGeneralDetailsForm } from "@/components/forms/corporate/edit/CorporateGeneralDetailsForm";
import {
    CorporateLegalrepresentativeForm,
    type CorporateLegalrepresentativeFormProps,
} from "@/components/forms/corporate/edit/CorporateLegalrepresentativeForm";
import { CorporateContactForm } from "@/components/forms/corporate/edit/CorporateContactForm";
import { CorporateComercialModel } from "@/components/forms/corporate/edit/CorporateComercialModel";
import { CustomCard } from "@/components/commons/CustomCard";
import { Building2, List } from "lucide-react";
import { INTERNAL_CORPORATE_NAV } from "@/types/internalMenues/internalCorporate";
import { getSectionIcon } from "@/lib/getSectionIcon";
import { getCommercesByCorporate } from "@/services/commerces/getCommercesByCorporate";
import { corporateCommerceColumns } from "@/components/tables/corporate/corporateCommerceColumns";

function LegalRepresentativeFormWrapper(props: CorporateLegalrepresentativeFormProps) {
    return <CorporateLegalrepresentativeForm {...(props as object)} />;
}

const CorporateDetail = () => {
    const corporateById = corporateByIdJson as CorporateByIdResponse;
    const corporate = corporateById.data_response;

    const commercesQuery = useQuery({
        queryKey: ["commercesByCorporate", corporate?.fiid, corporate?.name],
        queryFn: () =>
            getCommercesByCorporate({
                corporateFiid: corporate?.fiid ?? "",
                corporateName: corporate?.name ?? "",
            }),
        enabled: Boolean(corporate?.fiid || corporate?.name),
    });

    return (
        <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
            <SectionTitle title={corporate?.name ?? "—"} subtitle={"FIID: " + (corporate?.fiid ?? "—")} actionName="Agregar Corporativo " actionIcon={List} showButton={false} showBadge={true} badgeText={corporate?.status ?? "—"} />

            <Tabs defaultValue="general" className="flex flex-1 flex-col min-h-0">
                <TabsList className="inline-flex w-fit items-center rounded-full bg-[color-mix(in_srgb,var(--primary-light)_10%,transparent)] p-1.5 gap-0 h-auto">
                    {INTERNAL_CORPORATE_NAV.map(({ id, label }) => (
                        <TabsTrigger
                            key={id}
                            value={id}
                            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:text-foreground after:hidden border-0"
                        >

                            {label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="general" className="mt-6 flex-1 min-h-0 data-[state=inactive]:hidden">
                    <CustomCard title={INTERNAL_CORPORATE_NAV.find((n) => n.id === "general")?.label ?? "Datos generales"} icon={getSectionIcon(INTERNAL_CORPORATE_NAV, "general", { fallbackIcon: Building2 })}>
                        <Card>
                            <CardContent className="pt-6">
                                <CorporateGeneralDetailsForm
                                    defaultValues={{
                                        rsa: corporate?.corporateData?.rsaKey ?? "",
                                        logoIndex: corporate?.corporateData?.logoIndex ?? "",
                                        logoTicket: corporate?.corporateData?.logoTicket ?? "",
                                        status: corporate?.status as "Activo" | "Inactivo" | undefined,
                                        modeloCorporativo: corporate?.corporateData?.ModeloCorporativo ?? "",
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </CustomCard>
                </TabsContent>

                <TabsContent value="legal" className="mt-6 flex-1 min-h-0 data-[state=inactive]:hidden">
                    <CustomCard title={INTERNAL_CORPORATE_NAV.find((n) => n.id === "legal")?.label ?? "Datos legales"} icon={getSectionIcon(INTERNAL_CORPORATE_NAV, "legal", { fallbackIcon: Building2 })}>
                        <Card>
                            <CardContent className="pt-6">
                                <LegalRepresentativeFormWrapper
                                    defaultValues={{
                                        name: corporate?.corporateData?.legalData?.LegalRepresentative?.name ?? "",
                                        lastName: corporate?.corporateData?.legalData?.LegalRepresentative?.lastName ?? "",
                                        maternalLastName: corporate?.corporateData?.legalData?.LegalRepresentative?.maternalLastName ?? "",
                                        rfc: corporate?.corporateData?.legalData?.taxInformation?.rfc ?? "",
                                        socialReason: corporate?.corporateData?.legalData?.taxInformation?.socialReason ?? "",
                                        taxRegime: corporate?.corporateData?.legalData?.taxInformation?.taxRegime ?? "",
                                        fiscalAddress: corporate?.corporateData?.legalData?.fiscalAddress
                                            ? {
                                                country: corporate.corporateData.legalData.fiscalAddress.country ?? "",
                                                region: corporate.corporateData.legalData.fiscalAddress.region ?? "",
                                                city: corporate.corporateData.legalData.fiscalAddress.city ?? "",
                                                street: corporate.corporateData.legalData.fiscalAddress.street ?? "",
                                                zipCode: corporate.corporateData.legalData.fiscalAddress.zipCode ?? "",
                                                externalNumber: corporate.corporateData.legalData.fiscalAddress.externalNumber ?? "",
                                                internalNumber: corporate.corporateData.legalData.fiscalAddress.internalNumber ?? "",
                                                colony: corporate.corporateData.legalData.fiscalAddress.colony ?? "",
                                                municipality: corporate.corporateData.legalData.fiscalAddress.municipality ?? "",
                                                state: corporate.corporateData.legalData.fiscalAddress.state ?? "",
                                                email: corporate.corporateData.legalData.fiscalAddress.email ?? "",
                                                phone: corporate.corporateData.legalData.fiscalAddress.phone ?? "",
                                                ext: corporate.corporateData.legalData.fiscalAddress.ext ?? "",
                                            }
                                            : undefined,
                                        legalContact: corporate?.corporateData?.legalData?.legalContact
                                            ? {
                                                name: corporate.corporateData.legalData.legalContact.name ?? "",
                                                lastName: corporate.corporateData.legalData.legalContact.lastName ?? "",
                                                maternalLastName: corporate.corporateData.legalData.legalContact.maternalLastName ?? "",
                                                email: corporate.corporateData.legalData.legalContact.email ?? "",
                                                phone: corporate.corporateData.legalData.legalContact.phone ?? "",
                                                ext: corporate.corporateData.legalData.legalContact.ext ?? "",
                                                phone2: corporate.corporateData.legalData.legalContact.phone2 ?? "",
                                                ext2: corporate.corporateData.legalData.legalContact.ext2 ?? "",
                                                days: corporate.corporateData.legalData.legalContact.days ?? [],
                                                startHour: corporate.corporateData.legalData.legalContact.startHour ?? "",
                                                endHour: corporate.corporateData.legalData.legalContact.endHour ?? "",
                                            }
                                            : undefined,
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </CustomCard>
                </TabsContent>

                <TabsContent value="contacts" className="mt-6 flex-1 min-h-0 data-[state=inactive]:hidden">
                    <CustomCard title={INTERNAL_CORPORATE_NAV.find((n) => n.id === "contacts")?.label ?? "Contactos"} icon={getSectionIcon(INTERNAL_CORPORATE_NAV, "contacts", { fallbackIcon: Building2 })}>
                        <Card>
                            <CardContent className="pt-6">
                                <CorporateContactForm
                                    defaultValues={{
                                        contactData: corporate?.corporateData?.contactData
                                            ? {
                                                commercialContact: {
                                                    name: corporate.corporateData.contactData.commercialContact?.name ?? "",
                                                    lastName: corporate.corporateData.contactData.commercialContact?.lastName ?? "",
                                                    maternalLastName: corporate.corporateData.contactData.commercialContact?.maternalLastName ?? "",
                                                    email: corporate.corporateData.contactData.commercialContact?.email ?? "",
                                                    phone: corporate.corporateData.contactData.commercialContact?.phone ?? "",
                                                    ext: corporate.corporateData.contactData.commercialContact?.ext ?? "",
                                                    phone2: corporate.corporateData.contactData.commercialContact?.phone2 ?? "",
                                                    ext2: corporate.corporateData.contactData.commercialContact?.ext2 ?? "",
                                                    days: corporate.corporateData.contactData.commercialContact?.days ?? [],
                                                    startHour: corporate.corporateData.contactData.commercialContact?.startHour ?? "",
                                                    endHour: corporate.corporateData.contactData.commercialContact?.endHour ?? "",
                                                },
                                                technicalContact: {
                                                    name: corporate.corporateData.contactData.technicalContact?.name ?? "",
                                                    lastName: corporate.corporateData.contactData.technicalContact?.lastName ?? "",
                                                    maternalLastName: corporate.corporateData.contactData.technicalContact?.maternalLastName ?? "",
                                                    email: corporate.corporateData.contactData.technicalContact?.email ?? "",
                                                    phone: corporate.corporateData.contactData.technicalContact?.phone ?? "",
                                                    ext: corporate.corporateData.contactData.technicalContact?.ext ?? "",
                                                    phone2: corporate.corporateData.contactData.technicalContact?.phone2 ?? "",
                                                    ext2: corporate.corporateData.contactData.technicalContact?.ext2 ?? "",
                                                    days: corporate.corporateData.contactData.technicalContact?.days ?? [],
                                                    startHour: corporate.corporateData.contactData.technicalContact?.startHour ?? "",
                                                    endHour: corporate.corporateData.contactData.technicalContact?.endHour ?? "",
                                                },
                                                financialContact: {
                                                    name: corporate.corporateData.contactData.financialContact?.name ?? "",
                                                    lastName: corporate.corporateData.contactData.financialContact?.lastName ?? "",
                                                    maternalLastName: corporate.corporateData.contactData.financialContact?.maternalLastName ?? "",
                                                    email: corporate.corporateData.contactData.financialContact?.email ?? "",
                                                    phone: corporate.corporateData.contactData.financialContact?.phone ?? "",
                                                    ext: corporate.corporateData.contactData.financialContact?.ext ?? "",
                                                    phone2: corporate.corporateData.contactData.financialContact?.phone2 ?? "",
                                                    ext2: corporate.corporateData.contactData.financialContact?.ext2 ?? "",
                                                    days: corporate.corporateData.contactData.financialContact?.days ?? [],
                                                    startHour: corporate.corporateData.contactData.financialContact?.startHour ?? "",
                                                    endHour: corporate.corporateData.contactData.financialContact?.endHour ?? "",
                                                },
                                            }
                                            : undefined,
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </CustomCard>
                </TabsContent>

                <TabsContent value="commercial" className="mt-6 flex-1 min-h-0 data-[state=inactive]:hidden">
                    <CustomCard title={INTERNAL_CORPORATE_NAV.find((n) => n.id === "commercial")?.label ?? "Modelo comercial"} icon={getSectionIcon(INTERNAL_CORPORATE_NAV, "commercial", { fallbackIcon: Building2 })}>
                        <Card>
                            <CardContent className="pt-6">
                                <CorporateComercialModel
                                    defaultValues={
                                        corporate?.corporateData?.modelCommercial
                                            ? {
                                                adquisition: corporate.corporateData.modelCommercial.adquisition ?? false,
                                                adquisitionBank: corporate.corporateData.modelCommercial.adquisitionBank ?? "",
                                                channels: corporate.corporateData.modelCommercial.channels ?? [],
                                                monthlyRent: corporate.corporateData.modelCommercial.monthlyRent ?? 0,
                                                cancelationDay: corporate.corporateData.modelCommercial.cancelationDay ?? 0,
                                                transactions: corporate.corporateData.modelCommercial.transactions ?? [],
                                            }
                                            : undefined
                                    }
                                />
                            </CardContent>
                        </Card>
                    </CustomCard>
                </TabsContent>
                <TabsContent value="commerce" className="mt-6 flex-1 min-h-0 data-[state=inactive]:hidden">
                    <CustomCard title={INTERNAL_CORPORATE_NAV.find((n) => n.id === "commerce")?.label ?? "Comercios"} icon={getSectionIcon(INTERNAL_CORPORATE_NAV, "commerce", { fallbackIcon: Building2 })}>
                        <Card>
                            <CardContent className="pt-6">
                                {commercesQuery.isPending && (
                                    <div className="space-y-2">
                                        <Skeleton className="h-10 w-full" />
                                        <Skeleton className="h-32 w-full" />
                                    </div>
                                )}
                                {commercesQuery.isError && (
                                    <p className="text-sm text-destructive" role="alert">
                                        No se pudieron cargar los comercios. Intentá de nuevo más tarde.
                                    </p>
                                )}
                                {commercesQuery.isSuccess && (
                                    <DataTable
                                        columns={corporateCommerceColumns}
                                        data={commercesQuery.data}
                                        getRowId={(row) => row.id}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </CustomCard>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CorporateDetail;
