const profileModel = require(`../../models/ProfileSchema`)

module.exports = {
    name: 'coinflip',
    aliases: ['cf'],
    description: '50/50 coin flip against bot',
    catergory: 'economy',
    permissions: [],
    async execute(message, args, cmd, client, Discord, profileData)
    {
        const choice = args[0];
        if(!choice) return message.reply("Please Send Heads or Tails");

        const amount = args[1];
        if(!amount) return message.reply("Please Send An Amount Of Money");

        const options = [
            'heads',
            'tails',
        ];

        let result = options.sort(() => Math.random() - Math.random()).slice(0, 1);

        console.log(result);

        if(result.toString() === "heads") {
            console.log('It was Heads');
            if(choice === result.toString()) {
                const embed = new Discord.MessageEmbed()
                .setDescription(`**<@${message.author.id}>** it was \`${result}\` you won **${amount}**`);
                message.channel.send(embed);

                await profileModel.findOneAndUpdate(
                    {
                        UserID: message.author.id,
                    }, 
                    {
                        $inc: {
                           coins: amount,
                        },
                    }
                );

            } else if(choice !== result.toString()) {
                const embed = new Discord.MessageEmbed()
                .setDescription(`**<@${message.author.id}>** it was \`${result}\` you lost **${amount}**`);
                message.channel.send(embed);

                await profileModel.findOneAndUpdate(
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
        } else if(result.toString() === 'tails') {
            console.log('It was Tails');
            if(choice === result.toString()) {
                const embed = new Discord.MessageEmbed()
                .setDescription(`**<@${message.author.id}>** it was \`${result}\` you won **${amount}**`);
                message.channel.send(embed);

                await profileModel.findOneAndUpdate(
                    {
                        UserID: message.author.id,
                    }, 
                    {
                        $inc: {
                           coins: amount,
                        },
                    }
                );

            } else if(choice !== result.toString()) {
                const embed = new Discord.MessageEmbed()
                .setDescription(`**<@${message.author.id}>** it was \`${result}\` you lost **${amount}**`);
                message.channel.send(embed);

                await profileModel.findOneAndUpdate(
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
    }
}