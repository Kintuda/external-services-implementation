import type { ExchangeRateCurrencyResponse } from "../exchangeRate.interface";

export class ExchangeRateCurrencyGateway {
  constructor(private readonly response: ExchangeRateCurrencyResponse) {}

  public isValid(code: string): boolean {
    if (!this.response.success) {
      return false;
    }

    return code in this.response.symbols;
  }
}
