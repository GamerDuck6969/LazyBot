require('dotenv').config();

module.exports = {
    name: 'slowmode',
    aliases: ['sm'],
    description: 'sets a specified channel to slowmode',
    catergory: 'admin',
    permissions: ["ADMINISTRATOR"],
    execute(message, args, cmd, client, Discord)
    {
        message.delete({timeout: 10000});

        message.channel.setRateLimitPerUser(args[0])
        message.channel.send(`Slowmode is now: ${args[0]}`).then((msg) => {msg.delete({timeout: 10000})});
    }
}