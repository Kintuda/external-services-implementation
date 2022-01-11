import { injectable } from "inversify";
import axios from "axios";

import { CurrencyExchangeProvider } from "../../providers.interface";
import { CurrencyAPIGateway } from "./gateways/currency-api.gateway";

@injectable()
export class CurrencyAPIService implements CurrencyExchangeProvider {
  public readonly name = "currency-api";

  private readonly client = new axios.Axios({
    baseURL: "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest",
    headers: { "Content-type": "application/json" },
  });

  public async getExchangeRate(
    baseCurrency: string,
    currency: string
  ): Promise<number> {
    const { data } = await this.client.get<Record<string, string | number>>(
      `/currencies/${baseCurrency.toLowerCase()}/${currency.toLowerCase()}.json`
    );
    const gateway = new CurrencyAPIGateway(data);
    return gateway.exchangeRate(currency);
  }

  public async isAValidCurrency(currencyCode: string): Promise<boolean> {
    const { data } = await this.client.get<Record<string, string>>(
      `/currencies.json`
    );

    const gateway = new CurrencyAPIGateway(data);
    return gateway.isValid(currencyCode);
  }
}
