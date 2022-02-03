import { BaseException } from "./base.exception";

export class CurrencyIsInvalid extends BaseException {
  constructor(
    provider: string,
    message: string,
    metadata?: Record<string, unknown>
  ) {
    super(provider, message, metadata);
  }

  public isProviderExeception(): boolean {
    return true;
  }
}
