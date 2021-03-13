const levels = require('discord-xp');

module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    description: 'This shows the user their current rank',
    catergory: 'other',
    permissions: [],
    async execute(message, args, cmd, client, Discord)
    {
        const rawLeaderboard = await levels.fetchLeaderboard(message.guild.id, 5);
        if(rawLeaderboard.length < 1) return reply("Nobody is on the leaderboard yet");

        const leaderboard = await levels.computeLeaderboard(client, rawLeaderboard); 

        const lb = leaderboard.map(e => `**${e.position}**. ${e.username}#${e.discriminator}\n**Level**: ${e.level}\n**XP**: ${e.xp.toLocaleString()}`);

        //message.channel.send(`${lb.join("\n\n")}`);

        const embed = new Discord.MessageEmbed()
        .setTitle('**LEADERBOARD**')
        .setColor('RANDOM')
        .setDescription(`${lb.join("\n\n")}`)
        .setTimestamp()
        .setAuthor('LazyBot', 'https://i.imgur.com/lg74UJw.jpeg')
        message.channel.send(embed);
    }
}