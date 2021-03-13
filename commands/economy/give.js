const profileModel = require(`../../models/ProfileSchema`);

module.exports = {
    name: "give",
    aliases: [],
    description: "give a player some coins",
    catergory: 'economy',
    permissions: [],
    async execute(message, args, cmd, client, Discord, profileData) {
        if(!args.length) return message.channel.send('You need to mention a player to give them coins')
        const amount = args[1]
        const target = message.mentions.users.first();
        if(!target) return message.channel.send('That user does not exist');

        if(amount % 1 != 0 || amount <= 0) return message.channel.send('Deposit amount must be a whole number');

        try {
            const targetData = await profileModel.findOne({ UserID: target.id });
            if(!targetData) return message.channel.send(`This user does not exist in the database`)

            await profileModel.findOneAndUpdate(
                {
                    UserID: target.id,
                },
                {
                    $inc: {
                        coins: amount,
                    },
                }
            );

            return message.channel.send(`**${target.username}** has been given **${amount}** coins by **${message.author.username}**`);
        } catch(err) {
            console.log(err)
        }
    },
};