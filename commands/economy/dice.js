const profileModel = require('../../models/ProfileSchema')

module.exports = {
    name: 'dice',
    description: 'a way to gamble money',
    aliases: ['diceroll', 'roll'],
    catergory: 'economy',
    permissions: [],
    async execute(message, args, cmd, client, Discord, profileData)
    {
        const amount = args[0]
        if(amount % 1 != 0 || amount <= 0) return message.channel.send('Deposit amount must be a whole number');

        profileModel.findOneAndUpdate(
            {
                UserID: message.author.id,
            },
            {
                $inc: {
                    coins: -amount,
                },
            }
        );
    }
}