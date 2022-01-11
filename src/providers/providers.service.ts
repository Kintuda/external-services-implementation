import { inject, injectable } from "inversify";

import { CurrencyExchangeProvider } from "./providers.interface";
import { CURRENCY_PROVIDER } from "./providers.type";

@injectable()
export class ProviderService {
  constructor(
    @inject(CURRENCY_PROVIDER)
    private readonly exchangeProvider: CurrencyExchangeProvider
  ) {}

  public async getCurrencyValue(
    base: string,
    currency: string
  ): Promise<number> {
    const isValid = await this.exchangeProvider.isAValidCurrency(currency);

    if (!isValid) {
      throw new Error(`${currency} is a invalid currency code`);
    }

    const result = await this.exchangeProvider.getExchangeRate(base, currency);

    return result;
  }
}
