module.exports = {
    name: 'so',
    aliases: ['shoutout'],
    description: 'Shouts out the user',
    permissions: [],
    execute(message, args, cmd, client, Discord)
    {
        const discordUser = message.mentions.members.first() || message.author
        if(discordUser == message.author){
            const twitchUser = args[0]
            if(!twitchUser) return message.channel.send('Please send the twitch name you would like to shout out')
            message.channel.send(`Hey Guys, ${discordUser} just went live\n\n check them out at: https://twitch.tv/${twitchUser}`)
        } 
    }
}