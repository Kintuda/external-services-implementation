import type { VatComplyCurrencyResponse } from "../vatComply.interface";

export class VatComplyAPICurrencyGateway {
  constructor(private readonly response: VatComplyCurrencyResponse) {}

  public isValid(currency: string): boolean {
    const formatted = currency.toUpperCase();
    const exchange = this.response[formatted];

    if (!exchange) {
      return false;
    }

    return false;
  }
}
