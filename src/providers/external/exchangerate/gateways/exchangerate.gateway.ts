import currencyJS from "currency.js";
import { CurrencyIsInvalid } from "../../../exceptions/currency-is-invalid.exception";
import type { ExchangeRateResponse } from "../exchangeRate.interface";

export class ExchangeRateGateway {
  private readonly response: ExchangeRateResponse;

  constructor(response: ExchangeRateResponse) {
    this.response = this.parserBody(response);
  }

  public parserBody(
    response: ExchangeRateResponse | string
  ): ExchangeRateResponse {
    if (typeof response === "string") {
      return JSON.parse(response) as ExchangeRateResponse;
    }

    return response;
  }

  public exchangeRate(): number {
    if (!this.response.result) {
      throw new CurrencyIsInvalid("exchange-rate", "currency is invalid");
    }
    return currencyJS(this.response.result, { precision: 7 }).value;
  }
}
