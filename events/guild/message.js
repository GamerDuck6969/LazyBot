require('dotenv').config();
const Levels = require('discord-xp');
const profileModel = require('../../models/ProfileSchema');
const { badwords } = require("../../Badwords.json");
const prettyMilliseconds = require('pretty-ms');

const usersMap = new Map();
const cooldowns = new Map();

module.exports = async (Discord, client, message) => {
    const prefix = process.env.PREFIX;
    if(message.author.bot) return;

    if(message.guild) {
        if(!message.member.hasPermission("ADMINISTRATOR")){

            let confirm = false;
    
            var i;
            for(i = 0;i < badwords.length; i++){
                if(message.content.toLowerCase().includes(badwords[i].toLowerCase()))
                    confirm = true;
            }
            if(confirm) {
                message.delete();
                message.reply(`Please don't say bad-words in the server!`).then((msg) => {msg.delete({timeout: 10000})});
            }
        }
    }

    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id)
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        console.log(difference);
        if(difference > 2000) {
            clearTimeout(timer);
            console.log('Cleared timeout');
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log('Removed From RESET');
            }, 5000);
            usersMap.set(message.author.id ,userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === 5) {
                const role = message.guild.roles.cache.find(role => role.name === "Muted");
                const mainrole = message.guild.roles.cache.find(role => role.name === "Member");
                message.member.roles.remove(mainrole.id)
                message.member.roles.add(role.id);
                message.channel.send(`<@${message.author.id}> you have been muted`);
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    } else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log('Removed From Map');
        }, 5000);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: fn
        });
    }

    let profileData;
    try{
        profileData = await profileModel.findOne({ UserID: message.author.id });
        if(!profileData){
            let profile = await profileModel.create({
                UserID: message.author.id,
                ServerID: message.guild.id,
                coins: 1000,
                bank: 1000,
                tier: 1,
                power: 100,
                hourly: 100,
                workers: 0,
                miners: 0,
                bots: 0,
                cooldowns: 0,
            });
            profile.save();
        }
    }catch(err){
        console.log(err)
    }

    const randomXP = Math.floor(Math.random() * 9) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
    if(hasLeveledUp){
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`You leveled up to ${user.level}! Keep it going!`);
    }

    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
    ]

    if(!command) return message.reply(`${message} is not a valid command`);

    if (command.permissions.length){
        let invalidPerms = []
        for(const perm of command.permissions){
            if(!validPermissions.includes(perm)){
                return console.log(`Invalid Permission ${perm}`);
            }
            if(!message.member.hasPermission(perm)){
                invalidPerms.push(perm);
            }
        }
        if(invalidPerms.length){
            return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
        }
    }

    // const cooldown = profileData.cooldowns.find((cd) => cd.name === commandName);

    //     if(!cooldown) {
    //         UserRepo.createCooldown(message.author.id, commandName)
    //     } else {
    //         if(command.cooldown - (Date.now() - cooldown.time) > 0) {
    //             const time = NumberUtil.msToTime(command.cooldown - (Date.now() - cooldown.time));

    //             let onCooldownMsg = `<@${message.author.id}> this command is on cooldown for another`;
    //             for(const t in time) {
    //                 if(time[t] === 0) continue;
    //                 onCooldownMsg += ` **${time[t]} ${t}**`;
    //             }
                
    //             return message.channel.send(onCooldownMsg);
    //         }
    //         UserRepo.updateCooldown(message.author.id, commandName)
    //     }

    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    if(time_stamps.has(message.author.id)){
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if(Date.now() < expiration_time){
            const time = prettyMilliseconds(command.cooldown - (Date.now() - expiration_time), { verbose: true } );

            let onCooldownMsg = `<@${message.author.id}> ${command.name} is on cooldown for another`;

            onCooldownMsg += ` **${time}**`;

            return message.channel.send(onCooldownMsg); 
        }
    }

    time_stamps.set(message.author.id, Date.now());

    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    try{
        command.execute(message, args, cmd, client, Discord, profileData);
    } catch (err){
        message.reply("There was an error trying to execute this command!");
        console.log(err);
    }

}