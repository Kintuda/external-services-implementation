import "reflect-metadata";
import { Container } from "inversify";

import { ExchangeRateHostAPIService } from "./providers/external/exchangerate/exchangeRate.service";
// import { CurrencyAPIService } from "./providers/external/currency-api/currency-api.service";

import { ProviderService } from "./providers/providers.service";
import {
  CURRENCY_PROVIDER,
  PROVIDER_SERVICE,
} from "./providers/providers.type";
import type { CurrencyExchangeProvider } from "./providers/providers.interface";

const container = new Container();
container
  .bind<CurrencyExchangeProvider>(CURRENCY_PROVIDER)
  .to(ExchangeRateHostAPIService);
container.bind<ProviderService>(PROVIDER_SERVICE).to(ProviderService);

export { container };
