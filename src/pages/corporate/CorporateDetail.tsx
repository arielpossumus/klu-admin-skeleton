import SectionTitle from "@/components/text/SectionTitle";
import corporateByIdJson from "../../../public/mockups/corporates/getCorporateById.json" with { type: "json" };
import type { CorporateByIdResponse } from "@/types/Corporate/Corporate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Gavel, Contact, DollarSign, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CorporateGeneralDetailsForm } from "@/components/forms/corporate/CorporateGeneralDetailsForm";

const CorporateDetail = () => {
    const corporateById = corporateByIdJson as CorporateByIdResponse;
    const corporate = corporateById.data_response;
    return (
        <>
            <SectionTitle title={corporate?.name} subtitle={`FIID: ${corporate?.fiid}`} actionName="Editar Corporativo" showButton={false} showBadge={true} badgeText={corporate?.status} />
            <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="inline-flex w-full justify-start rounded-xl bg-[var(--primary-foreground)] p-1.5">
                        <TabsTrigger
                            value="general"
                            className="gap-2 rounded-lg px-4 py-2 text-sm font-normal text-muted-foreground cursor-pointer transition-colors hover:text-foreground data-[state=active]:bg-background data-[state=active]:font-bold data-[state=active]:text-foreground data-[state=active]:shadow-sm after:hidden"
                        >
                            <Info className="size-4" />
                            Datos generales
                        </TabsTrigger>
                        <TabsTrigger
                            value="legal"
                            className="gap-2 rounded-lg px-4 py-2 text-sm font-normal text-muted-foreground cursor-pointer transition-colors hover:text-foreground data-[state=active]:bg-background data-[state=active]:font-bold data-[state=active]:text-foreground data-[state=active]:shadow-sm after:hidden"
                        >
                            <Gavel className="size-4" />
                            Datos legales
                        </TabsTrigger>
                        <TabsTrigger
                            value="contacts"
                            className="gap-2 rounded-lg px-4 py-2 text-sm font-normal text-muted-foreground cursor-pointer transition-colors hover:text-foreground data-[state=active]:bg-background data-[state=active]:font-bold data-[state=active]:text-foreground data-[state=active]:shadow-sm after:hidden"
                        >
                            <Contact className="size-4" />
                            Contactos
                        </TabsTrigger>
                        <TabsTrigger
                            value="commercial"
                            className="gap-2 rounded-lg px-4 py-2 text-sm font-normal text-muted-foreground cursor-pointer transition-colors hover:text-foreground data-[state=active]:bg-background data-[state=active]:font-bold data-[state=active]:text-foreground data-[state=active]:shadow-sm after:hidden"
                        >
                            <DollarSign className="size-4" />
                            Modelo comercial
                        </TabsTrigger>
                        <TabsTrigger
                            value="modules"
                            className="gap-2 rounded-lg px-4 py-2 text-sm font-normal text-muted-foreground cursor-pointer transition-colors hover:text-foreground data-[state=active]:bg-background data-[state=active]:font-bold data-[state=active]:text-foreground data-[state=active]:shadow-sm after:hidden"
                        >
                            <Package className="size-4" />
                            Modulos
                        </TabsTrigger>
                    </TabsList>


                    <TabsContent value="general" className="mt-6">
                        <Card className="border-border/60 mt-4">

                            <CardContent className="pt-0">
                                <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-4">
                                    <CorporateGeneralDetailsForm
                                        defaultValues={{
                                            rsa: corporate?.corporateData?.rsaKey ?? "",
                                            logoIndex: corporate?.corporateData?.logoIndex ?? "",
                                            logoTicket: corporate?.corporateData?.logoTicket ?? "",
                                            status: corporate?.status ?? "",
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="legal" className="mt-6">
                        sadfsdfsdf 123123
                    </TabsContent>

                    <TabsContent value="contacts" className="mt-6">
                        sdfsdf
                    </TabsContent>

                    <TabsContent value="commercial" className="mt-6">
                        sdfsdf
                    </TabsContent>

                    <TabsContent value="modules" className="mt-6">
                        sdfsdf
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
};

export default CorporateDetail;