const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
const Levels = require('discord-xp');

require('dotenv').config();

Levels.setURL(process.env.MONGODB_SRV);

const Verified = '736454648239489074'
const MessageNumber = '791517574319964202'

const fs = require('fs');

var servers = {}

mongoose.connect(process.env.MONGODB_SRV, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log('Connected to the database!');
}).catch((err) => {
    console.log(err);
})

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.cooldowns = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
});

client.login(process.env.DISCORD_TOKEN);