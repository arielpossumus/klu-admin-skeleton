import { useRef, useState, useEffect } from "react";
import { Building2, ChevronRight } from "lucide-react";
import corporateByIdJson from "../../../public/mockups/corporates/getCorporateById.json" with { type: "json" };
import type { CorporateByIdResponse } from "@/types/corporate/Corporate";
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from "@/components/text/SectionTitle";
import { Button } from "@/components/ui/button";
import { CorporateGeneralDetailsForm } from "@/components/forms/corporate/CorporateGeneralDetailsForm";
import {
    CorporateLegalrepresentativeForm,
    type CorporateLegalrepresentativeFormProps,
} from "@/components/forms/corporate/CorporateLegalrepresentativeForm";
import { CorporateContactForm } from "@/components/forms/corporate/CorporateContactForm";
import { CorporateComercialModel } from "@/components/forms/corporate/CorporateComercialModel";
import { CustomCard } from "@/components/commons/CustomCard";
import { List } from "lucide-react";
import { INTERNAL_CORPORATE_NAV } from "@/types/internalMenues/internalCorporate";
import { getSectionIcon } from "@/lib/getSectionIcon";

function LegalRepresentativeFormWrapper(props: CorporateLegalrepresentativeFormProps) {
    return <CorporateLegalrepresentativeForm {...(props as object)} />;
}

type SectionId = (typeof INTERNAL_CORPORATE_NAV)[number]["id"];

const CorporateDetail = () => {
    const corporateById = corporateByIdJson as CorporateByIdResponse;
    const corporate = corporateById.data_response;

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const generalRef = useRef<HTMLDivElement>(null);
    const legalRef = useRef<HTMLDivElement>(null);
    const contactsRef = useRef<HTMLDivElement>(null);
    const commercialRef = useRef<HTMLDivElement>(null);

    const sectionRefs = { general: generalRef, legal: legalRef, contacts: contactsRef, commercial: commercialRef };
    const sectionIds: SectionId[] = ["general", "legal", "contacts", "commercial"];

    const [activeSectionId, setActiveSectionId] = useState<SectionId>("general");

    useEffect(() => {
        const root = scrollContainerRef.current;
        if (!root) return;

        const visible = new Set<SectionId>();

        const updateActive = () => {
            for (const id of sectionIds) {
                if (visible.has(id)) {
                    setActiveSectionId(id);
                    return;
                }
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const id = sectionIds.find((sid) => sectionRefs[sid].current === entry.target);
                    if (id == null) continue;
                    if (entry.isIntersecting) visible.add(id);
                    else visible.delete(id);
                }
                updateActive();
            },
            { root, rootMargin: "-10% 0px -60% 0px", threshold: 0 }
        );

        for (const id of sectionIds) {
            const el = sectionRefs[id].current;
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
        // Solo montar el observer una vez; sectionRefs.current no cambia de identidad.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollToSection = (id: SectionId) => {
        setActiveSectionId(id);
        const ref = sectionRefs[id];
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
            <SectionTitle title={corporate?.name ?? "—"} subtitle={"FIID: " + (corporate?.fiid ?? "—")} actionName="Agregar Corporativo " actionIcon={List} showButton={false} showBadge={true} badgeText={corporate?.status ?? "—"} />

            <div className="flex flex-1 flex-col gap-6 lg:flex-row lg:gap-8">
                <div className="shrink-0 self-start lg:w-56 lg:sticky lg:top-4">
                    <CustomCard title="Navegación" icon={getSectionIcon(INTERNAL_CORPORATE_NAV, "general", { fallbackIcon: Building2 })}>
                        <Card className="w-full">
                            <CardContent className="p-2">
                                <nav className="flex flex-row gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0" aria-label="Secciones del corporativo">
                                    {INTERNAL_CORPORATE_NAV.map(({ id, label, icon: Icon }) => (
                                        <Button
                                            key={id}
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className={`group w-full justify-start gap-2 shrink-0 lg:shrink hover:bg-muted hover:font-medium ${activeSectionId === id ? "bg-muted font-medium" : ""}`}
                                            onClick={() => scrollToSection(id)}
                                            aria-label={`Ir a ${label}`}
                                            aria-current={activeSectionId === id ? "true" : undefined}
                                        >
                                            <Icon className={`size-4 shrink-0 ${activeSectionId === id ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} aria-hidden />
                                            <span className="truncate">{label}</span>
                                            <ChevronRight className="ml-auto size-4 shrink-0 opacity-50 lg:hidden" aria-hidden />
                                        </Button>
                                    ))}
                                </nav>
                            </CardContent>
                        </Card>
                    </CustomCard>
                </div>

                <div ref={scrollContainerRef} className="min-h-0 flex-1 overflow-y-auto lg:max-h-[calc(100vh-12rem)]">
                    <div className="space-y-6 pr-2">
                        <CustomCard ref={generalRef} idCustom="general-card" title={INTERNAL_CORPORATE_NAV.find(({ id }) => id === "general")?.label ?? "Datos generales"} icon={getSectionIcon(INTERNAL_CORPORATE_NAV, "general", { fallbackIcon: Building2 })}>
                            <section className="scroll-mt-4">
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
                            </section>
                        </CustomCard>
                        <CustomCard ref={legalRef} idCustom="section-legal" title={INTERNAL_CORPORATE_NAV.find(({ id }) => id === "legal")?.label ?? "Datos legales"} icon={getSectionIcon(INTERNAL_CORPORATE_NAV, "legal", { fallbackIcon: Building2 })}>
                            <section className="scroll-mt-4">
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
                            </section>
                        </CustomCard>
                        <CustomCard ref={contactsRef} idCustom="section-contacts" title={INTERNAL_CORPORATE_NAV.find(({ id }) => id === "contacts")?.label ?? "Contactos"} icon={getSectionIcon(INTERNAL_CORPORATE_NAV, "contacts", { fallbackIcon: Building2 })}>
                            <section className="scroll-mt-4">
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
                            </section>
                        </CustomCard>
                        <CustomCard ref={commercialRef} idCustom="section-commercial" title={INTERNAL_CORPORATE_NAV.find(({ id }) => id === "commercial")?.label ?? "Modelo comercial"} icon={getSectionIcon(INTERNAL_CORPORATE_NAV, "commercial", { fallbackIcon: Building2 })}>
                            <section id="section-commercial" ref={commercialRef} className="scroll-mt-4">
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
                            </section>
                        </CustomCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CorporateDetail;
