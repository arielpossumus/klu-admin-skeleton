/** Objeto con los datos del dispositivo (detalle / getDeviceById.dispositivo) */
export interface DeviceDetail {
  totalRAM?: number;
  totalFlash?: number;
  usedRam?: number;
  usedFlash?: number;
  owner?: string;
  certificateType?: string;
  tamperStatus?: string;
  operativeSystem?: string;
  sdkVersion?: string;
  msrReadCount?: number;
  chipReadCount?: number;
  msrTrack1ErrorCounter?: number;
  msrTrack2ErrorCounter?: number;
  msrTrack3ErrorCounter?: number;
  chipReadError?: number;
}
