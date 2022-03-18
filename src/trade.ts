import { OrderType, RequiredBalanceDetails } from "./types";

export const generateTradeRequest = (orderType: OrderType, quantity: number, currentPrice: number) => {
    const timeStamp = Math.floor(Date.now());
    return {
        "side": orderType,
        "order_type": "limit_order",
        "market": "USDTINR",
        "price_per_unit": currentPrice,
        "total_quantity": quantity,
        "timestamp": timeStamp,
        "client_order_id": `${timeStamp}-${orderType}_${quantity}`
    }
}


export const getTradeData = (fundBalance: RequiredBalanceDetails, orderType: OrderType, currentPrice: number) => {

    if(orderType === OrderType.Buy && Number(fundBalance.INR.balance) > 100) {
        const quantityToBuy = Number(fundBalance.INR.balance) / currentPrice;

        return {
            orderType,
            quantity: quantityToBuy,
            price: currentPrice
        }
    } else if(orderType === OrderType.Sell && Number(fundBalance.USDT.balance) > 0) {
        const quantityToSell = Number(fundBalance.USDT.balance);
        
        return {
            orderType,
            quantity: quantityToSell,
            price: currentPrice
        }
    }

    }