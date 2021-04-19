const recon = require('reconlx');

module.exports = 
{
    name: 'help',
    description: "list of all commands",
    catergory: 'support',
    permissions: [],
    execute(message, args, cmd, client, Discord)
    {
        const ReactionPages = recon.ReactionPages;

        const firstPageEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Help Commands')
        .setDescription('This is a help embed filled with all the commands to LazyBot.\n\nIf the current activity is set to beta then use "~" as the prefix, otherwise use "."\n\nTo see the next pages react to the emojis down below this embed')
        .setAuthor('LazyBot', 'https://i.imgur.com/lg74UJw.jpeg')
        .setTimestamp()
        .setFooter('Made by LazySensy', 'https://i.imgur.com/lg74UJw.jpeg');

        const supportCommandsEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Support Commands')
        .setDescription('All of the support commands')
        .setAuthor('LazyBot', 'https://i.imgur.com/lg74UJw.jpeg')
        .setThumbnail('https://i.imgur.com/lg74UJw.jpeg')
        .addFields(
        {name: '\u200B', value: '\u200B'},
        {name: '.new / .ticket / .support [issue]', value: 'This is a ticket command so if you have any issues type this command'},
        {name: '.close [channel]', value: 'This is used to get rid of tickets after they have been completed. **Only For Support Team**'},
        )
        .setTimestamp()
        .setFooter('Made by LazySensy#1075', 'https://i.imgur.com/lg74UJw.jpeg');

        const otherCommandsEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Other Commands')
        .setDescription('All the other commands')
        .setAuthor('LazyBot', 'https://i.imgur.com/lg74UJw.jpeg')
        .setThumbnail('https://i.imgur.com/lg74UJw.jpeg')
        .addFields(
        {name: '\u200B', value: '\u200B'},
        {name: '.leaderboard / .lb', value: 'Shows the leaderboard of the top level players on the server'},
        {name: '.ping', value: 'Shows the ping of the bot'},
        {name: '.rank / .level [other user]', value: 'Used to show your current level on the guild/server or other users rank'},
        {name: '.suggest / .suggestion / .idea [the thing you want to suggest]', value: 'Suggest an idea for the server or for my game Redacted'},
        {name: '.weather / .wthr [location]', value: 'shows you the weather of the location'},
        {name: '.youtube / .yt', value: 'Link for my youtube channel'},
        )
        .setTimestamp()
        .setFooter('Made by LazySensy#1075', 'https://i.imgur.com/lg74UJw.jpeg');

        const economyCommandsEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Economy Commands!')
        .setDescription('All the current economy commands')
        .addFields(
            {name: '\u200B', value: '\u200B'},
            {name: '.beg', value: 'Used to collect money in the economy'},
            {name: '.balance / .bal / .bl [user]', value: 'Used to check how many coins you have in your wallet and in the bank or how many others have'},
            {name: '.buy [amount, item]', value: 'Used to buy items from the shop {WIP}'},
            {name: '.coinflip / .cf [heads / tails]', value: 'Used to gamble money in a game of head or tail Vs the bot {WIP}'},
            {name: '.company / .comp', value: 'Used to check your company for workers, miners , ect {WIP}'},
            {name: '.daily', value: 'Give you your daily money'},
            {name: '.deposit / .depo [amount of money]', value: 'Used to deposit money into your bank account'},
            {name: '.give [user to give to, amount of money]', value: 'Used to give players money **ADMIN ONLY**'},
            {name: '.inventory / .inv', value: 'Used to check your inventory for items that have been perchased {WIP}'},
            {name: '.search', value: 'Search areas to find coins'},
            {name: '.sell [amount, item]', value: 'Used to sell items back to the store'},
            {name: '.shop', value: 'Used to check the items in the store that you can buy'},
            {name: '.weekly', value: 'Gives you your weekly amount of money'},
            {name: '.withdraw / .wthd [amount of money]', value: 'Used to withdraw money from the bank'},
            )
        .setAuthor('LazyBot', 'https://i.imgur.com/lg74UJw.jpeg')
        .setTimestamp()
        .setFooter('Made by LazySensy#1075', 'https://i.imgur.com/lg74UJw.jpeg');

        const adminCommandsEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Admin Commands!')
        .setDescription('All the admin commands')
        .addFields(
            {name: '\u200B', value: '\u200B'},
            {name: '.ban [user to ban]', value: 'Used to ban users from the guild / server'},
            {name: '.changeactivity / .activity / .ac [set content of activity, activity bot is doing]', value: 'Used to change the bots activity'},
            {name: '.clear [number of messages to clear]', value: 'Used to clear messages from the text channels'},
            {name: '.giveawaycreate / .gcreate / .gc', value: 'Used to create a giveaway for discord nitro classic'},
            {name: '.kick [user to kick]', value: 'Used to kick users from the guild / server'},
            {name: '.reload / .restart / .rl', value: 'Used to reload a command the has been edited'},
            {name: '.slowmode / .sm [number of seconds per message]', value: 'Used to put a channel into slowmode'},
            {name: '.tempmute / .mute / .tm [user to mute, number of milliseconds]', value: 'Used to temp mute a user'},
            {name: '.unban [user to unban] ', value: 'Unbans a user that was previously banned'},
            {name: '.warn [user to warn, reason]', value: 'Give a user a warn'},
            {name: '.warns [user]', value: 'Used to check a users warnings {WIP}'},
            )
        .setAuthor('LazyBot', 'https://i.imgur.com/lg74UJw.jpeg')
        .setTimestamp()
        .setFooter('Made by LazySensy#1075', 'https://i.imgur.com/lg74UJw.jpeg');

        const musicCommandsEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Music Commands!')
        .setDescription('All music commands')
        .addFields(
            {name: '\u200B', value: '\u200B'},
            {name: '.play [search for song, spotify link, youtube link]', value: 'Plays music that you request'},
            {name: '.stop', value: 'Clears the queue of the music and leaves the voice chat'},
            {name: '.pause', value: 'Pauses the current song'},
            {name: '.unpause', value: 'Unpauses the bot and starts music again'},
            {name: '.queue', value: 'Shows the current song that is playing as well as the songs that are in the queue'},
        )
        .setAuthor('LazyBot', 'https://i.imgur.com/lg74UJw.jpeg')
        .setTimestamp()
        .setFooter('Made by LazySensy#1075', 'https://i.imgur.com/lg74UJw.jpeg');

        const pages = [firstPageEmbed ,supportCommandsEmbed, otherCommandsEmbed, musicCommandsEmbed, economyCommandsEmbed, adminCommandsEmbed];
        const textPageChange = true;
        const emojis = ["⏪", "⏩"];
        const time = 600000;
        ReactionPages(message, pages, textPageChange, emojis, time)

    }
}