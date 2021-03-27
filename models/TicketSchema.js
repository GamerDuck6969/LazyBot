const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    UserID: String,
    GuildID: String,
    TicketArray: Array
});

const ticketModel = module.exports = mongoose.model('Tickets', ticketSchema);