require('dotenv').config();

module.exports = 
{
    name: 'unban',
    description: "unbans players",
    catergory: 'admin',
    permissions: ["ADMINISTRATOR"],
    async execute(message, args, cmd, client, Discord)
    {
        let toBan = await client.users.fetch(args[0])

        if(!toBan) message.reply('Please specify a user')
        
        const reason = args[1] || "There was no reason!";

        message.guild.members.unban(toBan, reason)

        message.channel.send(`${toBan} has been unbanned from the server!`).then((msg) => {msg.delete({timeout: 10000})});

    }
}