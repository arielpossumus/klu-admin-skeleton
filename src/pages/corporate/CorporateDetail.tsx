import SectionTitle from "@/components/text/SectionTitle";
import corporateByIdJson from "../../../public/mockups/corporates/getCorporateById.json" with { type: "json" };
import type { CorporateByIdResponse } from "@/types/corporate/Corporate";
import { Gavel, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CorporateGeneralDetailsForm } from "@/components/forms/corporate/CorporateGeneralDetailsForm";
import { CustomCollapsibleCard } from "@/components/commons/CustomCollapsibleCard";
import {
    CorporateLegalrepresentativeForm,
    type CorporateLegalrepresentativeFormProps,
} from "@/components/forms/corporate/CorporateLegalrepresentativeForm";
import { CorporateContactForm } from "@/components/forms/corporate/CorporateContactForm";
import { CorporateComercialModel } from "@/components/forms/corporate/CorporateComercialModel";

function LegalRepresentativeFormWrapper(props: CorporateLegalrepresentativeFormProps) {
    return <CorporateLegalrepresentativeForm {...(props as object)} />;
}

const CorporateDetail = () => {
    const corporateById = corporateByIdJson as CorporateByIdResponse;
    const corporate = corporateById.data_response;

    return (
        <>
            <SectionTitle title={corporate?.name} subtitle={`FIID: ${corporate?.fiid}`} actionName="Editar Corporativo" showButton={false} showBadge={true} badgeText={corporate?.status} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 py-4 md:py-6">
                <div className="flex flex-col gap-6">
                    <CustomCollapsibleCard title="Datos generales" icon={<Info className="size-3.5" aria-hidden />}>
                        <Card className="border-border/60">
                            <CardContent className="pt-0">
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
                    </CustomCollapsibleCard>

                    <CustomCollapsibleCard title="Datos legales" icon={<Gavel className="size-3.5" aria-hidden />}>
                        <Card className="border-border/60">
                            <CardContent className="pt-0">
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
                    </CustomCollapsibleCard>
                </div>

                <div className="flex flex-col gap-6">
                    <CustomCollapsibleCard title="Contactos" icon={<Gavel className="size-3.5" aria-hidden />}>
                        <Card className="border-border/60">
                            <CardContent className="pt-0">
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
                    </CustomCollapsibleCard>

                    <CustomCollapsibleCard title="General" icon={<Info className="size-3.5" aria-hidden />}>
                        <Card className="border-border/60">
                            <CardContent className="pt-0">
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
                    </CustomCollapsibleCard>
                </div>
            </div>
        </>
    );
};

export default CorporateDetail;