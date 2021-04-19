const Tickets = require('../../models/TicketSchema')

module.exports = {
    name: 'tickets',
    description: 'Used to see all tickets by a certain user',
    permissions: ["ADMINISTRATOR"],
    catergory: ['admin'],
    aliases: [],
    async execute(message, args, cmd, client, Discord)
    {
        const target = message.mentions.users.first()
        if(!target) return message.channel.send('Please Tag A User')

        try{
            const results = await Tickets.findOne({
                UserID: target.id,
                GuildID: message.guild.id
            });

            if (!results) return message.channel.send(`${target.username} does not have any tickets at this current time`)

            let reply = ``

            for(const ticket of results.TicketArray){
                const { NewTicket, userID, guildID, Server, Reason, Timestamp } = ticket
                console.log(ticket)
                reply += `**Ticket**: ${NewTicket}\n**User**: <@${userID}>\n**ServerID**: ${guildID}\n**Server**: ${Server}\n**Reason**: ${Reason}\n**Date**: ${new Date(Timestamp).toLocaleDateString()}\n\n-----------------------------------------------\n\n`;
            }
            const embed = new Discord.MessageEmbed()
            .setDescription(`${reply}` )
            .setAuthor(`${target.tag}'s Tickets`, target.displayAvatarURL())
            .setTimestamp()
            message.reply(embed);

        } catch(err){
            message.channel.send("An error has occured please DM a mod")
            throw err;
        }
    }
}