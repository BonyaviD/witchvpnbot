const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  chatId: {
    type: String,
  },
  email: {
    type: String,
  }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
