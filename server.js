require('dotenv').config() // don't delete it navid
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});
const consts = require("./consts");
const regex = require("./utils/regex");
const Chat = require("./model/chatModel");
const mongoose = require("mongoose");
const axios = require("axios");


mongoose.connect('mongodb://127.0.0.1:27017/witch');

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

function requestAccount(emailEntered, msg) {
  axios.post("https://witch.gndn.cf/api/v2/account", {
    "email": emailEntered,
    "passwd": process.env.USER_PASSWORD
  }, {
    headers: {
      'XMPus-API-Token': process.env.API_TOKEN
    }
  }).then((res) => {
    if (res.data?.data?.traffic?.remaining) {
      Chat.create({chatId: msg.chat.id, email: emailEntered});
      bot.sendMessage(msg.chat.id,
        ` 
        🎩
        حجم کل: ${res.data?.data?.traffic.total}
        حجم مصرف شده: ${res.data?.data?.traffic.used}
        حجم باقی مانده: ${res.data?.data?.traffic.remaining}
        زمان اتمام: ${res.data?.data?.info?.expire}
        تعداد کاربران فعال: ${res.data?.data?.info?.onlineip}
        لینک کانفیگ:
         ${res.data?.data?.link} `,)
    } else
      bot.sendMessage(msg.chat.id, `یوزر با این نام پیدا نشد`)
  }).catch((err) => {
    bot.sendMessage(msg.chat.id, `یوزر با این نام پیدا نشد`)
    console.log(err);
  })
}

bot.on("message", (msg) => {
  if (regex.emailRegex.test(msg.text)) {
    const emailEntered = msg.text;
    requestAccount(emailEntered, msg);
  }
});

bot.on("polling_error", console.log);

bot.on("message", (msg) => {
  switch (msg.text) {
    case "وضعیت اکانت":
      Chat.findOne({chatId: msg.chat.id}, (err, chat) => {
        if (chat) {
          bot.sendMessage(msg.chat.id, `منتظر بمانید...`)
          requestAccount(chat.email, msg);
        } else {
          bot.sendMessage(msg.chat.id, `یوزر خود را وارد کنید`);
        }
      })
      break;
    case "خرید":
      bot.sendMessage(msg.chat.id, " این سرویس در حال حاضر فعال نمی‌باشد ...");
      break;
    case "پشتیبانی":
      bot.sendMessage(msg.chat.id, ` 
      برای پشتیبانی و اطلاعات بیشتر به کانال ویچ وی‌پی‌ان سربزنید

      @Witch_Net
    
      ` );
      break;
    case "آموزش":
      bot.sendMessage(msg.chat.id, "لطفا سیستم عامل خود رو انتخاب کنید", {
        reply_markup: {
          keyboard: [["Windows", "Android", "iOS"], ["بازگشت به پنل"]], resize_keyboard: true,
        },
      });
      break;
    case "iOS":
      bot.sendMessage(msg.chat.id, "برنامه‌ی مورد نظر را انتخاب کنید", {
        reply_markup: {
          keyboard: [["FairVPN", "ShadowRocket"], ["بازگشت به سیستم عامل"]], resize_keyboard: true,
        },
      });
      break;
      case "FairVPN":
        bot.sendMessage(msg.chat.id, " https://telegra.ph/iOS--Fair-VPN--آموزش-02-27 ");
        break;
        case "ShadowRocket":
          bot.sendMessage(msg.chat.id, " https://telegra.ph/iOS--Shadowrocket-02-27 ");
          break;
          case "بازگشت به سیستم عامل":
            bot.sendMessage(msg.chat.id, "لطفا سیستم عامل خود رو انتخاب کنید", {
              reply_markup: {
                keyboard: [["Windows", "Android", "iOS"], ["بازگشت به پنل"]], resize_keyboard: true,
              },
            });
            break;
          case "Windows":
      bot.sendMessage(msg.chat.id, " https://telegra.ph/Windows--v2ray-03-04 ");
      break;
    case "Android":
      bot.sendMessage(msg.chat.id, " https://telegra.ph/Android--v2rayNG-02-27 ");
      break;
    case "بازگشت به پنل":
      bot.sendMessage(msg.chat.id, " کاربر " + msg.chat.first_name + " گزینه‌ی مورد نظر را انتخاب کنید ", consts.PANEL_FORM,);
      break;
  }
})