require('dotenv').config()
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });
console.log(process.env.TOKEN)
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    " سلام " + msg.chat.first_name + " به ربات ما خوش آمدید  ",
    {
      reply_markup: {
        keyboard: [
          ["خرید"],
          ["گزارش اکانت", "سوالات متداول", "آموزش"],
          ["پشتیبانی"],
        ],
        resize_keyboard: true,
      },
    }
  );
});

bot.on("message", (msg) => {
  switch (msg.text) {
    case "خرید":
      bot.sendMessage(msg.chat.id, "حاوی یک لینک خرید");
      break;
    case "آموزش":
      bot.sendMessage(msg.chat.id, " دیوایس مورد نظر را انتخاب کنید", {
        reply_markup: {
          keyboard: [["Windows", "Android", "iOS"], ["بازگشت"]],
          resize_keyboard: true,
        },
      });
      break;
    case "iOS":
      bot.sendMessage(msg.chat.id, "توضیحات آیفون");
      break;
    case "Windows":
      bot.sendMessage(msg.chat.id, "توضیحات ویندوز");
      break;
    case "Android":
      bot.sendMessage(msg.chat.id, "توضیحات اندروید");
      break;
    case "بازگشت":
      bot.sendMessage(
        msg.chat.id,
        " کاربر " + msg.chat.first_name + " گزینه‌ی مورد نظر را انتخاب کنید ",
        {
          reply_markup: {
            keyboard: [
              ["خرید"],
              ["گزارش اکانت", "سوالات متداول", "آموزش"],
              ["پشتیبانی"],
            ],
            resize_keyboard: true,
          },
        }
      );
      break;
    case "سوالات متداول":
      bot.sendMessage(msg.chat.id, "متنی در مورد سوالات متداول");
      break;
    case "گزارش اکانت":
      bot.sendMessage(msg.chat.id, "گزارش به کاربر");
      break;
    case "پشتیبانی":
      bot.sendMessage(
        msg.chat.id,
        "برای پشتیبانی میتوانید با آیدی زیر ارتباط برقرار کنید "
      );
      break;
  }
});
