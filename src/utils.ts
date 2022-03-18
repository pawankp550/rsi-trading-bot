import { BalanceResponse, OrderType, RequiredBalanceDetails, RequiredTokens } from "./types";

export const getOrderType = (rsi: number): OrderType | undefined => {
    if (rsi < 35) {
        return OrderType.Buy;
    } else if (rsi > 60) {
        return OrderType.Sell;
    }
}

export const filterBalanceResponse = (balances: BalanceResponse[]): RequiredBalanceDetails => {
    return {
        USDT: balances.find(b => b.currency === RequiredTokens.USDT)!,
        INR: balances.find(b => b.currency === RequiredTokens.INR)!
    };
}