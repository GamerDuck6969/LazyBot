const profileModel = require('../../models/ProfileSchema');

module.exports = {
    name: 'beg',
    aliases: [],
    cooldown: 60,
    description: 'beg for coins',
    catergory: 'economy',
    permissions: [],
    async execute(message, args, cmd, client, Discord, profileData){
        const randomNumber = Math.floor(Math.random() * 500) + 1;
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
    },
};