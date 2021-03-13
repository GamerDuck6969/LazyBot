const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    UserID: { type: String, require: true, unique: true },
    ServerID: { type: String, require: true },
    Ticket: { type: Array, require: true },
    Resolved: { type: Boolean, require: true},
});

const ticketModel = mongoose.model('TicketSchema', ticketSchema);