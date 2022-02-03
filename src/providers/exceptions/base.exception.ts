export abstract class BaseException {
  constructor(
    public readonly providerName: string,
    public readonly message: string,
    public readonly metadata?: Record<string, unknown>
  ) {}

  public abstract isProviderExeception(): boolean;
}
