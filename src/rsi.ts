import {RSI} from 'technicalindicators';
import {getTradingData} from './APIClient';

const TIME_PERIOD = 14

export const getRsi = async () => {

    try {
        const data = await getTradingData()

        if(data) {
        const currentPrice = data[0].close
        const rsi = RSI.calculate({
            values: data.reverse().map((d) => d.close),
            period: TIME_PERIOD
        })
        return {rsi: rsi[rsi.length - 1], currentPrice}
     } else {
        return {rsi: Infinity, currentPrice: Infinity}
     }
    }
    catch (err) {
        console.log({getRsi: err});
    }
}