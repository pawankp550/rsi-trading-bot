import {RSI} from 'technicalindicators';
import {getTradingData} from './APIClient';

const TIME_PERIOD = 14

export const getRsi = async () => {

    try {
        const data = await getTradingData()
        const rsi = RSI.calculate({
            values: data,
            period: TIME_PERIOD
        })
        return rsi[rsi.length - 1]
    }
    catch (err) {
        console.log({getRsi: err});
    }
}