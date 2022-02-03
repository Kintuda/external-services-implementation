import currencyJS from "currency.js";
import type { VatComplyRateResponse } from "../vatComply.interface";

export class VatComplyAPIRateGateway {
  private readonly response: VatComplyRateResponse;

  constructor(response: VatComplyRateResponse) {
    this.response = response;
  }

  public exchangeRate(currency: string): number {
    const formatted = currency.toLowerCase();
    const exchange = this.response.rates[formatted];

    if (!exchange) {
      throw new Error(`${currency} is not valid`);
    }

    return currencyJS(exchange, { precision: 7 }).value;
  }
}
