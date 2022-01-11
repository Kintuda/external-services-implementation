import currencyJS from "currency.js";

export class CurrencyAPIGateway {
  private readonly response: Record<string, string | number>;

  constructor(response: string | Record<string, unknown>) {
    this.response = this.parseResponse(response);
  }

  public parseResponse(response: string | Record<string, unknown>) {
    const isString = typeof response === "string";

    if (isString) {
      return JSON.parse(response);
    }

    return response;
  }

  public exchangeRate(currency: string): number {
    const formatted = currency.toLowerCase();
    const exchange = this.response[formatted];

    if (!exchange) {
      throw new Error(`${currency} is not valid`);
    }

    return currencyJS(exchange, { precision: 7 }).value;
  }

  public isValid(currency: string): boolean {
    const currencies = Object.keys(this.response);
    const formatted = currency.toLowerCase();

    return currencies.includes(formatted);
  }
}
