export interface DeviceByIdPayload {
  dispositivo: {
    totalRAM?: number;
    totalFlash?: number;
    usedRam?: number;
    usedFlash?: number;
    certificateType?: string;
    tamperStatus?: string;
    posBrand?: string;
    posModel?: string;
    posSerial?: string;
    operativeSystem?: string;
    owner?: string;
    sdkVersion?: string;
    msrReadCount?: number;
    msrTrack1ErrorCounter?: number;
    msrTrack2ErrorCounter?: number;
    msrTrack3ErrorCounter?: number;
    chipReadCount?: number;
    chipReadError?: number;
  };
  bateria: Record<string, unknown>;
  impresora: Record<string, unknown>;
  conexion: Record<string, unknown>;
}
