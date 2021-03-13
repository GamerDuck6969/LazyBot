const profileModel = require(`../../models/ProfileSchema`)

module.exports = {
    name: 'inventory',
    aliases: ['inv'],
    description: 'shows your inventory',
    catergory: 'economy',
    permissions: [],
    execute(message, args, cmd, client, Discord, profileData)
    {
        message.channel.send("This code has not been finished yet")
    }
}