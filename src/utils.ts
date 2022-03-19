import {
  BalanceResponse,
  OrderType,
  RequiredBalanceDetails,
  RequiredTokens,
} from "./types";

export const getOrderType = (rsi: number): OrderType | undefined => {
  if (rsi < 36) {
    return OrderType.Buy;
  } else if (rsi > 59) {
    return OrderType.Sell;
  }
};

export const filterBalanceResponse = (
  balances: BalanceResponse[]
): RequiredBalanceDetails => {
  return {
    USDC: balances.find((b) => b.currency === RequiredTokens.USDC)!,
    INR: balances.find((b) => b.currency === RequiredTokens.INR)!,
  };
};
