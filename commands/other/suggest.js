module.exports = 
{
    name: 'suggest',
    aliases: ['suggestion', 'idea'],
    description: 'creates a suggestion!',
    catergory: 'other',
    permissions: [],
    execute(message, args, cmd, client, Discord)
    {
        const channel = message.guild.channels.cache.find(c => c.name === '🗒-suggestions');
        if(!channel) return message.channel.send('Suggestions channel does not exist').then((msg) => {msg.delete({timeout: 10000})});

        let messageArgs = args.join(' ');
        const embed = new Discord.MessageEmbed()
        .setColor('FADF2E')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(messageArgs)
        .setTimestamp()

        channel.send(embed).then((msg) => {
            msg.react('✔️');
            msg.react('❌');
            message.delete();
        }).catch((err) =>{
            throw err;
        })
    }
}