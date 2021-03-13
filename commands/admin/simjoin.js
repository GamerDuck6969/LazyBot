module.exports = {
    name: 'simjoin',
    permissions: ["ADMINISTRATOR"],
    description: 'pretend to be a user joining the server for testing',
    execute(message, args, cmd, client, Discord) {
        client.emit('guildMemberAdd', message.member)
    }
}