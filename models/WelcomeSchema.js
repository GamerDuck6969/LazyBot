const mongoose = require('mongoose');

const welcomeSchema = new mongoose.Schema({
    ServerID: { type: String, require: true },
    ChannelID: { type: String, require: true },
});

const welcomeModel = module.exports = mongoose.model('WelcomeSchema', welcomeSchema);