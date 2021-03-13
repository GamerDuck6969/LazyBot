const { MessageEmbed } = require('discord.js');
const profileModel = require('../../models/ProfileSchema');

module.exports = async(client, Discord, member) => {
    await profileModel.findOneAndDelete(
        {
            UserID: member.id,
            ServerID: member.guild.id,
        },
    )
}