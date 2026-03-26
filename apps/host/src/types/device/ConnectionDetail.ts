export interface ConnectionDetail {
  wifiSignal?: number;
  wifiName?: string;
  gsmMobileSignal?: number;
  mobileOperatorName?: string;
  gsmSIMPresent?: string;
  gsmSIMState?: string;
  ethernet?: string;
  networkInitialized?: string;
}
