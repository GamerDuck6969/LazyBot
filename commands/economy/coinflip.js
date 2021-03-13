const profileModel = require(`../../models/ProfileSchema`)

module.exports = {
    name: 'coinflip',
    aliases: ['cf'],
    description: '50/50 coin flip against bot',
    catergory: 'economy',
    permissions: [],
    execute(message, args, cmd, client, Discord, profileData)
    {
        message.channel.send('This code is not finished');
    }
}