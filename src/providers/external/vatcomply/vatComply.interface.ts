export interface VatComplyRateResponse {
  date: string;
  base: string;
  rates: Record<string, number>;
}

export interface VatComplyCurrencyResponse {
  [x: string]: {
    name: string;
    symbol: string;
  };
}
