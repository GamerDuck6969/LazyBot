require('dotenv').config();

module.exports = 
{
    name: 'close',
    aliases: ['complete', 'delete'],
    description: 'Close Ticket',
    catergory: 'support',
    permissions: [],
    execute(message, args, cmd, client, Discord)
    {
        if(!message.member.roles.cache.has(process.env.ADMIN_ID)) return Message.reply('You Dont Have Permission To Use This Command!').then((msg) => {msg.delete({timeout: 10000})});

        const channelToDelete = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first().id;
        if(!args[0]) return message.channel.send('please send a mentioned channel').then((msg) => {msg.delete({timeout: 10000})});

        channelToDelete.delete()
    }
}