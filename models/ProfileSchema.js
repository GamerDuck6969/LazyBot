const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    UserID: { type: String, require: true, unique: true},
    ServerID: { type: String, require: true},
    coins: { type: Number, default: 1000},
    bank: { type: Number, default: 1000},
    tier: { type: Number, default: 1},
    power: { type: Number, default: 100},
    hourly: { type: Number, default: 100},
    workers: { type: Number},
    miners: { type: Number},
    bots: { type: Number},
    inventory: { type: Array},
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;