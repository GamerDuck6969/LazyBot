const profileModel = require(`../../models/ProfileSchema`)

module.exports = {
    name: 'buy',
    aliases: [],
    description: 'Buys items from the shop',
    catergory: 'economy',
    permissions: [],
    execute(message, args, cmd, client, Discord, profileData)
    {
        message.channel.send("This code has not been finished yet")
    }
}