export interface CurrencyExchangeProvider {
  name: string;
  getExchangeRate(baseCurrency: string, currency: string): Promise<number>;
  isAValidCurrency(currencyCode: string): Promise<boolean>;
}
