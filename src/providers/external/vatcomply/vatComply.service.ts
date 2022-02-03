import { injectable } from "inversify";
import axios from "axios";

import { CurrencyExchangeProvider } from "../../providers.interface";
import { VatComplyAPIRateGateway } from "./gateways/vatComply.gateway";
import { VatComplyAPICurrencyGateway } from "./gateways/vatComply-currency.gateway";
import type { VatComplyCurrencyResponse, VatComplyRateResponse } from "./vatComply.interface";

@injectable()
export class VatComplyAPIService implements CurrencyExchangeProvider {
  public readonly name = "vat-comply";

  private readonly client = new axios.Axios({
    baseURL: "https://api.vatcomply.com",
    headers: { "Content-type": "application/json" },
  });

  public async getExchangeRate(
    baseCurrency: string,
    currency: string
  ): Promise<number> {
    const { data } = await this.client.get<VatComplyRateResponse>(
      `/rates/base=${baseCurrency.toLowerCase()}`
    );
    const gateway = new VatComplyAPIRateGateway(data);
    return gateway.exchangeRate(currency);
  }

  public async isAValidCurrency(currencyCode: string): Promise<boolean> {
    const { data } = await this.client.get<VatComplyCurrencyResponse>(
      `/currencies.json`
    );

    const gateway = new VatComplyAPICurrencyGateway(data);
    return gateway.isValid(currencyCode);
  }
}
