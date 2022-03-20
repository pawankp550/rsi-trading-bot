import {
  BalanceResponse,
  INR,
  OrderType,
  RequiredBalanceDetails,
  TOKEN,
} from "./types";

export const getOrderType = (rsi: number): OrderType | undefined => {
  if (rsi < 36) {
    return OrderType.Buy;
  } else if (rsi > 56) {
    return OrderType.Sell;
  }
};

export const filterBalanceResponse = (
  balances: BalanceResponse[]
): RequiredBalanceDetails => {
  return {
    [TOKEN]: balances.find((b) => b.currency === TOKEN)!,
    INR: balances.find((b) => b.currency === INR)!,
  };
};
