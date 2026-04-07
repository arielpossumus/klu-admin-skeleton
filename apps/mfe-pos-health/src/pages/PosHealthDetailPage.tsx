import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from "@/components/text/SectionTitle";
import { UsageRadial } from "@/components/charts/UsageRadial";
import { ChargeLevelRadial } from "@/components/charts/ChargeLevelRadial";
import WifiSignalIndicator from "@/components/charts/WifiSignalIndicator";
import EmptyCardLoader from "@/components/loaders/EmptyCardLoader";
import { formatKBtoMB } from "@/lib/format";
import {
  Monitor,
  ScreenShareOff,
  Globe,
  GlobeLock,
  Smartphone,
  Battery,
  Printer,
  Wifi,
  CardSim,
  MemoryStick,
} from "lucide-react";
import type { DeviceByIdPayload } from "@/types/device/DeviceByIdPayload";
import { DetailRow } from "@/components/text/detailRow";
import { CustomCard } from "@/components/commons/CustomCard";
import { getDeviceById } from "@/services/posHealt/getDeviceById";

const formatValue = (value: unknown): string => {
  if (value === undefined || value === null) return "—";
  if (typeof value === "boolean") return value ? "Sí" : "No";
  return String(value);
};

const emptyPayload = (): DeviceByIdPayload => ({
  dispositivo: {},
  bateria: {},
  impresora: {},
  conexion: {},
});

const PosHealthDetailPage = () => {
  const { serialId } = useParams<{ serialId: string }>();
  const serialDevice = serialId ?? "";

  const { data: deviceData, isPending, isError } = useQuery({
    queryKey: ["posHealth", "deviceById", serialDevice],
    queryFn: () => getDeviceById(serialDevice),
    enabled: serialDevice.trim() !== "",
  });

  const payload = deviceData ?? emptyPayload();
  const device = payload.dispositivo;
  const battery = payload.bateria as Record<string, unknown>;
  const printer = payload.impresora as Record<string, unknown>;
  const connection = payload.conexion as Record<string, unknown>;

  const titleText =
    `${device.posBrand ?? ""} ${device.posModel ?? ""}`.trim() || "Detalle del dispositivo";

  if (!serialDevice.trim()) {
    return (
      <div className="flex flex-1 flex-col">
        <SectionTitle
          title="Serial no indicado"
          subtitle="No hay identificador de dispositivo en la ruta."
          actionName="Editar Dispositivo"
          showButton={false}
          showBadge={false}
        />
        <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              Volvé al listado de POS Health y elegí un dispositivo para ver el detalle.
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-1 flex-col">
        <SectionTitle
          title="Cargando…"
          subtitle={`Serial: ${serialDevice}`}
          actionName="Editar Dispositivo"
          showButton={false}
          showBadge={false}
        />
        <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
          <EmptyCardLoader
            title="Cargando datos del dispositivo"
            description="Por favor espere mientras cargamos los datos. No actualice la página."
            okIcon={false}
          />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 flex-col">
        <SectionTitle
          title="Error al cargar"
          subtitle={`Serial: ${serialDevice}`}
          actionName="Editar Dispositivo"
          showButton={false}
          showBadge={false}
        />
        <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              No se pudieron obtener los datos del dispositivo. Comprobá la conexión y el mock en el host
              (`mockups/pos/getDeviceById.json`).
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <SectionTitle
        title={titleText}
        subtitle={`Serial: ${serialDevice}`}
        actionName="Editar Dispositivo"
        showButton={false}
        showBadge={false}
      />

      <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(260px,28%)_1fr] items-start">
          {/* Columna izquierda: gráficos e indicadores */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <CustomCard
                title="Wifi"
                icon={<Wifi className="size-3.5" aria-hidden />}
              >
                <Card className="border-border/60 ">
                  <CardContent className="flex flex-col items-center">
                    <WifiSignalIndicator
                      value={Number(connection.wifiSignal ?? 0)}
                      networkName={formatValue(connection.wifiName)}
                    />
                  </CardContent>
                </Card>
              </CustomCard>

              <CustomCard
                title="GSM"
                icon={<CardSim className="size-3.5" aria-hidden />}
              >
                <Card className="border-border/60">
                  <CardContent className="flex flex-col items-center ">
                    <WifiSignalIndicator
                      value={Number(connection.gsmMobileSignal ?? 0)}
                      networkName={formatValue(connection.mobileOperatorName)}
                    />
                  </CardContent>
                </Card>
              </CustomCard>

              <CustomCard
                title="Ethernet"
                icon={<Monitor className="size-3.5" aria-hidden />}
              >
                <Card className="border-border/60">
                  <CardContent className="flex flex-col items-center gap-1 ">
                    {String(connection.ethernet).toUpperCase() === "SÍ" ||
                    String(connection.ethernet).toUpperCase() === "SI" ? (
                      <Monitor
                        className="size-10 text-green-500"
                        aria-hidden
                      />
                    ) : (
                      <ScreenShareOff
                        className="size-10 text-red-500"
                        aria-hidden
                      />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {formatValue(connection.ethernet)}
                    </span>
                  </CardContent>
                </Card>
              </CustomCard>

              <CustomCard
                title="Red inicializada"
                icon={<Globe className="size-3.5" aria-hidden />}
              >
                <Card className="border-border/60">
                  <CardContent className="flex flex-col items-center gap-1">
                    {String(connection.networkInitialized)
                      .toUpperCase() === "SÍ" ||
                    String(connection.networkInitialized)
                      .toUpperCase() === "SI" ? (
                      <Globe className="size-10 text-green-500" aria-hidden />
                    ) : (
                      <GlobeLock className="size-10 text-red-500" aria-hidden />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {formatValue(connection.networkInitialized)}
                    </span>
                  </CardContent>
                </Card>
              </CustomCard>

              <CustomCard
                title="SIM presente"
                icon={<CardSim className="size-3.5" aria-hidden />}
              >
                <Card className="border-border/60">
                  <CardContent className="flex flex-col items-center gap-1 pt-6">
                    {connection.gsmSIMPresent === true ||
                    String(connection.gsmSIMPresent).toUpperCase() === "SÍ" ||
                    String(connection.gsmSIMPresent).toUpperCase() === "SI" ? (
                      <CardSim
                        className="size-10 text-[var(--success-dark)]"
                        aria-hidden
                      />
                    ) : (
                      <CardSim
                        className="size-10 text-[var(--error-dark)]"
                        aria-hidden
                      />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {formatValue(connection.gsmSIMPresent)}
                    </span>
                  </CardContent>
                </Card>
              </CustomCard>

              <CustomCard
                title="Estado impresora"
                icon={<Printer className="size-3.5" aria-hidden />}
              >
                <Card className="border-border/60">
                  <CardContent className="flex flex-col items-center gap-1 pt-6">
                    {printer.printerState === "Sin error" ? (
                      <Printer
                        className="size-10 text-[var(--success-dark)]"
                        aria-hidden
                      />
                    ) : (
                      <Printer
                        className="size-10 text-[var(--error-dark)]"
                        aria-hidden
                      />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {formatValue(printer.printerState)}
                    </span>
                  </CardContent>
                </Card>
              </CustomCard>
            </div>

            <CustomCard
              title="Almacenamiento"
              icon={<MemoryStick className="size-3.5" aria-hidden />}
            >
              <Card className="border-border/60">
                <CardContent className="grid grid-cols-1 gap-6 pt-0 sm:grid-cols-2 place-items-center">
                  <UsageRadial
                    total={Number(device.totalRAM) || 1}
                    used={Number(device.usedRam) || 0}
                    label="RAM"
                    displayTotal={formatKBtoMB(device.totalRAM)}
                    displayUsed={formatKBtoMB(device.usedRam)}
                  />
                  <UsageRadial
                    total={Number(device.totalFlash) || 1}
                    used={Number(device.usedFlash) || 0}
                    label="FLASH"
                    displayTotal={formatKBtoMB(device.totalFlash)}
                    displayUsed={formatKBtoMB(device.usedFlash)}
                  />
                </CardContent>
              </Card>
            </CustomCard>

            <CustomCard
              title="Nivel de carga"
              icon={<Battery className="size-3.5" aria-hidden />}
            >
              <Card className="border-border/60">
                <CardContent className="flex flex-col items-center pt-0">
                  <ChargeLevelRadial
                    value={Number(battery.chargeLevel ?? 0)}
                  />
                </CardContent>
              </Card>
            </CustomCard>
          </div>

          {/* Columna derecha: datos del dispositivo */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-4">
            <CustomCard
              title="Dispositivo"
              icon={<Smartphone className="size-3.5" aria-hidden />}
            >
              <Card className="border-border/60">
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 md:grid-cols-4">
                    <DetailRow label="Propietario" value={device.owner} />
                    <DetailRow
                      label="Certificado"
                      value={device.certificateType}
                    />
                    <DetailRow
                      label="Estado daño"
                      value={device.tamperStatus}
                    />
                    <DetailRow
                      label="Sistema operativo"
                      value={device.operativeSystem}
                    />
                    <DetailRow label="SDK" value={device.sdkVersion} />
                    <DetailRow
                      label="Lecturas MSR"
                      value={device.msrReadCount}
                    />
                    <DetailRow
                      label="Lecturas chip"
                      value={device.chipReadCount}
                    />
                    <DetailRow
                      label="Track 1"
                      value={device.msrTrack1ErrorCounter}
                    />
                    <DetailRow
                      label="Track 2"
                      value={device.msrTrack2ErrorCounter}
                    />
                    <DetailRow
                      label="Track 3"
                      value={device.msrTrack3ErrorCounter}
                    />
                    <DetailRow
                      label="Chip error"
                      value={device.chipReadError}
                    />
                  </div>
                </CardContent>
              </Card>
            </CustomCard>

            <CustomCard
              title="Batería"
              icon={<Battery className="size-3.5" aria-hidden />}
            >
              <Card className="border-border/60">
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-4">
                    <DetailRow
                      label="Batería disponible"
                      value={battery.batteryAvailable}
                    />
                    <DetailRow
                      label="Estado"
                      value={battery.batteryStatus}
                    />
                    <DetailRow
                      label="Voltaje"
                      value={battery.voltage}
                    />
                    <DetailRow
                      label="Capacidad"
                      value={battery.capacity}
                    />
                    <DetailRow
                      label="Temperatura"
                      value={battery.temperature}
                    />
                    <DetailRow
                      label="Estado batería interna"
                      value={battery.internalBatteryStatus}
                    />
                    <DetailRow
                      label="Voltaje batería interna"
                      value={battery.internalBatteryVoltage}
                    />
                    <DetailRow
                      label="Cargando"
                      value={battery.charging}
                    />
                    <DetailRow
                      label="Conectada"
                      value={battery.connected}
                    />
                  </div>
                </CardContent>
              </Card>
            </CustomCard>

            <CustomCard
              title="Impresora"
              icon={<Printer className="size-3.5" aria-hidden />}
            >
              <Card className="border-border/60">
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-4">
                    <DetailRow
                      label="Impresora disponible"
                      value={printer.printerAvailable}
                    />
                    <DetailRow label="Temperatura" value={printer.temperature} />
                    <DetailRow
                      label="Voltaje cabezal"
                      value={printer.headVoltage}
                    />
                  </div>
                </CardContent>
              </Card>
            </CustomCard>

            <CustomCard
              title="Conexión"
              icon={<Wifi className="size-3.5" aria-hidden />}
            >
              <Card className="border-border/60">
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-4">
                    <DetailRow
                      label="Calidad GSM"
                      value={connection.gsmQuality}
                    />
                    <DetailRow
                      label="Tasa de error"
                      value={connection.errorRate}
                    />
                  </div>
                </CardContent>
              </Card>
            </CustomCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosHealthDetailPage;

