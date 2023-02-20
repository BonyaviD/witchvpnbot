require('dotenv').config() // don't delete it navid
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});
const consts = require("./consts");
const regex = require("./utils/regex");

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, " سلام " + msg.chat.first_name + " لطفا ایمیل خود را وارد کنید",)
});

bot.on("message", (msg) => {
  if(regex.emailRegex.test(msg.text)){
    var myHeaders = new Headers();
    myHeaders.append("XMPus-API-Token", "76841732e7f9261ebb995d32e3c68640");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "app=rtbc6or759c7csuk6pt1di3ru6");

    var raw = JSON.stringify({
      "email": "milad.d3@gmail.com",
      "passwd": "*4%js%CBnJ^"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://witch.gndn.cf/api/v2/account", requestOptions)
      .then(response =>
      console.log(response.json())
      )
      .catch(error => console.log('error: ', error));
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
      bot.sendMessage(msg.chat.id, "لطفا سیستم عام خود رو انتخاب کنید",
        {
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
        consts.PANEL_FORM,
      );
      break;
  }
})