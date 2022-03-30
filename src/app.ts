
import 'dotenv/config'
import { Update } from 'typegram';
import cron from 'node-cron';
import { Telegraf, Context } from 'telegraf';
import { getRsi } from './rsi';
import { getOrderType } from './utils';
import { getBalances, tradeRequest } from './APIClient';
import { getTradeData } from './trade';

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);
let cronJob: cron.ScheduledTask;

bot.start(ctx => {
    ctx.reply('Starting bot...');
    console.log('Starting bot...');

    // cron job to run every minute
    cronJob = cron.schedule('* * * * *', async () => {
        try {
            const data = await getRsi()
            if (data && data.rsi && data.currentPrice) {
                const fundBalance =  await getBalances()
                const orderType = getOrderType(data.rsi)
                if (orderType && fundBalance) {
                    const tradeData = getTradeData(fundBalance, orderType, data.currentPrice)
                    tradeData && ctx.reply(String(data.rsi))
                    if (tradeData) {
                        const tradeResponse = await tradeRequest(tradeData.orderType, Number(tradeData.quantity), tradeData.price)
                        if(tradeResponse) {
                            ctx.reply(JSON.stringify(tradeResponse))
                        }
                        if(!tradeResponse) {
                            ctx.reply('Trade Failed')
                        }
                    }
                }

                
            }
            
        }
        catch (err) {
            console.log({rsi: err})  
        }
      });
})

bot.hears('stop', ctx => { 
    try {
        // stop cron job
        console.log('Stopping cron job...');
        cronJob.stop()
        ctx.reply('Stopped')
    }
    catch (err) {
        console.log({stop: err})
    }
}
)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))