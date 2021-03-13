require('dotenv').config();

module.exports = 
{
    name: 'kick',
    description: "kicks players",
    catergory: 'admin',
    permissions: ["ADMINISTRATOR"],
    execute(message, args, cmd, client, Discord)
    {
        const target = message.mentions.users.first();

        if(target)
        {
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.kick();
            return message.reply("User has been kicked").then((msg) => {msg.delete({timeout: 10000})});
        }
        else
        {
            return message.reply('You Couldnt Kick That Member!').then((msg) => {msg.delete({timeout: 10000})});
        }
    }
}