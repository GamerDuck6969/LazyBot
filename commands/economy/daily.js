const profileModel = require(`../../models/ProfileSchema`)

module.exports = {
    name: 'daily',
    aliases: [],
    description: 'give you daily coins',
    cooldown: 86400,
    catergory: 'economy',
    permissions: [],
    async execute(message, args, cmd, client, Discord, profileData)
    {
        const randomNumber = Math.floor(Math.random() * 60000) + 1;
        await profileModel.findOneAndUpdate(
        {
            UserID: message.author.id,
        }, 
        {
            $inc: {
               coins: randomNumber,
            },
          }
        );
        return message.channel.send(`${message.author.username}, you begged and received ${randomNumber}`);
    }
}