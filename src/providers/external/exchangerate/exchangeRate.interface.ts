export interface ExchangeRateResponse extends BaseResponse {
  query: { from: string; to: string; amount: number };
  info: { rate: number };
  historical: boolean;
  date: string;
  result: number;
}

interface BaseResponse {
  motd: {
    msg: string;
    url: string;
  };
  success: boolean;
}

export interface ExchangeRateCurrencyResponse extends BaseResponse {
  symbols: { [key: string]: { description: string; code: string } };
}
