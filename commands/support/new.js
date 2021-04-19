const Tickets = require(`../../models/TicketSchema`)

module.exports = 
{
    name: 'new',
    aliases: ['ticket', 'support'],
    description: 'Support Ticket',
    catergory: 'support',
    permissions: [],
    async execute(message, args, cmd, client, Discord)
    {
        const reason = args.slice(0).join(" ");

        let SupportCategory = message.guild.channels.cache.find(category => category.name === "Tickets")

        const ticketLogChannel = '810358984321531944'

        if(message.guild.me.hasPermission('MANAGE_CHANNELS') && !SupportCategory){
            SupportCategory = await message.guild.channels.create('Tickets', {
                type: "category",
            });
        };

        if(!message.guild.me.hasPermission('MANAGE_CHANNELS') && !SupportCategory){
            message.channel.send("Sorry But I Do Not Have Permissions To Create The Category Needed For Tickets!").then((msg) => {msg.delete({timeout: 10000})});
        }

        if (!reason){
            return message.channel.send("Please specify a ticket subject \n \`.new [subject]\`").then((msg) => {msg.delete({timeout: 10000})});
        }

        let data = await Tickets.findOne({
            GuildID: message.guild.id,
            UserID: message.author.id
        });

        if(data){
            data.TicketArray.unshift({
                NewTicket: 'New Ticket',
                guildID: message.guild.id,
                userID: message.author.id,
                Server: message.guild.name,
                Timestamp: new Date().getTime(),
                Reason: reason,
            });
            data.save();
            
            console.log('We Have Updated The Tickets')

        } else if(!data){
            let newData = new Tickets({
                GuildID: message.guild.id,
                UserID: message.author.id,
                TicketArray: [{
                    NewTicket: 'New Ticket',
                    guildID: message.guild.id,
                    userID: message.author.id,
                    Server: message.guild.name,
                    Timestamp: new Date().getTime(),
                    Reason: reason,
                },],
            });
            newData.save();
            console.log('We Have Made New Ticket Data')
        }

        const channelName = `ticket-${message.author.username}-${message.author.discriminator}`
        if (message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.username.toLowerCase()}-${message.author.discriminator}`)) {
            return message.channel.send("Sorry, But you already have a ticket open!").then((msg) => {msg.delete({timeout: 10000})});
        }

        const channel = await message.guild.channels.create(channelName, { parent: SupportCategory.id, topic: `Ticket Owner: ${message.author.tag}`})

        channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false,
        });
        channel.updateOverwrite(message.author, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true,
        });

        const CreateTicketEmbed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("New Support Ticket")
            .setDescription(`<@${message.author.id}> Your support ticket channel is <#${channel.id}>`)
            .setTimestamp()
            .setFooter("Made By Lazysensy#1075")
        message.channel.send(CreateTicketEmbed)
        const GreetEmbed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .addField("New Support Ticket", `<@${message.author.id}> Thanks for submitting a support ticket. Our support staff will get back to you shortly`)
            .addField(`Issue:`, reason)
            .setTimestamp()
            .setFooter("Made By Lazysensy#1075")

        const reactionMessage = await channel.send(GreetEmbed);

        try{
            await reactionMessage.react("🔒");
            await reactionMessage.react("⛔");
        }catch(err){
            channel.send("There was an error sending emojis");
            throw err
        }

        const collector = reactionMessage.createReactionCollector(
            (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
            { dispose: true }
          );
      
          collector.on("collect", (reaction, user) => {
            switch (reaction.emoji.name) {
              case "🔒":
                channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
                break;
              case "⛔":
                channel.send("Deleting this channel in 5 seconds!");
                setTimeout(() => channel.delete(), 5000);
                break;
            }
          });
    }
}