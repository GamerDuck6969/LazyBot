require('dotenv').config();
const Levels = require('discord-xp')
const profileModel = require('../../models/ProfileSchema');

const usersMap = new Map();
const cooldowns = new Map();

module.exports = async (Discord, client, message) => {
    const prefix = process.env.PREFIX;
    if(message.author.bot) return;

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
                bots: 0
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

    if(command.permissions.length){
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

    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    if(time_stamps.has(message.author.id)){
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if(current_time < expiration_time){
            const time_left = (expiration_time - current_time) / 1000;
            return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${command.name}`); 
        }
    }

    time_stamps.set(message.author.id, current_time);

    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    try{
        command.execute(message, args, cmd, client, Discord, profileData);
    } catch (err){
        message.reply("There was an error trying to execute this command!");
        console.log(err);
    }

}