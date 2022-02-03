import { injectable } from "inversify";
import axios from "axios";

import { CurrencyExchangeProvider } from "../../providers.interface";
import {
  ExchangeRateCurrencyResponse,
  ExchangeRateResponse,
} from "./exchangeRate.interface";
import { ExchangeRateGateway } from "./gateways/exchangerate.gateway";
import { ExchangeRateCurrencyGateway } from "./gateways/exchangerate-currency.gateway";

@injectable()
export class ExchangeRateHostAPIService implements CurrencyExchangeProvider {
  public readonly name = "exchange-rate-host";

  private readonly client = new axios.Axios({
    baseURL: "https://api.exchangerate.host",
    headers: { "Content-Type": "application/json" },
  });

  public async getExchangeRate(
    baseCurrency: string,
    currency: string
  ): Promise<number> {
    const { data } = await this.client.get<ExchangeRateResponse>(
      `convert?from=${baseCurrency}&to=${currency}`,
      { headers: { "Content-Type": "application/json" } }
    );
    const gateway = new ExchangeRateGateway(data);
    return gateway.exchangeRate();
  }

  public async isAValidCurrency(currencyCode: string): Promise<boolean> {
    const { data } = await this.client.get<ExchangeRateCurrencyResponse>(
      `/symbols`
    );

    const gateway = new ExchangeRateCurrencyGateway(data);
    return gateway.isValid(currencyCode);
  }
}
