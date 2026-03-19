import { useMemo, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { CustomCard } from "@/components/commons/CustomCard";
import SectionTitle from "@/components/text/SectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSectionIcon } from "@/lib/getSectionIcon";
import { INTERNAL_ADD_CORPORATE_NAV } from "@/types/internalMenues/internalAddCorporate";
import type { AddCorporateFormValues, CommercialFormValues, LegalFormValues, ModulesFormValues } from "@/types/corporate/addCorporate";
import { Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CustomStepFormButtons, type StepIdFromConfig } from "@/components/forms/CustomStepFormButtons";
import { Step1 } from "@/pages/corporate/add/Step1";
import { Step2 } from "./add/Step2";
import { Step3 } from "./add/step3";
import { Step4 } from "./add/step4";
import { Step5 } from "./add/Step5";


type TabId = StepIdFromConfig<typeof INTERNAL_ADD_CORPORATE_NAV>;

const defaultLegal: LegalFormValues = {
    repLegalNombre: "",
    repLegalApellidoPaterno: "",
    repLegalApellidoMaterno: "",
    rfc: "",
    razonSocial: "",
    regimenFiscal: "",
    pais: "",
    region: "",
    ciudad: "",
    calle: "",
    numeroExterior: "",
    numeroInterior: "",
    colonia: "",
    delegacionMunicipio: "",
    codigoPostal: "",
    email: "",
    telefono: "",
    telefonoExt: "",
    contactoLegalNombre: "",
    contactoLegalApellidoPaterno: "",
    contactoLegalApellidoMaterno: "",
    horarioAtencionDias: [],
    horarioAtencionInicio: "",
    horarioAtencionFin: "",
    contactoLegalEmail: "",
    contactoLegalTelefono: "",
    contactoLegalTelefonoExt: "",
    contactoLegalTelefonoOpcional: "",
    contactoLegalTelefonoOpcionalExt: "",
};

const defaultCommercial: CommercialFormValues = {
    adquirente: false,
    credito: "",
    debito: "",
    bancoAdquirente: "",
    canales: "",
    rentaMensual: "",
    diasCancelacion: "",
    numeroTransacciones: "",
};

const defaultModules: ModulesFormValues = {
    inicio: false,
    posHealth: false,
    transacciones: false,
    versionesTpv: false,
    corporativo: false,
    comercio: false,
    sucursal: false,
    dispositivos: false,
    usuarios: false,
    comercioMovil: false,
    dispositivoMovil: false,
    finanzas: false,
    monitoreoMomentum: false,
    transaccional: false,
    ecommerce: false,
    moTo: false,
    cargosProgramados: false,
    cargosRecurrentes: false,
    tokenizacion: false,
    antifraude: false,
    urlDePago: false,
    miEcommerce: false,
    botonDePago: false,
    threeDSecure: false,
    paymentMethodCheckout: false,
    altaDeSpeis: false,
};

const defaultValues: AddCorporateFormValues = {
    general: {
        nombreCorporativo: "",
        fiid: "",
        rsa: "",
        logoTicket: null,
        logoInicio: null,
        modeloCorporativo: "",
    },
    legal: defaultLegal,
    commercial: defaultCommercial,
    modules: defaultModules,
};

export function AddCorporate() {
    const stepIds = useMemo(() => INTERNAL_ADD_CORPORATE_NAV.map((n) => n.id), []);
    const [currentTab, setCurrentTab] = useState<TabId>(stepIds[0]);

    const form = useForm<AddCorporateFormValues>({
        defaultValues,
        mode: "onTouched",
    });

    const generalWatch = useWatch({
        control: form.control,
        name: "general",
        defaultValue: defaultValues.general,
    });
    const canProceedGeneral = Boolean(
        generalWatch?.nombreCorporativo?.trim() &&
        generalWatch?.fiid &&
        generalWatch?.rsa &&
        generalWatch?.modeloCorporativo
    );


    const handleFormSubmit = (() => {
        console.log("Form data:", form.getValues());
        // TODO: llamar API para crear corporativo
    });
    return (
        <div className="flex flex-1 flex-col gap-6 py-4 md:py-6">
            <SectionTitle title="Agregar Corporativo" subtitle="Agregar un nuevo corporativo" />
            <Tabs value={currentTab} onValueChange={(v) => setCurrentTab(v as TabId)} className="flex flex-1 flex-col min-h-0">
                <TabsList className="inline-flex w-fit items-center rounded-full bg-[color-mix(in_srgb,var(--primary-light)_10%,transparent)] p-1.5 gap-0 h-auto pointer-events-none cursor-default">
                    {INTERNAL_ADD_CORPORATE_NAV.map(({ id, label }) => (
                        <TabsTrigger
                            key={id}
                            value={id}
                            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm after:hidden border-0 cursor-default"
                            tabIndex={-1}
                        >
                            {label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="contents">
                        <TabsContent value="general" className="mt-6 flex-1 min-h-0 data-[state=inactive]:hidden">
                            <CustomCard title={INTERNAL_ADD_CORPORATE_NAV.find((n) => n.id === "general")?.label ?? "Datos generales"} icon={getSectionIcon(INTERNAL_ADD_CORPORATE_NAV, "commercial", { fallbackIcon: Building2 })}>
                                <Card>
                                    <CardContent className="pt-6">
                                        <Step1 />
                                        <CustomStepFormButtons<TabId>
                                            stepIds={stepIds}
                                            currentStepId={currentTab}
                                            onStepChange={setCurrentTab}
                                            submitAriaLabel="Crear corporativo"
                                            isNextDisabled={!canProceedGeneral}
                                        />
                                    </CardContent>
                                </Card>
                            </CustomCard>
                        </TabsContent>
                        <TabsContent value="legal" className="mt-6 flex-1 min-h-0 data-[state=inactive]:hidden">
                            <CustomCard title={INTERNAL_ADD_CORPORATE_NAV.find((n) => n.id === "legal")?.label ?? "Modelo comercial"} icon={getSectionIcon(INTERNAL_ADD_CORPORATE_NAV, "commercial", { fallbackIcon: Building2 })}>
                                <Card>
                                    <CardContent className="pt-6">
                                        <Step2 />
                                        <CustomStepFormButtons<TabId>
                                            stepIds={stepIds}
                                            currentStepId={currentTab}
                                            onStepChange={setCurrentTab}
                                            submitAriaLabel="Crear corporativo"
                                        />
                                    </CardContent>
                                </Card>
                            </CustomCard>
                        </TabsContent>
                        <TabsContent value="contacts" className="mt-6 flex-1 min-h-0 data-[state=inactive]:hidden">
                            <CustomCard title={INTERNAL_ADD_CORPORATE_NAV.find((n) => n.id === "general")?.label ?? "Modelo comercial"} icon={getSectionIcon(INTERNAL_ADD_CORPORATE_NAV, "commercial", { fallbackIcon: Building2 })}>
                                <Card>
                                    <CardContent className="pt-6">
                                        <Step3 />
                                        <CustomStepFormButtons<TabId>
                                            stepIds={stepIds}
                                            currentStepId={currentTab}
                                            onStepChange={setCurrentTab}
                                            submitAriaLabel="Crear corporativo"
                                        />
                                    </CardContent>
                                </Card>
                            </CustomCard>
                        </TabsContent>
                        <TabsContent value="commercial" className="mt-6 flex-1 min-h-0 data-[state=inactive]:hidden">
                            <CustomCard title={INTERNAL_ADD_CORPORATE_NAV.find((n) => n.id === "commercial")?.label ?? "Modelo comercial"} icon={getSectionIcon(INTERNAL_ADD_CORPORATE_NAV, "commercial", { fallbackIcon: Building2 })}>
                                <Card>
                                    <CardContent className="pt-6">
                                        <Step4 />
                                        <CustomStepFormButtons<TabId>
                                            stepIds={stepIds}
                                            currentStepId={currentTab}
                                            onStepChange={setCurrentTab}
                                            submitAriaLabel="Crear corporativo"
                                        />
                                    </CardContent>
                                </Card>
                            </CustomCard>
                        </TabsContent>
                        <TabsContent value="modules" className="mt-6 flex-1 min-h-0 data-[state=inactive]:hidden">
                            <CustomCard title={INTERNAL_ADD_CORPORATE_NAV.find((n) => n.id === "modules")?.label ?? "Modelo comercial"} icon={getSectionIcon(INTERNAL_ADD_CORPORATE_NAV, "commercial", { fallbackIcon: Building2 })}>
                                <Card>
                                    <CardContent className="pt-6">
                                        <Step5 />
                                        <CustomStepFormButtons<TabId>
                                            stepIds={stepIds}
                                            currentStepId={currentTab}
                                            onStepChange={setCurrentTab}
                                            submitAriaLabel="Crear corporativo"
                                            lastStepButtonLabel="Crear corporativo"
                                            confirmDialogDescription={`Esta por añadir el Corporativo ${generalWatch?.nombreCorporativo?.trim() || "(sin nombre)"}`}
                                            onSubmit={() => handleFormSubmit()}
                                        />
                                    </CardContent>
                                </Card>
                            </CustomCard>
                        </TabsContent>
                    </form>
                </FormProvider>
            </Tabs>

        </div >
    );
};