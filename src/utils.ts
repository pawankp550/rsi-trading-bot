import {
  BalanceResponse,
  OrderType,
  RequiredBalanceDetails,
  TOKEN,
  TOKEN2,
} from "./types";

export const getOrderType = (rsi: number): OrderType | undefined => {
  if (rsi <= 30) {
    return OrderType.Buy;
  } else if (rsi >= 70) {
    return OrderType.Sell;
  }
};

export const filterBalanceResponse = (
  balances: BalanceResponse[]
): RequiredBalanceDetails => {
  return {
    [TOKEN]: balances.find((b) => b.currency === TOKEN)!,
    [TOKEN2]: balances.find((b) => b.currency === TOKEN2)!,
  };
};
