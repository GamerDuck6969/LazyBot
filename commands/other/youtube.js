module.exports = 
{
    name: 'youtube',
    aliases: ['yt', 'utube'],
    cooldown: 0,
    usage: `.youtube`,
    description: "this is a link for youtube",
    catergory: 'other',
    permissions: [],
    execute(message, args, cmd, client, Discord)
    {
        const youtubeEmbed = new Discord.MessageEmbed()
        .setColor('#95ff00')
        .setTitle('Youtube Link')
        .setAuthor('LazyBot')
        .setDescription('Youtube is Great Place')
        .addFields
        (
        {name: '\u200B', value: '\u200B'},
        {name: 'Youtube', value: 'https://www.youtube.com/channel/UCWlpyc6Qcs2rN7IRwFSMcNQ'},
        )
        .setTimestamp()
        .setFooter('Yeetus Feetus.');

        message.channel.send(youtubeEmbed)
    }
}