const WelcomeSchema = require("../../models/WelcomeSchema");

const cache = new Map()

const loadData = async () => {
    const results = await WelcomeSchema.find()

    for(const result of results) {
        cache.set(result.ServerID, result.ChannelID)
    }
}
loadData()

module.exports = {
    name: 'setwelcome',
    aliases: ['sw'],
    permissions: ["ADMINISTRATOR"],
    description: 'Used to set the channel of the welcome canvas',
    async execute(message, args, cmd, client, Discord) {
        const { guild, channel } = message
        
        await WelcomeSchema.findOneAndUpdate(
            {
                ServerID: guild.id,
            },
            {
                ServerID: guild.id,
                ChannelID: channel.id
            },
            {
                upsert: true
            }
        )

        message.channel.send(`Welcome Channel Set`)
    }
}

module.exports.getChannelID = (guildId) => {
    return cache.get(guildId)
}