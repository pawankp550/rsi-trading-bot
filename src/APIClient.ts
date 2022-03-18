import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import crypto, { BinaryLike, KeyObject } from 'crypto' 
import { generateTradeRequest } from './trade';
import { BalanceResponse, CandlesResponse, OrderType, RequiredBalanceDetails, TradeResponse } from './types';
import { filterBalanceResponse } from './utils';

const baseURL = "https://api.coindcx.com"

export const getTradingData = async () => {
    try {
        const res: AxiosResponse<CandlesResponse[], void> = await axios.get('https://public.coindcx.com/market_data/candles?pair=I-USDT_INR&interval=1d&limit=500');
        return res.data;
    }
    catch (err) {
        console.log({getTradingData: err});
    }
}

export const getBalances = async (): Promise<RequiredBalanceDetails | undefined> => {
    try {
        const timeStamp = Math.floor(Date.now());
    const body = {
        "timestamp": timeStamp
    }
    
    const payload = new Buffer(JSON.stringify(body)).toString();
    const signature = crypto.createHmac('sha256', process.env.SECRETE as BinaryLike | KeyObject).update(payload).digest('hex')
    
    const config: AxiosRequestConfig = {
      headers: {
            'X-AUTH-APIKEY': process.env.KEY!,
            'X-AUTH-SIGNATURE': signature
        }
    }
    
    const res: AxiosResponse<BalanceResponse[]>  = await axios.post( `${baseURL}/exchange/v1/users/balances`, body, config)
    return filterBalanceResponse(res.data);

    }
    catch (err) {
        console.log({getBalances: err});
    }
}

export const tradeRequest = async (orderType: OrderType, quantity: number, currentPrice: number) => {
    try {
    const body = generateTradeRequest(orderType, quantity, currentPrice);
    
    const payload = new Buffer(JSON.stringify(body)).toString();
    const signature = crypto.createHmac('sha256', process.env.SECRETE as BinaryLike | KeyObject).update(payload).digest('hex')
    
    const config: AxiosRequestConfig = {
      headers: {
            'X-AUTH-APIKEY': process.env.KEY!,
            'X-AUTH-SIGNATURE': signature
        }
    }
    
    const res: AxiosResponse<TradeResponse[]>  = await axios.post( `${baseURL}/exchange/v1/orders/create`, body, config)
    return res.data;

    }
    catch (err) {
        console.log({tradeRequest: err});
    }

}