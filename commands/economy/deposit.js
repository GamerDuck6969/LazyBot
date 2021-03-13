const profileModel = require(`../../models/ProfileSchema`);

module.exports = {
    name: 'deposit',
    aliases: ['depo'],
    description: 'Deposite coins into your bank',
    catergory: 'economy',
    permissions: [],
    async execute(message, args, cmd, client, Discord, profileData){
        const amount = args[0];
        if(amount % 1 != 0 || amount <= 0) return message.channel.send('Deposit amount must be a whole number');
        try {
            if(amount > profileData.coins) return message.channel.send("You don't have that amount of coins to deposit");
                await profileModel.findOneAndUpdate(
                    {
                        UserID: message.author.id,
                    },
                    {
                        $inc: {
                            coins: -amount,
                            bank: amount,
                        },
                    }
                );

            return message.channel.send(`${message.author.username} has deposited ${amount}`);
        } catch(err) {
            console.log(err)
        }
    },
};