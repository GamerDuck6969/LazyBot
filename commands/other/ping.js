module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    catergory: 'other',
    permissions: [],
    async execute(message, args, cmd, client, Discord)
    {
       const pingEmbed = new Discord.MessageEmbed()
      
        .setColor("BLACK")
        .setAuthor('LazyBot', 'https://i.imgur.com/lg74UJw.jpeg')
        .setTitle('Bot & API Ping!')
        .setDescription(`\n\n`
                + `The bot ping is: <a:source:799748729874808862> **${Date.now() - message.createdTimestamp}ms**\n\n`
                +`API Latency is: <a:discordload:808817665942487061> **${Math.round(client.ws.ping)}ms**`
                + `\n\n`
            )
            .setTimestamp()
            .setFooter('LazySensy#1075', 'https://i.imgur.com/lg74UJw.jpeg')
        message.channel.send(pingEmbed)
    }
} 