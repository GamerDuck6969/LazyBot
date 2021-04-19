const profileModel = require("../../models/ProfileSchema");

module.exports = {
    name: 'search',
    aliases: ['scavenge'],
    cooldown: 48,
    permissions: ['SEND_MESSAGES'],
    catergory: 'economy',
    description: 'Choose a location to search and have a chance to get coins',
    async execute(message, args, cmd, client, Discord, profileData) {
        message.delete()
        const LOCATIONS = [
            "car",
            "sock",
            "milk",
            "wallet",
            "box",
            "pocket",
            "bus",
            "gutters",
            "park",
            "train",
            "lounge",
            "keyboard",
            "picnic",
            "bathroom",
            "bed",
            "sofa",
            "backpack",
            "laptop",
            "oculus",
            "shirt",
            "carpark",
            "elevator",
            "freezer",
            "kitchen",
            "cinema",
            "shopping center",
        ];

        let chosenLocations = LOCATIONS.sort(() => Math.random() - Math.random()).slice(0, 3);

        const RANDOM_NUMBER = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

        const FILTER = (m) => {
            return chosenLocations.some((answer) => answer.toLowerCase() === m.content.toLowerCase()) && m.author.id === message.author.id;
          };

        const COLLECTOR = message.channel.createMessageCollector(FILTER, { max: 1, time: 15000 });

        COLLECTOR.on("collect", async (m) => {
            const EMBED = new Discord.MessageEmbed()
            .setColor('#ffa500')
            .setTitle(`${message.author.username} search a ${m.content}`)
            .setDescription(`You found $${RANDOM_NUMBER.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
            .setFooter(`Are you that desperate.`);

            await profileModel.findOneAndUpdate(
                {
                    UserID: message.author.id,
                },
                {
                    $inc: {
                        coins: RANDOM_NUMBER,
                    },
                }
            );

            message.channel.send(EMBED);
            m.delete();
        });

        COLLECTOR.on("end", (collected) => {
            if(collected.size == 0) {
                return message.channel.send(
                    `What are you doing <@${message.author.id}>?! There was $${RANDOM_NUMBER.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} hidden inside the ${chosenLocations[0]}`
                ).then((msg) => {msg.delete({timeout: 10000})});
            }
        });

        message.channel.send(
            `<@${
                message.author.id
            }>\n**Which location would you like to search?** \nType the location in this channel.\n\`${chosenLocations.join("` `")}\``
        ).then((msg) => {msg.delete({timeout: 10000})});
    },
};