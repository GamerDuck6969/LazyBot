require('dotenv').config();
const Punishments = require('../../models/ModSchema');

module.exports = 
{
    name: 'warn',
    description: "warns players",
    catergory: 'admin',
    permissions: ["ADMINISTRATOR"],
    async execute(message, args, cmd, client, Discord)
    {
        const toWarn = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

        if(message.author.id === toWarn.id) return;

        let reason = args.slice(1).join(" ")

        if(!reason) return message.channel.send('NO REASON!')

        let data = await Punishments.findOne({
            GuildID: message.guild.id,
            UserID: toWarn.id
        });

        if(data){
            data.Punishments.unshift({
                PunishType: 'Warn',
                Moderator: message.author.id,
                Timestamp: new Date().getTime(),
                Reason: reason,
            });
            data.save();

            message.channel.send(`warned ${toWarn} for \`${reason}\``)
            const embed = new Discord.MessageEmbed()
            .setTitle('**NEW WARN!**')
            .setColor('RANDOM')
            .setAuthor('LazyBot', 'https://i.imgur.com/lg74UJw.jpeg')
            .setDescription(`**User**: ${toWarn}\n**Moderator**: ${message.author.tag}\n**Reason**: ${reason}\n**Date**: ${new Date().toLocaleDateString()}\n`)
            .setTimestamp()
            message.channel.send(embed);

        } else if(!data){
            let newData = new Punishments({
                GuildID: message.guild.id,
                UserID: toWarn.id,
                Punishments: [{
                    PunishType: 'Warn',
                    Moderator: message.author.id,
                    Timestamp: new Date().getTime(),
                    Reason: reason,
                },],
            });
            newData.save();

            const embed = new Discord.MessageEmbed()
            .setTitle('**NEW WARN!**')
            .setAuthor('LazyBot', 'https://i.imgur.com/lg74UJw.jpeg')
            .setDescription(`${toWarn}\n**Moderator**: ${message.author.id}\n**Reason**: ${reason}\n**Date**: ${new Date().toLocaleDateString()}\n`)
            .setTimestamp()
            message.channel.send(embed);
        }
    }
}