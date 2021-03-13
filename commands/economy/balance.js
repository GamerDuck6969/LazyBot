const profileModel = require(`../../models/ProfileSchema`);

module.exports = {
    name: 'balance',
    aliases: ['bal', 'bl'],
    description: 'Checks the users balance',
    catergory: 'economy',
    permissions: [],
    async execute(message, args, cmd, client, Discord, profileData){
        const target = message.mentions.users.first()
        if(!target){
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}'s Balance`, message.author.displayAvatarURL())
            .setDescription(`Wallet: **${profileData.coins}**\nBank: **${profileData.bank}**`)
            .setColor('GREEN')
            message.channel.send(embed);
        } else if(target) {
            const targetData = await profileModel.findOne({ UserID: target.id, ServerID: message.guild.id })
            if(!targetData) return message.channel.send("This user does not exist on this database")
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${target.username}'s Balance`, target.displayAvatarURL())
            .setDescription(`Wallet: **${targetData.coins}**\nBank: **${targetData.bank}**`)
            .setColor('GREEN')
            message.channel.send(embed);
        }
    }
}