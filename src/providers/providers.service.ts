import { inject, injectable } from "inversify";
import { CurrencyIsInvalid } from "./exceptions/currency-is-invalid.exception";

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
    currency: string,
    skipValidation = false
  ): Promise<number> {
    if (!skipValidation) {
      const isValid = await this.exchangeProvider.isAValidCurrency(currency);

      if (!isValid) {
        throw new CurrencyIsInvalid(
          this.exchangeProvider.name,
          `${currency} is a invalid currency code`
        );
      }
    }

    const result = await this.exchangeProvider.getExchangeRate(base, currency);

    return result;
  }
}
