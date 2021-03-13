require('dotenv').config();
const Punishments = require('../../models/ModSchema');

module.exports = 
{
    name: 'ban',
    description: "bans players",
    catergory: 'admin',
    permissions: ["ADMINISTRATOR"],
    async execute(message, args, cmd, client, Discord)
    {
        const toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        
        const reason = args.slice(1).join(" ") || "There was no reason!";

        await toBan.send(`You have been banned from the server!\nReason: ${reason}\n if you feel like this was a mistake please appeal this ban`)

        let data = await Punishments.findOne({
            GuildID: message.guild.id,
            UserID: toBan.id
        });

        if(data){
            data.Punishments.unshift({
                PunishType: 'Ban',
                Moderator: message.author.id,
                Timestamp: new Date().getTime(),
                Reason: reason,
            });
            data.save();

        } else if(!data){
            let newData = new Punishments({
                GuildID: message.guild.id,
                UserID: toBan.id,
                Punishments: [{
                    PunishType: 'Ban',
                    Moderator: message.author.id,
                    Timestamp: new Date().getTime(),
                    Reason: reason,
                },],
            });
            newData.save();
        }

        toBan.ban({
            reason: reason
        })

        message.channel.send(`${toBan} was banned from the server!\nReason: ${reason}`).then((msg) => {msg.delete({timeout: 10000})});
    }
}