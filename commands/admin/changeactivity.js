require('dotenv').config();

module.exports = {
    name: 'changeactivity',
    aliases: ['activity', 'ac'],
    description: 'Changes Bots Activity',
    catergory: 'admin',
    permissions: ["ADMINISTRATOR"],
    execute(message, args, cmd, client, Discord)
    {
        if (args[0] === "listening"){
            types = 2
        } else if (args[0] === "streaming"){
            types = 1
        } else if (args[0] === "watching"){
            types = 3
        } else if (args[0] === "playing"){
            types = 0
        } else {
            return message.channel.send("Invalid option").then((msg) => {msg.delete({timeout: 10000})});
        }

        args.shift()
        content = args.join(' ')
        client.user.setPresence({
        activity: {
            name: content,
            type: types
        }
        })
        message.channel.send(`**${message.author.username}** DONE :D`).then((msg) => {msg.delete({timeout: 10000})});
    }
}