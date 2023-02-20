require('dotenv').config() // don't delete it navid
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});
const consts = require("./consts");
const regex = require("./utils/regex");
const axios = require("axios");

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, " سلام " + msg.chat.first_name + " لطفا ایمیل خود را وارد کنید",)
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
      bot.sendMessage(msg.chat.id, `حجم باقی مانده: ${res.data?.data?.traffic.remaining}`)
    }).catch((err) => {
      console.log(err);
    })
  }
})

bot.on("polling_error", console.log);

bot.on("message", (msg) => {
  switch (msg.text) {
    case "وضعیت اکانت":
      bot.sendMessage(msg.chat.id, "Api");
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