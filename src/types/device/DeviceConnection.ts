export interface DeviceConnection {
  posCorporation: string;
  posBusiness: string;
  posBranch?: string;
  posSerial: string;
  posBrand: string;
  posModel: string;
  connectionType?: string;
  wifiSignal?: number;
  wifiName?: string;
  gsmMobileSignal?: number;
  gsmSIMState?: string;
  ethernet?: string;
  networkInitialized?: string;
}
