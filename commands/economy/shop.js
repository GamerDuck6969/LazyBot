const profileModel = require(`../../models/ProfileSchema`)

module.exports = {
    name: 'shop',
    aliases: [],
    description: 'shows you the shop',
    catergory: 'economy',
    permissions: [],
    execute(message, args, cmd, client, Discord, profileData)
    {
        message.channel.send("This code has not been finished yet")
    }
}