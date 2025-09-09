/**
 * The direct shape of a data row from a HURDAT2 data set.
 */
export type HurdatDataRow = {
  y_m_d: string;

  hoursUTC_minutes: string;

  recordIdentifier: string;

  systemStatus: string;

  latitude_hemis: string;

  longitude_hemis: string;

  maxSusWind: string;

  minPressure: string;

  NE34: string;

  SE34: string;

  SW34: string;

  NW34: string;

  NE50: string;

  SE50: string;

  SW50: string;

  NW50: string;

  NE64: string;

  SE64: string;

  SW64: string;

  NW64: string;

  radiusMaxWind: string;
};
