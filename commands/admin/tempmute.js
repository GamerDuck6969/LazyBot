const ms = require('ms');
require('dotenv').config();

module.exports = {
    name: 'tempmute',
    aliases: ['tm', 'mute'],
    description: 'Mute players that are doing the bad',
    catergory: 'admin',
    permissions: ["ADMINISTRATOR"],
    execute(message, args, cmd, client, Discord){
        message.delete({timeout: 10000});
        var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!member) return message.reply('Please Provide a Member to TempMute.').then((msg) => {msg.delete({timeout: 10000})});

        let mainrole = message.guild.roles.cache.find(role => role.name === "Member");
        let role = message.guild.roles.cache.find(role => role.name === "Muted");

        if(!role) return message.reply("Couldn't find the 'muted' role.").then((msg) => {msg.delete({timeout: 10000})});

        let time = args[1];
        if(!time) return message.reply("You didnt specify a time!").then((msg) => {msg.delete({timeout: 10000})});

        member.roles.remove(mainrole.id)
        member.roles.add(role.id);

        message.channel.send(`@${member.user.tag} has now been muted for ${ms(ms(time))}`).then((msg) =>{msg.delete({timeout: 10000})});

        setTimeout( function (){
            member.roles.add(mainrole.id)
            member.roles.remove(role.id);
            message.channel.send(`@${member.user.tag} has been unmuted`).then((msg) => {msg.delete({timeout: 10000})});
        }, ms(time));
    }
}