import axios from 'axios';

export const getTradingData = async () => {
    try {
        const res = await axios.get('https://public.coindcx.com/market_data/candles?pair=I-USDT_INR&interval=1d&limit=500');
        return res.data.reverse().map((d: any) => d.close);
    }
    catch (err) {
        console.log({getTradingData: err});
    }
}
