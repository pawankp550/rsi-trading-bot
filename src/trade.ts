import { MINIMUM_BALANCE, OrderType, RequiredBalanceDetails, TOKEN, TOKEN2 } from "./types";

export const generateTradeRequest = (
  orderType: OrderType,
  quantity: number,
  currentPrice: number
) => {
  const timeStamp = Math.floor(Date.now());
  return {
    side: orderType,
    order_type: "limit_order",
    market: `${TOKEN}${TOKEN2}`,
    price_per_unit: currentPrice.toString(),
    total_quantity: quantity,
    timestamp: timeStamp,
    client_order_id: `${timeStamp}-${orderType}_${quantity}`,
  };
};

export const getTradeData = (
  fundBalance: RequiredBalanceDetails,
  orderType: OrderType,
  currentPrice: number
) => {
  if (orderType === OrderType.Buy && Number(fundBalance[TOKEN2].balance) > MINIMUM_BALANCE) {
    // substract 0.5% from fund balance
    const quantityToBuy = (Number(fundBalance[TOKEN2].balance) * 0.95 ) / currentPrice;

    return {
      orderType,
      quantity: quantityToBuy.toFixed(1),
      price: currentPrice,
    };
  } else if (
    orderType === OrderType.Sell &&
    Number(fundBalance[TOKEN].balance) > 0
  ) {
    const quantityToSell = Number(fundBalance[TOKEN].balance);

    return {
      orderType,
      quantity: quantityToSell,
      price: currentPrice,
    };
  }
};
