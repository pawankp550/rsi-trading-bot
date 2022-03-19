import {
  BalanceResponse,
  OrderType,
  RequiredBalanceDetails,
  RequiredTokens,
} from "./types";

export const getOrderType = (rsi: number): OrderType | undefined => {
  if (rsi < 35) {
    return OrderType.Buy;
  } else if (rsi > 60) {
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
