const profileModel = require(`../../models/ProfileSchema`)

module.exports = {
    name: 'sell',
    aliases: [],
    description: 'sells stuff from your inventory/company',
    catergory: 'economy',
    permissions: [],
    execute(message, args, cmd, client, Discord, profileData)
    {
        message.channel.send("This code has not been finished yet")
    }
}