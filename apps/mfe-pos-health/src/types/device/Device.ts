export interface Device {
  posId: number;
  posCorporation: string;
  posBusiness: string;
  posBranch?: string;
  posSerial: string;
  posBrand: string;
  posModel: string;
  usedFlash: number;
  usedRam: number;
  certificateType: string;
  tamperStatus: string;
}
