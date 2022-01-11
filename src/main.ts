import "reflect-metadata";
import { ProviderService } from "./providers/providers.service";
import { container } from './container';
import { PROVIDER_SERVICE } from "./providers/providers.type";

(async () => {
  try {
    const service = container.get<ProviderService>(PROVIDER_SERVICE);
    const exchangeRate = await service.getCurrencyValue('BRL', 'USD');
    console.log(exchangeRate);
  } catch (error) {
    console.error(error);
    throw error;
  }
})();
