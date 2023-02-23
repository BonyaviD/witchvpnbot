require('dotenv').config() // don't delete it navid
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});
const consts = require("./consts");
const regex = require("./utils/regex");

const axios = require("axios");

bot.onText(/\/start/, (msg) => {

  bot.sendMessage(
    msg.chat.id,
    " کاربر " + msg.chat.first_name + " گزینه‌ی مورد نظر را انتخاب کنید ",
    {
      reply_markup: {
        keyboard: [["وضعیت اکانت"],
        ["پشتیبانی", "آموزش", "خرید"]],
        resize_keyboard: true,
      },
    }
  );
});

bot.on("message", (msg) => {
  if (regex.emailRegex.test(msg.text)) {
    bot.sendMessage(msg.chat.id, `منتظر بمانید...`)

    axios.post("https://witch.gndn.cf/api/v2/account", {
      "email": msg.text, "passwd": process.env.USER_PASSWORD
    }, {
      headers: {
        'XMPus-API-Token': process.env.API_TOKEN
      }
    }).then((res) => {
      if (res.data?.data?.traffic?.remaining)
        bot.sendMessage(msg.chat.id,
        `
        حجم باقی مانده: ${res.data?.data?.traffic.remaining}
        زمان اتمام: ${res.data?.data?.info?.expire}
        تعداد کاربران فعال: ${res.data?.data?.info?.onlineip}
        لینک کانفیگ: ${res.data?.data?.link}` , )
      
      else
        bot.sendMessage(msg.chat.id, `ایمیل پیدا نشد`)
    }).catch((err) => {
      bot.sendMessage(msg.chat.id, `ایمیل پیدا نشد`)
      console.log(err);
    })
  } 
})

bot.on("polling_error", console.log);

bot.on("message", (msg) => {
  switch (msg.text) {
    case "وضعیت اکانت":
      bot.sendMessage(msg.chat.id, "  ایمیل خود را وارد کنید ");
      break;
    case "خرید":
      bot.sendMessage(msg.chat.id, "  لینک خرید  ");
      break;
    case "پشتیبانی":
      bot.sendMessage(msg.chat.id, "  لینک تلگرام برای پشتیبانی");
      break;
    case "آموزش":
      bot.sendMessage(msg.chat.id, "لطفا سیستم عام خود رو انتخاب کنید", {
        reply_markup: {
          keyboard: [["Windows", "Android", "iOS"], ["بازگشت"]], resize_keyboard: true,
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
      bot.sendMessage(msg.chat.id, " کاربر " + msg.chat.first_name + " گزینه‌ی مورد نظر را انتخاب کنید ", consts.PANEL_FORM,);
      break;
  }
})