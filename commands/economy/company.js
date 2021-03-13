const profileModel = require(`../../models/ProfileSchema`)

module.exports = {
    name: 'company',
    aliases: ['comp'],
    description: 'shows your company',
    catergory: 'economy',
    permissions: [],
    execute(message, args, cmd, client, Discord, profileData)
    {
        //message.channel.send("This code has not been finished yet")

        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}'s Company`, message.author.displayAvatarURL())
        .addFields(
            { name: `💼**Tier**`, value: `**${profileData.tier}**`, inline: true},
            { name: `⚡**Power**`, value: `**${profileData.power}**`, inline: true},
            { name: `💸**Hourly**`, value: `**${profileData.hourly}**`, inline: true},
        )
        .addFields(
            { name: `👷**Workers**`, value: `**${profileData.workers}**`, inline: true},
            { name: `⛏️**Miners**`, value: `**${profileData.miners}**`, inline: true},
            { name: `🤖**Bots**`, value: `**${profileData.bots}**`, inline: true},
        )
        .setTimestamp()

        message.channel.send(embed)
    }
}