/** Objeto con los datos de la batería (detalle / getDeviceById.bateria) */
export interface BatteryDetail {
  chargeLevel?: number;
  charging?: boolean;
  connected?: boolean;
  batteryAvailable?: string;
  batteryStatus?: string;
  hasBattery?: boolean;
  voltage?: string;
  capacity?: string;
  internalBatteryStatus?: string;
  internalBatteryVoltage?: string;
  temperature?: string;
}
