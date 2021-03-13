const profileModel = require(`../../models/ProfileSchema`)

module.exports = {
    name: 'weekly',
    aliases: [],
    description: 'gives you weekly coins',
    cooldown: 604800,
    catergory: 'economy',
    permissions: [],
    async execute(message, args, cmd, client, Discord, profileData)
    {
        const randomNumber = Math.floor(Math.random() * 200000) + 1;
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