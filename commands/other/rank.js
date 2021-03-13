const Levels = require('discord-xp');
const canvacord = require('canvacord');

module.exports = {
    name: 'rank',
    aliases: ['level'],
    description: 'This shows the user their current rank',
    catergory: 'other',
    permissions: [],
    async execute(message, args, cmd, client, Discord)
    {
        const target = message.mentions.users.first() || message.author;

        const user = await Levels.fetch(message.author.id, message.guild.id);

        const neededXp = Levels.xpFor(parseInt(user.level) + 1);

        if (!user) return message.reply("You dont have xp. Try to send some messages.").then((msg) => {msg.delete({timeout: 10000})});

        const rank = new canvacord.Rank()
            .setAvatar(message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
            .setCurrentXP(user.xp)
            .setLevel(user.level)
            .setRequiredXP(neededXp)
            .setStatus(message.author.presence.status)
            .setProgressBar('#FFA500', 'COLOR')
            .setUsername(message.author.username)
            .setDiscriminator(message.author.discriminator)
            .setBackground('IMAGE', '')
            .setRankColor("GREEN")
        rank.build()
            .then(data =>{
                const attachment = new Discord.MessageAttachment(data, 'funny.png')
                message.channel.send(attachment);
            })
    }
}