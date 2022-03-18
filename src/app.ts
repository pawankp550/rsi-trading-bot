
import 'dotenv/config'
import { Update } from 'typegram';
import cron from 'node-cron';
import { Telegraf, Context } from 'telegraf';
import { getRsi } from './rsi';

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

bot.start(ctx => {
    ctx.reply('Welcome!')

    // cron job to run every minute
    cron.schedule('* * * * *', async () => {
        try {
            const rsi = await getRsi()
            ctx.reply(String(rsi))
        }
        catch (err) {
            console.log({rsi: err})  
        }
      });
})

bot.hears('stop', ctx => { 
    ctx.reply('Bot stopped.')
    bot.stop()}
)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))