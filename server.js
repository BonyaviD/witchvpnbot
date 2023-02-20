const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, " سلام " + msg.chat.first_name + " لطفا ایمیل خود را وارد کنید",)
});

bot.on("message", (msg) => {
  if (msg.text === "email")
    bot.sendMessage(msg.chat.id, "به پنل خوش آمدید",
    {
      reply_markup: {
        keyboard: [["وضعیت اکانت"],
          ["پشتیبانی", "آموزش", "خرید"]],
        resize_keyboard: true,
      },
    })
  else if (msg.text !== "/start"
    && msg.text !== "email"
    && msg.text !== "وضعیت اکانت"
    && msg.text !== "خرید"
    && msg.text !== "آموزش"
    && msg.text !== "پشتیبانی"
    && msg.text !== "iOS"
    && msg.text !== "Windows"
    && msg.text !== "Android"
    && msg.text !== "بازگشت")
    bot.sendMessage(msg.chat.id, "ایمیل یافت نشد")

})

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
        {
          reply_markup: {
            keyboard: [["وضعیت اکانت"],
              ["پشتیبانی", "آموزش", "خرید"]],
            resize_keyboard: true,
          },
        }
      );
      break;
  }
})