export const TOKEN = 'USDT'
export const INR = 'INR'

export interface CandlesResponse {
  readonly open: number;
  readonly high: number;
  readonly low: number;
  readonly volume: number;
  readonly close: number;
  readonly time: number;
}

export interface BalanceResponse {
  readonly balance: string;
  readonly locked_balance: string;
  readonly currency: string;
}

export enum OrderType {
  Buy = "buy",
  Sell = "sell",
}

export interface RequiredBalanceDetails {
  readonly [TOKEN]: BalanceResponse;
  readonly INR: BalanceResponse;
}

export interface TradeResponseData {
  readonly id: string;
  readonly client_order_id: string;
  readonly market: string;
  readonly order_type: string;
  readonly side: string;
  readonly status: string;
  readonly fee_amount: number;
  readonly fee: number;
  readonly total_quantity: number;
  readonly remaining_quantity: number;
  readonly avg_price: number;
  readonly price_per_unit: number;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface TradeResponse {
  readonly orders: TradeResponseData;
}
